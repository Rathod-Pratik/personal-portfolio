const express = require("express");
const app = express.Router();
const path=require('path');
const fs = require('fs').promises;


app.get("/", async(req, res) => {
  async function sendCode(codeItems) {
    try {
      if (Array.isArray(codeItems)) {
        return Promise.all(
          codeItems.map(async (item) => {
            try {
              const functionCodeData = item.function_code 
                ? await fs.readFile(item.function_code, "utf8") 
                : null;
              return {
                function_name: item.function_name,
                function_code: functionCodeData,
                output: item.output || null // Include output path if provided
              };
            } catch (error) {
              console.error(`Error reading file ${item.function_code}:`, error);
              return {
                function_name: item.function_name,
                function_code: null,
                output: item.output || null
              };
            }
          })
        );
      } else {
        const data = await fs.readFile(codeItems, "utf8");
        return data;
      }
    } catch (error) {
      console.error("Error reading files:", error);
      throw new Error("Failed to read files");
    }
  }

  try{
  const files = [
    {
      _id:1,
      output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/selector.png",
       code: "Public/JQuery/jQuery/1_Selector.html",
      file_name: "selectors",
      explanation:
        "A jQuery selector is a function that is used to select or manipulate one or more HTML elements from an HTML document. It plays a significant role in jQuery, allowing you to target and select elements based on their name, id, classes, types, attributes , values of attributes, and much more.",
      topics: [
        "element selector: Selects an element based on its name.",
        "id selector: Selects an element based on its id.",
        "class selector: Selects an element based on its class.",
        "attribute selector: Selects an element based on its attribute.",
      ],
    },
    {
      _id:2,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/Event.png",
      code: "Public/JQuery/jQuery/2_Event.html",
      file_name: "Event",
      explanation:
        "In jQuery, an event is an action that occurs when a user interacts with an HTML element, such as clicking a button, hovering over an image, or submitting a form. Events allow you to respond to these interactions and perform specific actions when they occur.",
      topics: [
        "click: This event is triggered when the user clicks an element.",
        "dblclick: This event is triggered when the user double-clicks an element.",
        "mouseenter: This event is triggered when the user moves the mouse pointer over an element.",
        "mouseleave: This event is triggered when the user moves the mouse pointer out of an element.",
        "mousemove: This event is triggered when the user moves the mouse pointer over an element.",
        "mouseover: This event is triggered when the user moves the mouse pointer over an element.",
        "mouseout: This event is triggered when the user moves the mouse pointer out of an element.",
        "keydown: This event is triggered when the user presses a key on the keyboard.",
        "keypress: This event is triggered when the user presses a key on the keyboard.",
        "keyup: This event is triggered when the user releases a key on the keyboard.",
        "focus: This event is triggered when an element gains focus.",
        "blur: This event is triggered when an element loses focus.",
      ],
    },
    {
      _id:3,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/Hide show and toggle.png",
      code: "Public/JQuery/jQuery/3_hide show and toggle.html",
      file_name: "Hide ,show and toggle",
      explanation:
        "The `hide()` method is used to hide an element. When an element is hidden, it is removed from the layout, and the space it occupied is closed up.The `.show()` method is used to show an element. When an element is shown, it is added back to the layout, and the space it occupies is reopened. The `.toggle()` method is used to toggle the visibility of an element. If the element is visible, it is hidden, and if it is hidden, it is shown.",
      topics: [
        "hide(): This method hides the selected elements.",
        "show(): This method shows the selected elements.",
        "toggle(): This method toggles the visibility of the selected elements.",
      ],
    },
    {
      _id:4,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/fade.png",
      code: "Public/JQuery/jQuery/4_fade.html",
      file_name: "Fade",
      explanation:
        "Fade effects refer to the gradual change in an element's opacity, creating a smooth transition between visible and invisible states. This effect is often used to draw attention to important content or to create a more polished user experience. Like slide effects, fade effects can be implemented using CSS transitions, keyframes, or JavaScript libraries.",
      topics: [
        "fadeIn(): This method is used to fade in an element, making it visible. The element will be displayed with a fading motion from transparent to opaque.",
        "fadeOut(): This method is used to fade out an element, making it hidden. The element will be hidden with a fading motion from opaque to transparent.",
        "fadeToggle(): This method is used to toggle the visibility of an element with a fading motion. If the element is visible, it will be faded out and hidden, and if it is hidden, it will be faded in and displayed.",
      ],
    },
    {
      _id:5,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/Slide.png",
      code: "Public/JQuery/jQuery/5_slide.html",
      file_name: "Slide",
      explanation:
        "Slide effects are commonly used in web development to create smooth transitions when showing or hiding elements. This effect typically involves moving an element up or down (or left and right) in a way that mimics physical sliding.",
      topics: [
        "slideDown(): This method slides down the selected elements.",
        "slideUp(): This method slides up the selected elements.",
        "slideToggle(): This method toggles the slide effect of the selected elements.",
      ],
    },
    {
      _id:6,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/animation.png",
      code: "Public/JQuery/jQuery/6_animation.html",
      file_name: "animation",
      explanation:
        "The `animate()` method is an inbuilt method in jQuery which is used to change the state of the element with CSS style. This method can also be used to change the CSS property to create the animated effect for the selected element. ",
      topics: [
        "animate(): This method performs a custom animation on the selected elements.",
      ],
    },
    {
      _id:7,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/Callback.png",
      code: "Public/JQuery/jQuery/7_Callback.html",
      file_name: "callBack",
      explanation:
        "A callback function is a function that is passed as an argument to another function and is executed after the completion of that function. This programming concept is fundamental in JavaScript, particularly for handling asynchronous operations such as API requests, timers, or event listeners. For instance, when you use the setTimeout() function, you can pass a callback to be executed after a specified delay. This allows developers to manage the flow of execution in their programs, ensuring that certain tasks only run once their dependencies are fulfilled.",
      topics: [
        "callback: A callback function is a function that is passed as an argument to another function, and is executed by that function.",
      ],
    },
    {
      _id:8,
      output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/jQuery+Output/Dom manipulation.png",
      code: "Public/JQuery/jQuery/8_Dom manipulation.html",
      file_name: "Dom mainpulation",
      explanation:
        "DOM (Document Object Model) manipulation refers to the process of dynamically changing the structure, style, or content of a webpage through JavaScript. This can include adding, removing, or modifying elements and their attributes, allowing developers to create interactive and responsive web applications.",
      topics: [
        "DOM manipulation: This refers to the ability to dynamically modify the structure and content of a web page using JavaScript.",
      ],
    },
  ];
  const data = await Promise.all(
    files.map(async (file) => ({
      output:file.output,
      _id: file._id,
      file_name: file.file_name,
      code: await sendCode(file.code), // Now properly awaiting
      explanation: file.explanation,
      topics: file.topics
    }))
  );

  res.status(200).json(data);
} catch (error) {
  console.error("Error processing request:", error);
  res.status(500).json({ message: "bav error ava cha yar", error: error.message }); // Improved error response
}
});
module.exports = app;
