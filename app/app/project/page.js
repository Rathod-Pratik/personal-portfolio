"use client";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { setProjectData } from '@/components/Store/Features/ProjectCodeSlice';
import { useLoadingBar } from "@/components/LoadingBarContext";
const Page = () => {
  const { setProgress } = useLoadingBar();
  const host = "https://dzkeixn8e0.execute-api.ap-south-1.amazonaws.com/dev";
  const router = useRouter();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  // Fetch Project Code Data
  
  const getCodeData = async () => {
    try {
      setProgress(10)
      const response = await fetch(`${host}/api/project/code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProgress(70)
      const responseData = await response.json();
      setData(responseData);
      setFilteredData(responseData);
      setProgress(100)
    } catch (error) {
      console.error("Error fetching code data:", error);
    }
  };
  useEffect(() => {
    getCodeData();
    AOS.init();
  }, []);

  const filterByDifficulty = (level) => {
    setProgress(10)
    setDifficultyFilter(level);
    setFilteredData(level === "all" ? data : data.filter((item) => item.difficulty === level));
    setProgress(100)
  };

  const dispatch = useDispatch();

  const handleCodeButtonClick = (codeObject) => {
    // Dispatch the project data to the Redux store
    dispatch(setProjectData(codeObject));
    // Navigate to the ProjectCode page
    router.push("/DisplayProjectCode");
  };

  return (
    <>
      <h2 className="flex text-5xl mt-2 justify-center font-bold">Project</h2>

      {/* Difficulty Filter Menu */}
      <div className="flex justify-center gap-4 mt-5">
        {["all", "easy", "medium", "hard"].map((level) => (
          <button
            key={level}
            onClick={() => filterByDifficulty(level)}
            className={`px-4 py-2 rounded-md hover:text-white ${
              difficultyFilter === level ? "bg-purple-700 text-white" : ""
            } hover:bg-purple-900`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {/* Project Display */}
      <div className="flex flex-row flex-wrap gap-3 justify-center mt-5">
        {filteredData.map((item) => (
          <div
          data-aos="fade-up"
            key={item._id}
            className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black"
          >
            <div className="flex flex-col items-center p-6">
              <img
                src={`${host}/api/project/code${item.output}`}
                className="mb-4"
                alt={item.file_name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {item.file_name}
              </h5>
              <span className="flex gap-3 my-2 flex-wrap justify-center">
                {item.language.map((lang, index) => (
                  <Badge key={index}>{lang}</Badge>
                ))}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
                {item.description}
              </span>
              <div className="flex flex-row mt-4">
                <a
                  className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
                  // onClick={() => handleCodeButtonClick(item.code)}
                  href={item.url}
                  target="_blank"
                    rel="noreferrer"
                >
                  Code
                </a>
                {item.demo && (
                  <a
                    className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
                    href={item.demo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Demo
                  </a>
                )}
              </div>
              {item.note && (
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                  {item.note}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
