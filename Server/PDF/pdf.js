const express = require('express');
const path = require('path');
const fs = require("fs");
const router = express.Router();
const { promises: fsPromises } = fs;
router.get("/download-pdf", async (req, res) => {
    try {
      const { filePath } = req.query;
  
      if (!filePath) {
        return res.status(400).send("File path is required.");
      }
  
      const secureBasePath = path.resolve(__dirname, "./data"); // Base directory for PDFs
      const fullPath = path.resolve(secureBasePath, filePath); // Resolve the full path
  
      // Validate the path to prevent directory traversal
      if (!fullPath.startsWith(secureBasePath)) {
        return res.status(403).send("Access to this file is not allowed.");
      }
  
      // Check if file exists asynchronously
      try {
        await fsPromises.access(fullPath); // Ensure file is accessible
      } catch (error) {
        console.log("File not found:", fullPath);
        return res.status(404).send("File not found.");
      }
  
      req.on("aborted", () => {
        console.warn("Request aborted by the client.");
      });
  
      // Send the file with error handling for download
      res.download(fullPath, path.basename(fullPath), (err) => {
        if (err) {
          if (err.code === 'ECONNABORTED') {
            // Client aborted the request, just log the abort and do nothing further
            console.warn("Download request aborted by client.");
          } else {
            // Log other errors
            console.error("Error downloading file:", err);
            if (!res.headersSent) {
              return res.status(500).send("Error downloading the PDF.");
            }
          }
        }
      });
    } catch (error) {
      console.error("Error in sending PDF:", error);
      if (!res.headersSent) {
        res.status(500).send("Internal Server Error");
      }
    }
  });
router.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            file_name: "php",
            description: "PHP is a widely-used server-side scripting language.", 
             pdf: `PHP.pdf`,   
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/php.png', 
        },
        {
            _id: 2,
            file_name: "JavaScript",
            description: "JavaScript is a versatile, client-side scripting language.",
            description: "JavaScript is a versatile, client-side scripting language.",
            pdf: `JavaScript.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/Javascript.png',
        },
        {
            _id: 3,
            file_name: "C++",
            description: "C++ is a powerful, high-performance programming language.",
            pdf: `cpp.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/c%2B%2B.png',
        },
        {
            _id: 4,
            file_name: "React",
            description: "React is a popular JavaScript library for building user interfaces.",
            pdf: `React.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/React.png',
        },
        {
            _id: 5,
            file_name: "RDBMS",
            description: "RDBMS is software that stores, organizes, and manages data.",
            pdf: `ORACLE.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/Oracle',
        }
    ];

    res.status(200).json(data);
});

module.exports = router;