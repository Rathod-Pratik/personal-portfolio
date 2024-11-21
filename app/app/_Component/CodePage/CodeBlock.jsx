import React,{useState} from "react";
import { BsCopy } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import Default from "./Default"; // Import Default component
import Footer from "@/app/_Component/HomePage/Footer"; // Import Footer component

const CodeBlock = ({
  selectedCodeData,
  theme,
  highlight,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const handleCopy = (code) => {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        setIsCopied(true);
        setIsButtonDisabled(true);

        // Reset after 2 seconds to show the copy button again
        setTimeout(() => {
          setIsCopied(false);
          setIsButtonDisabled(false);
        }, 2000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };
  return (
    <div
      id="scroll"
      className="px-4 pt-4 md:ml-4 rounded-md border-r w-full z-0"
    >
      {selectedCodeData ? (
        <div>
          <h2 className="text-xl font-semibold">
            {selectedCodeData.file_name}
          </h2>
          <p className="py-2 px-4 lg:px-12 text-justify">
            &nbsp;&nbsp;&nbsp;&nbsp;{selectedCodeData.explanation}
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">Details:</h3>
            <ul className="list-disc py-2 px-4 lg:px-12">
              {selectedCodeData.topics &&
                selectedCodeData.topics.map((topic, index) => (
                  <li key={index} className="py-1">
                    {topic}
                  </li>
                ))}
            </ul>
          </div>
          <h3 className="font-semibold mt-4">Code</h3>
          {Array.isArray(selectedCodeData.code) ? (
            selectedCodeData.code.map((codeSnippet, index) => (
              <div key={`${selectedCodeData.file_name}-${index}`}>
                <pre
                   // Unique key for each code snippet
                  className="overflow-auto p-4 rounded m-auto w-full md:w-[100%] parser"
                  style={{
                    backgroundColor:
                      theme === "dark" ? "#272822" : "hsl(222.2, 84%, 4.9%)",
                  }}
                >
                  <div className="flex justify-between items-center text-white mb-2">
                    <span>{codeSnippet.function_name}</span>
                    <BsCopy
                      onClick={() =>
                        !isButtonDisabled &&
                        handleCopy(codeSnippet.function_code)
                      } // Copy the code
                      className={`cursor-pointer ${
                        isButtonDisabled ? "opacity-50" : ""
                      }`} // Adjust style based on state
                      aria-label="Copy code"
                      size={24} // Adjust size if needed
                    />
                    {isCopied && <FaCheck className="text-green-500" />}{" "}
                    {/* Show check mark if copied */}
                  </div>
                  <code
                    className={`language-${highlight} whitespace-pre-wrap text-xs md:text-base`}
                  >
                    {codeSnippet.function_code} {/* Display the actual code */}
                  </code>
                </pre>
                {codeSnippet.output && (
                  <>
                    <h3 className="font-semibold my-4">Output</h3>
                    <img
                      key={index}
                      className="m-auto rounded-md pb-2"
                      src={`${codeSnippet.output}`}
                      alt=""
                    />
                  </>
                )}
              </div>
            ))
          ) : (
            <>
              <pre
                key={selectedCodeData.file_name} // Unique key for the single code snippet
                className="overflow-auto p-4 rounded m-auto w-full md:w-[100%] parser"
                style={{
                  backgroundColor:
                    theme === "dark" ? "#272822" : "hsl(222.2, 84%, 4.9%)",
                }}
              >
                <div className="flex justify-between items-center text-white mb-2">
                  <span>{selectedCodeData.file_name}</span>
                  <div>
                    {/* Show the copy button if it's not disabled, otherwise show the checkmark */}
                    {!isCopied ? (
                      <BsCopy
                        onClick={() => handleCopy(selectedCodeData.code)}
                        className={`cursor-pointer ${
                          isButtonDisabled
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        aria-label="Copy code"
                        size={24}
                        disabled={isButtonDisabled}
                      />
                    ) : (
                      <FaCheck className="text-green-500" size={24} />
                    )}
                  </div>
                </div>
                <code
                  className={`language-${highlight}`}
                  dangerouslySetInnerHTML={{
                    __html: Prism.highlight(
                      selectedCodeData.code || "", // Fallback to empty string if code is not valid
                      Prism.languages[highlight],
                      highlight
                    ),
                  }}
                />
              </pre>
              {Array.isArray(selectedCodeData.output)
                ? selectedCodeData.output.map((codeSnippet, index) => (
                    <div key={index}>
                      <h3 className="font-semibold my-4" >
                        Output
                      </h3>
                      <img
                        className="m-auto rounded-md pb-2"
                        key={index}
                        src={`${codeSnippet}`}
                        alt=""
                      />
                    </div>
                  ))
                : selectedCodeData.output && (
                    <>
                      <h3 className="font-semibold my-4">Output</h3>
                      <img
                        className="m-auto rounded-md pb-2"
                        src={`${selectedCodeData.output}`}
                        alt=""
                      />
                    </>
                  )}
            </>
          )}
        </div>
      ) : (
        <div data-aos="zoom-in">
          <Default />
        </div>
      )}

      <div className="w-full px-0">
        <Footer />
      </div>
    </div>
  );
};

export default CodeBlock;
