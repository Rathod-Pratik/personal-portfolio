import React, { useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { GET_HERO, UPDATE_HERO } from "@api";
import { useAppStore } from "@store";
import { Loading } from "@component";

const Hero = () => {
  const { setProgress } = useAppStore();
  const queryClient = useQueryClient();

  const { data, isLoading: fetching } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      const response = await apiClient.get(GET_HERO);
      return response.data;
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      greeting: data?.greeting || "",
      name: data?.name || "",
      rolesString: data?.roles ? data.roles.join(", ") : "",
      description: data?.description || "",
      image: data?.image || "",
      imageFile: undefined as File | undefined,
    },
    validationSchema: Yup.object({
      greeting: Yup.string().required("Greeting is required"),
      name: Yup.string().required("Name is required"),
      rolesString: Yup.string().required("At least one role is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setProgress(10);
      try {
        let imageUrl = values.image;

        if (values.imageFile) {
          const uploadRes = await apiClient.post(
            "/s3/signed-url",
            {
              fileName: sanitizeFileName(values.imageFile.name),
              fileType: values.imageFile.type,
              folderType: "Hero",
            },
            { withCredentials: true },
          );

          await fetch(uploadRes.data.url, {
            method: "PUT",
            body: values.imageFile,
            headers: { "Content-Type": values.imageFile.type },
          });

          imageUrl = uploadRes.data.publicUrl;
        }

        const postData = {
          greeting: values.greeting,
          name: values.name,
          roles: values.rolesString.split(",").map((s: string) => s.trim()).filter(Boolean),
          description: values.description,
          image: imageUrl,
        };

        const response = await apiClient.put(UPDATE_HERO, postData, {
          withCredentials: true,
        });

        setProgress(70);

        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["hero"] });
          toast.success("Hero section updated successfully!");
          formik.setFieldValue("imageFile", undefined);
        }
      } catch (error) {
        toast.error("Failed to update Hero section");
      } finally {
        setSubmitting(false);
        setProgress(100);
      }
    },
  });

  const sanitizeFileName = (fileName: string) => {
    const extension = fileName.split(".").pop();
    const baseName =
      fileName.substring(0, fileName.lastIndexOf(".")) || fileName;
    const safeBase = baseName
      .replace(/\s+/g, "_")
      .replace(/\+/g, "-")
      .replace(/[^a-zA-Z0-9._-]/g, "");
    return `${safeBase}.${extension}`;
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
        greeting: true,
        name: true,
        rolesString: true,
        description: true,
      });
      toast.error(Object.values(errors)[0] as string);
      return;
    }
    formik.handleSubmit();
  };

  if (fetching) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 h-64 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 col-span-1 lg:col-span-2 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Hero</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Col: Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Top Greeting
            </label>
            <input
              type="text"
              name="greeting"
              value={formik.values.greeting}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-gray-700 border ${
                formik.touched.greeting && formik.errors.greeting
                  ? "border-red-500"
                  : "border-gray-600"
              } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
              placeholder="e.g. Hello! I Am"
            />
            {formik.touched.greeting && formik.errors.greeting && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.greeting as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Main Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-gray-700 border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-600"
              } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
              placeholder="e.g. Rathod Pratik"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name as string}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Typewriter Roles (Comma separated)
            </label>
            <input
              type="text"
              name="rolesString"
              value={formik.values.rolesString}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full bg-gray-700 border ${
                formik.touched.rolesString && formik.errors.rolesString
                  ? "border-red-500"
                  : "border-gray-600"
              } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
              placeholder="e.g. MERN Developer, Web Developer"
            />
            {formik.touched.rolesString && formik.errors.rolesString ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.rolesString as string}</p>
            ) : (
              <p className="text-[10px] text-gray-400 mt-1">
                Enter multiple roles separated by commas
              </p>
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
              className={`w-full bg-gray-700 border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-600"
              } rounded-md p-2 text-white focus:outline-none focus:border-purple-500`}
              placeholder="I'm a Web Developer having experience..."
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.description as string}</p>
            )}
          </div>
        </div>

        {/* Right Col: Image */}
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Profile Image
          </label>
          <div className="flex-1 flex flex-col justify-center items-center p-6 border-2 border-dashed border-gray-600 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors relative">
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            {formik.values.image ? (
              <img
                src={formik.values.image}
                alt="Profile Preview"
                className="max-h-[200px] object-cover rounded-md mb-2"
              />
            ) : (
              <FiImage size={40} className="text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-300">
              {formik.values.imageFile
                ? formik.values.imageFile.name
                : "Click or Drag to Upload"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supports JPG, PNG, WEBP (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleCustomSubmit}
          disabled={!formik.dirty || formik.isSubmitting}
          className={`font-medium px-8 py-2.5 rounded-md transition-colors ${
            !formik.dirty || formik.isSubmitting
              ? "bg-purple-400 text-gray-100 cursor-not-allowed opacity-70"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          {formik.isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default Hero;
