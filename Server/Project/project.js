const express = require('express');
const { sendCode, sendPhoto } = require('./PrintData');
const app = express.Router();

app.get('/', (req, res) => {
    const data = [
        {
            _id: 1,
            difficulty :"easy",
            file_name: "Analog clock",
            language: ["HTML", "CSS", "JavaScript"],
            description: "A simple yet elegant digital clock application that displays the current time in a user-friendly interface. Built using HTML, CSS, and JavaScript, this clock provides real-time updates and can be easily customized to fit various design themes. Perfect for integrating into web pages or using as a standalone tool.",
            output: sendPhoto('Project/Output/clock.png'),
            code: [
                { path: sendCode('Project/code/Analog clock/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Analog clock/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Analog clock/style.css'), name: "style.css" }
            ],
        },
        {
            _id: 2,
            difficulty :"easy",
            file_name: "Calculator",
            language: ["HTML", "CSS", "JavaScript"],
            description: "A sleek and functional calculator application designed to perform basic arithmetic operations with ease. Built using HTML, CSS, and JavaScript, this project features an intuitive interface that allows users to input numbers and operations seamlessly. Ideal for everyday calculations, it showcases responsive design and interactive elements, making it a practical tool for users of all ages.",
            output: sendPhoto('Project/Output/calculator.png'),
            code: [
                { path: sendCode('Project/code/Calculator/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Calculator/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Calculator/style.css'), name: "style.css" }
            ]
        },
        {
            difficulty :"easy",
            language: ["HTML", "CSS", "JavaScript"],
            description: "Laptop Show Home Page A visually appealing and interactive homepage designed for a laptop showcase website.Built with HTML, CSS, and JavaScript, this project features a clean layout that highlights various laptop models, specifications, and prices.With responsive design elements and smooth navigation, it offers users an engaging experience while exploring the latest laptop offerings.",
            _id: 3,
            file_name: "Laptop Shop",
            output: sendPhoto('Project/Output/laptop shop.png'),
            code: [
                { path: sendCode('Project/code/Laptop shop/CSS/response.css'), name: "response.css" },
                { path: sendCode('Project/code/Laptop shop/CSS/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Laptop shop/index.html'), name: "index.html" }
            ]
        },
        {
            _id: 4,
            difficulty :"easy",
            language: ["HTML", "CSS", "JavaScript"],
            file_name: "Myntra clone",
            description: "A comprehensive e-commerce website replica inspired by the popular fashion platform Myntra. This clone, built using HTML, CSS, and JavaScript, mimics the look, feel, and functionality of Myntra, complete with product listings, filtering options, and a user-friendly interface. Ideal for learning and showcasing web development skills in building responsive and interactive shopping experiences.",
            output: sendPhoto('Project/Output/myntra clone.png'),
            code: [
                { path: sendCode('Project/code/Myntra clone/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Myntra clone/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Myntra clone/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Myntra clone/utilits.css'), name: "utilits.css" }
            ]
        },
        {
            difficulty :"easy",
            language: ["HTML", "CSS", "JavaScript"],
            _id: 5,
            description: "A secure and user-friendly password generator application that creates strong, random passwords with customizable options. Built with HTML, CSS, and JavaScript, this tool allows users to specify password length and include special characters, numbers, and uppercase letters for enhanced security. Perfect for safeguarding online accounts with unique, hard-to-guess passwords.",
            file_name: "Password generator",
            output: sendPhoto('Project/Output/password generator.png'),
            code: [
                { path: sendCode('Project/code/Password Generator/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Password Generator/script.js'), name: "script.js" },
                { path: sendCode('Project/code/Password Generator/style.css'), name: "style.css" }
            ]
        },
        {
            difficulty :"easy",
            _id: 6,
            file_name: "Todo List",
            language: ["HTML", "CSS", "JavaScript"],
            description: 'To-Do List A dynamic and interactive to-do list application designed to help users organize their tasks efficiently. Created using HTML, CSS, and JavaScript, this app allows users to add, edit, and delete tasks, with an intuitive interface that makes task management easy and enjoyable. Ideal for daily planning and boosting productivity.',
            output: sendPhoto('Project/Output/todo list.png'),
            code: [
                { path: sendCode('Project/code/Todo list/style.css'), name: "style.css" },
                { path: sendCode('Project/code/Todo list/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Todo list/script.js'), name: "script.js" }
            ]
        },
        {
            difficulty :"easy",
            _id: 7,
            file_name: "Weather app",
            language: ["HTML","Bootstrap", "JavaScript"],
            output: sendPhoto('Project/Output/weather app.png'),
            description: "An intuitive weather application that provides real-time weather updates for any location. Built with HTML, CSS, and JavaScript, this app fetches live weather data, displaying temperature, humidity, and other conditions in a visually appealing interface. Easily customizable, it’s a handy tool for users to stay updated on weather conditions worldwide. note:If the api is expire the temperature will show undefined you can use your api to use it",
            code: [
                { path: sendCode('Project/code/Weather app/index.html'), name: "index.html" },
                { path: sendCode('Project/code/Weather app/script.js'), name: "script.js" }
            ]
        },
        {
            _id:8,
            difficulty:"easy",
            file_name: "Dice Game",
            language:["React","CSS"],
            output:sendPhoto('Project/Output/dice game.png'),
            description:"Create a simple, interactive dice game where users can roll two dice and see who gets the higher score! Each player rolls a dice, and the player with the highest dice number wins the round. This project is a fun way to practice DOM manipulation, random number generation, and event handling with React.",
            code:[
                {path:sendCode('Project/code/Dice Game/src/App.css'),name:"app.css"},
                {path:sendCode('Project/code/Dice Game/src/App.jsx'),name:"App.jsx"},
                {path:sendCode('Project/code/Dice Game/src/Component/Home.jsx'),name:"Home.jsx"},
                {path:sendCode("Project/code/Dice Game/src/Component/Gameplay.jsx"),name:"Gameplay.jsx"},
                {path:sendCode('Project/code/Dice Game/src/Component/Number.jsx'),name:"Number"},
                {path:sendCode('Project/code/Dice Game/src/Component/RoleDice.jsx'),name:"RoleDice.jsx"},
                {path:sendCode('Project/code/Dice Game/src/Component/Rules.jsx'),name:"Rules.jsx"},
                {path:sendCode('Project/code/Dice Game/src/Component/score.jsx'),name:"score.jsx"},
                {path:sendCode('Project/code/Dice Game/src/Styled/button.js'),name:"button.js"},
            ]
        },
        {
            _id:9,
            difficulty:"easy",
            language:["React","CSS"],
            description:"Build a clean and responsive form using React that captures basic user information. This project focuses solely on frontend design, allowing you to create and style a form with fields like name, email, and password, along with a submit button. With this project, you’ll practice component creation, state management, and CSS styling in React to create an intuitive and aesthetically pleasing form interface.",
            output:sendPhoto('Project/Output/Contect form.png'),
            code:[
                {path:sendCode('Project/code/Contect form/src/App.jsx'),name:"App.jsx"},
                {path:sendCode("Project/code/Contect form/src/App.css"),name:"App.css"},
                {path:sendCode('Project/code/Contect form/src/component/button/button.jsx'),name:"button.jsx"},
                {path:sendCode('Project/code/Contect form/src/component/button/button.module.css'),name:"button.module.css"},
                {path:sendCode("Project/code/Contect form/src/component/Contect/ContectHeader.jsx"),name:"ContectHeader.jsx"},
                {path:sendCode("Project/code/Contect form/src/component/Contect/ContectHeader.module.css"),name:"ContectHeader.module.css"},
                {path:sendCode("Project/code/Contect form/src/component/ContectForm/ContectForm.jsx"),name:"ContectForm.jsx"},
                {path:sendCode('Project/code/Contect form/src/component/ContectForm/ContectForm.module.css'),name:"contectForm.module.css"},
                {path:sendCode('Project/code/Contect form/src/component/Navbar/Navbar.jsx'),name:"Navbar.jsx"},
                {path:sendCode('Project/code/Contect form/src/component/Navbar/Navbar.module.css'),name:"Navbar.module.css"}
            ]
        },
        {
            _id:10,
            difficulty:"medium",
            language:["React","TailwindCSS"],
            output:sendPhoto('Project/Output/FireBase-Contect.png'),
            description:"Design a simple and stylish Contact App using React to manage a list of contacts. This project includes a responsive user interface where users can view, add, and organize contact information such as names, phone numbers, and email addresses. The focus is on frontend development, allowing you to build and style components for a user-friendly experience. Practice component-based design, state management, and styling techniques to create a polished contact list interface.",
            code:[
                {path:sendCode('Project/code/FireBase-Contect/src/App.jsx'),name:"App.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/index.css'),name:"index.css"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Navbar.jsx'),name:"Navbar.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Home.jsx'),name:"Home.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Login.jsx'),name:"Login.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Signup.jsx'),name:"Signup.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/AddAndUpdateContect.jsx'),name:"AddAndUpdateContect.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/ContectCard.jsx'),name:"ContectCard.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/Model.jsx'),name:"Model.jsx"},
                {path:sendCode('Project/code/FireBase-Contect/src/Components/NotFoundContect.jsx'),name:"NotFoundContect.jsx"},
            ]
        },
        {
            _id:11,
            difficulty:"medium",
            language:["React","CSS"],
            output:sendCode('Project/Output/text-editor.png'),
            description:"Develop a fully functional Text Editor using React, complete with a range of text formatting options such as bold, italic, underline, and text alignment. This project focuses on creating a dynamic and responsive user interface where users can easily type and format text. By building this app, you will practice component-based design, state management, and event handling in React, while also incorporating CSS for a clean and modern look. This project is ideal for enhancing your React skills and creating a flexible text editing tool.",
            code:[
                {path:sendCode('Project/code/Text editor/src/App.js'), name:"App.js"},
                {path:sendCode('Project/code/Text editor/src/index.css'),name:"index.css"},
                {path:sendCode('Project/code/Text editor/src/component/Navbar.js'),name:"Navbar.jsx"},
                {path:sendCode('Project/code/Text editor/src/component/TextForm.js'),name:"TextForm.jsx"},
                {path:sendCode('Project/code/Text editor/src/component/Alert.js'),name:"Alert.jsx"}
            ]
        },
        {
            _id:12,
            difficulty:"medium",
            language:["React","NodeJs","expressJS"],
            output:sendPhoto('Project/Output/food_shop.png'),
            description:"Create a dynamic Food Shop application using React that fetches a variety of food items from a server. This project allows users to browse, search, and filter through the food items based on categories, ingredients, or other criteria. You’ll work with React hooks to fetch data from an API, manage state for filtering and searching, and render the results in a responsive and user-friendly layout. This project is an excellent opportunity to practice React components, API integration, and state management while building an intuitive shopping interface for food lovers.",
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
            difficulty:"easy",
            language:["React","CSS"],
            output:sendPhoto('Project/Output/Brand page.png'),
            description:"Create an engaging Brand Page using React to showcase a collection of brands available in your e-commerce or product-based application. This page includes brand logos, descriptions, and links to view products under each brand. You can enhance the user experience with features like filtering, sorting, and quick navigation options. This project is a great way to practice working with React components, managing state for filters, and applying CSS to create a visually appealing and informative page that highlights each brand's unique identity.",
            code:[
                {path:sendCode('Project/code/Brand_Page/src/App.jsx'),name:"App.jsx"},
                {path:sendCode('Project/code/Brand_Page/src/App.css'),name:"App.css"},
                {path:sendCode('Project/code/Brand_Page/src/Components/Navbar.jsx'),name:"Navbar.jsx"},
                {path:sendCode("Project/code/Brand_Page/src/Components/Item.jsx"),name:"Item.jsx"}
            ]
        },
        {
            _id:14,
            difficulty:"Hard",
            language:["React","TailwindCSS","ExpressJs","NodeJs","MongoDB"],
            output:sendPhoto('Project/Output/inotebook.png'),
            description:"Develop a feature-rich iNotebook application using React to help users manage their notes effectively. This app allows users to create, edit, and delete notes, with the option to organize them by category or tag. Integrate backend functionality to securely store and retrieve notes, enabling user authentication and authorization. iNotebook also includes a search and filter feature to quickly find specific notes. This project offers an excellent opportunity to practice full-stack development with React, building RESTful APIs, and implementing CRUD operations for a seamless note-taking experience.",
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
                    {path:sendCode('Project/code/iNotebook/App/src/Component/Alert.jsx'),name:"Altert.jsx"},
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