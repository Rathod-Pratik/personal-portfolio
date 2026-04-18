import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { apiClient } from "../../lib/api-Client";
import { GET_ABOUT } from "../../Utils/Constant";
import { useAppStore } from "../../store";

const About = () => {
  const [aboutText, setAboutText] = useState("");
  const { setIsLoading } = useAppStore();

  useEffect(() => {
    let isMounted = true;

    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get(GET_ABOUT);
        if (!isMounted) {
          return;
        }
        if (response.status === 200) {
          setAboutText(response.data.content);
        }
      } catch (error) {
        console.error("Failed to fetch about data", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetchAbout();

    return () => {
      isMounted = false;
    };
  }, [setIsLoading]);

  return (
    <div className="min-h-screen">
      <div
        className="max-w-4xl mx-auto px-4 py-8 text-gray-200"
        data-aos="zoom-in"
      >
        <h1 className="text-3xl font-bold mb-6 text-white">About Me</h1>
        <ReactMarkdown
          components={{
          h1: ({  ...props }) => (
            <h1
              className="text-3xl font-bold mb-4 text-white mt-8"
              {...props}
            />
          ),
          h2: ({  ...props }) => (
            <h2
              className="text-2xl font-semibold mb-3 text-white mt-8"
              {...props}
            />
          ),
          h3: ({  ...props }) => (
            <h3
              className="text-xl font-medium mb-2 text-white mt-6"
              {...props}
            />
          ),
          p: ({  ...props }) => (
            <p className="mb-4 leading-relaxed text-[17px]" {...props} />
          ),
          ul: ({  ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
          ),
          ol: ({  ...props }) => (
            <ol
              className="list-decimal list-inside mb-4 space-y-1"
              {...props}
            />
          ),
          li: ({  ...props }) => <li className="mb-1" {...props} />,
          strong: ({  ...props }) => (
            <strong className="font-bold text-white" {...props} />
          ),
          a: ({  ...props }) => (
            <a
              className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          blockquote: ({  ...props }) => (
            <blockquote
              className="border-l-4 border-gray-500 pl-4 py-1 mb-4 italic text-gray-400 bg-gray-800/50 rounded-r"
              {...props}
            />
          ),
          code: ({  inline, ...props }) =>
            inline ? (
              <code
                className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-pink-400 font-mono"
                {...props}
              />
            ) : (
              <code
                className="block bg-gray-900 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono border border-gray-700"
                {...props}
              />
            ),
          }}
        >
          {aboutText}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default About;
