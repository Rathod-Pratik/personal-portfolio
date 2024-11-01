"use client";
import React from "react";
import Prism from "prismjs";
import { BsCopy } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";

const CodeDisplay = ({ theme, highlight, selectedCodeData, isCopied, isButtonDisabled, handleCopy }) => (
  <div>
    <h2 className="text-xl font-semibold">{selectedCodeData.file_name}</h2>
    <p className="py-2 px-4 lg:px-12 text-justify">&nbsp;&nbsp;&nbsp;&nbsp;{selectedCodeData.explanation}</p>
    <div className="mt-4">
      <h3 className="font-semibold">Details:</h3>
      <ul className="list-disc py-2 px-4 lg:px-12">
        {selectedCodeData.topics?.map((topic, index) => (
          <li key={index} className="py-1">
            {topic}
          </li>
        ))}
      </ul>
    </div>
    <h3 className="font-semibold mt-4">Code</h3>
    <pre
      className="overflow-auto p-4 rounded m-auto w-full md:w-[100%] parser"
      style={{ backgroundColor: theme === "dark" ? "#272822" : "hsl(222.2, 84%, 4.9%)" }}
    >
      <div className="flex justify-between items-center text-white mb-2">
        <span>{selectedCodeData.file_name}</span>
        <BsCopy
          onClick={() => !isButtonDisabled && handleCopy(selectedCodeData.code)}
          className={`cursor-pointer ${isButtonDisabled ? "opacity-50" : ""}`}
          aria-label="Copy code"
          size={24}
        />
        {isCopied && <FaCheck className="text-green-500" />}
      </div>
      <code className={`language-${highlight}`}>
        {Prism.highlight(selectedCodeData.code, Prism.languages[highlight], highlight)}
      </code>
    </pre>
  </div>
);

export default CodeDisplay;
