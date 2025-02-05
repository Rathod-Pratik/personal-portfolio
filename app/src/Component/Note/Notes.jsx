import React,{useEffect} from 'react'
import { apiClient } from '../../lib/api-Client';
import axios from 'axios';
const Card = ({index,item,setProgress}) => {

  const DownloadFile = async (fileUrl, fileName) => {
    setProgress(10);
    try {
        const response = await axios.get(fileUrl, {
            responseType: "blob", // Important to handle binary data
        });
        if (!fileName.endsWith('.pdf')) {
          fileName += '.pdf';
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
          onClick={()=>DownloadFile(item.pdf,item.file_name)} 
          rel="noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  </div>
  )
}

export default Card
