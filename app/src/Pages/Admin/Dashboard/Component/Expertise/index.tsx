import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import {
  CREATE_EXPERTISE,
  DELETE_EXPERTISE,
  GET_EXPERTISE,
  UPDATE_EXPERTISE,
} from "@api";
import { useAppStore } from "@store";
import { Loading } from "@component";
import { ExpertiseItem, ExpertiseFormData } from "@Type";
import { uploadToPrivateS3 } from "@utils/s3Upload";

const Expertise = () => {
  const { setProgress } = useAppStore();
  const queryClient = useQueryClient();
  const [model, setModel] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [editingItem, setEditingItem] = useState<ExpertiseItem | null>(null);

  const { data: expertiseList = [], isLoading } = useQuery<ExpertiseItem[]>({
    queryKey: ["expertise"],
    queryFn: async () => {
      const response = await apiClient.get(GET_EXPERTISE);
      return response.data;
    },
  });

  const formik = useFormik<ExpertiseFormData>({
    enableReinitialize: true,
    initialValues: {
      _id: editingItem?._id || "",
      title: editingItem?.title || "",
      description: editingItem?.description || "",
      image: editingItem?.image || "",
      imageFile: undefined,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (!values.image && !values.imageFile) {
        toast.error("Please provide an icon/image");
        setSubmitting(false);
        return;
      }

      setProgress(10);
      try {
        let imageUrl = values.image;
        if (values.imageFile) {
          imageUrl = await uploadToPrivateS3(values.imageFile, "Expertise");
        }

        const postData = {
          title: values.title,
          description: values.description,
          image: imageUrl,
        };

        let response;
        if (values._id) {
          response = await apiClient.put(
            `${UPDATE_EXPERTISE}/${values._id}`,
            postData,
            { withCredentials: true }
          );
        } else {
          response = await apiClient.post(CREATE_EXPERTISE, postData, {
            withCredentials: true,
          });
        }

        setProgress(70);

        if (response.status === 200 || response.status === 201) {
          toast.success(`Expertise ${values._id ? "updated" : "added"} successfully`);
          queryClient.invalidateQueries({ queryKey: ["expertise"] });
          closeModel();
        }
      } catch (error) {
        toast.error(`Failed to ${values._id ? "update" : "add"} Expertise`);
      } finally {
        setSubmitting(false);
        setProgress(100);
      }
    },
  });

  const showModel = (item: ExpertiseItem | null = null) => {
    setEditingItem(item);
    setModel(true);
  };

  const closeModel = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModel(false);
      setIsClosing(false);
      setEditingItem(null);
      formik.resetForm();
    }, 200);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("imageFile", file);
      formik.setFieldValue("image", URL.createObjectURL(file));
    }
  };

  const handleCustomSubmit = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched({
        title: true,
        description: true,
      });
      toast.error(Object.values(errors)[0] as string);
      return;
    }
    formik.handleSubmit();
  };

  const deleteExpertise = async (id: string) => {
    setProgress(10);
    try {
      const response = await apiClient.delete(`${DELETE_EXPERTISE}/${id}`, {
        withCredentials: true,
      });
      setProgress(70);

      if (response.status === 200) {
        toast.success("Expertise deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["expertise"] });
      }
    } catch (error) {
      toast.error("Failed to delete Expertise");
    } finally {
      setProgress(100);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 mt-6 h-64 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Expertise</h2>
        <button
          onClick={() => showModel()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
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
                  onClick={() => deleteExpertise(item._id as string)}
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
                onError={(e: any) => {
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
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 duration-200 ${isClosing ? "animate-out fade-out" : "animate-in fade-in"}`}>
          <div className={`bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden border border-gray-700 duration-200 ease-out ${isClosing ? "animate-out zoom-out-95" : "animate-in zoom-in-95"}`}>
            <div className="flex justify-between items-center p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="text-lg font-semibold text-white">
                {formik.values._id ? "Edit Service" : "Add Service"}
              </h3>
              <button
                onClick={closeModel}
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
                    {formik.values.image ? (
                      <img
                        src={formik.values.image}
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
                    {formik.values.imageFile ? (
                      <p className="text-gray-300 text-xs truncate max-w-[150px]">
                        {formik.values.imageFile.name}
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
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-gray-700 border ${formik.touched.title && formik.errors.title
                      ? "border-red-500"
                      : "border-gray-600"
                    } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
                  placeholder="e.g. Frontend Development"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.title as string}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-gray-700 border ${formik.touched.description && formik.errors.description
                      ? "border-red-500"
                      : "border-gray-600"
                    } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
                  placeholder="Describe the service..."
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.description as string}</p>
                )}
              </div>

              <button
                onClick={handleCustomSubmit}
                disabled={!formik.dirty || formik.isSubmitting}
                className={`w-full font-medium py-2 rounded-md transition-colors ${!formik.dirty || formik.isSubmitting
                    ? "bg-purple-400 text-gray-100 cursor-not-allowed opacity-70"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
              >
                {formik.isSubmitting ? "Saving..." : "Save Service"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expertise;
