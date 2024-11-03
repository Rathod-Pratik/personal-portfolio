"use client";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "@/components/Highlight Code/prism-markup"; // HTML markup
import "@/components/Highlight Code/prism-markup-templating"; // Markup templating for PHP
import "@/components/Highlight Code/prism-php"; // PHP syntax highlighting
import "@/components/Highlight Code/prism-css"; // No .min.js
import "@/components/Highlight Code/prism-sql"; // No .min.js
import "@/components/Highlight Code/prism-c";
import { useTheme } from "next-themes";
import { BsCopy } from "react-icons/bs";
import { IoMenu } from "react-icons/io5";
import Footer from "@/components/Footer";
import { FaCheck } from "react-icons/fa";
import Default from "@/components/coding section/Default";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLoadingBar } from "@/components/LoadingBarContext";
const Page = () => {
  const { setProgress } = useLoadingBar();
  // State variables to manage selected language, code data, and UI states
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [codeData, setCodeData] = useState([]);
  const [selectedCodeData, setSelectedCodeData] = useState(null); // To store the selected code
  const [highlight, setHighlight] = useState(null); // To store the selected language for highlighting
  const { theme } = useTheme();
  const host = "https://ish78ev1wh.execute-api.ap-south-1.amazonaws.com/dev";

  const languages = [
    { highlight: "php", index: 1, code: "PHP", url: "/api/php/code" },
    { highlight: "js", index: 2, code: "jQuery", url: "/api/jQuery/code" },
    {
      highlight: "javascript",
      index: 3,
      code: "JavaScript",
      url: "/api/javascript/code",
    },
    {
      highlight: ["html"],
      index: 4,
      code: "HTML",
      url: "/api/html/code",
    },
    { highlight: "c", index: 5, code: "C++", url: "/api/c__/code" },
    { highlight: "html", index: 6, code: "CSS", url: "/api/css/code" },
    { highlight: "sql", index: 7, code: "SQL", url: "/api/SQL/code" },
    { highlight: "c", index: 8, code: "DSA in C++", url: "/api/DSAC/code" },
  ];

  // Fetch code data from the server

  // Highlight the code when the component mounts or when selectedCodeData changes
  useEffect(() => {
    if (selectedCodeData) {
      Prism.highlightAll();
    }
    AOS.init();
  }, [selectedCodeData]);

  useEffect(() => {
    setProgress(10);
    setProgress(100);
  }, []);
  const [OpenSidebar, setOpenSidebar] = useState(false);
  // Fetch specific URL code when a language is selected
  useEffect(() => {
    const getCodeData = async (url) => {
      try {
        setProgress(10);
        const response = await fetch(`${host}${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProgress(70);
        const data = await response.json();
        setCodeData(data);
        setSelectedCodeData(data[0]);
        setProgress(100); // Set the first code data as selected by default
      } catch (error) {
        console.error("Error fetching code data:", error);
      }
    };
    if (selectedLanguage) {
      getCodeData(selectedLanguage.url);
      setOpenSidebar(true);
      setHighlight(selectedLanguage.highlight);
    }
  }, [selectedLanguage]);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility

  const handleScrollAreaMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [isCopied, setIsCopied] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Handle code copy to clipboard
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setIsButtonDisabled(true);

    // Reset state after 4 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
      setIsCopied(false);
    }, 4000);
  };

  // Scroll to the top of the page
  const ScrollFromStart = () => {
    const scroll = document.documentElement;
    scroll.scrollTop = 0;
  };
  const [inlangClick, SetinlangClick] = useState(false);
  return (
    <>
      {/* Language navbar for code navigation */}
      <div className="flex gap-3 fixed w-full z-50">
        <ul className="flex flex-row gap-7 px-3 sticky lg:justify-center top-[64px] bg-background/50 backdrop-blur-lg m-auto justify-start py-2 cursor-pointer border-b w-full z-10 overflow-x-auto whitespace-nowrap scrollbar-hide sm:py-4">
          {inlangClick && (
            <li>
              <IoMenu
                className="cursor-pointer w-[40px] h-[34px] lg:hidden" // Hidden on medium and larger screens
                onClick={handleScrollAreaMenuClick}
                aria-label="Open menu"
              />
            </li>
          )}
          <ul className="m-auto flex flex-row gap-7">
            {languages.map((language, index) => (
              <li
                key={index}
                className={`hover:border-white flex items-center
          hover:border-b transition duration-300 ease-in-out ${
            selectedLanguage && selectedLanguage.code === language.code
              ? "border-b-2 border-blue-500"
              : ""
          }`}
                onClick={() => {
                  setSelectedLanguage(language),
                    SetinlangClick(true),
                    ScrollFromStart();
                }}
              >
                {language.code}
              </li>
            ))}
          </ul>
        </ul>
      </div>

      {/* <Menu languages={languages} inlangClick={inlangClick} setIsMenuOpen={}  selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage}  SetinlangClick={SetinlangClick} /> */}

      {isMenuOpen && (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button onClick={() => setIsMenuOpen(true)}></button>
          </SheetTrigger>
          <SheetContent side="left" size="sm">
            <SheetHeader>
              <SheetTitle className="font-bold my-4">Topics</SheetTitle>
            </SheetHeader>
            <ol className="pl-4 overflow-y-auto h-full">
              {codeData.map((item, index) => (
                <li
                  className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md ${
                    selectedCodeData === item ? "bg-blue-500 text-white" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    ScrollFromStart();
                    setSelectedCodeData(item);
                    setIsMenuOpen(false);
                  }}
                >
                  {index + 1}. {item.file_name}
                </li>
              ))}
            </ol>
          </SheetContent>
        </Sheet>
      )}

      <div className="flex pt-14">
        {/* Left side navbar with hover effects */}
        {OpenSidebar && (
          <ScrollArea className="!sticky hidden lg:block top-[126px] w-[300px] h-[calc(100vh-127px)] rounded-md border-r p-4">
            <ol type="1" className="py-2">
              <li className="text-2xl text-center">Topics</li>
              <ol className="pl-5 flex flex-col gap-1">
                {codeData.map((item, index) => (
                  <li
                    className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-md 
              ${selectedCodeData === item ? "bg-blue-500 text-white" : ""}`} // Conditional styling
                    key={index}
                    onClick={() => {
                      setSelectedCodeData(item);
                      ScrollFromStart();
                    }}
                  >
                    {index + 1}. {item.file_name}
                  </li>
                ))}
              </ol>
            </ol>
          </ScrollArea>
        )}

        {/* Print content on the right side */}
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
                  <>
                    <pre
                      key={`${selectedCodeData.file_name}-${index}`} // Unique key for each code snippet
                      className="overflow-auto p-4 rounded m-auto w-full md:w-[100%] parser"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "#272822"
                            : "hsl(222.2, 84%, 4.9%)",
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
                        {codeSnippet.function_code}{" "}
                        {/* Display the actual code */}
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
                  </>
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
                      {!isButtonDisabled && (
                        <BsCopy
                          onClick={() => handleCopy(selectedCodeData.code)} // Copy the single code
                          className={`cursor-pointer ${
                            isButtonDisabled ? "opacity-50" : ""
                          }`} // Adjust style based on state
                          aria-label="Copy code"
                          size={24} // Adjust size if needed
                        />
                      )}
                      {isCopied && <FaCheck className="text-green-500" />}{" "}
                      {/* Show check mark if copied */}
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
                        <>
                          <h3 className="font-semibold my-4" key={index}>Output</h3>
                          <img
                            className="m-auto rounded-md pb-2"
                            key={index}
                            src={`${codeSnippet}`}
                            alt=""
                          />
                        </>
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
      </div>
    </>
  );
};

export default Page;
