"use client";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import React, { useEffect, useState } from "react";
import { useLoadingBar } from "@/components/LoadingBarContext";
import ProjectCard from '../_Component/ProjectPage/ProjectCard';
const Page = () => {
  const { setProgress } = useLoadingBar();
  // const host = process.env.NEXT_PUBLIC_BACKEND_URL;
  const host = 'https://76zsstq72k.execute-api.ap-south-1.amazonaws.com/dev';

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
        {filteredData.map((item,index) => (
          <div key={index}>
          <ProjectCard item={item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
