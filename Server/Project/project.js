const express = require('express');
const path=require('path');
const { sendCode, sendPhoto } = require('./PrintData');
const { url } = require('inspector');
const app = express.Router();
app.get('/Output/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(__dirname, 'Output', fileName);

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
            description: "A simple yet elegant digital clock application that displays the current time in a user-friendly interface. Built using HTML, CSS, and JavaScript",
            output: '/Output/clock.png',
            code: [
                { path: sendCode('Project/code/Analog clock/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Analog clock/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Analog clock/style.css'), name: "style.css" }
            ],
        },
        {
            _id: 2,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Calculator",
            demo:"https://rathod-calculator.netlify.app",
            difficulty :"easy",
            file_name: "Calculator",
            language: ["HTML", "CSS", "JavaScript"],
            description: "A sleek and functional calculator application designed to perform basic arithmetic operations with ease. Built using HTML, CSS, and JavaScript.",
            output: '/Output/calculator.png',
            code: [
                { path: sendCode('Project/code/Calculator/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Calculator/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Calculator/style.css'), name: "style.css" }
            ]
        },
        {
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Laptop%20shop",
            difficulty :"easy",
            demo:"https://laptop-shop-homepage.netlify.app",
            language: ["HTML", "CSS", "JavaScript"],
            description: "Laptop Show Home Page A visually appealing and interactive homepage designed for a laptop showcase website.Built with HTML, CSS, and JavaScript.",
            _id: 3,
            file_name: "Laptop Shop",
            output: '/Output/laptop shop.png',
            code: [
                { path: sendCode('Project/code/Laptop shop/CSS/response.css'), name: "response.css" },
                { path: sendCode('Project/code/Laptop shop/CSS/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Laptop shop/index.html'), name: "index.html" }
            ]
        },
        {
            _id: 4,
            note:"Not Responsive",
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Myntra%20clone",
            demo:"https://my-rathod-clone.netlify.app",
            difficulty :"easy",
            language: ["HTML", "CSS", "JavaScript"],
            file_name: "Myntra clone",
            description: "A comprehensive e-commerce website replica inspired by the popular fashion platform Myntra. This clone, built using HTML, CSS, and JavaScript",
            output: '/Output/myntra clone.png',
            code: [
                { path: sendCode('Project/code/Myntra clone/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Myntra clone/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Myntra clone/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Myntra clone/utilits.css'), name: "utilits.css" }
            ]
        },
        {
            demo:"https://rathod-password-generator.netlify.app",
            difficulty :"easy",
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Password%20Generator",
            language: ["HTML", "CSS", "JavaScript"],
            _id: 5,
            description: "A secure and user-friendly password generator application that creates strong, random passwords with customizable options. Built with HTML, CSS, and JavaScript.",
            file_name: "Password generator",
            output: '/Output/password generator.png',
            code: [
                { path: sendCode('Project/code/Password Generator/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Password Generator/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Password Generator/style.css'), name: "style.css" }
            ]
        },
        {
            difficulty :"easy",
            note:"Not Responsive",
            _id: 6,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Todo%20list",
            demo:"https://rathod-todo-list.netlify.app",
            file_name: "Todo List",
            language: ["HTML", "CSS", "JavaScript"],
            description: 'To-Do List A dynamic and interactive to-do list application designed to help users organize their tasks efficiently. Created using HTML, CSS, and JavaScript.',
            output: '/Output/todo list.png',
            code: [
                { path: sendCode('Project/code/Todo list/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Todo list/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Todo list/script.js'), name: "script.js" }
            ]
        },
        {
            difficulty :"easy",
            _id: 7,
            url:"https://github.com/Rathod-Pratik/Projects/tree/main/Weather%20app",
            demo:"https://rathod-weather-app.netlify.app",
            file_name: "Weather app",
            language: ["HTML","Bootstrap", "JavaScript"],
            output: '/Output/weather app.png',
            description: "An intuitive weather application that provides real-time weather updates for any location. Built with HTML, CSS, and JavaScript.",
            code: [
                { path: sendCode('Project/code/Weather app/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Weather app/script.js'), name: "script.js" }
            ]
        },
        {
            _id:8,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Dice%20Game",
            demo:"https://my-dice-games.netlify.app",
            difficulty:"easy",
            note:"Not Responsive",
            file_name: "Dice Game",
            language:["React","CSS"],
            output:'/Output/dice game.png',
            description:"Create a simple, interactive dice game. This project is a fun way to practice DOM manipulation, random number generation, and event handling with React.",
            code:[
                {path:sendCode('Project/code/Dice Game/src/App.css'),name:"app.css"},
                {path:sendCode('Project/code/Dice Game/src/App.jsx'),name:"App.jsx"},
                Component=[
                    {path:sendCode('Project/code/Dice Game/src/Component/Home.jsx'),name:"Home.jsx"},
                    {path:sendCode("Project/code/Dice Game/src/Component/Gameplay.jsx"),name:"Gameplay.jsx"},
                    {path:sendCode('Project/code/Dice Game/src/Component/Number.jsx'),name:"Number"},
                    {path:sendCode('Project/code/Dice Game/src/Component/RoleDice.jsx'),name:"RoleDice.jsx"},
                    {path:sendCode('Project/code/Dice Game/src/Component/Rules.jsx'),name:"Rules.jsx"},
                    {path:sendCode('Project/code/Dice Game/src/Component/score.jsx'),name:"score.jsx"},
                    {path:sendCode('Project/code/Dice Game/src/Styled/button.js'),name:"button.js"},
                    
                ],
            ]
        },
        {
            _id:9,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Contect%20form",
            demo:"https://contect-form.netlify.app",
            difficulty:"easy",
            file_name: "Contect Form",
            language:["React","CSS"],
            description:"Build a clean and responsive form using React that captures basic user information. This project focuses solely on frontend design, allowing you to create and style a form with fields like name, email, and password, along with a submit button.",
            output:'/Output/Contect form.png',
            code:[
                {path:sendCode('Project/code/Contect form/src/App.jsx'),name:"App.jsx"},
                {path:sendCode("Project/code/Contect form/src/App.css"),name:"App.css"},
                Component=[
                    [
                        {path:sendCode('Project/code/Contect form/src/component/button/button.jsx'),name:"button.jsx"},
                    {path:sendCode('Project/code/Contect form/src/component/button/button.module.css'),name:"button.module.css"}
                ],
                    [
                        {path:sendCode("Project/code/Contect form/src/component/Contect/ContectHeader.jsx"),name:"ContectHeader.jsx"},
                    {path:sendCode("Project/code/Contect form/src/component/Contect/ContectHeader.module.css"),name:"ContectHeader.module.css"}],
                    [{path:sendCode("Project/code/Contect form/src/component/ContectForm/ContectForm.jsx"),name:"ContectForm.jsx"},
                    {path:sendCode('Project/code/Contect form/src/component/ContectForm/ContectForm.module.css'),name:"contectForm.module.css"}],
                    [{path:sendCode('Project/code/Contect form/src/component/Navbar/Navbar.jsx'),name:"Navbar.jsx"},
                    {path:sendCode('Project/code/Contect form/src/component/Navbar/Navbar.module.css'),name:"Navbar.module.css"}]
                ]
            ]
        },
        {
            _id:10,
            url:"https://github.com/Rathod-Pratik/React/tree/main/FireBase-Contect",
            demo:"https://firebase-contect.netlify.app",
            difficulty:"hard",
            file_name: "FireBase-Contect",
            language:["React","TailwindCSS","FireBase"],
            output:'/Output/FireBase-Contect.png',
            description:"Design a simple and stylish Contact App using React to manage a list of contacts. This project includes a responsive user interface where users can view, add, and organize contact information such as names, phone numbers, and email addresses.",
            code:[
                {path:sendCode('Project/code/FireBase-Contect/src/App.jsx'),name:"App.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/index.css'),name:"index.css"},
                Component=[
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Navbar.jsx'),name:"Navbar.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Home.jsx'),name:"Home.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Login.jsx'),name:"Login.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Signup.jsx'),name:"Signup.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/AddAndUpdateContect.jsx'),name:"AddAndUpdateContect.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/ContectCard.jsx'),name:"ContectCard.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Model.jsx'),name:"Model.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/NotFoundContect.jsx'),name:"NotFoundContect.jsx"},
                ]
            ]
        },
        {
            _id:11,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Text%20editor",
            demo:"https://rathod-text-editor.netlify.app",
            difficulty:"medium",
            language:["React","CSS"],
            file_name: "Text-editor",
            output:'/Output/text-editor.png',
            description:"Develop a fully functional Text Editor using React, complete with a range of text formatting options such as bold, italic, underline, and text alignment. This project focuses on creating a dynamic and responsive user interface.",
            code:[
                {path:sendCode('Project/code/Text editor/src/App.js'), name:"App.js"},
                {path:sendCode('Project/code/Text editor/src/index.css'),name:"index.css"},
                Component=[
                    {path:sendCode('Project/code/Text editor/src/component/Navbar.js'),name:"Navbar.jsx"},
                    {path:sendCode('Project/code/Text editor/src/component/TextForm.js'),name:"TextForm.jsx"},
                    {path:sendCode('Project/code/Text editor/src/component/Alert.js'),name:"Alert.jsx"}
                ]
            ]
        },
        {
            _id:12,
            demo:"https://my-food-zone.netlify.app",
            difficulty:"medium",
            url:"https://github.com/Rathod-Pratik/React/tree/main/Food_shop",
            file_name: "Food Zone",
            language:["React","NodeJs","expressJS"],
            output:'/Output/food_shop.png',
            description:"Create a dynamic Food Shop application using React that fetches a variety of food items from a server. This project allows users to browse, search, and filter through the food items based on categories, ingredients, or other criteria.",
            /*Add fronted and backend diffrent code */
            code:[
                frontend=[
                    {path:sendCode('Project/code/Food_shop/app/src/App.jsx'),name:"App.jsx"},
                    {path:sendCode('Project/code/Food_shop/app/src/main.jsx'),name:"main.jsx"},
                    {path:sendCode('Project/code/Food_shop/app/src/components/FoodItem.jsx'),name:"FoodItem.jsx"}   
                ],
                backend=[
                    {path:sendCode('Project/code/Food_shop/Backend/index.js'),name:"index.jsx"},
                    {path:sendCode('Project/code/Food_shop/Backend/api/index.js'),name:"Data.js"},
                ]
            ]
        },
        {
            _id:13,
            url:"https://github.com/Rathod-Pratik/React/tree/main/Brand_Page",
            demo:"https://rathod-brand-page.netlify.app",
            difficulty:"easy",
            note:"Not Responsive",
            language:["React","CSS"],
            file_name: "Brand Page",
            output:'/Output/Brand page.png',
            description:"Create an engaging Brand Page using React to showcase a collection of brands available in your e-commerce or product-based application. This page includes brand logos, descriptions, and links to view products under each brand.",
            code:[
                {path:sendCode('Project/code/Brand_Page/src/App.jsx'),name:"App.jsx"},
                {path:sendCode('Project/code/Brand_Page/src/App.css'),name:"App.css"},
                {path:sendCode('Project/code/Brand_Page/src/Components/Navbar.jsx'),name:"Navbar.jsx"},
                {path:sendCode("Project/code/Brand_Page/src/Components/Item.jsx"),name:"Item.jsx"}
            ]
        },
        {
            _id:14,
            url:"https://github.com/Rathod-Pratik/React/tree/main/iNotebook",
            demo:"https://my-notebook-pratik.netlify.app",
            difficulty:"hard",
            file_name: "iNotebook",
            language:["React","TailwindCSS","ExpressJs","NodeJs","MongoDB"],
            output:'/Output/inotebook.png',
            description:"Develop a feature-rich iNotebook application using React to help users manage their notes effectively. This app allows users to create, edit, and delete notes, with the option to organize them by category or tag.",
            code:[
                frontend=[
                    {path:sendCode('Project/code/iNotebook/App/src/App.jsx'),name:"App.jsx"},
                    {path:sendCode('Project/code/iNotebook/App/src/index.css'),name:"index.css"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/Login.jsx'),name:"Login.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/SignUp.jsx'),name:"SignUp.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/Home.jsx'),name:"Home.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/Navbar.jsx'),name:"Navbar.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/About.jsx'),name:"About.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/Notes.jsx'),name:"Notes.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/NoteItem.jsx'),name:"NoteItem.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/Alert.jsx'),name:"Alert.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/contect/notes/Notestate.jsx'),name:"NoteState.jsx"},
                        {path:sendCode('Project/code/iNotebook/App/src/Component/contect/notes/noteContect.jsx'),name:"NoteContect.jsx"}
                ],
                backend=[
                    {path:sendCode('Project/code/iNotebook/Backend/index.js'),name:"index.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/Model/Note.js'),name:"Note.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/Model/User.js'),name:"User.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/functions/auth.js'),name:"Auth.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/functions/notes.js'),name:"notes.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/functions/connection.js'),name:"connection.js"},
                    {path:sendCode('Project/code/iNotebook/Backend/middleware/fetchuser.js'),name:"fetchuser.js"}
                ]
            ]
        }
    ]
    res.status(200).json(data);
})

module.exports = app;