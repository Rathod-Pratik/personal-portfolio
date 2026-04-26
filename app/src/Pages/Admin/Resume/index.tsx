import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { FiUpload, FiX, FiFileText } from "react-icons/fi";
import { CREATE_CV, GET_CV, UPDATE_CV } from "@api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";
import type {
  CreateOrUpdateResumeResponse,
  GetResumeResponse,
  ResumeItem,
} from "@Type";
import { uploadToPrivateS3 } from "@utils/s3Upload";

const Resume = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectFile, setSelectedfile] = useState<File | null>(null);
  const [showModel, SetShowModel] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: resumeFile = null,
    isError,
    error,
  } = useQuery<ResumeItem | null>({
    queryKey: ["resume"],
    queryFn: async () => {
      const response = await apiClient.get<GetResumeResponse>(GET_CV, {
        withCredentials: true,
      });
      return response.data.data[0] ?? null;
    },
  });

  useEffect(() => {
    if (!isError) {
      return;
    }

    const apiError = error as AxiosError;
    if (apiError.response?.status === 403) {
      toast.error("Access denied. Please login as admin.");
      navigate("/login");
      return;
    }

    toast.error("Failed to load resume.");
  }, [isError, error, navigate]);

  const ToggleModel = () => {
    SetShowModel(!showModel);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedfile(file);
  };

  const uploadResume = async () => {
    if (!selectFile) {
      toast.error("Please select a file first!");
      return;
    }
    setLoading(true);

    try {
      const resumeKey = await uploadToPrivateS3(selectFile, "resume");

      const response = await apiClient.post<CreateOrUpdateResumeResponse>(
        CREATE_CV,
        {
          CV: resumeKey,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success("Resume uploaded successfully! 🎉");
        queryClient.invalidateQueries({ queryKey: ["resume"] });
        setSelectedfile(null);
      }
    } catch (error) {
      const apiError = error as AxiosError<{ message?: string }>;
      if (apiError.response && apiError.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      console.error("Upload error:", apiError);
      toast.error(apiError.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
      SetShowModel(false);
    }
  };

  const updateResume = async () => {

    if (!selectFile) {
      return toast.error("Please select the Resume");
    }

    if (!resumeFile?._id) {
      return toast.error("Resume record not found.");
    }

    setLoading(true);
    try {
      const resumeKey = await uploadToPrivateS3(selectFile, "resume");

      const response = await apiClient.put<CreateOrUpdateResumeResponse>(
        UPDATE_CV,
        {
          _id: resumeFile._id,
          CV: resumeKey,
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success("Resume updated successfully");
        queryClient.invalidateQueries({ queryKey: ["resume"] });
        setSelectedfile(null);
        SetShowModel(false);
      }
    } catch (error) {
      const apiError = error as AxiosError;
      if (apiError.response && apiError.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        return navigate("/login");
      }
      toast.error("Failed to Update Resume");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showModel) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up in case the component unmounts while modal is open
    return () => document.body.classList.remove("overflow-hidden");
  }, [showModel]);

  return (
    <div>
      <div>
        <button
          onClick={ToggleModel}
          className="px-2 rounded-full text-2xl text-black bg-white absolute right-10"
        >
          +
        </button>
      </div>
      <div>
        {showModel && (
          <div className="backdrop-blur-sm fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl border border-gray-700">
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-gray-700 p-4">
                <h3 className="text-xl font-semibold text-white">
                  {resumeFile?._id ? "Edit Resume" : "Add New Resume"}
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
                {/* PDF Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PDF Document
                  </label>
                  <label className="relative flex items-center space-x-3 bg-gray-700 border border-gray-600 rounded-md px-4 py-3 hover:bg-gray-600 cursor-pointer overflow-hidden">
                    <FiFileText className="text-gray-300" size={20} />
                    <span className="text-gray-300">
                      {selectFile instanceof File
                        ? selectFile.name
                        : typeof resumeFile?.CV === "string"
                          ? resumeFile.CV.split("/").pop() // show last part of URL (filename)
                          : "Choose PDF file"}
                    </span>
                    {Boolean(resumeFile?.CV) && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm font-medium">
                          Update PDF
                        </span>
                      </div>
                    )}
                    <input
                      accept=".pdf"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e)}
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
                      resumeFile?._id ? updateResume() : uploadResume()
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
                        {resumeFile?._id ? "Update" : "Upload"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {resumeFile?.CV && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Resume</h2>
          <div className="mt-6 flex justify-center">
            <iframe
              src={`https://docs.google.com/gview?url=${resumeFile.CV}&embedded=true`}
              style={{ width: "100%", height: "800px" }}
              title="Resume PDF"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
