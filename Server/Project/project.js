const express = require('express');
const path=require('path');
const { url } = require('inspector');
const app = express.Router();
app.get('/', (req, res) => {
    /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
    const data = [
        {
            _id: 1,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Analog%20clock",
            demo:"https://its-my-clock.netlify.app",
            difficulty :"easy",
            file_name: "Analog clock",
            language: ["HTML", "CSS", "JavaScript"],
            description: "A simple yet elegant digital clock application that displays the current time in a user-friendly interface.",
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/clock.png'
        },
        {
            _id: 2,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Calculator",
            demo:"https://rathod-calculator.netlify.app",
            difficulty :"easy",
            file_name: "Calculator",
            language: ["HTML", "CSS", "JavaScript"],
            description: "A sleek and functional calculator application designed to perform basic arithmetic operations with ease.",
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/calculator.png',
        },
        {
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Laptop%20shop",
            difficulty :"easy",
            demo:"https://laptop-shop-homepage.netlify.app",
            language: ["HTML", "CSS", "JavaScript"],
            description: "Laptop Home Page A visually appealing and interactive homepage designed for a laptop showcase website.",
            _id: 3,
            file_name: "Laptop Shop",
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/laptop shop.png',
        },
        {
            _id: 4,
            note:"Not Responsive",
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Myntra%20clone",
            demo:"https://my-rathod-clone.netlify.app",
            difficulty :"easy",
            language: ["HTML", "CSS", "JavaScript"],
            file_name: "Myntra clone",
            description: "A comprehensive e-commerce website replica inspired by the popular fashion platform Myntra. This clone, ",
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/myntra clone.png',
        },
        {
            demo:"https://rathod-password-generator.netlify.app",
            difficulty :"easy",
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Password%20Generator",
            language: ["HTML", "CSS", "JavaScript"],
            _id: 5,
            description: "A secure and user-friendly password generator application that creates strong, random passwords with customizable options.",
            file_name: "Password generator",
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/password generator.png',
        },
        {
            difficulty :"easy",
            _id: 7,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Weather%20app",
            demo:"https://rathod-weather-app.netlify.app",
            file_name: "Weather app",
            language: ["HTML","Bootstrap", "JavaScript"],
            output: 'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/weather app.png',
            description: "An intuitive weather application that provides real-time weather updates for any location.Note:if api expire demo will not work",
        },
        {
            _id:8,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Dice%20Game",
            demo:"https://my-dice-games.netlify.app",
            difficulty:"easy",
            note:"Not Responsive",
            file_name: "Dice Game",
            language:["React","CSS"],
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/dice game.png',
            description:"interactive dice game. This project is a fun way to practice DOM manipulation, random number generation, and event handling with React."
        },
        {
            _id:10,
            url:"https://github.com/Rathod-Pratik/React/tree/main/FireBase-Contect",
            demo:"https://firebase-contect.netlify.app",
            difficulty:"hard",
            file_name: "FireBase-Contect",
            language:["React","TailwindCSS","FireBase"],
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/FireBase-Contect.png',
            description:"This project includes a responsive user interface where users can view, add, and organize contact information such as names, phone numbers, and email addresses."
        },
        {
            _id:11,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Text%20editor",
            demo:"https://rathod-text-editor.netlify.app",
            difficulty:"medium",
            language:["React","CSS"],
            file_name: "Text-editor",
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/text-editor.png',
            description:"Develop a fully functional Text Editor using React, complete with a range of text formatting options such as bold, italic, underline, and text alignment.",
        },
        {
            _id:12,
            demo:"https://my-food-zone.netlify.app",
            difficulty:"medium",
            url:"https://github.com/Rathod-Pratik/React/tree/main/Food_shop",
            file_name: "Food Zone",
            language:["React","NodeJs","expressJS"],
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/food_shop.png',
            description:"This project allows users to browse, search, and filter through the food items based on categories, ingredients, or other criteria.",
        },
        {
            _id:14,
            url:"https://github.com/Rathod-Pratik/React/tree/main/iNotebook",
            demo:"https://my-notebook-pratik.netlify.app",
            difficulty:"hard",
            file_name: "iNotebook",
            language:["React","TailwindCSS","ExpressJs","NodeJs","MongoDB"],
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/inotebook.png',
            description:"This app allows users to create, edit, and delete notes, with the option to organize them by category or tag.",
        },
        {
            _id:15,
            url:"https://github.com/Rathod-Pratik/Website-Market",
            demo:"https://website-markets.vercel.app",
            difficulty:"hard",
            file_name: "website-Market",
            language:["NextJs","TailwindCSS","ExpressJs","NodeJs","MongoDB","Clerk"],
            output:'https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Project+Output/website-markets.png',
            description:"Welcome to Website Market, your go-to platform for buying and selling website code! Whether you're a developer looking to monetize your web projects in need of a fully functional website.",
        }
    ]
    res.status(200).json(data);
})

module.exports = app;