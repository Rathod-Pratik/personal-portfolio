import React from "react";
import { useParams } from "react-router-dom";
import { useAppStore } from "../../store";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { apiClient } from "../../lib/api-Client";
import { toast } from "react-toastify";

const ProjectDetalis = () => {
  const { project } = useAppStore();
  const { _id } = useParams();
  let projectData = project?.find((item) => item._id === _id);
  
  const FetchProjectData=async()=>{
    try {
        const response =await apiClient.get(`${GET_PROJECT_DATA}/${_id}`)
        if(response.status===200){
            projectData=response.data.data
        }
    } catch (error) {
        console.error(error)
        toast.error("Failed to fetch Project Data")
    }
  }

  if (!projectData) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        Project not found.
      </div>
    );
  }
  return  <div className="max-w-4xl mx-auto p-6 text-white space-y-6">
  {/* Title */}
  <h1 className="text-3xl font-bold">{projectData.title}</h1>
  <p className="text-gray-400 text-sm">{new Date(projectData.createdAt).toLocaleString()}</p>

  {/* Image */}
  <div className="mt-4">
    <img
      src={projectData.images}
      alt={projectData.title}
      className="rounded-lg w-full object-cover max-h-[400px]"
    />
  </div>

  {/* Subtitle */}
  <p className="text-lg text-gray-300">{projectData.subtitle}</p>

  {/* Description */}
  <div>
    <h2 className="text-xl font-semibold mb-2">Description</h2>
    <p className="text-gray-200 whitespace-pre-line">{projectData.description}</p>
  </div>

  {/* Tech Stack */}
  <div>
    <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
    <div className="flex gap-2 flex-wrap">
      {projectData.techStack?.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 text-sm bg-blue-600 rounded-full"
        >
          {tech}
        </span>
      ))}
    </div>
  </div>

  {/* Features */}
  <div>
    <h2 className="text-xl font-semibold mb-2">Features</h2>
    <ul className="list-disc list-inside text-gray-300 space-y-1">
      {projectData.features?.map((feat, idx) => (
        <li key={idx}>{feat}</li>
      ))}
    </ul>
  </div>

  {/* Links */}
  <div className="flex gap-4 pt-4">
    {projectData.liveDemoLink && (
      <a
        href={`'https://'${projectData.liveDemoLink}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
      >
        <FaExternalLinkAlt />
        Live Demo
      </a>
    )}
  
  </div>
</div>;
};

export default ProjectDetalis;
