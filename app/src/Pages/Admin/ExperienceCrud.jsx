import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_EXPERIENCE,
  DELETE_EXPERIENCE,
  GET_EXPERIENCE,
  UPDATE_EXPERIENCE,
} from "../../Utils/Constant";
import { useAppStore } from "../../store";

const ExperienceCrud = () => {
  const { setProgress } = useAppStore();
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(false);
  const [formData, setFormData] = useState({
    year: "",
    duration: "",
    title: "",
    company: "",
    description: "",
  });

  const showModel = (item = null) => {
    setModel(!model);
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        year: "",
        duration: "",
        title: "",
        company: "",
        description: "",
      });
    }
  };

  const fetchExperiences = async () => {
    try {
      const response = await apiClient.get(GET_EXPERIENCE);
      if (response.status === 200) {
        setExperiences(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch experiences");
    }
  };

  const addExperience = async () => {
    if (
      !formData.year ||
      !formData.duration ||
      !formData.title ||
      !formData.company ||
      !formData.description
    ) {
      toast.error("Please fill all fields");
      return;
    }

    setProgress(10);
    setLoading(true);
    try {
      const response = await apiClient.post(CREATE_EXPERIENCE, formData, {
        withCredentials: true,
      });
      setProgress(70);

      if (response.status === 201) {
        toast.success("Experience added successfully");
        setExperiences([response.data.experience, ...experiences]);
        setModel(false);
      }
    } catch (error) {
      toast.error("Failed to add experience");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const editExperience = async (id) => {
    setProgress(10);
    setLoading(true);
    try {
      const response = await apiClient.put(
        `${UPDATE_EXPERIENCE}/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );
      setProgress(70);

      if (response.status === 200) {
        toast.success("Experience updated successfully");
        setExperiences(
          experiences.map((exp) =>
            exp._id === id ? response.data.experience : exp,
          ),
        );
        setModel(false);
      }
    } catch (error) {
      toast.error("Failed to update experience");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  const deleteExperience = async (id) => {
    setProgress(10);
    try {
      const response = await apiClient.delete(`${DELETE_EXPERIENCE}/${id}`, {
        withCredentials: true,
      });
      setProgress(70);

      if (response.status === 200) {
        toast.success("Experience deleted successfully");
        setExperiences(experiences.filter((exp) => exp._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete experience");
    } finally {
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Experience Details</h2>
        <button
          onClick={() => showModel()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
        >
          Add New
        </button>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {experiences.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            No experiences found.
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-start border border-gray-600"
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-400 font-bold text-sm bg-gray-800 px-2 py-1 rounded">
                    {exp.year}
                  </span>
                  <h3 className="text-white font-semibold text-lg">
                    {exp.title}
                  </h3>
                </div>
                {exp.duration && (
                  <p className="text-gray-400 text-xs mb-1 font-medium">
                    {exp.duration}
                  </p>
                )}
                <p className="text-gray-300 text-sm mb-2">{exp.company}</p>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {exp.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => showModel(exp)}
                  className="text-blue-400 hover:text-blue-300 bg-gray-800 p-2 rounded transition-colors"
                  title="Edit"
                >
                  <FaEdit size={14} />
                </button>
                <button
                  onClick={() => deleteExperience(exp._id)}
                  className="text-red-400 hover:text-red-300 bg-gray-800 p-2 rounded transition-colors"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {model && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="text-lg font-semibold text-white">
                {formData._id ? "Edit Experience" : "Add Experience"}
              </h3>
              <button
                onClick={() => setModel(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. 2021"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Duration (Month & Year)
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Jan 2025 - Feb 2026"
                />
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
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Senior Python Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Scotteck, Toledo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Describe your role..."
                ></textarea>
              </div>
              <button
                onClick={() =>
                  formData._id ? editExperience(formData._id) : addExperience()
                }
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
              >
                {loading ? "Saving..." : "Save Experience"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceCrud;
