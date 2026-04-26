import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolvePrivateObjectUrl } from "@utils/s3Upload";

export const DownloadFile = async (fileUrl: string, fileName: string) => {
    try {
      const downloadableUrl = await resolvePrivateObjectUrl(fileUrl);

      const response = await axios.get(downloadableUrl, {
        responseType: "blob", // Important to handle binary data
      });
      if (!fileName.endsWith(".pdf")) {
        fileName += ".pdf";
      }
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName; // Specify the file name
      document.body.appendChild(link);
      link.click();
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  export const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};