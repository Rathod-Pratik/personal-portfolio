"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "next-themes";
import '@/components/Highlight Code/prism.css';
import '@/components/Highlight Code/prism.js';

const ProjectCode = () => {
  const reduxProjectData = useSelector((state) => state.projectCode.projectData);
  const [projectData, setProjectData] = useState([]);
  const [selectedCodeData, setSelectedCodeData] = useState(null);
  const { theme } = useTheme();

  // Load project data from Redux store or localStorage
  useEffect(() => {
    const savedProjectData = localStorage.getItem('projectData');
    if (reduxProjectData) {
      setProjectData(reduxProjectData);
      localStorage.setItem('projectData', JSON.stringify(reduxProjectData)); 
    } else if (savedProjectData) {
      setProjectData(JSON.parse(savedProjectData));
    }
  }, [reduxProjectData]);

  // Load selected code from localStorage
  useEffect(() => {
    const savedSelectedCode = localStorage.getItem('selectedCode');
    if (savedSelectedCode) {
      setSelectedCodeData(JSON.parse(savedSelectedCode));
    }
  }, []);

  // Store selected code in localStorage when changed
  useEffect(() => {
    if (selectedCodeData) {
      localStorage.setItem('selectedCode', JSON.stringify(selectedCodeData));
    }
  }, [selectedCodeData]);

  // Highlight code using Prism
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [selectedCodeData]);

  const backgroundColor = theme === "dark" ? "#272822" : "hsl(222.2, 84%, 4.9%)";

  // Recursive function to render project data
  const renderProjectData = (data, index) => {
    return data.map((element, idx) => {
      if (typeof element === 'object' && element !== null) {
        // Check for nested components
        const hasComponents = Array.isArray(element);
        return (
          <div key={`${index}-${idx}`}>
            <h3 className="text-lg font-semibold mt-2">{element.name}</h3>
            {hasComponents ? (
              <ol>
                {element.map((component, compIndex) => (
                  <li
                    key={compIndex}
                    className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-md ${selectedCodeData === component ? "bg-blue-500 text-white" : ""}`}
                    onClick={() => setSelectedCodeData(component)}
                  >
                    {component.name}
                  </li>
                ))}
              </ol>
            ) : (
              <li
                className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-md ${selectedCodeData === element ? "bg-blue-500 text-white" : ""}`}
                onClick={() => setSelectedCodeData(element)}
              >
                {element.name}
              </li>
            )}
          </div>
        );
      }
      // If the element is a simple string
      return (
        <li
          className={`pl-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out rounded-md ${selectedCodeData === element ? "bg-blue-500 text-white" : ""}`}
          onClick={() => setSelectedCodeData(element)}
          key={`${index}-${idx}`}
        >
          {element}
        </li>
      );
    });
  };

  return (
    <div className="flex flex-row pt-14">
      <ScrollArea className="!sticky hidden lg:block top-[126px] w-[300px] h-[calc(100vh-127px)] rounded-md border-r p-4">
        <ol type="1" className="py-2">
          <li className="text-2xl text-center">Project Code</li>
          {renderProjectData(projectData, 0)}
        </ol>
      </ScrollArea>

      <div className="flex-1 p-4">
        {selectedCodeData ? (
          <div
            style={{
              backgroundColor: backgroundColor,
              color: theme === "dark" ? "text-white" : "#272822",
            }}
            className="p-4 rounded"
          >
            <h2 className="text-2xl font-bold mb-2">{selectedCodeData.name || selectedCodeData}</h2>
            <pre className="overflow-auto language-javascript">
              <code>{selectedCodeData.path || selectedCodeData}</code>
            </pre>
          </div>
        ) : (
          <p className="text-center">Select a file to view its code.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectCode;
