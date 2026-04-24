import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUpload, FiFileText, FiImage, FiTrash2 } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { CREATE_NOTES, EDIT_NOTES, DELETE_NOTES } from "@api";
import type { NoteFormData, NoteItem } from "@Type";

const emptyFormData: NoteFormData = {
  _id: null,
  title: "",
  description: "",
  imageFile: null,
  note_image_url: "",
  note_pdf_url: "",
  pdfFile: null,
};

const CreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<NoteFormData>(emptyFormData);

  useEffect(() => {
    if (location.state?.item) {
      const item = location.state.item as NoteItem;
      setFormData({
        _id: item._id || null,
        title: item.title,
        description: item.description,
        imageFile: null,
        note_image_url: item.note_image_url || item.imageUrl || "",
        note_pdf_url: item.note_pdf_url || item.fileUrl || "",
        pdfFile: null,
      });
    }
  }, [location.state]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "image") {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        note_image_url: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        pdfFile: file,
        note_pdf_url: file.name,
      }));
    }
  };

  const sanitizeFileName = (fileName: string) => {
    return fileName
      .replace(/\s+/g, "_")
      .replace(/\+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
  };

  const AddNotes = async () => {
    try {
      if (!formData.title) return toast.error("Title is required.");
      if (!formData.pdfFile) return toast.error("PDF file is required.");
      if (!formData.description) return toast.error("Description is required.");
      if (!formData.imageFile) return toast.error("Image is required.");

      setLoading(true);

      const uploadRequests = [
        apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.pdfFile.name),
            fileType: formData.pdfFile.type,
            folderType: "notes/pdf",
          },
          { withCredentials: true }
        ),
      ];

      if (formData.imageFile) {
        uploadRequests.push(
          apiClient.post(
            "/s3/signed-url",
            {
              fileName: sanitizeFileName(formData.imageFile.name),
              fileType: formData.imageFile.type,
              folderType: "notes/images",
            },
            { withCredentials: true }
          )
        );
      }

      const [pdfRes, imageRes] = await Promise.all(uploadRequests);

      await fetch(pdfRes.data.url, {
        method: "PUT",
        body: formData.pdfFile,
        headers: { "Content-Type": formData.pdfFile.type },
      });

      if (formData.imageFile) {
        await fetch(imageRes.data.url, {
          method: "PUT",
          body: formData.imageFile,
          headers: { "Content-Type": formData.imageFile.type },
        });
      }

      const payload = {
        title: formData.title,
        description: formData.description || "",
        fileUrl: pdfRes.data.publicUrl,
        imageUrl: formData.imageFile ? imageRes.data.publicUrl : "",
      };

      const response = await apiClient.post(CREATE_NOTES, payload, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Note added successfully.");
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        navigate("/admin/notes");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("AddNotes Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const UpdateNote = async () => {
    try {
      setLoading(true);
      let updatedPdfUrl = formData.note_pdf_url;
      let updatedImageUrl = formData.note_image_url;

      const pdfUploadPromise = formData.pdfFile instanceof File
        ? apiClient.post("/s3/signed-url", {
            fileName: sanitizeFileName(formData.pdfFile.name),
            fileType: formData.pdfFile.type,
            folderType: "notes/pdf",
          }, { withCredentials: true })
        : null;

      const imageUploadPromise = formData.imageFile instanceof File
        ? apiClient.post("/s3/signed-url", {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "notes/images",
          }, { withCredentials: true })
        : null;

      const [pdfRes, imageRes] = await Promise.all([pdfUploadPromise, imageUploadPromise]);

      if (pdfRes?.data?.url) {
        await fetch(pdfRes.data.url, {
          method: "PUT",
          body: formData.pdfFile as File,
          headers: { "Content-Type": (formData.pdfFile as File).type },
        });
        updatedPdfUrl = pdfRes.data.publicUrl;
      }

      if (imageRes?.data?.url) {
        await fetch(imageRes.data.url, {
          method: "PUT",
          body: formData.imageFile as File,
          headers: { "Content-Type": (formData.imageFile as File).type },
        });
        updatedImageUrl = imageRes.data.publicUrl;
      }

      const payload = {
        _id: formData._id,
        title: formData.title.trim(),
        description: (formData.description || "").trim(),
        fileUrl: updatedPdfUrl,
        imageUrl: updatedImageUrl,
      };

      const response = await apiClient.put(EDIT_NOTES, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Note updated successfully.");
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        navigate("/admin/notes");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("UpdateNote Error:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const DeleteNote = async () => {
    if (!formData._id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      const response = await apiClient.delete(`${DELETE_NOTES}/${formData._id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Note deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["notes"] });
        navigate("/admin/notes");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("DeleteNote Error:", error);
      toast.error("Failed to delete note.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (formData._id) {
          UpdateNote();
          return;
        }
        AddNotes();
      }}
      className="p-4 sm:p-6 space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">
          {formData._id ? "Edit Note" : "Create Note"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/notes")}
            className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          {formData._id && (
            <button
              type="button"
              onClick={DeleteNote}
              disabled={isDeleting || loading}
              className="px-4 py-2 text-red-300 bg-red-900/40 border border-red-500 rounded-md hover:bg-red-900/60 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Image</label>
        <div className="flex items-center gap-4">
          <label className="relative flex flex-col items-center justify-center w-32 h-32 bg-gray-700 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:bg-gray-600 overflow-hidden transition-colors">
            {formData.note_image_url ? (
              <img src={formData.note_image_url} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center p-4 text-gray-400">
                <FiImage size={24} />
                <span className="text-xs mt-2">Click to upload</span>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </label>
          <div className="text-sm text-gray-400">
            {formData.imageFile ? formData.imageFile.name : "Supports: JPG, PNG, WEBP"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Note title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">PDF Document</label>
          <label className="flex items-center gap-3 bg-gray-700 border border-gray-600 rounded-md px-4 py-2 hover:bg-gray-600 cursor-pointer transition-colors">
            <FiFileText className="text-gray-300" size={18} />
            <span className="text-gray-300 truncate">{formData.note_pdf_url || "Choose PDF file"}</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "pdf")}
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={5}
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Describe this note..."
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-700 pt-6">
        {formData._id && (
          <button
            type="button"
            onClick={DeleteNote}
            disabled={isDeleting || loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiTrash2 className="mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          type="submit"
          disabled={loading || isDeleting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            "Processing..."
          ) : (
            <>
              <FiUpload className="mr-2" />
              {formData._id ? "Update Note" : "Create Note"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateNote;