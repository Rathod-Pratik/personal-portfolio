import React, { useState, useEffect } from "react";

/*Use for highlight Code */
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "../../Component/Highlight Code/prism-markup";
import "../../Component/Highlight Code/prism-markup-templating";
import "../../Component/Highlight Code/prism-php";
import "../../Component/Highlight Code/prism-css";
import "../../Component/Highlight Code/prism-sql";
import "../../Component/Highlight Code/prism-c";
import "../../Component/Highlight Code/prism-java"
import "../../Component/Highlight Code/prism-cpp"
import Navbar from "../../Component/Code/Navbar";
import TopicsMenu from "../../Component/Code/TopicsMenu";
import Sidebar from "../../Component/Code/Sidebar";
import CodeBlock from "../../Component/Code/CodeBlock";
import { apiClient } from "../../lib/api-Client";
import { HOST } from "../../Utils/Constant";
const Code = ({setProgress}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [codeData, setCodeData] = useState([]);
  const [selectedCodeData, setSelectedCodeData] = useState(null);
  const [highlight, setHighlight] = useState(null);


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
    if (selectedCodeData) {
      Prism.highlightAll();
    }
  }, [selectedCodeData]);

  const [OpenSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    const getCodeData = async (url) => {
      try {
        const response = await apiClient.get(`${HOST}${url}`);
        setCodeData(response.data);
        setSelectedCodeData(data[0]);
      } catch (error) {
        console.error("Error fetching code data:", error);
      }
    };
    if (selectedLanguage) {
      setProgress(10)
      getCodeData(selectedLanguage.url);
      setOpenSidebar(true);
      setProgress(70)
      setHighlight(selectedLanguage.highlight);
      setProgress(100)
    }
  }, [selectedLanguage]);

  const [isMenuOpen, setIsMenuOpen] = useState(false); 

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
        <Sidebar
          OpenSidebar={OpenSidebar}
          codeData={codeData}
          selectedCodeData={selectedCodeData}
          setSelectedCodeData={setSelectedCodeData}
          ScrollFromStart={ScrollFromStart}
        />

        <CodeBlock
          selectedCodeData={selectedCodeData}
          // theme={theme}
          highlight={highlight}
        />
      </div>
    </>
  );
};

export default Code;
