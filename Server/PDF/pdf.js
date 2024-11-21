const express = require('express');
const path = require('path');
const router = express.Router();

// router.get('/download/:filename', (req, res) => {
//   const filename = req.params.filename; 
//   const filePath = path.join(__dirname, './data', filename); 

//   // Send the file to the client
//   res.sendFile(filePath, (err) => {
//     if (err) {
//       res.status(404).send('File not found');
//     }
//   });
// });
router.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            file_name: "php",
            description: "PHP is a widely-used server-side scripting language.", 
             pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDF/Php.pdf`,   
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/php.png', 
        },
        {
            _id: 2,
            file_name: "JavaScript",
            description: "JavaScript is a versatile, client-side scripting language.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDF/Javascript.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/Javascript.png',
        },
        {
            _id: 3,
            file_name: "C++",
            description: "C++ is a powerful, high-performance programming language.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDF/Cpp.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/c%2B%2B.png',
        },
        {
            _id: 4,
            file_name: "React",
            description: "React is a popular JavaScript library for building user interfaces.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDF/React.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/React.png',
        },
        {
            _id: 5,
            file_name: "RDBMS",
            description: "RDBMS is software that stores, organizes, and manages data.",
            pdf: `https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/PDF/Oracle.pdf`,
            logo: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/pdf+logo/Oracle',
        }
    ];

    res.status(200).json(data);
});

module.exports = router;