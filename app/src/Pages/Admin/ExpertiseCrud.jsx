import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_EXPERTISE,
  DELETE_EXPERTISE,
  GET_EXPERTISE,
  UPDATE_EXPERTISE,
} from "../../Utils/Constant";
import { useAppStore } from "../../store";

const ExpertiseCrud = () => {
  const { setProgress } = useAppStore();
  const [expertiseList, setExpertiseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imageFile: undefined,
  });

  const showModel = (item = null) => {
    setModel(!model);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        imageFile: undefined,
      });
    }
  };

  const sanitizeFileName = (fileName) => {
    const extension = fileName.split(".").pop();
    const baseName =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    const safeBase = baseName
      .replace(/\s+/g, "_")
      .replace(/\+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    return `${safeBase}.${extension}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file), // Local preview
      }));
    }
  };

  const fetchExpertise = async () => {
    try {
      const response = await apiClient.get(GET_EXPERTISE);
      if (response.status === 200) {
        setExpertiseList(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch expertise data");
    }
  };

  const addExpertise = async () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill title and description fields");
      return;
    }
    if (!formData.image && !formData.imageFile) {
      toast.error("Please provide an icon/image");
      return;
    }

    setProgress(10);
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (formData.imageFile) {
        const uploadRes = await apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "Expertise",
          },
          { withCredentials: true },
        );

        await fetch(uploadRes.data.url, {
          method: "PUT",
          body: formData.imageFile,
          headers: { "Content-Type": formData.imageFile.type },
        });

        imageUrl = uploadRes.data.publicUrl;
      }

      const postData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      const response = await apiClient.post(CREATE_EXPERTISE, postData, {
        withCredentials: true,
      });
      setProgress(70);

      if (response.status === 201) {
        toast.success("Expertise added successfully");
        setExpertiseList([...expertiseList, response.data.expertise]); // Add to end, matches sort 1
        setModel(false);
      }
    } catch (error) {
      toast.error("Failed to add Expertise");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const editExpertise = async (id) => {
    setProgress(10);
    setLoading(true);
    try {
      let imageUrl = formData.image;
      if (formData.imageFile) {
        const uploadRes = await apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "Expertise",
          },
          { withCredentials: true },
        );

        await fetch(uploadRes.data.url, {
          method: "PUT",
          body: formData.imageFile,
          headers: { "Content-Type": formData.imageFile.type },
        });

        imageUrl = uploadRes.data.publicUrl;
      }

      const postData = {
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      const response = await apiClient.put(
        `${UPDATE_EXPERTISE}/${id}`,
        postData,
        {
          withCredentials: true,
        },
      );
      setProgress(70);

      if (response.status === 200) {
        toast.success("Expertise updated successfully");
        setExpertiseList(
          expertiseList.map((item) =>
            item._id === id ? response.data.expertise : item,
          ),
        );
        setModel(false);
      }
    } catch (error) {
      toast.error("Failed to update Expertise");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const deleteExpertise = async (id) => {
    setProgress(10);
    try {
      const response = await apiClient.delete(`${DELETE_EXPERTISE}/${id}`, {
        withCredentials: true,
      });
      setProgress(70);

      if (response.status === 200) {
        toast.success("Expertise deleted successfully");
        setExpertiseList(expertiseList.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete Expertise");
    } finally {
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchExpertise();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Expertise</h2>
        <button
          onClick={() => showModel()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {expertiseList.length === 0 ? (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-6 text-gray-400">
            No active services found.
          </div>
        ) : (
          expertiseList.map((item) => (
            <div
              key={item._id}
              className="bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center border border-gray-600 relative overflow-hidden group"
            >
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => showModel(item)}
                  className="bg-gray-800 text-blue-400 hover:text-blue-300 p-1.5 rounded transition-colors"
                  title="Edit"
                >
                  <FaEdit size={12} />
                </button>
                <button
                  onClick={() => deleteExpertise(item._id)}
                  className="bg-gray-800 text-red-400 hover:text-red-300 p-1.5 rounded transition-colors"
                  title="Delete"
                >
                  <FaTrash size={12} />
                </button>
              </div>

              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain mb-3"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/64";
                }}
              />
              <h3 className="text-white font-bold text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-3 w-full">
                {item.description}
              </p>
            </div>
          ))
        )}
      </div>

      {model && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="text-lg font-semibold text-white">
                {formData._id ? "Edit Service" : "Add Service"}
              </h3>
              <button
                onClick={() => setModel(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              {/* Image Upload UI */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Service Icon
                </label>
                <div className="flex items-center gap-4">
                  <label className="relative flex flex-col items-center justify-center w-20 h-20 bg-gray-700 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:bg-gray-600 overflow-hidden transition-colors">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center p-2 text-gray-400">
                        <FiImage size={24} />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                  <div className="text-sm text-gray-400">
                    {formData.imageFile ? (
                      <p className="text-gray-300 text-xs truncate max-w-[150px]">
                        {formData.imageFile.name}
                      </p>
                    ) : (
                      <p className="text-xs">Supports: JPG, PNG, WEBP</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-green-500"
                  placeholder="e.g. Frontend Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-green-500"
                  placeholder="Describe the service..."
                ></textarea>
              </div>

              <button
                onClick={() =>
                  formData._id ? editExpertise(formData._id) : addExpertise()
                }
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                {loading ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertiseCrud;
