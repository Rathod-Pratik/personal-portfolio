import React,{useEffect} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
const NoteCard = ({index,item}) => {

    useEffect(() => {
        AOS.init();
      }, []);
      const DownloadFile = async (fileUrl) => {
        try {
            // Fetch the file from the given URL (S3 URL)
            const response = await fetch(fileUrl);
            
            if (!response.ok) {
                throw new Error('File not found');
            }
    
            // Convert the response to a Blob
            const blob = await response.blob();
    
            // Create an object URL for the Blob
            const downloadUrl = window.URL.createObjectURL(blob);
    
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'file.pdf';  // You can customize the download file name
            document.body.appendChild(link);
    
            // Trigger the download by simulating a click
            link.click();
    
            // Clean up by removing the link and revoking the object URL
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
    
        } catch (error) {
            console.error('Error downloading the file:', error);
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
