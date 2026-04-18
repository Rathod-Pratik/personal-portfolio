import React, { useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { GET_HERO, UPDATE_HERO } from "../../Utils/Constant";
import { useAppStore } from "../../store";
import Loading from "../../Component/Loading/Loading";

const HeroCrud = () => {
  const { setProgress } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    greeting: "",
    name: "",
    roles: [""],
    description: "",
    image: "",
    imageFile: undefined,
  });

  const fetchHero = async () => {
    try {
      const response = await apiClient.get(GET_HERO);
      if (response.status === 200 && response.data) {
        setFormData({
          greeting: response.data.greeting || "",
          name: response.data.name || "",
          roles:
            response.data.roles && response.data.roles.length > 0
              ? response.data.roles
              : [""],
          description: response.data.description || "",
          image: response.data.image || "",
          imageFile: undefined,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch hero data");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchHero();
  }, []);

  const handleRoleChange = (index, value) => {
    const newRoles = [...formData.roles];
    newRoles[index] = value;
    setFormData({ ...formData, roles: newRoles });
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

  const handleSave = async () => {
    if (!formData.name || !formData.greeting || !formData.description) {
      toast.error("Please fill out the primary fields");
      return;
    }

    setProgress(10);
    setLoading(true);
    try {
      let imageUrl = formData.image;

      // Upload if there's a new file
      if (formData.imageFile) {
        const uploadRes = await apiClient.post(
          "/s3/signed-url",
          {
            fileName: sanitizeFileName(formData.imageFile.name),
            fileType: formData.imageFile.type,
            folderType: "Hero",
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
        greeting: formData.greeting,
        name: formData.name,
        roles: formData.roles.filter((role) => role.trim() !== ""),
        description: formData.description,
        image: imageUrl,
      };

      const response = await apiClient.put(UPDATE_HERO, postData, {
        withCredentials: true,
      });

      setProgress(70);

      if (response.status === 200) {
        toast.success("Hero section updated successfully!");
        setFormData((prev) => ({
          ...prev,
          image: imageUrl,
          imageFile: undefined,
        }));
      }
    } catch (error) {
      toast.error("Failed to update Hero section");
    } finally {
      setLoading(false);
      setProgress(100);
    }
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
              value={formData.greeting}
              onChange={(e) =>
                setFormData({ ...formData, greeting: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. Hello! I Am"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Main Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. Rathod Pratik"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Typewriter Roles (Comma separated)
            </label>
            <input
              type="text"
              value={formData.roles.join(", ")}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  roles: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="e.g. MERN Developer, Web Developer"
            />
            <p className="text-[10px] text-gray-400 mt-1">
              Enter multiple roles separated by commas
            </p>
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
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:border-purple-500"
              placeholder="I'm a Web Developer having experience..."
            ></textarea>
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
            {formData.image ? (
              <img
                src={formData.image}
                alt="Profile Preview"
                className="max-h-[200px] object-cover rounded-md mb-2"
              />
            ) : (
              <FiImage size={40} className="text-gray-400 mb-2" />
            )}
            <p className="text-sm text-gray-300">
              {formData.imageFile
                ? formData.imageFile.name
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
          onClick={handleSave}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-8 py-2.5 rounded-md transition-colors"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default HeroCrud;
