import React,{useEffect} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
const NoteCard = ({index,item}) => {

    useEffect(() => {
        AOS.init();
      }, []);
      const DownloadFile = async (fileUrl) => {
        try {
            const response = await fetch(fileUrl, {
                method: 'GET',
            });
    
            if (!response.ok) {
                throw new Error(`Failed to fetch the file. Status: ${response.status}`);
            }
    
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
    
            const link = document.createElement('a');
            link.href = downloadUrl;
            // link.download = 'file.pdf'; // Default name for the downloaded file
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
    
            // Revoke the URL to free up memory
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('Error downloading the PDF:', error);
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
