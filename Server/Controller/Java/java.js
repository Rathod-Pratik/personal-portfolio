const express = require("express");
const app = express.Router();
const path = require("path");
const fs = require("fs").promises;

app.get("/", async (req, res) => {
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
                output: item.output || null, // Include output path if provided
              };
            } catch (error) {
              console.error(`Error reading file ${item.function_code}:`, error);
              return {
                function_name: item.function_name,
                function_code: null,
                output: item.output || null,
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

  try {
    const files = [
      {
        _id: 1,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Basic.png",
        code: "Public/Java/code/_01_Basic.java",
        file_name: "Basic",
        explanation:
          "Java is a high-level, object-oriented programming language designed to be platform-independent. Its syntax is largely derived from C and C++, but it eliminates many complexities such as pointers and manual memory management. Java applications are typically compiled to bytecode that can run on any Java Virtual Machine (JVM), making it a 'write once, run anywhere' language. Core concepts in Java include classes, objects, inheritance, polymorphism, encapsulation, and abstraction, which form the foundation of object-oriented programming (OOP). Java is widely used for building enterprise-level applications, Android development, and web-based services.",
        topics: [
          "Classes and Objects: Core components of Java's object-oriented programming model.",
          "Inheritance: Enables a new class to inherit the properties and methods of an existing class.",
          "Polymorphism: Allows methods to perform different tasks based on the object calling them.",
          "Encapsulation: Restricts access to the internal details of a class and promotes modularity.",
          "Abstraction: Hides implementation details and shows only essential features of an object.",
          "JVM (Java Virtual Machine): Executes Java bytecode and provides platform independence.",
          "Garbage Collection: Automatically manages memory by reclaiming unused objects.",
        ],
      },
      {
        _id: 2,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/DataType.png",
        file_name: "Data Type and Literals",
        code: "Public/Java/code/_02_DataTypes_and_literals.java",
        explanation:
          "In Java, literals are constant values assigned directly to variables. They represent fixed values in the code, such as numbers, characters, or strings. Java supports various data types, and each type has its corresponding literal representation. For instance, integers are written as numeric values without any decimal, while floating-point numbers include a decimal point or an 'f'/'F' suffix for float. Characters are enclosed in single quotes, and strings are enclosed in double quotes. Literal values make the initialization of variables straightforward and type-specific.",
        topics: [
          "Integer Literals: Represent whole numbers, e.g., 42, -15. By default, they are of type 'int'. Use 'L'/'l' for long, e.g., 123456L.",
          "Floating-Point Literals: Represent decimal numbers, e.g., 3.14, -0.01. Use 'f'/'F' for float, e.g., 3.14f.",
          "Character Literals: Represent single characters, enclosed in single quotes, e.g., 'A', '1', '%'.",
          'String Literals: Represent sequences of characters, enclosed in double quotes, e.g.,  "Hello, World!".',
          "Boolean Literals: Represent logical values, either true or false.",
          "Null Literal: Represents the null reference, e.g., null. Applicable to objects.",
          "Binary Literals: Represent binary numbers, prefixed with '0b' or '0B', e.g., 0b1010.",
          "Octal Literals: Represent octal numbers, prefixed with '0', e.g., 07.",
          "Hexadecimal Literals: Represent hexadecimal numbers, prefixed with '0x' or '0X', e.g., 0xFF.",
        ],
      },
      {
        _id: 3,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Scanner.png",
        file_name: "Scanner",
        code: "Public/Java/code/_03_Scanner.java",
        explanation:
          "The Scanner class in Java is a part of the `java.util` package and is used to read input from various sources like keyboard input (System.in), files, or strings. It provides methods to parse primitive types (int, double, etc.) and strings. This makes it convenient for handling user input in console-based applications. The Scanner class uses regular expressions to tokenize the input, which allows developers to read and process data efficiently. To use Scanner, you need to create an instance and specify the input source.",
        topics: [
          "Creating a Scanner Object: Instantiate Scanner using `Scanner scanner = new Scanner(System.in);` to read input from the console.",
          "Reading Primitive Types: Use methods like `nextInt()`, `nextDouble()`, `nextBoolean()`, etc., to read specific types of input.",
          "Reading Strings: Use `next()` to read a single word and `nextLine()` to read an entire line.",
          "Handling Input Tokens: Scanner can split input into tokens using delimiters (default is whitespace). You can customize delimiters with `useDelimiter()`.",
          'Reading Files: Scanner can read data from files using `Scanner scanner = new Scanner(new File("filename"));`.',
          "Closing Scanner: Always close the Scanner object after use with `scanner.close();` to release system resources.",
          "Common Methods: Includes `hasNext()`, `hasNextInt()`, `hasNextLine()`, etc., to check if input is available.",
          "Exception Handling: InputMismatchException is thrown if the input type does not match the expected type.",
        ],
      },
      {
        _id: 4,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/operator.png",
        file_name: "Operator",
        code: "Public/Java/code/_04_operator.java",
        explanation:
          "Operators in Java are special symbols or keywords used to perform operations on variables and values. They are essential for creating expressions, which are combinations of variables, values, and operators. Java provides various types of operators for arithmetic, logical, relational, assignment, and bitwise operations, among others. Operators are categorized based on their functionality, and they work with different types of data, including numbers, characters, and objects.",
        topics: [
          "Arithmetic Operators: Perform basic mathematical operations like addition (+), subtraction (-), multiplication (*), division (/), and modulus (%).",
          "Relational Operators: Compare two values and return a boolean result, e.g., greater than (>), less than (<), equal to (==), not equal to (!=).",
          "Logical Operators: Combine multiple boolean expressions, e.g., AND (&&), OR (||), NOT (!).",
          "Assignment Operators: Assign values to variables, e.g., =, +=, -=, *=, /=.",
          "Unary Operators: Operate on a single operand, e.g., increment (++), decrement (--), negation (-).",
          "Bitwise Operators: Perform operations on binary representations of integers, e.g., AND (&), OR (|), XOR (^), complement (~).",
          "Ternary Operator: A shorthand for if-else, written as `condition ? expression1 : expression2`.",
          "Shift Operators: Shift bits of a number left or right, e.g., left shift (<<), right shift (>>), unsigned right shift (>>>).",
          "Instanceof Operator: Tests whether an object is an instance of a specific class or subclass, e.g., `object instanceof ClassName`.",
          "Operator Precedence: Determines the order in which operators are evaluated in an expression.",
        ],
      },
      {
        _id: 5,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Scope+of+variable.png",
        file_name: "scope of variable",
        code: "Public/Java/code/_05_scope_of_variable.java",
        explanation:
          "The scope of a variable in Java determines the part of the program where the variable can be accessed or used. It defines the visibility and lifetime of the variable. Java has several types of variable scopes, such as local, instance, and static (class-level), depending on where and how the variable is declared. Proper understanding of variable scope helps manage memory effectively and avoid issues like variable shadowing.",
        topics: [
          "Local Scope: Variables declared inside a method, constructor, or block are local variables. They are accessible only within the block where they are defined and are destroyed after the block ends.",
          "Instance Scope: Instance variables are declared inside a class but outside any method or block. They belong to the object and can be accessed through the object of the class. They persist as long as the object exists.",
          "Static (Class-Level) Scope: Static variables are declared with the `static` keyword inside a class but outside any method or block. They belong to the class rather than any object and are shared across all instances of the class.",
          "Block Scope: Variables declared inside a block (enclosed by curly braces `{}`) are accessible only within that block. This applies to loops, conditional statements, and anonymous blocks.",
          "Method Scope: Parameters of a method are accessible only within that method. They act as local variables for the method.",
          "Global Scope (Not available in Java): Java does not have global variables. Variables must be associated with a class or an instance.",
          "Variable Shadowing: Occurs when a variable declared in an inner scope has the same name as a variable in an outer scope, hiding the outer variable.",
          "Access Modifiers and Scope: Access modifiers (e.g., private, protected, public) influence the visibility of instance and static variables across different classes and packages.",
        ],
      },
      {
        _id: 6,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Decision+statement.png",
        file_name: "Decision statement",
        code: "Public/Java/code/_06_Decision_statement.java",
        "explanation": "Decision statements in Java allow the program to execute different blocks of code based on certain conditions. These statements control the flow of execution by evaluating boolean expressions and deciding which path the program should follow. Common decision statements in Java include if, if-else, switch, and nested if statements. They are essential for implementing logic and making the program dynamic and responsive to varying inputs or states.",
        "topics": [
          "If Statement: Evaluates a condition and executes a block of code if the condition is true. Syntax: `if (condition) { // code block }`.",
          "If-Else Statement: Provides two code paths—one executed if the condition is true, and the other if it's false. Syntax: `if (condition) { // code if true } else { // code if false }`.",
          "Else-If Ladder: Tests multiple conditions sequentially. The first true condition's block is executed. Syntax: `if (condition1) { // code } else if (condition2) { // code } else { // code }`.",
          "Switch Statement: Tests a variable against multiple values (cases) and executes the matching block. Syntax: `switch (expression) { case value1: // code; break; case value2: // code; break; default: // code; }`. Useful for replacing long if-else chains.",
          "Nested If: An if statement inside another if or else block. Allows checking multiple conditions in a hierarchical manner.",
          "Conditional (Ternary) Operator: A shorthand for if-else statements. Syntax: `condition ? expression1 : expression2`. Executes `expression1` if true; otherwise, executes `expression2`.",
          "Break in Switch: Stops further execution of cases once a match is found. Omitting `break` causes fall-through behavior.",
          "Default Case in Switch: Provides a fallback option if none of the cases match. Useful for handling unexpected values."
        ]
      },
      {
        _id: 7,
        output: "",
        file_name: "Looping statement", 
        code: [
          {function_name:"Looping statement", function_code:"Public/Java/code/_07_Looping_statement.java", output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Looping+statement.png"},
          {function_name:"Jumping statement", function_code:"Public/Java/code/_08_Jumping_statement.java", output:"https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Jumping+statement.png"},
        ],
        "explanation": "Looping statements in Java are used to execute a block of code repeatedly as long as a specified condition is true. They help automate repetitive tasks and allow programs to process data efficiently. Java provides different types of loops, each suited to specific scenarios, including for, while, and do-while loops. Understanding the purpose and structure of each loop helps in writing efficient and readable code.",
  "topics": [
    "For Loop: Executes a block of code a specific number of times. Syntax: `for (initialization; condition; update) { // code block }`. Commonly used when the number of iterations is known in advance.",
    "While Loop: Executes a block of code as long as the condition is true. Syntax: `while (condition) { // code block }`. Used when the number of iterations is unknown and depends on the condition.",
    "Do-While Loop: Similar to the while loop, but ensures the block of code is executed at least once, regardless of the condition. Syntax: `do { // code block } while (condition);`.",
    "Enhanced For Loop (For-Each): Iterates over elements in an array or a collection. Syntax: `for (dataType element : collection) { // code block }`. Useful for working with collections and arrays.",
    "Nested Loops: A loop inside another loop. Useful for iterating through multi-dimensional data structures like matrices.",
    "Break Statement: Exits the loop prematurely when a specific condition is met. Commonly used to terminate loops early.",
    "Continue Statement: Skips the current iteration and moves to the next iteration of the loop.",
    "Infinite Loops: Loops that continue indefinitely due to a condition that never becomes false. Example: `while (true) { // code block }`. Must be used cautiously with proper termination conditions.",
    "Loop Control: Ensure efficient and correct termination conditions to avoid unexpected behavior or infinite loops."
  ]
      },
      {
        _id: 8,
        output: "https://personal-portfolio-images-of-rathod.s3.ap-south-1.amazonaws.com/Java/Array.png",
        file_name: "Array",
        code: "Public/Java/code/_09_Array.java",
       "explanation": "An array in Java is a data structure that stores a fixed-size sequence of elements of the same data type. Arrays are useful for storing and managing collections of data, such as lists of numbers, strings, or objects. Each element in an array is accessed using an index, starting from 0. Arrays are objects in Java, and their size is defined at the time of creation and cannot be changed dynamically. Java provides both single-dimensional and multi-dimensional arrays.",
  "topics": [
    "Declaration and Initialization: Arrays are declared using the syntax `dataType[] arrayName;` and initialized with `arrayName = new dataType[size];` or directly as `dataType[] arrayName = {value1, value2, ...};`.",
    "Accessing Elements: Use the index to access elements, e.g., `arrayName[index]`. Indexing starts at 0 and goes up to `length - 1`.",
    "Length of Array: Use the `.length` property to get the size of the array, e.g., `arrayName.length`.",
    "Iterating Over Arrays: Use loops like `for`, `while`, or enhanced for loop (for-each) to traverse arrays.",
    "Single-Dimensional Arrays: Store a sequence of elements in a single row, e.g., `int[] numbers = {1, 2, 3};`.",
    "Multi-Dimensional Arrays: Arrays of arrays, useful for representing matrices or tables. Declared as `dataType[][] arrayName;` and initialized as `new dataType[rows][columns];`.",
    "Default Values: Elements in an array are initialized to default values (0 for numeric types, `false` for boolean, and `null` for objects).",
    "Array Methods: Arrays are objects, so utility methods like sorting and searching can be applied using `java.util.Arrays` class.",
    "Dynamic Arrays: While standard arrays are fixed in size, dynamic resizing can be achieved using `ArrayList` from the `java.util` package.",
    "Common Operations: Includes inserting elements, updating values, finding specific elements, and performing mathematical operations on arrays."
  ]
      },
    ];
    const data = await Promise.all(
      files.map(async (file) => ({
        output: file.output,
        _id: file._id,
        file_name: file.file_name,
        code: await sendCode(file.code), // Now properly awaiting
        explanation: file.explanation,
        topics: file.topics,
      }))
    );

    res.status(200).json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ message: "bav error ava cha yar", error: error.message }); // Improved error response
  }
});
module.exports = app;
