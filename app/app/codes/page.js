"use client";

import React, { useState, useEffect } from "react";

/*Use for highlight Code */
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "@/components/Highlight Code/prism-markup";
import "@/components/Highlight Code/prism-markup-templating";
import "@/components/Highlight Code/prism-php";
import "@/components/Highlight Code/prism-css";
import "@/components/Highlight Code/prism-sql";
import "@/components/Highlight Code/prism-c";
import "@/components/Highlight Code/prism-java"

/*Use to change color component when we chage theme */
import { useTheme } from "next-themes";

/*Animation libarary */
import AOS from "aos";
import "aos/dist/aos.css";

/**Loading Bar */
import { useLoadingBar } from "@/components/LoadingBarContext";

/*Components */
import Navbar from "../_Component/CodePage/Navbar";
import Sidebar from "../_Component/CodePage/Sidebar";
import TopicsMenu from "../_Component/CodePage/TopicsMenu";
import CodeBlock from "../_Component/CodePage/CodeBlock";
const Page = () => {
  /*Get setProgress to set width of loading bar */
  const { setProgress } = useLoadingBar();

  /**/
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [codeData, setCodeData] = useState([]);
  const [selectedCodeData, setSelectedCodeData] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const { theme } = useTheme();
  // const host = process.env.NEXT_PUBLIC_BACKEND_URL;
  const host = 'https://76zsstq72k.execute-api.ap-south-1.amazonaws.com/dev';

  const languages = [
    { highlight: "php", index: 1, code: "PHP", url: "/api/php/code" },
    { highlight: "javascript", index: 2, code: "jQuery", url: "/api/jQuery/code" },
    { highlight: "javascript", index: 3, code: "JavaScript", url: "/api/javascript/code" },
    { highlight: "html", index: 4, code: "HTML", url: "/api/html/code" },
    { highlight: "cpp", index: 5, code: "C++", url: "/api/c__/code" },
    { highlight: "css", index: 6, code: "CSS", url: "/api/css/code" },
    { highlight: "sql", index: 7, code: "SQL", url: "/api/SQL/code" },
    { highlight: "cpp", index: 8, code: "DSA in C++", url: "/api/DSAC/code" },
    { highlight: "java", index: 9, code: "Java", url: "/api/java" },
  ];
  // Highlight the code when the component mounts or when selectedCodeData changes
  useEffect(() => {
    setProgress(10);
    if (selectedCodeData) {
      Prism.highlightAll();
    }
    AOS.init();
    setProgress(100);
  }, [selectedCodeData]);

  const [OpenSidebar, setOpenSidebar] = useState(false);

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

  // Scroll to the top of the page
  const ScrollFromStart = () => {
    const scroll = document.documentElement;
    scroll.scrollTop = 0;
  };
  const ScrollFromLeft=()=>{
    const scroll = document.getElementById('sub-menu');
    scroll.ScrollFromLeft = 0;
  }
  const [inlangClick, SetinlangClick] = useState(false);
  return (
    <>
      {/* Language navbar for code navigation */}
      <Navbar
        languages={languages}
        setSelectedLanguage={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
        inlangClick={inlangClick}
        SetinlangClick={SetinlangClick}
        handleScrollAreaMenuClick={handleScrollAreaMenuClick}
        ScrollFromStart={ScrollFromLeft}
      />

      <TopicsMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        codeData={codeData}
        selectedCodeData={selectedCodeData}
        setSelectedCodeData={setSelectedCodeData}
        ScrollFromStart={ScrollFromStart}
      />

      <div className="flex pt-14">
        {/* Left side navbar with hover effects */}
        <Sidebar
          OpenSidebar={OpenSidebar}
          codeData={codeData}
          selectedCodeData={selectedCodeData}
          setSelectedCodeData={setSelectedCodeData}
          ScrollFromStart={ScrollFromStart}
        />

        {/* Print content on the right side */}
        <CodeBlock
          selectedCodeData={selectedCodeData}
          theme={theme}
          highlight={highlight}
        />
      </div>
    </>
  );
};

export default Page;
