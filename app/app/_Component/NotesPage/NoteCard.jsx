import React,{useEffect} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
const NoteCard = ({index,item}) => {

    useEffect(() => {
        AOS.init();
      }, []);
      const DownloadFile = async (url) => {
        try {
          const blobUrl = window.URL.createObjectURL(url);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", url.split("/").pop());
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error("File download failed:", error.message);
          alert("Failed to download the file. Please try again later.");
        }
      };
  return (
    <div
    
    className="w-[290px] max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-slate-800 dark:border-black"
    data-aos="zoom-in"
  >
    <div className=" w-[290px] flex flex-col items-center p-6 m-auto">
      <img src={`${item.logo}`} className="mb-4 w-[7rem] h-[7rem]" />

      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {item.file_name}
      </h5>

      <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {item.description}
      </span>

      <div className="grid mt-4">
        <a
          className="inline-block text-white bg-purple-700 rounded-full px-3 py-2 text-sm font-semibold mr-2 my-1 cursor-pointer hover:bg-purple-900 text-center"
          // href={`${item.pdf}`} 
          onClick={()=>DownloadFile(item.pdf)}
          download 
          rel="noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  </div>
  )
}

export default NoteCard
