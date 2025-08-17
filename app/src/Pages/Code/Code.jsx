import { useState, useEffect } from "react";
import Navbar from "../../Component/Code/Navbar";
import TopicsMenu from "../../Component/Code/TopicsMenu";
import Sidebar from "../../Component/Code/Sidebar";
import CodeBlock from "../../Component/Code/CodeBlock";
import { apiClient } from "../../lib/api-Client";
import { GET_CODE, GET_LANGUAGE } from "../../Utils/Constant";
import { toast } from "react-toastify";
import { useAppStore } from "../../store";
const Code = () => {
  const { language, setLanguage, setProgress } = useAppStore();
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [codeData, setCodeData] = useState([]);
  const [selectedCodeData, setSelectedCodeData] = useState(null);
  const [OpenSidebar, setOpenSidebar] = useState(false);
  const FetchLanguages = async () => {
    if (language.length > 1) return;
    try {
      const response = await apiClient.get(GET_LANGUAGE);
      if (response.status === 200) {
        setLanguage(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Language");
    }
  };
  const getCodeData = async (_id) => {
    setProgress(10);
    try {
      setProgress(70);
      const response = await apiClient.get(`${GET_CODE}/${_id}`);
      setCodeData(response.data.data);
      setSelectedCodeData(response.data.data[0]);
    } catch (error) {
      console.error("Error fetching code data:", error);
    } finally {
      setProgress(100);
    }
  };
  useEffect(() => {
    FetchLanguages();
  }, []);

  useEffect(() => {
    if (selectedLanguage) {
      getCodeData(selectedLanguage._id);
      setOpenSidebar(true);
    }
  }, [selectedLanguage]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScrollAreaMenuClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const [inlangClick, SetinlangClick] = useState(false);

  return (
    <>
      <Navbar
        languages={language}
        setSelectedLanguage={setSelectedLanguage}
        selectedLanguage={selectedLanguage}
        inlangClick={inlangClick}
        SetinlangClick={SetinlangClick}
        handleScrollAreaMenuClick={handleScrollAreaMenuClick}
      />
      *{" "}
      <div className="z-[100] mt-[14] ">
        <TopicsMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          codeData={codeData}
          selectedCodeData={selectedCodeData}
          setSelectedCodeData={setSelectedCodeData}
        />
      </div>
      <div className="flex pt-14">
        <Sidebar
          OpenSidebar={OpenSidebar}
          codeData={codeData}
          selectedCodeData={selectedCodeData}
          setSelectedCodeData={setSelectedCodeData}
        />

        <CodeBlock selectedCodeData={selectedCodeData} />
      </div>
    </>
  );
};

export default Code;
