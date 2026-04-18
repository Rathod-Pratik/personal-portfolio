import { useEffect, useMemo, useState } from "react";
import Card from "./language-card";
import { useAppStore } from "../../store";
import axios from "axios";
import SkaletonEffect from "./SkaletonEffect";

const Language = ({ data,resumeFile  }) => {
  const { setProgress } = useAppStore();


  const DownloadFile = async (fileUrl, fileName) => {
    setProgress(10);
    try {
      const response = await axios.get(fileUrl, {
        responseType: "blob", // Important to handle binary data
      });
      if (!fileName.endsWith(".pdf")) {
        fileName += ".pdf";
      }
      // Create a blob URL for the downloaded file
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // Specify the file name
      document.body.appendChild(link);
      link.click();
      setProgress(70);
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      setProgress(100);
    } catch (error) {
      console.error("Download failed:", error);
      setProgress(0);
    }
  };

  const useIsSmallScreen = () => {
    const [isSmall, setIsSmall] = useState(window.innerWidth < 640); // sm = 640px in Tailwind

    useEffect(() => {
      const handleResize = () => setIsSmall(window.innerWidth < 640);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isSmall;
  };

  const isSmallScreen = useIsSmallScreen();

  const displayLanguages = useMemo(() => {
    return isSmallScreen ? data.slice(0, 4) : data;
  }, [data, isSmallScreen]);
  return (
    <div className="bg-gray-100 w-[93%] rounded-xl m-auto">
      <div
      data-aos="fade-down"
        className="pt-4 text-center text-purple-500 text-xl font-semibold mb-4"
       
      >
        My Skills
      </div>

      <div className="flex flex-col m-auto">
        {/* Cards Section */}
        <div
        data-aos="fade-down"
          className="w-full sm:w-[90vw] lg:w-[80vw] px-2 sm:px-0 m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {
            displayLanguages.length > 0 && displayLanguages.map((item,index)=>(
              <Card key={index} text={item.language} percentage={item.percentage} color={item.color} />
            ))
          }
          {
            displayLanguages.length === 0 &&
            Array.from({ length: 8 }).map((_, idx) => <SkaletonEffect key={idx} />)
          }
        </div>

        {/* Experience Section */}
        <div
          className="w-full sm:w-[60vw] m-auto  mt-auto md:mt-0 text-center"
         data-aos="fade-down"
          id="data-section"
        >
          <h1 className="text-gray-800 text-3xl font-bold mb-4">
            Beautiful & Unique Digital <br /> Experiences
          </h1>
          <p className="text-gray-600 text-base mx-auto px-6 mb-4">
            Creating beautiful and unique digital experiences requires a blend
            of creativity and technical skill. By focusing on intuitive user
            interfaces and innovative design, digital platforms can captivate
            users, keeping them engaged and invested in the content.
          </p>
          <p className="text-gray-600 text-base mx-auto px-6">
            Personalized experiences also enhance user interaction, making the
            digital journey memorable. Thoughtful animations, seamless
            navigation, and responsive design contribute to a visually appealing
            and efficient digital environment.
          </p>
          <div className="mt-6 pb-6">
            <button
            onClick={()=>DownloadFile(resumeFile,"Resume")}
             className="bg-[#fca61f] text-white px-6 py-2 text-xl leading-7 rounded-full border-none cursor-pointer hover:bg-[#6f34fe] transition-all duration-500"
            >Download CV</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Language;
