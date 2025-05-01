import React, { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_NOTES,
  DELETE_NOTES,
  EDIT_NOTES,
  GET_NOTES,
} from "../../Utils/Constant";
import { useAppStore } from "../../store";
import { toast } from "react-toastify";
import { FiUpload, FiX, FiFileText, FiImage } from "react-icons/fi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const navigate=useNavigate();
  // Using zustand store to manage notes globally
  const { Note, addNote, setNote, updateNote, removeNote } = useAppStore();

  // Local state for search filter, modal, form data, and loading
  const [FilterData, SetFilterData] = useState([]);
  const [ShowModel, SetShowModel] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial form state
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    imageFile: null,
    note_image_url: "",
    note_pdf_url: "",
    pdfFile: null,
  });

  // Fetch all notes from the server
  const FetchNote = async () => {
    try {
      const response = await apiClient.get(GET_NOTES);
      if (response.status === 200) {
        setNote(response.data.data); // Set notes to global store
        SetFilterData(response.data.data); // Set notes to local filter
      }
    } catch (error) {
      console.error(error);
      toast.error("Some error occurred, try again later.");
    }
  };

  // Open or close the modal and set form data
  const ToggleModel = (
    item = {
      _id: null,
      title: "",
      description: "",
      imageFile: null,
      note_image_url: "",
      note_pdf_url: "",
      pdfFile: null,
    }
  ) => {
    SetShowModel(!ShowModel);
    setFormData(item);
  };

  // Handle file (Image or PDF) selection
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
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

  const sanitizeFileName = (fileName) => {
    return fileName
      .replace(/\s+/g, '_')  // Replace spaces with underscores
      .replace(/\+/g, '-')   // Replace + with -
      .replace(/[^a-zA-Z0-9._-]/g, ''); // Remove any other invalid characters
  };
  // Add a new Note
  const AddNotes = async () => {
    try {
      if (!formData.title || !formData.pdfFile) {
        toast.error("Title and PDF file are required.");
        return;
      }

      setLoading(true);

      // Request S3 signed URLs
      const uploadRequests = [
        apiClient.post("/s3/signed-url", {
          fileName:sanitizeFileName( formData.pdfFile.name),
          fileType: formData.pdfFile.type,
          folderType: "notes/pdf",
        },{
          withCredentials:true
        }),
      ];

      if (formData.imageFile) {
        uploadRequests.push(
          apiClient.post("/s3/signed-url", {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "notes/images",
          },{
            withCredentials:true
          })
        );
      }

      const [pdfRes, imageRes] = await Promise.all(uploadRequests);

      // Upload files to S3 using pre-signed URLs
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

      // Create new note with uploaded file URLs
      const payload = {
        title: formData.title,
        description: formData.description || "",
        fileUrl: pdfRes.data.publicUrl,
        imageUrl: formData.imageFile ? imageRes.data.publicUrl : "",
      };

      const response = await apiClient.post(CREATE_NOTES, payload,{
        withCredentials:true
      });

      if (response.status === 200) {
        addNote(response.data.data);
        toast.success("Note added successfully.");
        ToggleModel();
      }
    } catch (error) {
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

  // Update existing Note
  const UpdateNote = async () => {
    try {
      setLoading(true);
  
      let updatedPdfUrl = formData.note_pdf_url;
      let updatedImageUrl = formData.note_image_url;
  
      // Conditionally prepare S3 signed URL requests
      const pdfUploadPromise =
        formData.pdfFile instanceof File
          ? apiClient.post(
              "/s3/signed-url",
              {
                fileName: sanitizeFileName(formData.pdfFile.name),
                fileType: formData.pdfFile.type,
                folderType: "notes/pdf",
              },
              { withCredentials: true }
            )
          : null;
  
      const imageUploadPromise =
        formData.imageFile instanceof File
          ? apiClient.post(
              "/s3/signed-url",
              {
                fileName: sanitizeFileName(formData.imageFile.name),
                fileType: formData.imageFile.type,
                folderType: "notes/images",
              },
              { withCredentials: true }
            )
          : null;
  
      const [pdfRes, imageRes] = await Promise.all([
        pdfUploadPromise,
        imageUploadPromise,
      ]);
  
      // Upload files to S3
      if (pdfRes?.data?.url) {
        await fetch(pdfRes.data.url, {
          method: "PUT",
          body: formData.pdfFile,
          headers: { "Content-Type": formData.pdfFile.type },
        });
        updatedPdfUrl = pdfRes.data.publicUrl;
      }
  
      if (imageRes?.data?.url) {
        await fetch(imageRes.data.url, {
          method: "PUT",
          body: formData.imageFile,
          headers: { "Content-Type": formData.imageFile.type },
        });
        updatedImageUrl = imageRes.data.publicUrl;
      }
  
      // Prepare payload for update
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
        updateNote(formData._id, response.data.data);
        toast.success("Note updated successfully.");
        ToggleModel();
      }
    } catch (error) {
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
  

  // Delete a note by ID
  const DeleteNote = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_NOTES}/${_id}`,{
        withCredentials:true
      });
      if (response.status === 200) {
        removeNote(_id);
        toast.success("Note deleted successfully.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("DeleteNote Error:", error);
      toast.error("Failed to delete note.");
    }
  };

  // Search notes by title
  const filterSearch = (searchValue) => {
    const lowerValue = searchValue.toLowerCase();
    if (!lowerValue) {
      SetFilterData(Note);
    } else {
      const filtered = Note.filter((item) =>
        item.title.toLowerCase().includes(lowerValue)
      );
      SetFilterData(filtered);
    }
  };

  // Fetch notes initially on page load
  useEffect(() => {
    FetchNote();
  }, []);

  // Update local filter if notes change
  useEffect(() => {
    SetFilterData(Note);
  }, [Note]);

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Skills"
        />
        <button
          onClick={ToggleModel}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
      </div>

      {ShowModel && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-700 p-4">
              <h3 className="text-xl font-semibold text-white">
                {formData._id ? "Edit Notes" : "Add New Notes"}
              </h3>
              <button
                onClick={ToggleModel}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter resource title"
                  required
                />
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter detailed description"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Image
                </label>
                <div className="flex items-center space-x-4">
                  <label className="relative flex flex-col items-center justify-center w-24 h-24 bg-gray-700 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:bg-gray-600 overflow-hidden">
                    {formData.note_image_url ? (
                      <>
                        <img
                          src={formData.note_image_url}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium">
                            Update Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center p-2 text-gray-400">
                        <FiImage size={20} />
                        <span className="text-xs mt-1">Upload</span>
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
                    {formData.imageFile
                      ? formData.imageFile.name
                      : "JPG, PNG (Max 5MB)"}
                  </div>
                </div>
              </div>

              {/* PDF Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  PDF Document
                </label>
                <label className="relative flex items-center space-x-3 bg-gray-700 border border-gray-600 rounded-md px-4 py-3 hover:bg-gray-600 cursor-pointer overflow-hidden">
                  <FiFileText className="text-gray-300" size={20} />
                  <span className="text-gray-300">
                    {formData.note_pdf_url || "Choose PDF file"}
                  </span>
                  {formData.note_pdf_url && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm font-medium">
                        Update PDF
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, "pdf")}
                  />
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  type="button"
                  onClick={ToggleModel}
                  className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    formData._id ? UpdateNote(formData._id) : AddNotes()
                  }
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FiUpload className="mr-2" />
                      {formData._id ? "Update" : "Upload"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 m-auto gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {FilterData &&
          FilterData.map((item, index) => (
            <div
              key={index}
              className="sm:w-[300px] h-[310px] rounded-lg border shadow-md bg-slate-800 border-black flex flex-col items-center p-6 overflow-hidden"
              data-aos="zoom-in"
            >
              {/* Image Section */}
              <img
                src={`${item.note_image_url}`}
                className="mb-4 w-[7rem] h-[7rem] object-cover"
              />

              {/* Title */}
              <h5 className="mb-1 text-xl font-medium text-white text-center">
                {item.title}
              </h5>

              {/* Description (Fixed Size) */}
              <span className="text-sm text-gray-400 text-center w-full line-clamp-3 overflow-hidden">
                {item.description}
              </span>

              {/* Button Section (Sticks to Bottom) */}
              <div className="mt-5">
                <div className="flex justify-evenly space-x-3">
                  <button
                    onClick={() => ToggleModel(item)}
                    className="flex items-center px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    title="Edit"
                  >
                    <FaEdit className="mr-2" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => DeleteNote(item._id)}
                    className="flex items-center px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    title="Delete"
                  >
                    <FaTrash className="mr-2" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Notes;
