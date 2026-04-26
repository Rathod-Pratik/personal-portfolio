import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-Client";
import { toast } from "react-toastify";
import { GET_PROJECT } from "../../Utils/Constant";
import { Loading } from "@component";
import type { ProjectDetail } from "@Type";
import { usePrivateObjectUrl } from "@utils/s3Upload";

const ProjectDetalis = () => {
  const { _id } = useParams();
  const projectQuery = useQuery<ProjectDetail | null>({
    queryKey: ["project", _id],
    queryFn: async () => {
      const response = await apiClient.get(GET_PROJECT);
      const projects = (response.data.data ?? []) as ProjectDetail[];
      return projects.find((item) => item._id === _id) ?? null;
    },
    enabled: Boolean(_id),
  });

  useEffect(() => {
    if (projectQuery.isError) {
      toast.error("Failed to fetch Project Data");
    }
  }, [projectQuery.isError]);

  if (projectQuery.isLoading) {
    return <Loading />;
  }

  const fetchedData = projectQuery.data;
  const imageUrl = usePrivateObjectUrl(fetchedData?.images);

  if (!fetchedData) {
    return (
      <div className="min-h-[100vh] flex justify-center items-center">
        Project not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold">{fetchedData.title}</h1>
      <p className="text-gray-400 text-sm">
        {new Date(fetchedData.createdAt).toLocaleString()}
      </p>

      {/* Image */}
      <div className="mt-4">
        <img
          src={imageUrl}
          alt={fetchedData.title}
          className="rounded-lg w-full object-cover max-h-[400px]"
        />
      </div>

      {/* Subtitle */}
      <p className="text-lg text-gray-300">{fetchedData.subtitle}</p>

      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-200 whitespace-pre-line">
          {fetchedData.description}
        </p>
      </div>

      {/* Tech Stack */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Tech Stack</h2>
        <div className="flex gap-2 flex-wrap">
          {fetchedData.techStack?.map((tech) => (
            <span
              key={tech}
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
          {fetchedData.features?.map((feat) => (
            <li key={feat}>{feat}</li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-4">
        {fetchedData.liveDemoLink && (
          <a
            href={fetchedData.liveDemoLink.startsWith("http")
              ? fetchedData.liveDemoLink
              : `https://${fetchedData.liveDemoLink}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectDetalis;
