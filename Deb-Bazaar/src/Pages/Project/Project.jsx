import React,{useState,useEffect} from 'react'
import { apiClient } from '../../lib/api-Client';
import { FETCH_PROJECT } from '../../Utils/Constant';
import Card from '../../Component/Project/Card';

const Project = () => {
  
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [difficultyFilter, setDifficultyFilter] = useState("all");
  
    // Fetch Project Code Data
    
    const getCodeData = async () => {
      try {
        const response = await apiClient.get(FETCH_PROJECT);
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching code data:", error);
      }
    };
    useEffect(() => {
      getCodeData();
    }, []);
  
    const filterByDifficulty = (level) => {
        setDifficultyFilter(level);
        setFilteredData(level === "all" ? data : data.filter((item) => item.difficulty === level));
      };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
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
      {filteredData ? (
        <div className="flex flex-row flex-wrap gap-3 justify-center mt-5">
          {filteredData.map((item, index) => (
            <div key={index}>
              <Card item={item} />
            </div>
          ))}
        </div>
      ) : (
        // Placeholder space when data is not loaded
        <div className="flex-grow"></div>
      )}
    </div>
  )
}

export default Project
