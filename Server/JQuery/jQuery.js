const express = require("express");
const app = express.Router();
const path=require('path');
/*Code of jQuery in html format*/
const { sendCode} = require("./PrintData");
const selector = sendCode("./jQuery/jQuery/1_Selector.html");
const Event = sendCode("./jQuery/jQuery/2_Event.html");
const Hide_show_toggle = sendCode("./jQuery/jQuery/3_hide show and toggle.html");
const fade = sendCode("./jQuery/jQuery/4_fade.html");
const slide = sendCode("./jQuery/jQuery/5_slide.html");
const animation = sendCode("./jQuery/jQuery/6_animation.html");
const callback = sendCode("./jQuery/jQuery/7_Callback.html");
const Dom_manipulation = sendCode("./jQuery/jQuery/8_Dom manipulation.html");

/*video of an output*/
const output1 = "/Output/selector.png";
const output2 = "/Output/Event.png";
const output3 = "/Output/Hide show and toggle.png";
const output4 = "/Output/fade.png";
const output5 = "/Output/Slide.png";
const output6 = "/Output/animation.png";
const output7 = "/Output/Callback.png";
const output8 = "/Output/Dom manipulation.png";

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

app.get("/", (req, res) => {
  const data = [
    {
      _id:1,
      output: output1,
      code: selector,
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
      output: output2,
      code: Event,
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
      output: output3,
      code: Hide_show_toggle,
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
      output: output4,
      code: fade,
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
      output: output5,
      code: slide,
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
      output: output6,
      code: animation,
      file_name: "animation",
      explanation:
        "The `animate()` method is an inbuilt method in jQuery which is used to change the state of the element with CSS style. This method can also be used to change the CSS property to create the animated effect for the selected element. ",
      topics: [
        "animate(): This method performs a custom animation on the selected elements.",
      ],
    },
    {
      _id:7,
      output: output7,
      code: callback,
      file_name: "callBack",
      explanation:
        "A callback function is a function that is passed as an argument to another function and is executed after the completion of that function. This programming concept is fundamental in JavaScript, particularly for handling asynchronous operations such as API requests, timers, or event listeners. For instance, when you use the setTimeout() function, you can pass a callback to be executed after a specified delay. This allows developers to manage the flow of execution in their programs, ensuring that certain tasks only run once their dependencies are fulfilled.",
      topics: [
        "callback: A callback function is a function that is passed as an argument to another function, and is executed by that function.",
      ],
    },
    {
      _id:8,
      output: output8,
      code: Dom_manipulation,
      file_name: "Dom mainpulation",
      explanation:
        "DOM (Document Object Model) manipulation refers to the process of dynamically changing the structure, style, or content of a webpage through JavaScript. This can include adding, removing, or modifying elements and their attributes, allowing developers to create interactive and responsive web applications.",
      topics: [
        "DOM manipulation: This refers to the ability to dynamically modify the structure and content of a web page using JavaScript.",
      ],
    },
  ];
  res.status(200).json(data);
});
module.exports = app;
