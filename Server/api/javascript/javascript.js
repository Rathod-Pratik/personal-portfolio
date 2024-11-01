const express = require("express");
const app = express.Router();
const path =require('path');
const fs = require('fs').promises;
async function sendCode(filePaths) {
  try {
    if (Array.isArray(filePaths)) {
      return Promise.all(filePaths.map(async (file) => {
        try {
          const data = await fs.readFile(file.function_code, "utf8");
          return {
            function_name: file.function_name,
            function_code: data,
          };
        } catch (error) {
          console.error(`Error reading file ${file.function_code}:`, error);
          return { function_name: file.function_name, function_code: null }; // Return null or structured error
        }
      }));
    } else {
      const data = await fs.readFile(filePaths, "utf8");
      return data;
    }
  } catch (error) {
    console.error("Error reading files:", error);
    throw new Error("Failed to read files"); // Rethrow the error for handling in the route
  }
}

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
// /Output/Array%20method.png
app.get("/",async (req, res) => {
  try{
  /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
  const files = [
    {
      _id: 1,
      file_name:"Data Type",
      code: "javascript/code/01. datatype.html",
      output:"/Output/Data tye.png",
      explanation:
        "data types are the classifications of data that determine the kind of values a variable can hold and the operations that can be performed on that data. JavaScript is a dynamically typed language, meaning that variables can hold values of any type, and their type can change at runtime.",
      topics: [
        "String: Represents a sequence of characters enclosed in quotes (single, double, or backticks).",
        "Number: Represents both integer and floating-point numbers. JavaScript does not differentiate between different types of numbers.",
        "Boolean: Represents a logical entity that can have two values: true or false.",
        "Undefined: Represents a variable that has been declared but not yet assigned a value. The default value of uninitialized variables is undefined.",
        "Null: Represents an intentional absence of any object value. It is a primitive value that is often used to indicate `no value` or `empty`.",
        "Symbol: Introduced in ECMAScript 6 (ES6), symbols are unique and immutable identifiers often used as property keys.",
        "BigInt: Also introduced in ES11 (ES2020), BigInt allows you to represent integers with arbitrary precision. It is useful for very large integers.",
      ],
    },
    {
      _id: 2,
      file_name:"Operator",
      output:"/Output/operator.png",
      code: "javascript/code/02.operator.html",
      explanation:
        "operators are special symbols that perform operations on one or more operands (variables and values). They can be categorized into several types based on their functionality.",
      topics: [
        "Assignment Operations: Assigning values to variables using operators like =, +=, -=, and others to modify existing values.",
        "Comparison Operations: Comparing two values using operators such as ==, ===, !=, and others to evaluate their equality or inequality, returning Boolean results.",
        "Logical Operations: Combining multiple Boolean expressions using operators like &&, ||, and ! to determine logical outcomes based on the conditions.",
        "Bitwise Operations: Performing operations on the binary representation of numbers using operators such as &, |, ^, ~, and bit shifts (<<, >>) for low-level data manipulation.",
        "Ternary Operation: Utilizing the ternary operator ? : as a shorthand for if...else statements to evaluate conditions and return values based on those conditions.",
        "Type Operations: Using operators like typeof to check the type of a variable and instanceof to determine whether an object is an instance of a specific constructor.",
      ],
    },
    {
      _id: 3,
      output:"/Output/Conditional.png",
      file_name:"Conditional statement",
      code: "javascript/code/03. conditional statement.html",
      explanation:
        "conditional statements are used to execute specific blocks of code based on whether certain conditions are true or false. These statements help control the flow of a program by allowing different outcomes based on varying conditions.",
      topics: [
        "if Statement: Executes a block of code only if a specified condition is true.",
        "if...else Statement: Executes one block of code if the condition is true, and another block if it is false.",
        "if...else ladder Statement: Checks multiple conditions in sequence. The first condition that evaluates to true is executed, and the rest are ignored.",
        "switch Statement: Evaluates a single expression and matches it against multiple cases. When a match is found, the corresponding block of code is executed. It’s useful for checking a variable against multiple values.",
      ],
    },
    {
      _id: 4,
      output:"/Output/loop.png",
      file_name:"Loop",
      code: "javascript/code/04. Loop.html",
      explanation:
        "loops are used to execute a block of code repeatedly based on a specified condition, which is especially useful for tasks that require repetitive actions, such as iterating over arrays or generating sequences.",
      topics: [
        "For Loop: Executes a block of code a specific number of times, defined by an initializer, a condition, and an increment or decrement expression, making it ideal for iterating over arrays or performing repeated actions.",
        "While Loop: Repeatedly executes a block of code as long as the specified condition evaluates to true, providing flexibility when the number of iterations is not known beforehand.",
        "Do...While Loop: Similar to the while loop, but guarantees that the block of code executes at least once before checking the condition, allowing for scenarios where an initial execution is required.",
        "For...Of Loop: A modern way to iterate over iterable objects (like arrays, strings, or other collections), providing a simple syntax for accessing each element without needing to manage an index.",
        "For...In Loop: Iterates over the enumerable properties of an object, allowing you to access each key in the object, useful for object property enumeration, but less commonly used for arrays due to its behavior with inherited properties.",
      ],
    },
    {
      _id: 5,
      output:"/Output/Function.png",
      file_name:"Function",
      code: "javascript/code/05. function.html",
      explanation:
        "a function is a block of code that performs a specific task. Functions allow you to encapsulate code for reuse, which makes your code more organized, modular, and easier to maintain. PHP has many built-in functions, but you can also define your own custom functions.",
      topics: [
        "Function Declaration: Defines a named function that can be called elsewhere in the code, using the function keyword followed by the function name and a set of parentheses for parameters. This allows for code reusability and organization.",
        "Arrow Function: A concise syntax for writing function expressions introduced in ES6. Arrow functions do not have their own this, making them suitable for use in callbacks and methods where lexical scoping is desired.",
        "Callback Function: A function that is passed as an argument to another function and is executed after a certain event or condition is met, often used in asynchronous programming.",
        "Return Statement: Used to specify the value that a function should return when it is called, allowing the result of the function to be used elsewhere in the code.",
      ],
    },
    {
      _id: 6,
      output:"/Output/String function.png",
      file_name:"String function",
      code: "javascript/code/06. string function.html",
      explanation:
        "string functions are built-in functions that allow you to manipulate and manage text. They cover a wide range of operations, such as finding the length of a string, converting case, searching for substrings, replacing text, and more.",
      topics: [
        "Template Literals: A modern way to create strings using backticks, allowing for embedded expressions and multi-line strings.",
        "String Comparison: Compares two strings lexicographically, returning a Boolean result based on their relative order.",
        "String Concatenation: Combines two or more strings into one using the + operator or the concat() method.",
        "String Indexing: Accesses individual characters in a string using their index, where indexing starts at 0.",
        "String Length: Retrieves the number of characters in a string, providing information about its size.",
      ],
    },
    {
      _id: 7,
      output:"/Output/Array method.png",
      file_name:"Array methods",
      code: "javascript/code/07. Array method.html",
      explanation:
        "an array is a data structure that allows you to store multiple values in a single variable. Arrays are useful for organizing and managing a collection of related data elements, which can be accessed and manipulated easily. PHP arrays can hold values of different data types, including integers, strings, and even other arrays, making them highly versatile.",
      topics: [
        "Reverse: Reverses the elements of an array in place and returns the reversed array, modifying the original array.",
        "Sort: Sorts the elements of an array in place and returns the sorted array, modifying the original array.",
        "Array Length: Returns the number of elements in an array, providing information about its size. ",
        "Push: Adds one or more elements to the end of an array and returns the new length of the array.",
        "Pop: Removes the last element from an array and returns that element, modifying the original array.",
        "Shift: Removes the first element from an array and returns that element, shifting all other elements down. ",
        "Unshift: Adds one or more elements to the beginning of an array and returns the new length of the array.",
        "Slice: Returns a shallow copy of a portion of an array into a new array, specified by a start and end index. ",
        "Splice: Adds or removes elements from an array at a specified index, modifying the original array and returning the removed elements.",
        "ForEach: Executes a provided function once for each array element, allowing for iteration over the array.",
        "Map: Creates a new array populated with the results of calling a provided function on every element in the original array. ",
        "Filter: Creates a new array with all elements that pass the test implemented by the provided function. ",
        "Reduce: Executes a reducer function on each element of the array, resulting in a single output value, useful for accumulating results. ",
        "IndexOf: Returns the first index at which a specified element can be found in the array, or -1 if it is not present.",
      ],
    },
    {
      _id: 8,
      output:"/Output/loop in array.png",
      file_name:"Loops in array",
      code: "javascript/code/08. Loop in array.html",
      explanation: "A loop in an array is a fundamental concept in programming, allowing you to traverse each element of the array and perform operations on it. Arrays store multiple values in a single variable, and a loop helps process these values efficiently. By using different types of loops such as for, while, or forEach (in JavaScript), you can iterate over each element in the array to read, modify, or evaluate it.",
      topics: [
        "Map: A method that creates a new array populated with the results of applying a provided function to every element in the original array. It does not modify the original array and is commonly used for transforming data.",
        " Filter: A method that creates a new array with all elements that pass the test implemented by the provided function. This is useful for selecting a subset of elements from the original array based on specific criteria.",
        "Reduce: A method that executes a reducer function on each element of the array, resulting in a single output value. It is often used to accumulate results, such as summing numbers or combining objects. It takes an optional initial value as its second argument, which can influence the final result.",
      ],
    },
    {
      _id: 9,
      file_name:"Console object",
      output:"/Output/Console object.png",
      code: "javascript/code/09. console object.html",
      explanation:
        "Console functions are built-in methods that allow developers to output information to the web console, aiding in debugging and monitoring the execution of JavaScript code. They provide various functionalities for logging messages, displaying data, and tracking errors.",
      topics: [
        "console.log(): Outputs a message to the console, which can be useful for debugging and monitoring variable values.",
        "console.error(): Outputs an error message to the console, typically displayed in red, indicating a problem in the code.",
        "console.warn(): Outputs a warning message to the console, usually displayed in yellow, to alert developers about potential issues.",
        "console.info(): Outputs informational messages to the console, typically styled differently from regular logs to signify important information.",
        "console.table(): Displays data in a tabular format, making it easier to visualize arrays and objects.",
        "console.group(): Starts a new group in the console, allowing for nested logging, which can be helpful for organizing related messages.",
        "console.time() and console.timeEnd(): Used to track the duration of a code execution by starting and stopping a timer.",
      ],
    },
    {
      _id: 10,
      output:"",
      file_name:"Alert,prompt and confirm",
      code: "javascript/code/10. Alert.prompt and confirm.html",
      explanation:
        "Alert, prompt, and confirm are built-in JavaScript functions used for interacting with users through dialog boxes. They enable developers to display messages, collect user input, and confirm actions, enhancing user engagement within web applications.",
      topics: [
        "alert(): Displays a simple dialog box with a specified message and an OK button, often used for notifying users of important information or warnings.",
        "prompt(): Opens a dialog box that prompts the user to enter input, returning the input value as a string or null if the user cancels, facilitating data collection.",
        "confirm(): Displays a dialog box with a specified message and OK and Cancel buttons, allowing users to confirm or deny an action, returning true for OK and false for Cancel.",
      ],
    },
    {
      _id: 11,
      output:"/Output/ChildNode.png",
      file_name:"childNode",
      code: "javascript/code/11. childNode .html",
      explanation:
        "childNode is a property in JavaScript that allows you to access the child nodes of a specified DOM element. This property returns a NodeList, which includes all child nodes, such as element nodes, text nodes, and comment nodes. It is useful for navigating and manipulating the DOM by accessing a node’s immediate children.",
      topics: [
        "childNodes Property: A property of a DOM element that returns a live NodeList of all child nodes, including text and comment nodes.",
        "Accessing Children: Each node within childNodes can be accessed via an index, similar to an array, though it is a NodeList, not an actual array.",
        "Node Types: childNodes includes all types of nodes, so it can return more than just element nodes, which is useful for complete DOM traversal.",
        "Working with Element Nodes: If you need only element nodes, children is typically used instead of childNodes, as it excludes non-element nodes like text.",
        "Iterating Over childNodes: You can use loops like for, for...of, or forEach to iterate through childNodes and manipulate each child accordingly.",
      ],
    },
    {
      _id: 12,
      file_name:"Element naviagation",
      output:"/Output/element navigation.png",
      code: "javascript/code/12. Element naviagation.html",
      explanation:
        "Element navigation in JavaScript refers to methods and properties used to traverse and manipulate elements in the DOM. These allow you to access and interact with parent, child, and sibling elements of a specified element, enabling dynamic modifications to the web page's structure and content.",
      topics: [
        "parentNode: Accesses the parent of the specified element, allowing traversal up the DOM tree.",
        "firstChild and lastChild: Retrieves the first and last child nodes of an element, which may include text or comment nodes.",
        "firstElementChild and lastElementChild: Specifically retrieves the first and last child elements, excluding text and comment nodes.",
        "nextSibling and previousSibling: Accesses the next and previous sibling nodes of an element, which could include text or comment nodes.",
        "nextElementSibling and previousElementSibling: Specifically accesses the next and previous sibling elements, excluding text and comment nodes, which is useful for navigating between actual element nodes.",
      ],
    },
    {
      _id: 13,
      file_name:"Table naviagation",
      output:"/Output/table navigation.png",
      code: "javascript/code/13. Table navigation.html",
      explanation:
        "Table navigation in JavaScript involves methods and properties that allow you to access and manipulate specific parts of an HTML table, such as rows, cells, headers, and footers. These enable dynamic interaction with table elements, making it easy to modify content, style, or structure on-the-fly.",
      topics: [
        "rows Property: Accesses a collection of all rows (<tr> elements) within a table, enabling iteration over and manipulation of individual rows.",
        "cells Property: Provides access to all cells (<td> or <th> elements) within a specified row, allowing for interaction with individual cell data.",
        "tHead and tFoot Properties: Accesses the table header (<thead>) and footer (<tfoot>) elements, which are useful for styling or modifying table headers and footers.",
        "tBodies Property: Returns a collection of all <tbody> elements within a table, allowing for navigation and manipulation of multiple table body sections.",
        "caption Property: Retrieves or sets the <caption> element of a table, enabling modification of the table's caption text or styling.",
      ],
    },
    {
      _id: 14,
      output:"/Output/Dom accessing.png",
      code: "javascript/code/14. Dom access.html",
      file_name:"Dom access",
      explanation:
        "DOM access in JavaScript involves methods and properties used to locate and retrieve specific elements within the Document Object Model (DOM). These allow you to select elements by various criteria, enabling dynamic updates and interactions with the web page's content and structure.",
      topics: [
        "getElementById: Selects an element based on its unique ID, providing a direct and efficient way to access a specific element.",
        "getElementsByClassName: Retrieves a collection of elements that share a specified class name, allowing for batch manipulation of elements with common styles or attributes.",
        "getElementsByTagName: Returns a collection of elements with a specified tag name, useful for accessing groups of similar elements, like all paragraphs or divs.",
        "querySelector: Selects the first element that matches a specified CSS selector, offering flexibility in targeting elements using various criteria.",
        "querySelectorAll: Retrieves a static NodeList of all elements that match a specified CSS selector, enabling access to multiple elements at once for bulk operations.",
      ],
    },
    {
      _id: 15,
      output:"/Output/closest , matches and contains.png",
      code: "javascript/code/15. closest matches and contains.html",
      file_name:"closest ,match and contains",
      explanation:
        "The closest and contains methods in JavaScript are useful for DOM traversal and hierarchy checks. They help you identify specific elements relative to others in the DOM structure, facilitating targeted navigation and verification of element relationships.",
      topics: [
        "closest: Traverses up the DOM tree from a specified element, returning the nearest ancestor (or the element itself) that matches a given CSS selector. This is useful for finding a parent element with specific attributes or classes.",
        "contains: Checks if a specified element is a descendant of another element, returning true if it is and false otherwise. This is helpful for verifying relationships between elements, especially when determining if an element is nested within another.",
      ],
    },
    {
      output:"/Output/innerHTML and outerHTML.png",
      _id: 16,
      file_name:"innerHTML and outerHTML",
      code: "javascript/code/16. innerHTML and outerHTML.html",
      explanation:
        "The innerHTML and outerHTML properties in JavaScript allow you to access or modify the HTML content of elements within the DOM. These properties are commonly used for dynamically updating or replacing content on a web page.",
      topics: [
        "innerHTML: Retrieves or sets the HTML content inside an element, excluding the element itself. It’s useful for updating the content of an element without affecting the element’s structure.",
        "outerHTML: Retrieves or sets the HTML content of an element, including the element itself. When used to set content, it replaces the element entirely, along with its content and attributes.",
      ],
    },
    {
      _id: 17,
      output:"/Output/attribute method.png",
      file_name:"Attribute method",
      code: "javascript/code/17. attribute method.html",
      explanation:
        "Attribute methods in JavaScript allow you to manipulate the attributes of HTML elements. They provide functionality to get, set, and remove attributes, enabling dynamic updates to element properties like class, id, href, and more.",
      topics: [
        "getAttribute: Retrieves the value of a specified attribute from an element, which is useful for accessing current attribute values, such as src in an <img> tag.",
        "setAttribute: Sets or updates the value of a specified attribute on an element, allowing you to dynamically modify properties like class, id, or style.",
        "removeAttribute: Removes a specified attribute from an element, which can be used to clear unnecessary attributes or reset element properties to default behavior.",
        "hasAttribute: Checks if an element has a specified attribute, returning true if it exists and false otherwise. This is useful for conditional logic based on attribute presence.",
      ],
    },
    {
      _id: 18,
      output:"/Output/inserting method.png",
      code: "javascript/code/18. inserting method.html",
      file_name:"inserting method",
      explanation:
        "Inserting methods in JavaScript are used to dynamically add new elements to the DOM. These methods allow you to insert elements at various positions relative to existing elements, enabling flexible manipulation of the page’s content structure.",
      topics: [
        "appendChild: Adds a new child element as the last child of a specified parent element, which is useful for appending items like list elements or divs.",
        "insertBefore: Inserts a new element before a specified reference element within the same parent, allowing precise control over element order.",
        "insertAdjacentHTML: Inserts HTML content at a specified position relative to an element, with options for 'beforebegin', 'afterbegin', 'beforeend', and 'afterend', offering versatility in placement.",
        "prepend: Adds a new child element as the first child of a specified parent element, useful for inserting elements at the beginning of a container.",
        "replaceChild: Replaces an existing child element with a new one, providing a way to swap elements while maintaining the parent element structure.",
      ],
    },
    {
      _id: 19,
      output:"/Output/insertAdjacentHTML.png",
      code: "javascript/code/19. insertAdjacentHTML.html",
      file_name:"insertAdjacentHTML",
      explanation:
        "The insertAdjacentHTML method in JavaScript allows you to insert HTML content at a specific position relative to an existing element. This method provides flexibility for dynamically adding HTML without overwriting the element's existing content or having to create new nodes manually.",
      topics: [
        "beforebegin: Inserts the HTML content directly before the element itself, outside of the element's opening tag.",
        "afterbegin: Inserts the HTML content as the first child inside the element, right after the opening tag, making it useful for adding new content at the beginning of an element.",
        "beforeend: Inserts the HTML content as the last child inside the element, just before the closing tag, allowing you to append content to the end of an element.",
        "afterend: Inserts the HTML content directly after the element itself, outside of the element's closing tag.",
      ],
    },
    {
      _id: 20,
      output:"/Output/classList and className.png",
      file_name:"ClassList and className",
      code: "javascript/code/20. ClassList and className.html",
      explanation:
        "The classList and className properties in JavaScript are used to manipulate the CSS classes of an HTML element. They provide different functionalities for adding, removing, and toggling classes, allowing for dynamic styling and behavior changes.",
      topics: [
        "classList: A read-only property that returns a DOMTokenList representing the class attribute of the element. It provides methods like add(), remove(), toggle(), and contains() for easy manipulation of individual classes without affecting others.",
        "className: A string property that represents the entire class attribute of an element. It can be set to a new string value to overwrite all existing classes, but lacks the granular methods provided by classList.",
      ],
    },
    {
      _id: 21,
      output:"/Output/setinterval and setimeout.png",
      code: "javascript/code/21. setinterval and settimeout.html",
      file_name:"SetTimeout and setInterval",
      explanation:
        "The setInterval and setTimeout methods in JavaScript are used for executing code at specified intervals or after a certain delay, respectively. These methods enable developers to create timed actions and manage asynchronous behavior in web applications.",
      topics: [
        "setTimeout: Executes a specified function after a given delay (in milliseconds). It is useful for delaying actions, such as showing a message or redirecting after a timeout.",
        "setInterval: Repeatedly calls a specified function at regular intervals (in milliseconds) until it is stopped. This method is ideal for tasks like updating a clock or refreshing content at regular intervals.",
        "Clearing Timers: Both methods return a unique identifier that can be used with clearTimeout or clearInterval to stop the execution of the scheduled function, allowing for control over ongoing timers.",
      ],
    },
    {
      _id: 22,
      output:"/Output/event.png",
      code: "javascript/code/22. event.html",
      file_name:"Event",
      explanation:
        "In JavaScript, an event refers to any significant occurrence that happens within the browser, which can be detected and handled by the code. Events can be user interactions, such as clicks and key presses, or they can be triggered by the browser itself, such as page loads or resizing. Managing events effectively is crucial for creating interactive and responsive web applications.",
      topics: [
        "Event Types: Various types of events exist, including mouse events (click, dblclick), keyboard events (keydown, keyup), form events (submit, change), and others, allowing developers to respond to user actions.",
        "Event Listeners: Functions that are executed in response to specific events. Developers use methods like addEventListener to register these listeners on elements, enabling the execution of custom code when the event occurs.",
        "Event Object: A special object that is passed to event handler functions, containing information about the event, such as the type of event, the target element, and additional properties relevant to the event.",
        "Event Bubbling and Capturing: Two phases of event propagation. Bubbling allows events to propagate from the target element up to the root, while capturing allows events to flow from the root down to the target. Understanding this behavior is essential for effective event handling.",
        "Preventing Default Actions: The preventDefault() method can be called on the event object to prevent the default behavior of an event, such as stopping a form from submitting or preventing a link from navigating.",
      ],
    },
    {
      output:"/Output/eventListner.png",
      _id: 23,
      file_name:"Event Listner",
      code: "javascript/code/23. eventlistner.html",
      explanation:
        "An event listener in JavaScript is a function that waits for a specified event to occur on a particular element and then executes a callback function in response. This mechanism allows developers to create interactive web applications by responding to user actions such as clicks, key presses, or mouse movements.",
      topics: [
        "addEventListener: A method used to attach an event listener to a specified element, allowing the execution of a callback function when the event occurs. It supports multiple events and can accept options for handling events during capturing or bubbling phases.",
        "Removing Event Listeners: The removeEventListener method can be used to detach an event listener from an element, preventing the callback function from executing when the event occurs. This is useful for optimizing performance or when an event is no longer needed.",
        "Event Types: Event listeners can handle a wide variety of events, including mouse events (click, mouseover), keyboard events (keydown, keyup), form events (submit, input), and more, enabling responsive interactions.",
        "Event Delegation: A technique where a single event listener is attached to a parent element to handle events for multiple child elements. This is efficient and reduces memory usage, especially in dynamic lists or tables.",
        "Options Parameter: The addEventListener method can accept an options object to specify characteristics such as whether the event should be captured during the capturing phase or whether the listener should be executed only once.",
      ],
    },
    {
      _id: 24,
      output:"/Output/callback and handle error.png",
      code: "javascript/code/24. callback and handle error.html",
      file_name:"callback and error handle",
      explanation:
        "Callbacks in JavaScript are functions passed as arguments to other functions, which can be executed after certain tasks are completed. They are often used in asynchronous programming to handle tasks like API responses or event handling. Error handling in callbacks is essential to manage exceptions and ensure the application continues to run smoothly.",
      topics: [
        "Callbacks: Functions provided as arguments to other functions, which are executed once a specific operation is completed. They are commonly used for handling asynchronous operations, allowing for non-blocking execution.",
        "Error Handling: Implementing error handling within callbacks helps manage exceptions that may occur during asynchronous operations. This can be achieved using conventional error-first callback patterns, where the first argument of the callback function is an error object.",
        "Promisifying Callbacks: A technique to convert traditional callback-based functions into Promise-based functions, which provide a cleaner syntax for handling asynchronous operations using .then() and .catch() methods.",
        "Try-Catch in Callbacks: Although try-catch cannot be used directly for asynchronous code, it can be implemented within the callback function to catch synchronous errors that may arise during execution.",
        "Error Objects: Creating custom error objects within callback functions can provide meaningful feedback about what went wrong, which can be helpful for debugging and logging.",
      ],
    },
    {
      output:"/Output/pyramid of doom.png",
      _id: 25,
      code: "javascript/code/25. pyramid of doom.html",
      file_name:"pyramid of doom",
      explanation:
        "The 'pyramid of doom,' also known as 'callback hell,' refers to a situation in JavaScript programming where multiple nested callbacks create a pyramid-like structure in the code. This pattern often arises when dealing with asynchronous operations, leading to code that is difficult to read, maintain, and debug due to its deep indentation and complexity.",
      topics: [
        "Nested Callbacks: Callbacks defined within other callbacks to handle sequences of asynchronous operations. This can result in deeply nested structures that resemble a pyramid, making the code hard to follow.",
        "Readability Issues: As the nesting increases, the code becomes less readable, and the logical flow is obscured, making it challenging to understand the sequence of operations or identify errors.",
        "Debugging Challenges: Tracking down errors becomes more difficult in callback hell because the stack traces may not clearly indicate where the problem originated, leading to frustration during development.",
        "Refactoring Solutions: Techniques such as modularizing code, using named functions instead of anonymous ones, and employing Promises or async/await syntax can help flatten the pyramid structure and improve code maintainability.",
        "Using Promises: Promises provide a cleaner alternative to callbacks by allowing chaining of asynchronous operations, reducing the need for nested callbacks and flattening the code structure.",
      ],
    },
    {
      _id: 26,
      output:"/Output/Promise.png",
      code: "javascript/code/26. promise.html",
      file_name:"Promise",
      explanation:
        "A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation and its resulting value. Promises provide a cleaner and more manageable way to handle asynchronous operations compared to traditional callbacks, allowing for better error handling and chaining of operations.",
      topics: [
        "Promise States: A Promise can be in one of three states: pending (initial state), fulfilled (operation completed successfully), or rejected (operation failed). These states help manage the flow of asynchronous operations.",
        "Creating Promises: Promises are created using the Promise constructor, which takes a function with two parameters: resolve (to indicate success) and reject (to indicate failure).",
        "Chaining Promises: Promises allow for chaining using the .then() method, which executes a callback function when the Promise is fulfilled, and the .catch() method to handle any errors that occur during the process.",
        "Async/Await: A syntactical sugar built on top of Promises, allowing asynchronous code to be written in a more synchronous style. The async keyword is used to define an asynchronous function, and the await keyword pauses the execution until the Promise resolves.",
        "Error Handling: Promises provide a structured way to handle errors through the .catch() method or using try/catch blocks with async/await, making error management more straightforward than with nested callbacks.",
      ],
    },
    {
      _id: 27,
      output:"/Output/then and catch.png",
      file_name:"then and catach",
      code: "javascript/code/27. then and catch.html",
      explanation:
        "The .then() and .catch() methods in JavaScript are used with Promises to handle asynchronous operations. They provide a structured way to execute code after a Promise is fulfilled and to handle errors that may arise during the process, respectively.",
      topics: [
        ".then(): A method that is called when a Promise is fulfilled successfully. It takes up to two arguments: a callback function to execute when the Promise resolves and an optional callback for handling rejections, allowing for a cleaner flow of asynchronous logic.",
        ".catch(): A method used to handle errors or rejections from a Promise. It takes a single callback function that executes when the Promise is rejected, enabling centralized error handling and improving code readability.",
        "Chaining: Both .then() and .catch() can be chained, allowing for sequential handling of asynchronous operations. Each .then() returns a new Promise, which allows further chaining for additional processing or error handling.",
        "Returning Values: The return value of a .then() callback is automatically wrapped in a Promise, allowing subsequent .then() methods in the chain to receive that value. This enables a smooth flow of data between asynchronous operations.",
        "Error Propagation: If an error occurs in a .then() block and is not handled there, it can be caught in a subsequent .catch() block, allowing for comprehensive error management across a chain of asynchronous calls.",
      ],
    },
    {
      _id: 28,
      output:"/Output/promise chaining.png",
      file_name:"Promise chaining",
      code: "javascript/code/28. promise chaining.html",
      explanation:
        "Promise chaining in JavaScript is a technique that allows you to execute multiple asynchronous operations sequentially, with each operation dependent on the result of the previous one. This approach helps maintain cleaner and more manageable code by avoiding the 'pyramid of doom' associated with deeply nested callbacks.",
      topics: [
        "Sequential Execution: Each .then() method returns a new Promise, enabling you to chain additional .then() calls for further asynchronous tasks. This ensures that each task is executed only after the previous one has completed successfully.",
        "Passing Values: Values returned from one .then() callback are passed to the next .then() in the chain, allowing for smooth data flow between operations. This makes it easy to process and manipulate results from each step.",
        "Error Handling: Errors in any part of the chain can be caught using a single .catch() at the end of the chain, providing centralized error management and simplifying debugging.",
        "Returning Promises: If a .then() callback returns a Promise, the next .then() in the chain will wait for that Promise to resolve before executing. This allows for chaining multiple asynchronous calls, maintaining the sequence.",
        "Readability and Maintainability: Promise chaining leads to more readable and maintainable code, as it flattens the structure of asynchronous operations and clearly outlines the order of execution.",
      ],
    },
    {
        _id:29,
        topics:[
          "Promise Creation: Creating a promise using the Promise constructor with the executor function.",
          "Promise States: Understanding the three states of a promise: pending, fulfilled, and rejected.",
          "then: Using the .then() method to handle fulfilled promises and chaining multiple .then() calls.",
          "catch: Using the .catch() method to handle rejected promises and errors.",
          "finally: Using the .finally() method to execute code after the promise settles, regardless of the outcome.",
          "Promise.all: Handling multiple promises simultaneously and waiting for all to be fulfilled or any to be rejected.",
          "Promise.race: Running multiple promises and resolving or rejecting as soon as one of the promises resolves or rejects.",
          "Async/Await: Simplifying promise handling using async functions and the await keyword for more readable code.",
          "Error Handling: Managing errors in promise chains and with async/await.",
          "Chaining: Understanding how to chain promises and manage their results sequentially."
        ],
        output:"/Output/Handles to a promise.png",
        file_name:"Handles Promise",
        code:'javascript/code/29. Handles to a Promise.html',
        explanation: "Handles to a Promise in JavaScript refer to the methods and functions that allow you to interact with and manage the state of a Promise. These handles enable you to define what happens when a Promise is fulfilled, rejected, or still pending, facilitating effective asynchronous programming.", topics: [ "then(): A method that attaches a callback function to be executed when a Promise is fulfilled. It can also take a second callback to handle rejections, allowing for flexibility in handling outcomes.", "catch(): A method specifically designed to handle errors from a Promise. It executes a callback function when the Promise is rejected, providing a centralized way to manage errors in a Promise chain.", "finally(): A method that allows you to execute a callback function after a Promise is settled, regardless of whether it was fulfilled or rejected. This is useful for cleanup actions, such as hiding loading indicators.", "Promise.all(): A method that takes an array of Promises and returns a single Promise that resolves when all of the input Promises are fulfilled or rejects if any of the Promises are rejected. This is helpful for running multiple asynchronous tasks in parallel.", "Promise.race(): A method that takes an array of Promises and returns a single Promise that resolves or rejects as soon as one of the input Promises resolves or rejects. This allows you to respond to the first completed task, making it useful for timeouts or competing tasks." ]
    }
    ,{
      topics:[
        "Promise Constructor: Creating a new Promise using the Promise constructor.",
        "Promise States: Exploring the three states of a Promise (pending, fulfilled, rejected).",
        "then() Method: Handling fulfilled promises and chaining then calls for further processing.",
        "catch() Method: Handling errors and rejected promises using the catch method.",
        "finally() Method: Executing code after a promise settles, regardless of its outcome.",
        "Promise.all(): Running multiple promises concurrently and returning a single promise that resolves when all input promises are resolved.",
        "Promise.allSettled(): Returning a promise that resolves after all promises have settled, regardless of their outcome.",
        "Promise.race(): Returning a promise that resolves or rejects as soon as one of the promises resolves or rejects.",
        "Promise.any(): Returning a promise that resolves as soon as any of the promises in the iterable fulfills, or rejects if no promises fulfill.",
        "Promise.resolve(): Creating a resolved promise with a given value.",
        "Promise.reject(): Creating a rejected promise with a given reason."
      ]
      ,
        _id:30,
        output:"/Output/Promise API.png",
        file_name:"Promise API",
        code:'javascript/code/30. promise API.html',
        explanation: "The Promise API in JavaScript provides a set of methods and properties for working with Promises, allowing developers to manage asynchronous operations effectively. This API facilitates the creation, handling, and coordination of Promises, promoting cleaner and more maintainable code.", topics: [ "Promise Constructor: The Promise constructor is used to create a new Promise. It takes a function as an argument, which receives two parameters: resolve (to fulfill the Promise) and reject (to reject it), defining the asynchronous operation's outcome.", "Promise Methods: Key methods of the Promise API include then(), catch(), and finally(), which allow for handling fulfilled and rejected Promises, as well as executing cleanup code regardless of the outcome.", "Promise.all(): A static method that takes an iterable of Promises and returns a single Promise that resolves when all of the input Promises have been fulfilled or rejects if any of them are rejected. This is useful for executing multiple Promises in parallel and managing their results.", "Promise.race(): A static method that returns a Promise that resolves or rejects as soon as one of the Promises in the iterable resolves or rejects. This allows you to respond to the fastest completed Promise, which is helpful in scenarios like timeouts.", "Promise.resolve() and Promise.reject(): Static methods that return a Promise that is already resolved or rejected, respectively. These methods are useful for creating Promises from existing values or for standardizing error handling." ]
    },
    {
      topics:[
        "async Function Declaration: Defining a function as asynchronous using the async keyword.",
        "Await Expression: Using the await keyword to pause execution until a promise is resolved.",
        "Error Handling: Managing errors in async functions using try...catch blocks.",
        "Returning Values: How async functions return a promise that resolves to the value returned by the function.",
        "Async Iteration: Using for await...of to iterate over asynchronous data sources.",
        "Combining with Promises: Using async/await in conjunction with promise-based APIs for cleaner code.",
        "Nested Async Functions: Understanding how to manage multiple async functions and their results.",
        "Parallel Execution: Running multiple async functions in parallel using Promise.all with async/await.",
        "Performance Considerations: When to use async/await versus traditional promise chaining."
      ]
      ,
        _id:31,
        output:"/Output/async and await.png",
        file_name:"async and await",
        code:'javascript/code/31. async and await.html',
        explanation: "The async and await keywords in JavaScript are used to simplify the handling of asynchronous operations by allowing developers to write asynchronous code in a more synchronous style. This enhances readability and maintainability, making it easier to work with Promises.", topics: [ "async Function: Declaring a function with the async keyword allows it to return a Promise implicitly. This means that any value returned from the function will be wrapped in a Promise, making it easier to manage asynchronous operations.", "await Keyword: The await keyword can only be used inside an async function. It pauses the execution of the function until the Promise is resolved or rejected, allowing you to write code that appears sequential while handling asynchronous tasks.", "Error Handling: Errors in an async function can be managed using try/catch blocks, providing a clean and straightforward way to handle exceptions without needing to chain .catch() methods.", "Promise Chaining: Using await allows you to write code that resembles synchronous execution while still benefiting from the underlying Promise structure. This simplifies the chaining of asynchronous calls and makes the code easier to follow.", "Returning Values: The result of an awaited Promise can be directly assigned to a variable, allowing for seamless data manipulation and processing without additional callback functions." ]
},
{
  topics:[
    "Basic Syntax: Understanding the structure of try and catch blocks.",
    "Error Types: Different types of errors that can be caught (e.g., SyntaxError, ReferenceError).",
    "Throwing Errors: Using the throw statement to create custom errors.",
    "Finally Block: The use of the finally block for cleanup code that runs regardless of success or failure.",
    "Nested Try-Catch: Handling errors in nested try blocks for more complex error handling.",
    "Asynchronous Code: How try and catch work with async/await for handling promise rejections.",
    "Error Propagation: Understanding how errors can be propagated to higher scopes.",
    "Best Practices: Tips for effective error handling using try and catch.",
    "Logging Errors: Techniques for logging caught errors for debugging."
  ]
  ,
    _id:32,
    output:"/Output/Try and catch.png",
    file_name:"Try and catach",
    code:'javascript/code/32. try and catch.html',
    explanation: "The try and catch statements in JavaScript are used to handle exceptions and errors that may occur during the execution of code. This mechanism allows developers to gracefully manage errors, preventing the program from crashing and enabling the implementation of fallback logic or error reporting.", topics: [ "try Block: The try block contains code that may throw an error during execution. If an error occurs within this block, the control is transferred to the associated catch block, allowing for targeted error handling.", "catch Block: The catch block is executed if an error is thrown in the try block. It receives the error object as an argument, allowing developers to inspect the error and take appropriate actions, such as logging or displaying error messages.", "Finally Block: An optional finally block can be added after the try and catch blocks. Code within the finally block executes regardless of whether an error occurred, making it useful for cleanup operations like closing files or releasing resources.", "Error Propagation: If an error occurs in a function called within a try block and is not caught there, it can propagate up the call stack. Developers can manage this by nesting try and catch statements in parent functions.", "Asynchronous Error Handling: In asynchronous code, using try and catch with async functions allows for straightforward error management. You can wrap await expressions in a try block to catch errors from Promises seamlessly." ]
},
{
    _id:33,
    topics:[
      "Definition: Understanding the role of the finally block in error handling.",
      "Syntax: The structure of using a finally block with try and catch.",
      "Guaranteed Execution: Explanation of how code in the finally block executes regardless of the outcome of the try or catch blocks.",
      "Use Cases: Scenarios where finally is useful, such as cleanup operations or releasing resources.",
      "Interaction with Return Statements: How return statements in try or catch affect execution of finally.",
      "Asynchronous Code: The behavior of finally in async functions and promise handling.",
      "Error Handling: The role of finally in conjunction with error handling strategies.",
      "Best Practices: Guidelines for effectively using finally in your code."
    ],
    file_name:"finally",
    output:"/Output/finnaly.png",
    code:'javascript/code/33. finnaly.html',
    explanation: "The finally block in JavaScript is a part of the try...catch statement that allows developers to execute code after the try and catch blocks, regardless of whether an error was thrown or caught. This ensures that specific cleanup operations or final steps are executed, making the code more robust and reliable.", topics: [ "Guaranteed Execution: The code inside the finally block runs after the completion of the try and catch blocks, ensuring that critical cleanup or finalization code executes regardless of whether an error occurred.", "Cleanup Operations: The finally block is commonly used for cleanup tasks, such as closing file handles, releasing resources, or resetting states, which need to be performed regardless of the outcome of the preceding code.", "Error Handling Completeness: Even if an error is thrown and caught, the finally block will still execute, making it useful for executing code that should run in all scenarios, like logging or notifying users.", "Return Statements: If a return statement is used in the try or catch blocks, the finally block will still execute before the function returns a value. This behavior allows developers to perform additional actions even when exiting a function.", "Asynchronous Code: In the context of asynchronous operations, the finally block can also be used with async functions to execute cleanup logic after awaiting Promises, ensuring that necessary steps are taken regardless of the Promise's outcome." ]
},
{
    _id:34,
  topics:[
    "Definition: Introduction to the Fetch API and its purpose in making network requests.",
    "Basic Syntax: Understanding the structure of a fetch request and its parameters.",
    "GET Requests: How to use the Fetch API to retrieve data from a server.",
    "POST Requests: Sending data to a server using the Fetch API.",
    "Handling Responses: Methods for processing the response data, such as .json(), .text(), and .blob().",
    "Error Handling: Techniques for managing errors with fetch, including response status checks.",
    "Async/Await: Using async/await syntax with the Fetch API for cleaner code.",
    "CORS: Explanation of Cross-Origin Resource Sharing and how it affects fetch requests.",
    "AbortController: Managing request cancellation with the Fetch API.",
    "Best Practices: Recommendations for using the Fetch API effectively."
  ],
    output:"/Output/fetch api.png",
    code:'javascript/code/34. Fetch API.html',
    file_name:"Fetch API",
explanation: "The Fetch API is a modern JavaScript interface that allows developers to make network requests to retrieve resources from servers, replacing older methods like XMLHttpRequest. It provides a more powerful and flexible way to handle HTTP requests and responses, using Promises to manage asynchronous operations.", topics: [ "Making Requests: The Fetch API enables you to perform HTTP requests using the fetch() function, which takes a URL and optional configuration parameters (such as method, headers, and body) to customize the request.", "Promises: The Fetch API returns a Promise that resolves to the Response object representing the response to the request. This allows developers to use .then() and .catch() methods for handling success and error cases seamlessly.", "Response Handling: The Response object provides various methods for accessing the response data, such as text(), json(), and blob(), allowing developers to process the response in the desired format.", "Error Handling: Unlike older methods, the Fetch API does not reject the Promise on HTTP error statuses (e.g., 404 or 500). Developers need to check the response.ok property to determine if the request was successful and handle errors accordingly.", "CORS: The Fetch API adheres to the same-origin policy and handles Cross-Origin Resource Sharing (CORS) automatically, enabling secure access to resources from different origins while allowing developers to configure request modes for CORS." ]
},
{
topics:[
  "Definition: Understanding POST requests and their purpose in sending data to a server.",
  "Basic Syntax: Structure of a fetch request for a POST operation.",
  "Sending JSON Data: How to send JSON data in the body of a POST request.",
  "Content-Type Header: Importance of setting the Content-Type header for the request.",
  "Sending Form Data: Using FormData to send form data in a POST request.",
  "Handling Responses: Processing server responses after sending a POST request.",
  "Error Handling: Techniques for managing errors specific to POST requests.",
  "Async/Await: Using async/await with POST requests for cleaner code.",
  "Common Use Cases: Examples of scenarios where POST requests are used, such as form submissions or API interactions.",
  "Best Practices: Recommendations for making efficient and secure POST requests."
]
,
    _id:35,
    output:"/Output/Post Request.png",
    code:'javascript/code/35. post request.html',
    file_name:"Post Request",
explanation: "A POST request is an HTTP method used to send data to a server to create or update a resource. It is commonly used in web applications to submit form data or to send JSON data to an API. Unlike GET requests, POST requests include the data in the request body rather than in the URL, allowing for larger amounts of data to be transmitted securely.", topics: [ "Sending Data: In a POST request, data is sent in the body of the request, allowing you to include complex data structures like objects or arrays. This is useful for submitting form data, JSON payloads, or files.", "Using Fetch API: The Fetch API can be used to make a POST request by specifying the method in the options object, along with headers (like Content-Type) and the body data. For example, sending JSON data requires converting the data to a string using JSON.stringify().", "Handling Responses: When making a POST request, the server typically returns a response indicating the success or failure of the operation. The response can be processed using the Fetch API’s promise handling methods to check for success and retrieve any returned data.", "Error Handling: POST requests can encounter errors due to network issues, server-side problems, or validation failures. It is essential to implement error handling to manage these scenarios effectively, often checking the response status and handling it appropriately.", "RESTful APIs: POST requests are commonly used in RESTful APIs to create new resources on the server. The server processes the request, performs the necessary actions, and usually responds with the newly created resource's details, including a status code indicating the outcome." ]
},
{
  topics:[
    "Definition: Understanding what cookies are and their role in web development.",
    "Setting Cookies: How to create and set cookies in PHP using setcookie().",
    "Cookie Parameters: Explanation of the parameters that can be set with cookies, such as expiration time and path.",
    "Retrieving Cookies: How to access cookie values using the $_COOKIE superglobal.",
    "Modifying Cookies: Steps to update cookie values after they have been set.",
    "Deleting Cookies: Techniques for deleting cookies in PHP.",
    "Security Considerations: Discussing the security implications of using cookies and how to secure them.",
    "Session Cookies vs Persistent Cookies: Understanding the difference between session cookies and persistent cookies.",
    "Cookie Scope: The scope of cookies in relation to the domain and path settings.",
    "Best Practices: Recommendations for effectively using cookies in web applications."
  ]
  ,
    _id:36,
    output:"/Output/Cookie.png",
    file_name:"Cookie",
    code:'javascript/code/36. cookie.html',
    explanation: "Cookies are small pieces of data stored on the client-side (in the user's web browser) by websites to track user behavior, store preferences, or maintain session state. They are commonly used for user authentication, personalization, and analytics, enabling web applications to remember information across different sessions.", topics: [ "Setting Cookies: Cookies can be created and set using the document.cookie property in JavaScript. When creating a cookie, you can specify its name, value, expiration date, path, domain, and security attributes (like Secure and HttpOnly).", "Retrieving Cookies: Cookies can be accessed through the document.cookie property, which returns all cookies associated with the current document as a single string. Developers often need to parse this string to retrieve individual cookie values.", "Expiration and Lifespan: Cookies can have an expiration date set using the expires attribute, determining how long the cookie should be stored. If no expiration is set, the cookie is treated as a session cookie and will be deleted when the browser is closed.", "Secure and HttpOnly Cookies: The Secure attribute ensures that cookies are only sent over HTTPS, enhancing security, while the HttpOnly attribute prevents client-side scripts from accessing the cookie, reducing the risk of cross-site scripting (XSS) attacks.", "Cookie Size Limitations: Most browsers impose size limits on cookies (typically around 4KB per cookie), as well as limits on the total number of cookies that can be stored per domain. This necessitates careful management of cookie usage to avoid exceeding these limits." ]
},
{
  topics:[
    "Definition: Understanding what local storage is and its role in web development.",
    "Setting Items: How to store data in local storage using setItem() method.",
    "Retrieving Items: Accessing stored data with getItem() method.",
    "Removing Items: How to remove items from local storage using removeItem() method.",
    "Clearing Local Storage: Using clear() to delete all items in local storage.",
    "Storage Event: Understanding the storage event and how it triggers when local storage changes.",
    "Data Types: Discussing the limitations of local storage, particularly with data types (string-only storage).",
    "Local Storage vs Session Storage: Key differences between local storage and session storage.",
    "Best Practices: Recommendations for effectively using local storage in applications.",
    "Browser Support: Overview of browser compatibility for local storage features."
  ]
  ,
    _id:37,
    output:"/Output/local storage.png",
    code:'javascript/code/37. local storage.html',
    file_name:"Local storage",
explanation: "Local Storage is a web storage solution that allows developers to store key-value pairs in a web browser. It provides a way to persistently store data on the client-side, enabling web applications to save user preferences, session information, and other data that should remain available even after the browser is closed.", topics: [ "Storing Data: Local Storage allows you to store data using the setItem(key, value) method, where both key and value are strings. This makes it easy to save user preferences or any relevant data without server-side storage.", "Retrieving Data: Data can be retrieved from Local Storage using the getItem(key) method, which returns the value associated with the specified key. If the key does not exist, it returns null, making it straightforward to check for stored data.", "Data Persistence: Unlike session storage, which is cleared when the browser tab is closed, Local Storage retains data even after the browser is shut down and reopened. This is useful for applications that need to remember user settings or progress.", "Storage Limitations: Local Storage typically has a size limit of about 5-10MB per origin, depending on the browser. This makes it suitable for storing relatively small amounts of data, but larger data sets may require alternative storage solutions.", "Security Considerations: While Local Storage is convenient, it is not a secure storage method. Data is accessible to any JavaScript running on the page, making it vulnerable to cross-site scripting (XSS) attacks. Sensitive information should not be stored in Local Storage." ]
},
{
  topics:[
    "Definition: Understanding what session storage is and its role in web development.",
    "Setting Items: How to store data in session storage using setItem() method.",
    "Retrieving Items: Accessing stored data with getItem() method.",
    "Removing Items: How to remove items from session storage using removeItem() method.",
    "Clearing Session Storage: Using clear() to delete all items in session storage.",
    "Storage Event: Understanding the storage event and how it triggers when session storage changes.",
    "Data Types: Discussing the limitations of session storage, particularly with data types (string-only storage).",
    "Session Storage vs Local Storage: Key differences between session storage and local storage.",
    "Best Practices: Recommendations for effectively using session storage in applications.",
    "Browser Support: Overview of browser compatibility for session storage features."
  ]
  ,
    _id:38,
    file_name:"Session storage",
    output:"/Output/session storage.png",
    code:'javascript/code/38.session storage.html',
    explanation: "Session Storage is a web storage mechanism that allows developers to store data temporarily for the duration of the page session. Unlike Local Storage, data stored in Session Storage is only available for the duration of the browser tab or window that created it, making it suitable for storing information that should not persist beyond the current session.", topics: [ "Storing Data: Data can be stored in Session Storage using the setItem(key, value) method, where both key and value are strings. This enables applications to store temporary data like user inputs, form data, or preferences for the current session.", "Retrieving Data: Data stored in Session Storage can be accessed using the getItem(key) method, which retrieves the value associated with the specified key. If the key does not exist, it returns null, making it easy to check for available data.", "Session Duration: Data in Session Storage is maintained as long as the browser tab or window remains open. Once the tab is closed, all stored data is cleared, which is useful for handling sensitive information that should not persist.", "Storage Limitations: Session Storage typically has a size limit of about 5MB per origin, depending on the browser. This limitation makes it suitable for smaller amounts of data, similar to Local Storage, but with a focus on temporary storage.", "Security Considerations: Session Storage is less vulnerable to XSS attacks than Local Storage because its scope is limited to the specific tab or window. However, sensitive information should still be handled with care and not stored without proper security measures." ]
},
{
  topics:[
    "Definition: Understanding what prototypes are in JavaScript and their role in object-oriented programming.",
    "Prototype Chain: Exploring how the prototype chain works and how objects inherit properties and methods.",
    "Creating Prototypes: How to create and define a prototype for a constructor function.",
    "Modifying Prototypes: Methods for adding or modifying properties and methods on a prototype.",
    "Inheritance: How inheritance works with prototypes and creating subclasses using the prototype chain.",
    "Instanceof Operator: Understanding how the instanceof operator works with prototypes to check object types.",
    "Object.create(): Using Object.create() to create a new object with a specified prototype.",
    "Performance Considerations: Discussing performance implications of using prototypes vs. other inheritance methods.",
    "Best Practices: Recommendations for using prototypes effectively in JavaScript development.",
    "ES6 Classes: How ES6 class syntax relates to prototypes and the underlying prototype mechanism."
  ]
  ,
    _id:39,
    output:"/Output/Proto type.png",
    file_name:"Proto type",
    code:'javascript/code/39. proto type.html',
    explanation: "In JavaScript, prototypes are a fundamental concept that allows objects to inherit properties and methods from other objects. Every JavaScript object has a prototype, which acts as a template from which the object can inherit additional features, enabling a powerful form of inheritance known as prototype-based inheritance.", topics: [ "Prototype Property: Each object has an internal property called [[Prototype]], accessible via Object.getPrototypeOf() or the __proto__ property. This prototype property points to another object, from which the current object can inherit properties and methods.", "Creating Objects: When an object is created, it can inherit from a specific prototype using the Object.create() method or through constructor functions. This allows developers to define shared properties and methods, promoting code reusability.", "Prototype Chain: The prototype chain is a series of linked prototypes that JavaScript uses to resolve property and method lookups. If a property is not found on an object, JavaScript looks up its prototype and continues this process until it reaches the end of the chain (null).", "Extending Prototypes: JavaScript allows developers to extend built-in object prototypes, such as adding methods to the Array or String prototypes. However, this practice should be done cautiously, as it can lead to conflicts and maintenance issues.", "Constructor Functions: Constructor functions define object blueprints and are often used with the new keyword. When a constructor function is called, the new object created inherits from the constructor's prototype, allowing the object to access the defined methods and properties." ]
},
{
  topics:[
    "Definition of Classes: Understanding what classes are and their role in JavaScript.",
    "Creating Classes: How to create a class using the class keyword in ES6.",
    "Constructor Method: The purpose of the constructor method in a class and how to define it.",
    "Creating Objects: How to create instances of a class (objects) using the new keyword.",
    "Class Methods: Defining methods within a class and how to call them on class instances.",
    "Static Methods: Understanding static methods and how they differ from instance methods.",
    "Inheritance: How to extend classes to create subclasses and inherit properties and methods.",
    "Getters and Setters: Using getters and setters for object properties to control access and modify values.",
    "Encapsulation: How classes help encapsulate data and provide a clear interface for interaction.",
    "ES6 Classes vs. Prototypes: Comparing ES6 class syntax with traditional prototype-based inheritance."
  ]
  ,
    _id:40,
    output:"/Output/classes and object.png",
    file_name:"Class and object",
    code:'javascript/code/40. Classes and object.html',
    explanation: "In JavaScript, classes are a syntactical sugar over the existing prototype-based inheritance, providing a clearer and more concise way to create objects and handle inheritance. Classes encapsulate data and behavior in a single structure, allowing developers to create objects with shared properties and methods using a more traditional object-oriented programming approach.", topics: [ "Class Definition: A class is defined using the class keyword followed by the class name and a block containing its constructor and methods. The constructor is a special method called when an object is instantiated from the class, allowing for initialization of properties.", "Creating Objects: Objects are created from classes using the new keyword, which invokes the class constructor and returns a new instance of the object. Each instance of a class has its own properties but shares methods defined in the class.", "Methods: Classes can have instance methods that define behavior for the objects created from them. These methods can operate on the object’s properties and can be called using the instance of the class, allowing for encapsulated functionality.", "Inheritance: Classes support inheritance, enabling one class to extend another using the extends keyword. The child class inherits properties and methods from the parent class, allowing for code reuse and a hierarchical organization of functionality.", "Static Methods: Classes can also define static methods, which are called on the class itself rather than on instances of the class. Static methods are typically used for utility functions that are related to the class but do not require access to instance properties." ]
},
{
  topics:[
    "Definition of a Constructor: Understanding what a constructor is in the context of JavaScript classes.",
    "Creating a Constructor: How to define a constructor method within a class using the constructor keyword.",
    "Parameters in Constructors: How to pass parameters to a constructor to initialize object properties.",
    "Default Values: Setting default values for constructor parameters.",
    "Using 'this' Keyword: Understanding the 'this' keyword in constructors and how it refers to the instance being created.",
    "Multiple Constructors: Discussing the limitation of having only one constructor in a JavaScript class.",
    "Constructor Overloading: Techniques for simulating constructor overloading in JavaScript.",
    "Invoking a Constructor: How to create an instance of a class using the new keyword.",
    "Calling Parent Constructors: Using super() to call the parent class constructor in a subclass."
  ]
  ,
    _id:41,
    output:"/Output/Constructor-1.png",
    file_name:"constructor",
    code:'javascript/code/41. constructor.html',
    explanation: "In JavaScript, a constructor is a special method defined within a class that is automatically called when creating an instance of that class. It is used to initialize object properties and set up any required state for the new object. Constructors allow developers to define default values and establish the structure of an object at the time of instantiation.", topics: [ "Creating Instances: The constructor method is defined using the constructor keyword within a class and is invoked when a new instance of the class is created using the new keyword. This sets up the object’s initial state.", "Initializing Properties: Inside the constructor, you can define properties using the this keyword, which refers to the current instance. This allows each instance of the class to have its own unique set of property values.", "Default Values: Constructors can assign default values to properties, ensuring that all instances start with a defined state. This helps to maintain consistency and reduces the risk of errors due to uninitialized properties.", "Parameter Handling: Constructors can accept parameters, allowing you to pass values during instantiation. This enables customization of the object’s properties based on the provided arguments, making the constructor versatile.", "Inheritance and Super Calls: In classes that inherit from other classes, the super() function can be called within the constructor to invoke the parent class's constructor. This allows the child class to initialize inherited properties properly." ]

}

  ];
  const data = await Promise.all(
    files.map(async (file) => ({
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
  res.status(500).json({ message: "Server error", error: error.message }); // Improved error response
}
});
module.exports = app;
