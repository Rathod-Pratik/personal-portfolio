const express=require('express');
const app=express.Router();
const {sendCode} =require('./printData');

app.get('/',(res,req)=>{
    const data={
            code:sendCode('HTML/code/all.html'),
            explanation: "HTML (HyperText Markup Language) is the standard language used to create and structure content on the web. It provides the basic structure of websites, which is then enhanced and modified by other technologies like CSS (for styling) and JavaScript (for interactivity). HTML elements are the building blocks of all websites and are represented by tags that define various types of content.",
            topics: [
              {
                "topic": "HTML Structure",
                "description": "HTML documents are structured with tags that wrap content, specifying different elements like headings, paragraphs, links, images, etc. The essential structure includes: <!DOCTYPE html> (declares the document type as HTML), <html> (the root element), <head> (contains meta-information), and <body> (holds the main content)."
              },
              {
                "topic": "HTML Tags and Elements",
                "description": "HTML tags are enclosed within angle brackets (< >) and usually come in pairs: an opening tag and a closing tag. Elements represent different types of content or structure, such as <h1> - <h6> (headings), <p> (paragraph), <a> (anchor for links), and <img> (image)."
              },
              {
                "topic": "Attributes",
                "description": "Attributes provide additional information about elements and are included within the opening tag. Common attributes include src (for image URLs), href (for hyperlink URLs), and alt (for alternative text on images)."
              },
              {
                "topic": "Forms and Input Elements",
                "description": "HTML forms are used to collect user input, with various input types such as <input type='text'> (single-line text), <textarea> (multi-line text), <button> (for submitting forms), and <select> (dropdown menu)."
              },
              {
                "topic": "Semantic Elements",
                "description": "Semantic HTML elements clearly describe their purpose, improving accessibility and SEO. Examples include <header>, <footer>, <article>, <section>, and <nav>, which convey the role of the content within."
              },
              {
                "topic": "HTML5 New Features",
                "description": "HTML5 introduced new elements and attributes such as new form controls (<date>, <email>), multimedia elements (<audio>, <video>), graphics (<canvas>, <svg>), and APIs like Geolocation and Web Storage for enhanced functionality."
              }
            ]
          }
          req.status(200).json(data);
})
module.exports=app;