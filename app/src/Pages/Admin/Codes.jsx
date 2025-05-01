import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store";
import { FiX, FiImage, FiFileText, FiUpload, FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import {
  CREATE_CODE,
  DELETE_CODE,
  GET_CODE,
  UPDATE_CODE,
} from "../../Utils/Constant";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";

const Codes = () => {
  const { language } = useAppStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [FilterData, SetFilterData] = useState();
  const [code, SetCode] = useState([]);
  const [showmodel, SetShowModel] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const langFromQuery = searchParams.get("lang") || language[0]?._id;
  const [SelectedLanguage, SetSelectedLanugage] = useState(language[0]?._id);
  const [FormData, SetFormData] = useState({
    title: "",
    language: "",
    Details: [""],
    description: "",
    fileUrl: "",
    File: "",
    output: "",
    Image: "",
  });
  function initialState() {
    return {
      title: "",
      language: "",
      Details: [""],
      description: "",
      fileUrl: "",
      File: "",
      output: "",
      Image: "",
    };
  }
  const findLanguageById = (_id) => {
    const lang = language.find((item) => item._id === _id);
    return lang.language;
  };

  const ToggleModel = (item) => {
    SetFormData(item);
    SetShowModel(!showmodel);
  };

  const filterSearch = (value) => {
    const keyword = value.toLowerCase();
    if (keyword === "") {
      SetFilterData(code);
    } else {
      const filtered = code.filter((item) =>
        item.title.toLowerCase().includes(keyword)
      );
      SetFilterData(filtered);
    }
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "image") {
      SetFormData((prev) => ({
        ...prev,
        Image: file,
        output: URL.createObjectURL(file),
      }));
    } else {
      SetFormData((prev) => ({
        ...prev,
        File: file,
        fileUrl: file.name,
      }));
    }
  };

  const handleDetailChange = (index, value) => {
    const updatedFeatures = [...FormData.Details];
    updatedFeatures[index] = value;
    SetFormData({
      ...FormData,
      Details: updatedFeatures,
    });
  };

  const sanitizeFileName = (fileName) => {
    return fileName
      .replace(/\s+/g, "_") // Replace spaces with underscores
      .replace(/\+/g, "-") // Replace + with -
      .replace(/[^a-zA-Z0-9._-]/g, ""); // Remove any other invalid characters
  };

  const CreateCode = async () => {
    try {
      setLoading(true);
      // Validate inputs
      if (!FormData.title || FormData.title.trim().length < 5) {
        return toast.error("Title must be at least 5 characters");
      }
      if (!FormData.description || FormData.description.trim().length < 20) {
        return toast.error("Description must be at least 20 characters");
      }
      if (!FormData.language) {
        return toast.error("Please select the language");
      }
      if (!FormData.Image) {
        return toast.error("Please select the Image");
      }
      if (
        !FormData.Details ||
        FormData.Details.length < 1 ||
        FormData.Details.every((d) => !d.trim())
      ) {
        return toast.error("At least one valid detail is required");
      }
      if (!FormData.File) {
        return toast.error("Please select the code file");
      }

      // Prepare upload requests
      const uploadRequests = [
        apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(FormData.File.name),
            fileType: FormData.File.type, // Fixed: Type -> type
            folderType: `code/file/${findLanguageById(FormData.language)}`,
          },
          {
            withCredentials: true,
          }
        ),
      ];

      if (FormData.Image) {
        uploadRequests.push(
          apiClient.post(
            "/s3/signed-url",
            {
              fileName: sanitizeFileName(FormData.Image.name),
              fileType: FormData.Image.type, // Fixed: Type -> type
              folderType: `code/image/${findLanguageById(FormData.language)}`, // Fixed: fileType -> folderType
            },
            {
              withCredentials: true,
            }
          )
        );
      }

      // Execute uploads
      const [fileRes, imageRes] = await Promise.all(uploadRequests);

      // Upload files
      const uploadPromises = [
        fetch(fileRes.data.url, {
          method: "PUT", // Changed from POST to PUT for S3 uploads
          body: FormData.File,
          headers: { "Content-Type": FormData.File.type },
        }),
      ];

      if (FormData.Image) {
        uploadPromises.push(
          fetch(imageRes.data.url, {
            method: "PUT",
            body: FormData.Image,
            headers: { "Content-Type": FormData.Image.type },
          })
        );
      }

      await Promise.all(uploadPromises);

      // Prepare payload
      const payload = {
        title: FormData.title.trim(),
        language: FormData.language,
        Details: FormData.Details.filter((d) => d.trim()), // Remove empty details
        description: FormData.description.trim(),
        fileUrl: fileRes.data.publicUrl,
        output: FormData.Image ? imageRes.data.publicUrl : null,
      };

      // Create code entry
      const response = await apiClient.post(CREATE_CODE, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Code created successfully");
        SetFilterData((prev) => [...prev, response.data.data]);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Error creating code:", error);
      toast.error(error.response?.data?.message || "Failed to create code");
    } finally {
      SetFormData(initialState());
      setLoading(false);
      SetShowModel(false);
    }
  };

  const EditCode = async (_id) => {
    try {
      setLoading(true);
      const uploadRequest = [];
      if (FormData.File) {
        uploadRequest.push(
          apiClient.post(
            "/s3/signed-url",
            {
              fileName: sanitizeFileName(FormData.File.name),
              fileType: FormData.File.type, // Fixed: Type -> type
              folderType: `code/file/${findLanguageById(FormData.language)}`,
            },
            {
              withCredentials: true,
            }
          )
        );
      }
      if (FormData.Image) {
        uploadRequest.push(
          apiClient.post(
            "/s3/signed-url",
            {
              fileName: sanitizeFileName(FormData.Image.name),
              fileType: FormData.Image.type, // Fixed: Type -> type
              folderType: `code/image/${findLanguageById(FormData.language)}`, // Fixed: fileType -> folderType
            },
            {
              withCredentials: true,
            }
          )
        );
      }

      const [fileRes, imageRes] = await Promise.all(uploadRequest);
      const uploadPromises = [];

      if (FormData.File) {
        uploadPromises.push(
          fetch(fileRes.data.url, {
            method: "PUT",
            body: FormData.File,
            headers: { "Content-Type": FormData.File.type },
          })
        );
      }

      if (FormData.Image) {
        uploadPromises.push(
          fetch(imageRes.data.url, {
            method: "PUT",
            body: FormData.Image,
            headers: { "Content-Type": FormData.Image.type },
          })
        );
      }
      await Promise.all(uploadPromises);

      // Prepare payload
      const payload = {
        _id: _id,
        title: FormData.title.trim(),
        language: FormData.language,
        Details: FormData.Details.filter((d) => d.trim()),
        description: FormData.description.trim(),
        fileUrl: fileRes?.data?.publicUrl || null,
        output: imageRes?.data?.publicUrl || null,
      };

      // Create code entry
      const response = await apiClient.put(UPDATE_CODE, payload, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Code created successfully");
        SetCode((prev) =>
          prev.map((item) =>
            item._id === FormData._id ? response.data.data : item
          )
        );
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.log(error);
      toast.error("Some error is occured");
    } finally {
      SetFormData(initialState());
      SetShowModel(false);
      setLoading(false);
    }
  };

  const fetchcode = async (_id) => {
    try {
      const response = await apiClient.get(`${GET_CODE}/${_id}`);
      if (response.status === 200) {
        SetCode(response.data.data);
        SetFilterData(response.data.data);
      }
    } catch (error) {
      toast.error("Some error occured");
      console.log(error);
    }
  };

  const DeleteCode = async (_id) => {
    try {
      const response = await apiClient.delete(`${DELETE_CODE}/${_id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Code Deleted successfully");
        if (SelectedLanguage === FormData.language) {
          SetCode((prev) => prev.filter((item) => item._id !== _id));
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.log(error);
      toast.error("Failed to delete code");
    }
  };
  useEffect(() => {
    const currentLang = searchParams.get("lang");

    // only set default if no query and language[0] exists
    if (!currentLang && language.length > 0) {
      setSearchParams({ lang: language[0]._id });
    }
  }, [language, searchParams]);

  useEffect(() => {
    fetchcode(langFromQuery);
  }, [langFromQuery]);

  useEffect(() => {
    setSearchParams({ lang: SelectedLanguage });
  }, [SelectedLanguage]);

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => filterSearch(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Code name"
        />
        <button
          onClick={ToggleModel}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          new
        </button>
        <select
          value={SelectedLanguage}
          onChange={(e) => SetSelectedLanugage(e.target.value)}
          className="text-white bg-blue-500 cursor-pointer p-2 rounded-md"
          name="language"
          id=""
        >
          {language.map((item, index) => (
            <option
              className="bg-white text-blue-500"
              key={index}
              value={item._id}
            >
              {item.language}
            </option>
          ))}
        </select>
      </div>
      <div>
        {showmodel && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-700 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {FormData._id ? "Edit Code" : "Add New Code"}
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
                    value={FormData?.title || ""}
                    onChange={(e) =>
                      SetFormData({ ...FormData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter resource title"
                    required
                  />
                </div>
                {/* Language Field */}
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={FormData?.language || ""}
                    onChange={(e) =>
                      SetFormData({ ...FormData, language: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {language.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.language}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Description Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={FormData?.description || ""}
                    onChange={(e) =>
                      SetFormData({ ...FormData, description: e.target.value })
                    }
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter detailed description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Details
                  </label>

                  {/* Hidden single-line input that accepts pasted text */}
                  <input
                    type="text"
                    placeholder="Paste multi-line details here"
                    className="mb-3 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white w-full"
                    onPaste={(e) => {
                      e.preventDefault();
                      const pastedText = e.clipboardData.getData("text");

                      const lines = pastedText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter((line) => line !== "");

                      if (lines.length > 0) {
                        SetFormData((prev) => ({
                          ...prev,
                          Details: lines,
                        }));
                      }
                    }}
                  />

                  {/* Render each line as an editable input */}
                  <div className="space-y-2">
                    {FormData.Details?.map((item, idx) => (
                      <input
                        key={idx}
                        value={item}
                        onChange={(e) =>
                          handleDetailChange(idx, e.target.value)
                        }
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Detail ${idx + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      SetFormData((prev) => ({
                        ...prev,
                        Details: [...(prev.Details || []), ""],
                      }))
                    }
                    className="mt-3 flex items-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
                  >
                    <FiPlus className="mr-1" size={14} />
                    Add Detail
                  </button>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="relative flex flex-col items-center justify-center w-24 h-24 bg-gray-700 border-2 border-dashed border-gray-600 rounded-md cursor-pointer hover:bg-gray-600 overflow-hidden">
                      {FormData.output ? (
                        <>
                          <img
                            src={FormData.output}
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
                      {FormData.Image
                        ? FormData.Image.name
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
                      {FormData.fileUrl ||
                        FormData.Codefile_url?.split(".com/")[1] ||
                        "Choose Code file"}
                    </span>
                    {FormData.fileUrl && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">
                          Update code File
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept=".html,.htm,.css,.scss,.sass,.less,.js,.jsx,.ts,.tsx,.json,.xml,.yaml,.yml,.c,.cpp,.h,.hpp,.java,.class,.jar,.py,.pyc,.php,.php3,.php4,.php5,.phtml,.rb,.gemspec,.go,.mod,.rs,.toml,.swift,.kt,.kts,.ktm,.dart,.scala,.lua,.pl,.pm,.sh,.bash,.zsh,.bat,.cmd,.sql,.db,.sqlite,.md,.markdown,.vue,.svelte,.astro,.tsx,.jsx,.ini,.cfg,.conf,.env,.lock,.gradle,.csproj,.csharp,.cs,.vb,.vbs,.erl,.ex,.exs,.r,.rmd,.f90,.f95,.for,.f,.tex,.pdf,.txt,.csv"
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
                      FormData._id ? EditCode(FormData._id) : CreateCode()
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
                        {FormData._id ? "Update" : "Create"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-800 text-white rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Code File</th>
              <th className="px-4 py-2">Output Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {FilterData ? (
              FilterData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-center">{index + 1}</td>
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">
                    <a
                      href={item.Codefile_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View Code
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={item.output}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      View Output
                    </a>
                  </td>
                  <td className="px-4 py-3 flex space-x-3 justify-center">
                    <button
                      onClick={() => ToggleModel(item)}
                      className="text-green-400 hover:text-green-300"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => DeleteCode(item._id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Codes;
