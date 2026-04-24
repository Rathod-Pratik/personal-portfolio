import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import  Card  from './Component'
import { GET_PROJECT } from "@api";
import apiClient from "@apiClient";
import { Loading } from '@component'
import type { ProjectDifficulty, ProjectItem } from "@Type";

type GetProjectsResponse = {
  data: ProjectItem[];
};

type DifficultyFilter = "all" | ProjectDifficulty;

const Project = () => {
  const fetchProjects = async (): Promise<ProjectItem[]> => {
    const response = await apiClient.get<GetProjectsResponse>(GET_PROJECT);
    return response.data.data;
  };

  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");

  const projectsQuery = useQuery<ProjectItem[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const projects = useMemo(() => {
    return projectsQuery.data ?? [];
  }, [projectsQuery.data]);

  const sortProjectsByDifficulty = (data: ProjectItem[]): ProjectItem[] => {
    const difficultyOrder: Record<ProjectDifficulty, number> = {
      Hard: 0,
      Medium: 1,
      Easy: 2,
    };

    return [...data].sort((a, b) => {
      const aRank = a.difficult ? difficultyOrder[a.difficult] : Number.MAX_SAFE_INTEGER;
      const bRank = b.difficult ? difficultyOrder[b.difficult] : Number.MAX_SAFE_INTEGER;
      return aRank - bRank;
    });
  };

  const filteredData = useMemo(() => {
    const sortedProjects = sortProjectsByDifficulty(projects);

    if (difficultyFilter === "all") {
      return sortedProjects;
    }

    return sortedProjects.filter((item) => item.difficult === difficultyFilter);
  }, [difficultyFilter, projects]);

  const filterByDifficulty = (level: DifficultyFilter) => {
    setDifficultyFilter(level);
  };

  const difficultyLevels: DifficultyFilter[] = ["all", "Easy", "Medium", "Hard"];

  return (
    <div className="min-h-screen flex flex-col py-4">
      {projectsQuery.isLoading && <Loading />}
      <div>
        <h2 className="text-3xl font-bold text-center my-10 sm:hidden">Projects</h2>
        <div className="flex justify-center gap-4">
          {difficultyLevels.map((level) => (
            <button
              key={level}
              onClick={() => filterByDifficulty(level)}
              className={`px-4 py-2 rounded-md hover:text-white ${difficultyFilter === level ? "bg-purple-700 text-white" : ""
                } hover:bg-purple-900`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-center mt-5">
          {projectsQuery.isError && (
            <p className="text-red-500">Failed to fetch projects. Please try again.</p>
          )}
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
