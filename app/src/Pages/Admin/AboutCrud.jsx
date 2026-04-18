import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiClient } from "../../lib/api-Client";
import { GET_ABOUT, UPDATE_ABOUT } from "../../Utils/Constant";
import { useAppStore } from "../../store";

const AboutCrud = () => {
  const { setProgress } = useAppStore();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAbout = async () => {
    try {
      const response = await apiClient.get(GET_ABOUT);
      if (response.status === 200) {
        setContent(response.data.content || "");
      }
    } catch (error) {
      toast.error("Failed to fetch About content");
    }
  };

  const updateAbout = async () => {
    if (!content) {
      toast.error("Content is required");
      return;
    }

    setProgress(10);
    setLoading(true);
    try {
      const response = await apiClient.put(
        UPDATE_ABOUT,
        { content },
        { withCredentials: true },
      );
      setProgress(70);

      if (response.status === 200) {
        toast.success("About updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update About content");
    } finally {
      setLoading(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl border border-slate-700 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">About Section</h2>
        <button
          onClick={updateAbout}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Markdown Content
          </label>
          <textarea
            rows="12"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-4 text-white focus:outline-none focus:border-blue-500 font-mono text-sm leading-relaxed"
            placeholder="Write your about section in Markdown..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default AboutCrud;
