import React,{useState,useEffect} from 'react'
import { apiClient } from '../../lib/api-Client';
import { FETCH_PROJECT, GET_PROJECT } from '../../Utils/Constant';
import Card from '../../Component/Project/Card';
import { useAppStore } from '../../store';

const Project = () => {
  
  const {setProgress,setproject,project}=useAppStore();
    const [filteredData, setFilteredData] = useState(project);
    const [difficultyFilter, setDifficultyFilter] = useState("all");
  
    // Fetch Project Code Data
    const getCodeData = async () => {
      if(project.length>1) return
      setProgress(10);
      try {
        setProgress(70);
        const response = await apiClient.get(GET_PROJECT);
        setproject(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error("Error fetching code data:", error);
      }
      finally{
        setProgress(100);
      }
    };
    useEffect(() => {
      getCodeData();
    }, []);
  
    const filterByDifficulty = (level) => {
        setDifficultyFilter(level);
        setFilteredData(level === "all" ? project : project.filter((item) => item.difficult === level));
      };

  return (
    <div className="min-h-screen flex flex-col py-4">
      {/* Header */}
      <h2 className="flex text-5xl justify-center font-bold">Project</h2>
  
      {/* Difficulty Filter Menu */}
      <div className="flex justify-center gap-4 mt-5">
        {["all", "Easy", "Medium", "Hard"].map((level) => (
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
