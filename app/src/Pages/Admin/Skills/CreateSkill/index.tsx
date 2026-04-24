import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { CREATE_SKILL, DELETE_SKILL, UPDATE_SKILL } from "@api";
import { apiClient } from "@apiClient";
import type { AdminSkillItem, SkillFormData } from "@Type";

const initialFormData: SkillFormData = {
  _id: null,
  language: "",
  percentage: "",
  color: "#3b82f6",
};

const CreateSkill = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState<SkillFormData>(initialFormData);

  useEffect(() => {
    if (!location.state?.item) {
      setFormData(initialFormData);
      return;
    }

    const item = location.state.item as AdminSkillItem;
    setFormData({
      _id: item._id ?? null,
      language: item.language ?? "",
      percentage: String(item.percentage ?? ""),
      color: item.color ?? "#3b82f6",
    });
  }, [location.state]);

  const validateForm = () => {
    const percentageNumber = Number(formData.percentage);
    if (!formData.language.trim()) {
      toast.error("Language is required.");
      return false;
    }
    if (!formData.color.trim()) {
      toast.error("Color is required.");
      return false;
    }
    if (!Number.isFinite(percentageNumber)) {
      toast.error("Percentage must be a number.");
      return false;
    }
    if (percentageNumber < 0 || percentageNumber > 100) {
      toast.error("Percentage must be between 0 and 100.");
      return false;
    }
    return true;
  };

  const handleCreateSkill = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post(
        CREATE_SKILL,
        {
          language: formData.language.trim(),
          color: formData.color,
          percentage: Number(formData.percentage),
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success("Skill created successfully.");
        navigate("/admin/skills");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        navigate("/login");
        return;
      }
      console.error("CreateSkill Error:", error);
      toast.error(error?.response?.data?.message || "Failed to create skill.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSkill = async () => {
    if (!formData._id) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.put(
        UPDATE_SKILL,
        {
          _id: formData._id,
          language: formData.language.trim(),
          color: formData.color,
          percentage: Number(formData.percentage),
        },
        {
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        toast.success("Skill updated successfully.");
        navigate("/admin/skills");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        navigate("/login");
        return;
      }
      console.error("UpdateSkill Error:", error);
      toast.error(error?.response?.data?.message || "Failed to update skill.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!formData._id) {
      return;
    }

    const shouldDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!shouldDelete) {
      return;
    }

    try {
      setIsDeleting(true);
      const response = await apiClient.delete(`${DELETE_SKILL}/${formData._id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Skill deleted successfully.");
        navigate("/admin/skills");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        navigate("/login");
        return;
      }
      console.error("DeleteSkill Error:", error);
      toast.error(error?.response?.data?.message || "Failed to delete skill.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (formData._id) {
          handleUpdateSkill();
          return;
        }
        handleCreateSkill();
      }}
      className="p-4 sm:p-6 space-y-6"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-white">
          {formData._id ? "Edit Skill" : "Create Skill"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/admin/skills")}
            className="px-4 py-2 text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
          >
            Back
          </button>
          {formData._id && (
            <button
              type="button"
              onClick={handleDeleteSkill}
              disabled={isDeleting || loading}
              className="px-4 py-2 text-red-300 bg-red-900/40 border border-red-500 rounded-md hover:bg-red-900/60 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Language</label>
          <input
            type="text"
            value={formData.language}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                language: event.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="React, Node.js, TypeScript..."
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-300">Percentage</label>
          <input
            type="number"
            min={0}
            max={100}
            value={formData.percentage}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                percentage: event.target.value,
              }))
            }
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="0 - 100"
            required
          />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <label className="block mb-2 text-sm font-medium text-gray-300">Color</label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={formData.color || "#3b82f6"}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                color: event.target.value,
              }))
            }
            className="h-10 w-10 cursor-pointer rounded border border-gray-500"
            title="Choose color"
          />
          <input
            type="text"
            value={formData.color}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "" || /^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                setFormData((prev) => ({
                  ...prev,
                  color: value,
                }));
              }
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="#3b82f6"
            maxLength={7}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-gray-700 pt-6">
        {formData._id && (
          <button
            type="button"
            onClick={handleDeleteSkill}
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
              {formData._id ? "Update Skill" : "Create Skill"}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateSkill;