import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { GET_ABOUT, UPDATE_ABOUT } from "@api";
import { Loading } from "@component";

type AboutResponse = {
    content: string;
};

const About = () => {
    const queryClient = useQueryClient();
    const [content, setContent] = useState("");
    const [saving, setSaving] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["about"],
        queryFn: async () => {
            const response = await apiClient.get<AboutResponse>(GET_ABOUT);
            return response.data;
        },
    });

    useEffect(() => {
        if (data) {
            setContent(data.content || "");
        }
    }, [data]);

    const handleSave = async () => {
        try {
            setSaving(true);
            await apiClient.put(UPDATE_ABOUT, { content }, { withCredentials: true });
            queryClient.invalidateQueries({ queryKey: ["about"] });
            toast.success("About section updated successfully!");
        } catch (error: any) {
            if (error.response?.status === 403) {
                toast.error("Access denied. Please login as admin.");
            } else {
                toast.error("Failed to update About section.");
            }
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[80vh]">
                <Loading />
            </div>
        );
    }

    return (
        <div className="p-6  mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">About</h2>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 transition-colors"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    About Content (Markdown supported)
                </label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={25}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    placeholder="Write about yourself using markdown..."
                />
                <div className="mt-4 text-sm text-gray-400 flex justify-between">
                    <span>You can use markdown formatting: **bold**, *italic*, [links](url), etc.</span>
                    <span>{content.length} characters</span>
                </div>
            </div>
        </div>
    );
};

export default About;