import ReactMarkdown, { type Components } from "react-markdown";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@apiClient";
import { GET_ABOUT } from "@api";
import MarkDown from "./Component";

type AboutResponse = {
  content: string;
};

const About = () => {
  const { data } = useQuery<AboutResponse>({
    queryKey: ["about"],
    queryFn: async () => {
      const response = await apiClient.get<AboutResponse>(GET_ABOUT);
      return response.data;
    },
  });

  const aboutText = data?.content ?? "";

  return (
    <div className="min-h-screen">
      <div
        className="max-w-4xl mx-auto px-4 py-8 text-gray-200"
        data-aos="zoom-in"
      >
        <h1 className="text-3xl font-bold mb-6 text-white">About Me</h1>
        <ReactMarkdown components={MarkDown}>
          {aboutText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
