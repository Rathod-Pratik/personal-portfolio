import React, { useEffect, useState } from "react";
import { BsCopy } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Default from "./Default";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ selectedCodeData }) => {
  const [code, setCode] = useState(""); // Fetched code
  const [loading, setLoading] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // ✅ Copy handler
  const handleCopy = () => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        setIsButtonDisabled(true);
        setTimeout(() => {
          setIsCopied(false);
          setIsButtonDisabled(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  // ✅ Fetch code from S3 link
  useEffect(() => {
    if (!selectedCodeData?.Codefile_url) return;

    fetch(selectedCodeData.Codefile_url)
      .then((res) => res.text())
      .then((text) => {
        setCode(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading code:", err);
        setCode("// Error loading code");
        setLoading(false);
      });
  }, [selectedCodeData]);

  const getLanguage = (fileName = "") => {
    const ext = fileName.split(".").pop().toLowerCase();

    switch (ext) {
      case "js":
        return "javascript";
      case "jsx":
        return "jsx";
      case "ts":
        return "typescript";
      case "tsx":
        return "tsx";
      case "html":
      case "htm":
        return "html";
      case "css":
        return "css";
      case "scss":
      case "sass":
        return "scss";
      case "less":
        return "less";

      case "json":
        return "json";
      case "xml":
        return "xml";
      case "yaml":
      case "yml":
        return "yaml";
      case "ini":
      case "cfg":
      case "conf":
        return "ini";

      case "md":
      case "markdown":
        return "markdown";

      case "c":
        return "c";
      case "cpp":
      case "cc":
      case "cxx":
        return "cpp";
      case "h":
      case "hpp":
        return "cpp"; // Header files
      case "cs":
      case "csharp":
        return "csharp";

      case "java":
      case "class":
      case "jar":
        return "java";
      case "kt":
      case "kts":
        return "kotlin";

      case "php":
      case "php3":
      case "php4":
      case "php5":
      case "phtml":
        return "php";

      case "py":
      case "pyc":
        return "python";

      case "rb":
      case "gemspec":
        return "ruby";

      case "go":
      case "mod":
        return "go";

      case "rs":
        return "rust";
      case "swift":
        return "swift";
      case "dart":
        return "dart";
      case "scala":
        return "scala";
      case "sh":
      case "bash":
      case "zsh":
      case "cmd":
      case "bat":
        return "bash";

      case "sql":
      case "db":
      case "sqlite":
        return "sql";

      case "vue":
        return "vue";
      case "svelte":
        return "svelte";
      case "astro":
        return "astro";

      case "r":
      case "rmd":
        return "r";

      case "tex":
        return "latex";

      case "f90":
      case "f95":
      case "for":
      case "f":
        return "fortran";

      case "erl":
      case "ex":
      case "exs":
        return "elixir";

      case "vb":
      case "vbs":
        return "vbnet";

      case "toml":
        return "toml";

      case "make":
      case "mk":
      case "makefile":
        return "makefile";

      case "lock":
      case "env":
      case "log":
      case "txt":
        return "text";

      default:
        return "text";
    }
  };

  return (
    <div
      id="scroll"
      className="px-4 pt-4 md:ml-4 rounded-md border-r w-full z-0 text-white"
    >
      {selectedCodeData ? (
        <div>
          <h2 className="text-xl font-semibold">{selectedCodeData.title}</h2>
          <p className="py-2 px-4 lg:px-12 text-justify">
            &nbsp;&nbsp;&nbsp;&nbsp;{selectedCodeData.description}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Details:</h3>
            <ul className="list-disc py-2 px-4 lg:px-12">
              {selectedCodeData.Details?.map((topic, index) => (
                <li key={index} className="py-1">
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* CODE SECTION */}
          <h3 className="font-semibold mt-4">Code</h3>
          <pre className="overflow-auto p-4 rounded bg-[#282a36] w-full">
            <div className="flex justify-between items-center text-white mb-2">
              <span>{selectedCodeData.title}</span>
              <div>
                {!isCopied ? (
                  <BsCopy
                    onClick={handleCopy}
                    className={`cursor-pointer ${
                      isButtonDisabled ? "opacity-50" : ""
                    }`}
                    size={24}
                  />
                ) : (
                  <FaCheck className="text-green-500" size={24} />
                )}
              </div>
            </div>
            <SyntaxHighlighter
              language={getLanguage(selectedCodeData.Codefile_url)} // change to html, cpp, python etc.
              style={dracula}
              showLineNumbers
              wrapLongLines
              customStyle={{
                borderRadius: "8px",
                padding: "1rem",
                fontSize: "14px",
              }}
            >
              {loading ? "// Loading..." : code}
            </SyntaxHighlighter>
          </pre>

          {/* OUTPUT IMAGE */}
          {selectedCodeData.output && (
            <h3 className="font-semibold my-4">Output</h3>
          )}
          <img
            className="m-auto rounded-md pb-2"
            src={selectedCodeData?.output}
            alt="Output Preview"
          />
        </div>
      ) : (
        <div data-aos="zoom-in">
          <Default />
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
