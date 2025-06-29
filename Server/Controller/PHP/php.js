const express = require("express");
const app = express.Router();
const path=require('path');
const fs = require('fs').promises;



app.get("/",async (req,res) => {
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
  /*give id to user to access perticular object use sendphoto and send code function to send photo and code*/
  // Flattened code objects with explanation
const files = [
  {
    _id: 1,
    output:"",
    code: "Public/PHP/code/Variable/variable.php",
    file_name: "Variable",
    explanation:
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
    file_name: "Operator",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Operator.png",
    code: "Public/PHP/code/Operator/operator.php",
    explanation:
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
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Multi dimension array.png",
    file_name: "Array",
    code: "Public/PHP/code/array/array.php",
    explanation:
      "an array is a data structure that allows you to store multiple values in a single variable. Arrays are useful for organizing and managing a collection of related data elements, which can be accessed and manipulated easily. PHP arrays can hold values of different data types, including integers, strings, and even other arrays, making them highly versatile.",
    topics: [
      " Indexed Arrays: These use numeric keys to store and access elements. By default, keys start at 0 and increment by 1 for each new element (e.g., $fruits = [`apple`, `banana`, `cherry`;)",
      "Associative Arrays: These use named keys (strings) instead of numeric ones, which allows you to store and retrieve data based on meaningful identifiers (e.g., $age = [`John` => 25, `Jane` => 30];).",
      "Multidimensional Arrays: These are arrays that contain other arrays, enabling you to create more complex data structures, such as tables or grids (e.g., $matrix = [[1, 2], [3, 4]];).",
    ],
  },
  {
    _id: 4,
    file_name: "Conditional statement",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/conditional.png",
    code: "Public/PHP/code/Conditional/conditional statement.php",
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
    _id: 5,
    file_name: "Looping statement",
    code: "Public/PHP/code/Loops/Loops.php",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Loop.png",
    explanation:
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
    file_name: "Local and global scope",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Local and global variable.png",
    code: 
      "Public/PHP/code/Local and global variable/Global and local variable.php"
    ,
    explanation:
      "variables can be either local or global, depending on their scope within a program.",
    topics: [
      "Local Variables: These are variables declared within a function and can only be accessed within that function. They are not available outside the function, and each function call has its own set of local variables. Once the function completes, the local variables are destroyed.",
      "Global Variables: These are variables declared outside any function and can be accessed from anywhere in the script, except inside functions, unless explicitly stated. To access a global variable within a function, the global keyword must be used, or the $GLOBALS array can be utilized.",
    ],
  },
  {
    _id: 7,
    file_name: "Cookies",
    code: [
      "Public/PHP/code/Cookie/Cookie.php",
      "Public/PHP/code/Cookie/read_cookie.php"
    ],
    output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/cookie.png",
    explanation: "a cookie is a small piece of data that is stored on the client’s browser, allowing the server to remember information about the user across different requests and sessions. Cookies are often used for tasks like tracking user preferences, managing login sessions, and personalizing user experiences on a website",
    topics: [
      "Setting Cookies: Cookies in PHP are set using the `setcookie()` function, which takes parameters such as name, value, and expiration time. This function must be called before any HTML output is sent to the browser.",
      "Retrieving Cookies: Cookies can be accessed using the `$_COOKIE` superglobal array. Once a cookie is set and available, it can be accessed using `$_COOKIE['cookie_name']`.",
      "Updating Cookies: To update a cookie’s value, you call `setcookie()` again with the same name and new value. The updated cookie overwrites the previous one.",
      "Deleting Cookies: To delete a cookie, you set its expiration time to a past date. This effectively removes it from the client’s browser.",
      "Cookie Expiration: The expiration parameter in `setcookie()` defines how long a cookie should persist on the client’s browser. It is set in seconds, with 0 or a null value making the cookie a session cookie that expires when the browser closes.",
      "Cookie Security: PHP cookies can be made secure by setting the `httponly` flag to prevent JavaScript access and the `secure` flag to restrict cookies to HTTPS connections only."
    ]
  },
  {
    _id: 8,
    file_name: "Database",
    code: [
      {function_name:"Create Database", function_code:"Public/PHP/code/Create Database/Create database.php"},
      {function_name:"Display Data", function_code:"Public/PHP/code/Display database from database/display data.php"},
      {function_name:"Update Record", function_code:"Public/PHP/code/Update record/Update record.php"},
      {function_name:"Delete Record", function_code:"Public/PHP/code/Dalete record from database/delete record.php"},
      {function_name:"Table in Database", function_code:"Public/PHP/code/Make table in database/table in database.php"},
      {function_name:"insert Data using Form", function_code:
        "Public/PHP/code/Insert data using form to database/insert data using form.php"
      },
      {function_name:"insert Data using Query", function_code:"Public/PHP/code/Insert data using query/insert data.php"},
    ],
    explanation:
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
    _id: 9.1,
    function_name: "session",
    function_code: "Public/PHP/code/Session/session.php",
    output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Season-1.png",
    explanation: "a session is a way to store data on the server for individual users to access across multiple pages. Unlike cookies, which store data on the client's browser, sessions store data on the server and only use a session ID to identify the user. This makes sessions more secure for sensitive information, such as login credentials, as the actual data isn't exposed to the client."
  },
  {
    _id: 9.2,
    function_name: "Destroy session",
    function_code: "Public/PHP/code/Destroy session in php/destroy session.php",
    output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Season-2.png",
    explanation: "a session is a way to store data on the server for individual users to access across multiple pages. Unlike cookies, which store data on the client's browser, sessions store data on the server and only use a session ID to identify the user. This makes sessions more secure for sensitive information, such as login credentials, as the actual data isn't exposed to the client."
  },
  {
    _id: 9.3,
    function_name: "Get data from session",
    function_code: "Public/PHP/code/Get data from session/get date.php",
    output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/season-3.png",
    explanation: "a session is a way to store data on the server for individual users to access across multiple pages. Unlike cookies, which store data on the client's browser, sessions store data on the server and only use a session ID to identify the user. This makes sessions more secure for sensitive information, such as login credentials, as the actual data isn't exposed to the client."
  },
  {
    _id: 10,
    topics: [
  "Basic Usage: The `include` statement takes a file path as an argument and includes the contents of that file. If the file is not found, a warning is emitted, but the script continues to execute.",
  "Syntax: The basic syntax for using `include` is as follows:/n```php/ninclude 'path/to/file.php';/n```",
  "Conditional Inclusion: You can use the `include` function conditionally based on certain criteria, allowing for flexible code inclusion. Example:/n```php/nif (file_exists('config.php')) {/n    include 'config.php';/n}/n```",
  "Include vs. Require: While `include` includes a file, `require` will produce a fatal error and stop script execution if the file is not found. This makes `require` preferable for essential files.",
  "Include Path: PHP allows you to set an include path, which defines the directories PHP should search for included files. This can be configured in the `php.ini` file or at runtime using the `set_include_path()` function.",
  "Using Include for Templates: The `include` function is often used for including header, footer, or sidebar templates in web applications to maintain a consistent layout.",
  "Example Function: Here’s a simple function demonstrating how to use include:/n```php/nfunction loadTemplate($template) {/n    include 'templates/' . $template . '.php';/n}/n```"
],
    file_name: "Include function",
    code: [
      {
        function_code: "Public/PHP/code/Include file in php/file for include.php",
        function_name: "File for include",
        output:""
      },
      {
        function_code: 
          "Public/PHP/code/Include file in php/include php file.php"
        ,
        function_name: "include file",
        output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/include.png",
      },
    ],
    explanation:
      "include and require are statements used to insert the content of one PHP file into another PHP file. This helps with code reuse, modularity, and maintenance by allowing you to separate different parts of your code into separate files, which can then be included wherever needed. Both statements are commonly used to include shared components like headers, footers, or database connection scripts. The primary difference between them is how they handle errors.",
  },
  {
    topics: [
  "Using fread: The `fread` function reads a specified number of bytes from an open file. It requires a file pointer and the number of bytes to read as parameters. Example:/n```php/n$fp = fopen('file.txt', 'r');/n$content = fread($fp, filesize('file.txt'));/nfclose($fp);/n```",
  "Using file_get_contents: This function reads the entire file into a string in one go. It’s simpler than using `fopen` and `fread` and is often preferred for reading smaller files. Example:/n```php/n$content = file_get_contents('file.txt');/n```",
  "Using fgets: The `fgets` function reads a single line from an open file pointer. It’s useful for processing files line by line. Example:/n```php/n$fp = fopen('file.txt', 'r');/nwhile ($line = fgets($fp)) {/n    echo $line;/n}/nfclose($fp);/n```",
  "Handling Errors: When using file reading functions, it’s essential to check for errors, such as whether the file exists or is accessible. You can use `file_exists()` and `is_readable()` to validate before attempting to read.",
  "Reading CSV Files: PHP provides functions like `fgetcsv()` to read CSV files line by line and parse them into an array format. Example:/n```php/n$fp = fopen('data.csv', 'r');/nwhile ($row = fgetcsv($fp)) {/n    print_r($row);/n}/nfclose($fp);/n```",
  "Binary File Reading: When reading binary files, ensure to use the appropriate mode when opening the file (e.g., 'rb' for read binary). This is crucial for files like images or executables.",
  "Memory Limitations: Be cautious with memory usage when reading large files. For huge files, consider reading in chunks rather than loading the entire file into memory at once."
],
    _id: 11,
    file_name: "Read function",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Read file.png",
    code: [
      {
        function_code: "Public/PHP/code/Read file in in php/readfile.php",
        function_name: "readfile",
      },
      {
        function_code: "Public/PHP/code/Read file in in php/file for read",
        function_name: "File for read",
      },
    ],
    explanation:
      "the readfile() function is a straightforward way to read a file and send its content directly to the output buffer, typically the browser. It reads the entire file and outputs it immediately without storing it in a variable, making it useful for quickly displaying file contents or serving files to users.",
  },
  {
    topics: [
      "Defining Functions: Functions are defined using the `function` keyword followed by the function name and parentheses. Example:/n```php/nfunction greet($name) {/n    return 'Hello, ' . $name;/n}/n```",
      "Calling Functions: To execute a function, simply use its name followed by parentheses. If the function requires parameters, pass them inside the parentheses. Example:/n```php/necho greet('Alice'); // Outputs: Hello, Alice/n```",
      "Return Statement: Functions can return values using the `return` keyword. Once a return statement is executed, the function ends, and the value is sent back to the caller. Example:/n```php/nfunction add($a, $b) {/n    return $a + $b;/n}/n```",
      "Function Parameters: Functions can take parameters to accept inputs. You can define default values for parameters, allowing them to be optional. Example:/n```php/nfunction power($base, $exponent = 2) {/n    return $base ** $exponent;/n}/n```",
      "Variable Scope: Variables defined inside a function are local to that function and cannot be accessed outside of it. Global variables can be accessed by declaring them as global within the function. Example:/n```php/n$globalVar = 10;/nfunction test() {/n    global $globalVar;/n    return $globalVar;/n}/n```",
      "Anonymous Functions: PHP supports anonymous functions (or closures), which can be assigned to variables, passed as arguments, or returned from other functions. Example:/n```php/n$square = function($n) {/n    return $n ** 2;/n};/necho $square(4); // Outputs: 16/n```",
      "Recursion: A function can call itself, known as recursion. This is useful for solving problems that can be broken down into smaller sub-problems, such as calculating factorials. Example:/n```php/nfunction factorial($n) {/n    if ($n <= 1) return 1;/n    return $n * factorial($n - 1);/n}/n```"
    ],
    _id: 12,
    file_name: "Function",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Function.png",
    code: "Public/PHP/code/Function/function.php",
    explanation:
      "a function is a block of code that performs a specific task. Functions allow you to encapsulate code for reuse, which makes your code more organized, modular, and easier to maintain. PHP has many built-in functions, but you can also define your own custom functions.",
  },
  {
    topics: [
  "Basic Syntax: The `date()` function takes two parameters: a format string and an optional timestamp. If no timestamp is provided, the current date and time is used. Example:/n```php/necho date('Y-m-d'); // Outputs: 2024-10-26/n```",
  "Formatting Options: The format string can include various characters to represent different parts of the date and time. Common format characters include:/n- `Y`: Four-digit year/n- `m`: Two-digit month/n- `d`: Two-digit day/n- `H`: Two-digit hour (00-23)/n- `i`: Two-digit minute/n- `s`: Two-digit second/nExample:/n```php/necho date('Y/m/d H:i:s'); // Outputs: 2024/10/26 14:35:50/n```",
  "Using Timestamps: The `date()` function can accept a timestamp to format a specific date and time instead of the current one. You can use the `strtotime()` function to convert a string representation of a date into a timestamp. Example:/n```php/necho date('Y-m-d', strtotime('2024-01-01')); // Outputs: 2024-01-01/n```",
  "Timezone Management: PHP allows you to set the timezone using the `date_default_timezone_set()` function. This ensures that date and time calculations are done in the specified timezone. Example:/n```php/ndate_default_timezone_set('America/New_York');/necho date('Y-m-d H:i:s'); // Outputs the date in New York timezone/n```",
  "Date Calculations: You can perform date calculations by modifying timestamps. Functions like `strtotime()` can help in adding or subtracting time intervals. Example:/n```php/necho date('Y-m-d', strtotime('+1 week')); // Outputs: 2024-11-02/n```",
  "Getting Current Date/Time: Use `date('Y-m-d H:i:s')` to get the current date and time in a desired format. This is useful for logging and displaying timestamps. Example:/n```php/necho date('Y-m-d H:i:s'); // Outputs: current date and time/n```",
  "Comparing Dates: You can compare dates by converting them to timestamps and using comparison operators. This is useful for determining which date is earlier or later. Example:/n```php/n$date1 = strtotime('2024-01-01');/n$date2 = strtotime('2024-12-31');/nif ($date1 < $date2) {/n    echo 'Date 1 is earlier than Date 2';/n}/n```"
],
    _id: 13,
    file_name: "Date function",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/Date function.png",
    code: "Public/PHP/code/Date function/Date function.php",
    explanation:
      " the date() function is used to format the current date and time. It allows you to display the date and time in various formats by specifying a format string as an argument. PHP also offers other date-related functions, such as time(), strtotime(), and mktime(), which help with date and time manipulation.",
  },
  {
    topics: [
  "strlen(): Returns the length of a string. Example:/n```php/necho strlen('Hello, World!'); // Outputs: 13/n```",
  "strpos(): Finds the position of the first occurrence of a substring in a string. Returns false if the substring is not found. Example:/n```php/necho strpos('Hello, World!', 'World'); // Outputs: 7/n```",
  "str_replace(): Replaces all occurrences of a search string with a replacement string. Example:/n```php/necho str_replace('World', 'PHP', 'Hello, World!'); // Outputs: Hello, PHP!/n```",
  "strtoupper(): Converts a string to uppercase. Example:/n```php/necho strtoupper('hello'); // Outputs: HELLO/n```",
  "strtolower(): Converts a string to lowercase. Example:/n```php/necho strtolower('HELLO'); // Outputs: hello/n```",
  "trim(): Removes whitespace (or other characters) from the beginning and end of a string. Example:/n```php/necho trim('   Hello, World!   '); // Outputs: 'Hello, World!'/n```",
  "substr(): Returns a portion of a string specified by the start position and length. Example:/n```php/necho substr('Hello, World!', 7, 5); // Outputs: World/n```",
  "explode(): Splits a string by a specified delimiter and returns an array of strings. Example:/n```php/nprint_r(explode(',', 'apple,banana,orange')); // Outputs: Array ( [0] => apple [1] => banana [2] => orange )/n```",
  "implode(): Joins array elements into a string using a specified delimiter. Example:/n```php/necho implode('-', ['2024', '10', '26']); // Outputs: 2024-10-26/n```",
  "str_repeat(): Returns a string repeated a specified number of times. Example:/n```php/necho str_repeat('A', 5); // Outputs: AAAAA/n```",
  "ucwords(): Capitalizes the first letter of each word in a string. Example:/n```php/necho ucwords('hello world'); // Outputs: Hello World/n```",
  "strlen() vs mb_strlen(): While `strlen()` counts bytes, `mb_strlen()` counts characters, which is important for multibyte character encodings. Example:/n```php/necho mb_strlen('こんにちは'); // Outputs: 5/n```"
],
    _id: 14,
    file_name: "String function",
    output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/String function.png",
    code: "Public/PHP/code/String function/string function.php",
    explanation:
      "string functions are built-in functions that allow you to manipulate and manage text. They cover a wide range of operations, such as finding the length of a string, converting case, searching for substrings, replacing text, and more.",
  },
  {
    topics: [],
    _id: 15,
    file_name: "AJAX",
    code: [
      {
        function_code: "Public/PHP/code/Ajax/AJAX.php",
        function_name: "AJAX",
      },
      {
        function_code: "Public/PHP/code/Ajax/AJAX DB.php",
        function_name: "AJAX database",
        output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/php+Output/AJAX.png",
      },
    ],
    explanation:
      "AJAX (Asynchronous JavaScript and XML) is a technique that allows web pages to update content dynamically without requiring a full page reload. It enables asynchronous communication between the client (browser) and the server, allowing parts of a web page to be updated in the background based on user interactions or other events.",
    topics: [
      "Asynchronous: AJAX requests run in the background, meaning that the user can continue interacting with the page while data is being fetched or sent to the server.",
      "JavaScript-Based: AJAX uses JavaScript to send and receive data from the server. It is commonly paired with XML or JSON as the format for data exchange, although it can handle other formats as well.",
      "Partial Page Updates: AJAX can update parts of a web page (like a form or a section) without reloading the entire page, leading to a smoother and more responsive user experience.",
      "Compatible with Most Modern Web Technologies: AJAX is compatible with HTML, CSS, and various backend languages like PHP, Node.js, and Python.",
    ],
  },
];
  const data = await Promise.all(
    files.map(async (file) => ({
      output:file.output,
      _id: file._id,
      file_name: file.file_name,
     code : await sendCode(file.code), 
      explanation: file.explanation,
      topics: file.topics
    }))
  );

  res.status(200).json(data); // Correct response
} catch (error) {
  console.error("Error processing request:", error);
  res.status(500).json({ message: "bav error ava cha yar" }); 
}
});

module.exports = app;
