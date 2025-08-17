import { useEffect, useState } from "react";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  GET_PROJECT,
} from "../../Utils/Constant";
import { toast } from "react-toastify";
import { useAppStore } from "../../store";
import { InputField } from "../../Component/Admin/InputFields";
import { Badge } from "../../components/ui/badge";
import { FiX, FiImage, FiUpload, FiPlus } from "react-icons/fi";
import { FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Component/Loading/Loading";

// Project Component
const Projects = () => {
  const navigate = useNavigate();
  const { project, addproject, setproject, updateproject, removeproject } =
    useAppStore();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [formData, setFormData] = useState(initialFormData());
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helper function: initial empty form
  function initialFormData() {
    return {
      title: "",
      subtitle: "",
      techStack: [""],
      description: "",
      liveDemoLink: "",
      images: "",
      imageFile: undefined,
      features: [""],
      difficult: "",
    };
  }

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await apiClient.get(GET_PROJECT);
      if (res.status === 200) {
        setproject(res.data.data);
        setFilteredProjects(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to load projects");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Search Filter
  const handleSearch = (value) => {
    const keyword = value.toLowerCase();

    if (keyword === "") {
      setFilteredProjects(project);
    } else {
      const filtered = project.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
      setFilteredProjects(filtered);
    }
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        images: URL.createObjectURL(file),
      }));
    }
  };

  // Toggle Modal
  const toggleModal = (item = null) => {
    if (item) {
      setFormData(item);
    } else {
      setFormData(initialFormData());
    }
    setShowModal(!showModal);
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

  // Add Project
  const CreateProject = async () => {
    if (formData.title.length < 5) {
      return toast.error("Title length must be 5 character");
    } else if (formData.description < 15) {
      return toast.error("Description length must be 5 character");
    } else if (formData.subtitle < 10) {
      return toast.error("SubTitle length must be 10 character");
    } else if (!formData.difficult) {
      return toast.error("Difficulty is required");
    } else if (!formData.liveDemoLink) {
      return toast.error("liveDemoLink Link is required");
    } else if (formData.features.length < 1) {
      return toast.error("At least one feature is required");
    } else if (formData.techStack.length < 1) {
      return toast.error("At least one Tech is required");
    }

    try {
      if (!formData.imageFile) {
        toast.error("Please select an image!");
        return;
      }
      setLoading(true);

      // Upload image first
      const uploadRes = await apiClient.post(
        "/s3/signed-url",
        {
          fileName: sanitizeFileName(formData.imageFile.name),
          fileType: formData.imageFile.type,
          folderType: "Project",
        },
        {
          withCredentials: true,
        }
      );

      await fetch(uploadRes.data.url, {
        method: "PUT",
        body: formData.imageFile,
        headers: { "Content-Type": formData.imageFile.type },
      });

      // Create project
      const projectRes = await apiClient.post(
        CREATE_PROJECT,
        {
          title: formData.title,
          description: formData.description,
          subtitle: formData.subtitle,
          techStack: formData.techStack.filter((item) => item.trim() !== ""),
          liveDemoLink: formData.liveDemoLink,
          features: formData.features.filter((item) => item.trim() !== ""),
          images: uploadRes.data.publicUrl,
          difficult: formData.difficult,
        },
        { withCredentials: true }
      );
      if (projectRes.status === 200) {
        toast.success("Project added successfully!");
        addproject(projectRes.data.data);
        toggleModal();
        setFormData(initialFormData());
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to create Project");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const EditProject = async (_id) => {
    try {
      setLoading(true);

      let imageUrl = formData.images; // Use existing image by default

      // If user uploaded new image, upload to server
      if (formData.imageFile) {
        const uploadRes = await apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "Project",
          },
          {
            withCredentials: true,
          }
        );

        await fetch(uploadRes.data.url, {
          method: "PUT",
          body: formData.imageFile,
          headers: { "Content-Type": formData.imageFile.type },
        });

        imageUrl = uploadRes.data.publicUrl; // Update with new uploaded image URL
      }

      // Now update project
      const projectRes = await apiClient.put(
        EDIT_PROJECT,
        {
          _id: formData._id,
          title: formData.title,
          description: formData.description,
          subtitle: formData.subtitle,
          techStack: formData.techStack.filter((item) => item.trim() !== ""),
          liveDemoLink: formData.liveDemoLink,
          features: formData.features.filter((item) => item.trim() !== ""),
          images: imageUrl,
          difficult: formData.difficult,
        },
        {
          withCredentials: true,
        }
      );

      if (projectRes.status === 200) {
        toast.success("Project updated successfully! 🎉");
        updateproject(_id, projectRes.data.data); // Update in UI
        // Optionally close modal here
        toggleModal();
        setFormData(initialFormData());
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Edit project error:", error);
      toast.error("Something went wrong while updating project");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (_id) => {
    try {
      const res = await apiClient.delete(`${DELETE_PROJECT}/${_id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        toast.success("Project deleted successfully");
        removeproject(_id);
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to delete Project");
      console.error(err);
    }
  };

  const handleFeatureChange = (index, value) => {
    // If value contains line breaks, split and insert as multiple features
    if (value.includes('\n')) {
      const lines = value.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
      if (lines.length > 0) {
        const updatedFeatures = [
          ...formData.features.slice(0, index),
          ...lines,
          ...formData.features.slice(index + 1)
        ];
        setFormData({
          ...formData,
          features: updatedFeatures,
        });
        return;
      }
    }
    // Otherwise, update as usual
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const handleAddFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), ""], // Safeguard against undefined
    });
  };

  // Updated tech stack handlers
  const handleTechStackChange = (index, value) => {
    const updatedTechStack = [...formData.techStack];
    updatedTechStack[index] = value;
    setFormData({
      ...formData,
      techStack: updatedTechStack,
    });
  };

  const handleAddTechStack = () => {
    setFormData({
      ...formData,
      techStack: [...(formData.techStack || []), ""], // Safeguard against undefined
    });
  };

  useEffect(() => {
    setFilteredProjects(project);
  }, [project]);

     useEffect(() => {
        if (showModal) {
          document.body.classList.add("overflow-hidden");
        } else {
          document.body.classList.remove("overflow-hidden");
        }
        // Clean up in case the component unmounts while modal is open
        return () => document.body.classList.remove("overflow-hidden");
      }, [showModal]);

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-evenly gap-3 py-5">
        <input
          type="text"
          placeholder="Search Project"
          onChange={(e) => handleSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
        />
        <button
          onClick={toggleModal}
          className="text-white bg-blue-500 px-5 py-2 rounded-md cursor-pointer"
        >
          New
        </button>
      </div>

      {/* Modal Section */}
      {showModal && (
        <div className="backdrop-blur-sm fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl mx-auto border border-gray-700 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-gray-700 p-4 sm:p-6">
              <h3 className="text-xl font-semibold text-white">
                {formData._id ? "Edit Project" : "Add New Project"}
              </h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body - Scrollable Content */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-grow">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="relative flex flex-col items-center justify-center w-32 h-32 bg-gray-700 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:bg-gray-600 overflow-hidden transition-colors">
                    {formData.images ? (
                      <>
                        <img
                          src={formData.images}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <span className="text-white text-sm font-medium">
                            Change Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center p-4 text-gray-400">
                        <FiImage size={24} />
                        <span className="text-xs mt-2">Click to upload</span>
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
                      <>
                        <p className="font-medium text-gray-300">
                          {formData.imageFile.name}
                        </p>
                        <p className="text-xs">
                          {(formData.imageFile.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      </>
                    ) : (
                      "Supports: JPG, PNG, WEBP (Max 5MB)"
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Project title"
                  required
                />

                <InputField
                  label="Subtitle"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="Brief project subtitle"
                />

                <InputField
                  label="Live Demo URL"
                  value={formData.liveDemoLink}
                  onChange={(e) =>
                    setFormData({ ...formData, liveDemoLink: e.target.value })
                  }
                  placeholder="https://example.com"
                  type="url"
                />
              </div>

              {/* Difficulty Level */}
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={formData.difficult}
                  onChange={(e) =>
                    setFormData({ ...formData, difficult: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option selected value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={5}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your project in detail..."
                />
              </div>

              {/* Features Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key Features
                </label>
                <div className="space-y-2">
                  {formData.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={feature}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        onPaste={e => {
                          const pasted = e.clipboardData.getData('text');
                          if (pasted.includes('\n')) {
                            e.preventDefault();
                            handleFeatureChange(idx, pasted);
                          }
                        }}
                        className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Feature ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="mt-3 flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <FiPlus className="mr-1" size={14} />
                  Add Feature
                </button>
              </div>

              {/* Tech Stack Section */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tech Stack
                </label>
                <div className="space-y-2">
                  {formData.techStack?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        value={item}
                        onChange={(e) =>
                          handleTechStackChange(idx, e.target.value)
                        }
                        className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Tech ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddTechStack}
                  className="mt-3 flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                >
                  <FiPlus className="mr-1" size={14} />
                  Add Tech Stack
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 border-t border-gray-700 p-4 sm:p-6">
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  formData?._id ? EditProject() : CreateProject()
                }
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                    {formData._id ? "Update Project" : "Save Project"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        {project.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {filteredProjects.map((item) => (
              <div
                data-aos="fade-up"
                key={item._id}
                className="flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="flex justify-center p-4 bg-gray-100 dark:bg-slate-700">
                  <img
                    src={item.images}
                    className="w-full h-48 object-contain rounded-t-lg"
                    alt={item.title}
                    loading="lazy"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col flex-grow p-6">
                  <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white text-center">
                    {item.title}
                  </h5>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {item.techStack.map((lang, index) => (
                      <Badge key={index}>{lang}</Badge>
                    ))}
                  </div>

                  {/* Description with fixed height and overflow */}
                  <div className="mb-4 flex-grow">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-center space-x-3 mb-4">
                    {item.liveDemoLink && (
                      <a
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md transition-colors"
                        href={item.liveDemoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Demo
                      </a>
                    )}
                  </div>

                  {/* Admin Controls */}
                  <div className="flex justify-center space-x-3 border-t pt-4">
                    <button
                      onClick={() => toggleModal(item)}
                      className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="mr-2" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProject(item._id)}
                      className="flex items-center px-4 py-2 border border-red-500 text-red-500 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
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
        )}
      </div>
    </div>
  );
};

export default Projects;
