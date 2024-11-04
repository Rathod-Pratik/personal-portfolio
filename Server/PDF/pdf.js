const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            file_name: "php",
            description: "PHP is a widely-used server-side scripting language.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDFS/Php pdf_compressed.pdf`,   
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/php.png', 
        },
        {
            _id: 2,
            file_name: "JavaScript",
            description: "JavaScript is a versatile, client-side scripting language.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDFS/Js pdf_compressed.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/Javascript.png',
        },
        {
            _id: 3,
            file_name: "C++",
            description: "C++ is a powerful, high-performance programming language.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDFS/c++ notes_compressed.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/c++.png',
        },
        {
            _id: 4,
            file_name: "React",
            description: "React is a popular JavaScript library for building user interfaces.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDFS/React pdf_compressed.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/React.png',
        }
    ];

    res.status(200).json(data);
});

module.exports = router;