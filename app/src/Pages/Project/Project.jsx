import { useState, useEffect, useMemo } from "react";
import { apiClient } from "../../lib/api-Client";
import { GET_PROJECT } from "../../Utils/Constant";
import Card from "../../Component/Project/Card";
import Loading from "../../Component/Loading/Loading";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const sortProjectsByDifficulty = (data) => {
    const difficultyOrder = { Hard: 0, Medium: 1, Easy: 2 };

    return [...data].sort((a, b) => {
      const aRank = difficultyOrder[a?.difficult] ?? Number.MAX_SAFE_INTEGER;
      const bRank = difficultyOrder[b?.difficult] ?? Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      setLoading(true);

      try {
        const response = await apiClient.get(GET_PROJECT);
        if (!isMounted) {
          return;
        }

        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching code data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredData = useMemo(() => {
    const sortedProjects = sortProjectsByDifficulty(projects);

    if (difficultyFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((item) => item.difficult === difficultyFilter);
  }, [difficultyFilter, projects]);

  const filterByDifficulty = (level) => {
    setDifficultyFilter(level);
  };

  return (
    <div className="min-h-screen flex flex-col py-4">
      {loading && <Loading />}
      <div>
           <h2 className="text-3xl font-bold text-center my-10 sm:hidden">Projects</h2>
        <div className="flex justify-center gap-4">
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
        <div className="flex flex-row flex-wrap gap-3 justify-center mt-5">
          {filteredData.map((item, index) => (
            <div key={index}>
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
