const express=require('express');
const app=express.Router();
const {sendPdf, sendPhoto}=require('./PrintData');
const path = require('path');
app.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            file_name: "php",
            description: "PHP is a widely-used server-side scripting language that is especially suited for web development. It is open-source, easy to learn, and integrates seamlessly with HTML, making it an ideal choice for building dynamic web pages and server-side applications.",
            pdf: `/pdf/Php notes.pdf`,   // URL to fetch the base64 PDF
            logo: `/photo/php.png`,      // URL to fetch the base64 image
        },
        {
            _id: 2,
            file_name: "JavaScript",
            description: "JavaScript is a versatile, client-side scripting language commonly used for creating interactive and dynamic web pages. It enables developers to build rich user interfaces, handle events, and interact with APIs, making it an essential tool for modern web development.",
            pdf: `/pdf/Js notes.pdf`,
            logo: `/photo/Javascript.png`,
        },
        {
            _id: 3,
            file_name: "C++",
            description: "C++ is a powerful, high-performance programming language that builds on the foundations of C. Known for its efficiency, it is widely used for system software, game development, and applications requiring complex computation. It supports both procedural and object-oriented programming, offering flexibility and control over system resources.",
            pdf: `/pdf/c++ notes.pdf`,
            logo: `/photo/c++ notes.pdf`,
        },
        {
            _id: 4,
            file_name: "React",
            description: " React is a popular JavaScript library for building user interfaces, particularly single-page applications. It allows developers to create reusable UI components, manage complex state, and efficiently render dynamic content. React's component-based architecture makes it easy to develop fast and scalable web applications.",
            pdf: `/pdf/React notes.pdf`,
            logo: `/photo/React.png`,
        }
    ];

    res.status(200).json(data);
});

app.get('/:fileName', (req, res) => {
    const { fileName } = req.params;
    const base64Data = sendPdf(path.join('PDFS', fileName));
    if (base64Data) {
        res.json({ data: base64Data });
    } else {
        res.status(404).json({ error: 'PDF file not found or could not be read' });
    }
});

// Endpoint to serve base64-encoded images
app.get('/photo/:fileName', (req, res) => {
    const { fileName } = req.params;
    const base64Data = sendPhoto(path.join('PDF/logo', fileName));
    if (base64Data) {
        res.json({ data: base64Data });
    } else {
        res.status(404).json({ error: 'PDF file not found or could not be read' });
    }
});
module.exports=app;