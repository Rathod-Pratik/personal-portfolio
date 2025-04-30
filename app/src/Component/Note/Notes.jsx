import React,{useEffect} from 'react'
import { apiClient } from '../../lib/api-Client';
import axios from 'axios';
import { useAppStore } from '../../store';
const Card = ({item}) => {

  const {setProgress} =useAppStore()
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
    className="w-[300px] h-[310px] rounded-lg border shadow-md bg-slate-800 border-black flex flex-col items-center p-6 overflow-hidden"
    data-aos="zoom-in"
  >
    {/* Image Section */}
    <img src={`${item.note_image_url}`} className="mb-4 w-[7rem] h-[7rem] object-cover" />
  
    {/* Title */}
    <h5 className="mb-1 text-xl font-medium text-white text-center">
      {item.title}
    </h5>
  
    {/* Description (Fixed Size) */}
    <span className="text-sm text-gray-400 text-center w-full line-clamp-3 overflow-hidden">
      {item.description}
    </span>
  
    {/* Button Section (Sticks to Bottom) */}
    <div className="mt-auto w-full flex justify-center">
      <a
        className="text-white bg-purple-700 rounded-full px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-purple-900 text-center"
        onClick={() => DownloadFile(item.note_pdf_url, item.title)}
        rel="noreferrer"
      >
        Download PDF
      </a>
    </div>
  </div>
  
  )
}

export default Card
