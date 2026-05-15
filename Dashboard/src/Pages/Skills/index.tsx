import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { DELETE_SKILL, GET_SKILL } from "@api";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Loading } from "@component";
import type { AdminSkillItem } from "@Type";

const Skill = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: skills = [], isLoading } = useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const response = await apiClient.get(GET_SKILL);
      return response.data.data as AdminSkillItem[];
    },
  });

  const filteredSkills = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) {
      return skills;
    }
    return skills.filter((item) => item.language.toLowerCase().includes(keyword));
  }, [searchTerm, skills]);

  const handleDeleteSkill = async (_id: string) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!shouldDelete) {
      return;
    }

    try {
      const response = await apiClient.delete(`${DELETE_SKILL}/${_id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["skills"] });
        toast.success("Skill deleted successfully.");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        toast.error("Access denied. Please login as admin.");
        navigate("/login");
        return;
      }
      console.error("DeleteSkill Error:", error);
      toast.error("Failed to delete skill.");
    }
  };

  return (
    <div>
      <div className="flex justify-evenly gap-3 py-5">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 text-gray-500 outline-none rounded-md px-4 py-2 w-[90%]"
          type="text"
          placeholder="Search Skills"
        />
        <button
          onClick={() => navigate("/admin/skills/create")}
          className="text-white bg-blue-500 px-5 cursor-pointer py-2 rounded-md"
        >
          New
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <Loading />
          </div>
        ) : skills.length === 0 ? (
          <div className="flex justify-center items-center h-[80vh]">
            <span className="text-gray-400">No skills found</span>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 p-4">
            {filteredSkills.map((item) => (
          <div
            key={item._id}
            className="w-full max-w-[250px] mx-auto bg-white rounded-[20px] py-4 hover:scale-110 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="flex flex-col items-center text-center my-[18px]">
              <div
                className="w-[120px] h-[120px] flex items-center mt-4 justify-center relative rounded-full"
                style={{
                  background: `conic-gradient(${item.color} ${
                    Number(item.percentage) * 3.6
                  }deg, #ededed 0deg)`,
                }}
              >
                <div className="w-[90px] sm:w-[100px] md:w-[110px] h-[90px] sm:h-[100px] md:h-[110px] bg-white rounded-full flex items-center justify-center">
                  <div
                    className="absolute text-[20px] sm:text-[22px] md:text-[24px] font-bold"
                    style={{ color: item.color }}
                  >
                    {item.percentage}%
                  </div>
                </div>
              </div>
              <br />
              <div className="text-[1rem] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.4rem] font-medium text-black">
                {item.language}
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="flex justify-evenly space-x-3">
                <button
                  onClick={() =>
                    navigate(`/admin/skills/edit/${item._id}`, { state: { item } })
                  }
                  className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  title="Edit"
                >
                  <FaEdit className="mr-1" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteSkill(item._id!)}
                  className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                  title="Delete"
                >
                  <FaTrash className="mr-1" />
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

export default Skill;
