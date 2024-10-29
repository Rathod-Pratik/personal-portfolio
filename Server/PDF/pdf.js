const express = require('express');
const path = require('path');
const router = express.Router();

// Serve static files for PDFs and images
// router.get('/PDF/:fileName', (req, res) => {
router.get('/PDF/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'Content/PDFS', fileName);

    // Set headers to force download for PDFs
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
    res.setHeader("Content-Type", "application/pdf");

    res.sendFile(filePath);
});

router.get('/logo/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'Content/logo', fileName);

    // Set content type for images
    const contentTypeMap = {
        svg: "image/svg+xml",
        ico: "image/x-icon",
        png: "image/png",
        jpg: "image/jpeg",
    };
    const fileExtension = fileName.split(".").pop().toLowerCase();
    const contentType = contentTypeMap[fileExtension] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);

    res.sendFile(filePath);
});

// Function to get image URL for streaming

router.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            file_name: "php",
            description: "PHP is a widely-used server-side scripting language.",
            pdf: `/PDF/Php pdf_compressed.zip`,   
            logo: '/logo/php.png', 
        },
        {
            _id: 2,
            file_name: "JavaScript",
            description: "JavaScript is a versatile, client-side scripting language.",
            pdf: `/PDF/Js pdf_compressed.zip`,
            logo: '/logo/Javascript.png',
        },
        {
            _id: 3,
            file_name: "C++",
            description: "C++ is a powerful, high-performance programming language.",
            pdf: `/PDF/c++ notes_compressed.pdf`,
            logo: '/logo/c++.png',
        },
        {
            _id: 4,
            file_name: "React",
            description: "React is a popular JavaScript library for building user interfaces.",
            pdf: `/PDF/React pdf_compressed.zip`,
            logo: '/logo/React.png',
        }
    ];

    res.status(200).json(data);
});

module.exports = router;