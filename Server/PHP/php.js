const express = require("express");
const app = express.Router();
const { sendCode, sendVideo, sendPhoto } = require("./printData");

const variable = sendCode("./php/code/String function/string function.php");

const array = sendCode("./php/code/array/array.php");

const operator = sendCode("./php/code/Operator/operator.php");
const condition = sendCode("./PHP/code/Conditional/conditional statement.php");
const loop = sendCode("./php/code/Loops/Loops.php");

const Local_global_variable = sendCode(
  "./php/code/Local and global variable/Global and local variable.php"
);

const cookie1 = sendCode("./php/code/Cookie/Cookie.php");
const cookie2 = sendCode("./php/code/Cookie/read_cookie.php");

const CreateDB = sendCode("./php/code/Create Database/Create database.php");
const display_data = sendCode(
  "./php/code/Display database from database/display data.php"
);
const update_record = sendCode("./php/code/Update record/Update record.php");
const Dalete_record = sendCode(
  "./php/code/Dalete record from database/delete record.php"
);
const make_table = sendCode(
  "./php/code/Make table in database/table in database.php"
);
const insert_data_query = sendCode(
  "./php/code/Insert data using query/insert data.php"
);
const insert_data_form = sendCode(
  "./php/code/Insert data using form to database/insert data using form.php"
);

const session = sendCode("./php/code/Session/session.php");
const destroy_session = sendCode(
  "./php/code/Destroy session in php/destroy session.php"
);
const get_data_session = sendCode("./php/code/Get data from session/get date.php");

const include_1 = sendCode("./php/code/Include file in php/file for include.php");
const include_2 = sendCode("./php/code/Include file in php/include php file.php");

const Read_file1 = sendCode("PHP/code/Read file in in php/readfile.php");
const read_file2 = sendCode("./php/code/Read file in in php/file for read");

const php_function = sendCode("./php/code/Function/function.php");
const date = sendCode("./php/code/Date function/Date function.php");
const string_finction = sendCode("./php/code/String function/string function.php");

const ajax1 = sendCode("./php/code/Ajax/AJAX database.php");
const ajax2 = sendCode("./php/code/Ajax/AJAX.php");

app.get("/", (req, res) => {
  const data = [
    {
      _id: 1,
      code: variable,
      explaination:
        "In PHP, a variable is a way to store data that can be used and manipulated throughout a script. Variables in PHP start with a dollar sign ($) followed by the variable name, which can include letters, numbers, and underscores but must start with a letter or underscore. PHP variables are loosely typed, meaning you don’t need to declare the type (like string or integer); PHP automatically determines the type based on the variable’s value. Variables are case-sensitive and can store various types of data, such as numbers, strings, arrays, and objects, making them flexible and essential for dynamic programming. For example, $name = `John`; assigns the string `John` to the variable $name.",
      topics: [
        "Integer : Represents whole numbers, both positive and negative, without decimal points (e.g., 42, -3).",
        "Float (Double): Represents numbers with decimal points or in exponential form (e.g., 3.14, 2.5E3).",
        "String: A sequence of characters, typically enclosed in single or double quotes (e.g., `Hello, World!`)",
        "Boolean: Represents two possible values: true or false, commonly used for conditional statements.",
        "Array: A collection of values, which can be of mixed data types, stored in a single variable and accessed by keys or indexes (e.g., [1, `apple`, true]).",
        "Object: Represents instances of classes and is used to store complex data and behavior.",
        "NULL: A special data type that represents a variable with no value.",
      ],
    },
    {
      _id: 2,
      code: operator,
      explaination:
        "an operator is a symbol or combination of symbols that performs operations on variables and values. Operators are essential for manipulating data, controlling the flow of the program, and executing logical decisions. PHP has several types of operators,",
      topics: [
        "Arithmetic Operators: Used for basic mathematical operations, like addition (+), subtraction (-), multiplication (*), division (/), and modulus (%).",
        "Assignment Operators: Used to assign values to variables. The basic assignment operator is =, but combined assignment operators like += and -= allow you to modify and assign a value in one step.",
        "Comparison Operators: Used to compare values. These include == (equal), != (not equal), === (identical), and > (greater than).",
        "Logical Operators: Used to combine conditional statements, including && (and), || (or), and ! (not).",
        "Increment/Decrement Operators: Used to increase or decrease a variable’s value by one, such as ++ and --.",
        "String Operators: Used to concatenate strings with the . operator.",
        "Array Operators: Used to compare and manipulate arrays, like union (+) and equality (==).",
      ],
    },
    {
      _id: 3,
      code: array,
      explaination:
        "an array is a data structure that allows you to store multiple values in a single variable. Arrays are useful for organizing and managing a collection of related data elements, which can be accessed and manipulated easily. PHP arrays can hold values of different data types, including integers, strings, and even other arrays, making them highly versatile.",
      topics: [
        " Indexed Arrays: These use numeric keys to store and access elements. By default, keys start at 0 and increment by 1 for each new element (e.g., $fruits = [`apple`, `banana`, `cherry`;)",
        "Associative Arrays: These use named keys (strings) instead of numeric ones, which allows you to store and retrieve data based on meaningful identifiers (e.g., $age = [`John` => 25, `Jane` => 30];).",
        "Multidimensional Arrays: These are arrays that contain other arrays, enabling you to create more complex data structures, such as tables or grids (e.g., $matrix = [[1, 2], [3, 4]];).",
      ],
    },
    {
      _id: 4,
      code: condition,
      explaination:
        "conditional statements are used to execute specific blocks of code based on whether certain conditions are true or false. These statements help control the flow of a program by allowing different outcomes based on varying conditions.",
      topics: [
        "if Statement: Executes a block of code only if a specified condition is true.",
        "if...else Statement: Executes one block of code if the condition is true, and another block if it is false.",
        "if...else ladder Statement: Checks multiple conditions in sequence. The first condition that evaluates to true is executed, and the rest are ignored.",
        "switch Statement: Evaluates a single expression and matches it against multiple cases. When a match is found, the corresponding block of code is executed. It’s useful for checking a variable against multiple values.",
      ],
    },
    {
      _id: 5,
      code: loop,
      explaination:
        "loops are used to execute a block of code repeatedly based on a specified condition, which is especially useful for tasks that require repetitive actions, such as iterating over arrays or generating sequences.",
      topics: [
        "for Loop: Executes a block of code a specific number of times. It’s commonly used when the number of iterations is known in advance.",
        "while Loop: Repeats a block of code as long as a specified condition remains true. It’s useful when the number of iterations is not known beforehand.",
        "do...while Loop: Similar to the while loop, but it guarantees that the block of code executes at least once, as the condition is checked after each iteration.",
        "foreach Loop: Specifically designed for iterating over arrays. It executes a block of code for each element in an array, making it ideal for working with collections of data.",
      ],
    },
    {
      _id: 6,
      code: Local_global_variable,
      explaination:
        "variables can be either local or global, depending on their scope within a program.",
      topics: [
        "Local Variables: These are variables declared within a function and can only be accessed within that function. They are not available outside the function, and each function call has its own set of local variables. Once the function completes, the local variables are destroyed.",
        "Global Variables: These are variables declared outside any function and can be accessed from anywhere in the script, except inside functions, unless explicitly stated. To access a global variable within a function, the global keyword must be used, or the $GLOBALS array can be utilized.",
      ],
    },
    {
      _id: 7,
      code: [cookie1, cookie2],
      explaination:
        "a cookie is a small piece of data that is stored on the client’s browser, allowing the server to remember information about the user across different requests and sessions. Cookies are often used for tasks like tracking user preferences, managing login sessions, and personalizing user experiences on a website",
    },
    {
      _id: 8,
      code: [
        CreateDB,
        display_data,
        update_record,
        Dalete_record,
        make_table,
        insert_data_form,
        insert_data_query,
      ],
      explaination:
        "a database (DB) is a structured collection of data that is stored electronically and can be easily accessed, managed, and updated. Databases are essential for web applications as they store information like user data, products, orders, and other records needed for the application's functionality. PHP commonly interacts with databases using SQL (Structured Query Language), and MySQL is a popular database management system often paired with PHP for web development.",
      topics: [
        "Create Database: Connect to the MySQL server and use the CREATE DATABASE query to establish a new database (e.g., $sql = `CREATE DATABASE myDatabase`;).",
        "Create Table: Define a table within the database by specifying column names and data types using the CREATE TABLE query (e.g., $sql = `CREATE TABLE users (id INT AUTO_INCREMENT, username VARCHAR(30), email VARCHAR(50), PRIMARY KEY (id))`;).",
        "Insert Data from Form: Retrieve form data with $_POST and insert it into the table using the INSERT INTO statement (e.g., $stmt = $conn->prepare(`INSERT INTO users (username, email) VALUES (?, ?)`);).",
        "Insert Data from Query: Directly add hard-coded or dynamically assigned data to a table with the INSERT INTO statement (e.g., $sql = `INSERT INTO users (username, email) VALUES ('JohnDoe', 'john@example.com')`;).",
        "Display Database Data: Use the SELECT statement to retrieve and display data from a table by looping through results (e.g., $sql = `SELECT id, username, email FROM users`;).",
        "Delete Database Data: Remove specific records from the table with the DELETE statement, targeting rows with a condition (e.g., $sql = `DELETE FROM users WHERE id=1`;).",
      ],
    },
    {
      _id: 9,
      code: [session, destroy_session, get_data_session],
      explaination:
        "a session is a way to store data on the server for individual users to access across multiple pages. Unlike cookies, which store data on the client's browser, sessions store data on the server and only use a session ID to identify the user. This makes sessions more secure for sensitive information, such as login credentials, as the actual data isn't exposed to the client.",
      topics: [
        "Starting a Session: Before you can use a session, you need to start it on each page using session_start(). This function creates a new session or resumes an existing one, allowing you to store and retrieve session variables.",
        "Storing Data in a Session: Once a session is started, you can store data using the $_SESSION superglobal array.",
        "Accessing Session Data: Session data can be accessed on any page that has session_start() at the top.",
        "Modifying and Deleting Session Data: You can modify session variables simply by reassigning a new value to them. To delete a specific session variable, use unset():",
        "Destroying a Session: To end a session completely and delete all session data, use session_destroy(). This is often done on a logout page",
      ],
    },
    {
      _id: 10,
      code: [include_1, include_2],
      explaination:
        "include and require are statements used to insert the content of one PHP file into another PHP file. This helps with code reuse, modularity, and maintenance by allowing you to separate different parts of your code into separate files, which can then be included wherever needed. Both statements are commonly used to include shared components like headers, footers, or database connection scripts. The primary difference between them is how they handle errors.",
    },
    {
      _id: 11,
      code: [read_file2, Read_file1],
      explaination:
        "the readfile() function is a straightforward way to read a file and send its content directly to the output buffer, typically the browser. It reads the entire file and outputs it immediately without storing it in a variable, making it useful for quickly displaying file contents or serving files to users.",
    },
    {
      _id: 12,
      code: php_function,
      explaination:
        "a function is a block of code that performs a specific task. Functions allow you to encapsulate code for reuse, which makes your code more organized, modular, and easier to maintain. PHP has many built-in functions, but you can also define your own custom functions.",
    },
    {
      _id: 13,
      code: date,
      explaination:
        " the date() function is used to format the current date and time. It allows you to display the date and time in various formats by specifying a format string as an argument. PHP also offers other date-related functions, such as time(), strtotime(), and mktime(), which help with date and time manipulation.",
    },
    {
      _id: 14,
      code: string_finction,
      explaination:
        "string functions are built-in functions that allow you to manipulate and manage text. They cover a wide range of operations, such as finding the length of a string, converting case, searching for substrings, replacing text, and more.",
    },
    {
      _id: 15,
      code: [ajax1, ajax2],
      explaination:
        "AJAX (Asynchronous JavaScript and XML) is a technique that allows web pages to update content dynamically without requiring a full page reload. It enables asynchronous communication between the client (browser) and the server, allowing parts of a web page to be updated in the background based on user interactions or other events.",
      topics: [
        "Asynchronous: AJAX requests run in the background, meaning that the user can continue interacting with the page while data is being fetched or sent to the server.",
        "JavaScript-Based: AJAX uses JavaScript to send and receive data from the server. It is commonly paired with XML or JSON as the format for data exchange, although it can handle other formats as well.",
        "Partial Page Updates: AJAX can update parts of a web page (like a form or a section) without reloading the entire page, leading to a smoother and more responsive user experience.",
        "Compatible with Most Modern Web Technologies: AJAX is compatible with HTML, CSS, and various backend languages like PHP, Node.js, and Python.",
      ],
    },
  ];
  res.status(200).json(data);
});

module.exports = app;
