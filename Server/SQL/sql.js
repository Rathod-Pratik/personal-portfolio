const express = require("express");
const app = express.Router();
const { sendCode } = require("./PrintData");
app.get("/", (req, res) => {
  const data = [
    {
      _id: 1,
      file_name: "Basic",
      code: sendCode("SQL/code/01.Basic.sql"),
    },
    {
      _id: 2,
      file_name: "constraints",
      code: sendCode("SQL/code/02.constraints.sql"),
      explanation:
        "Constraints in a Relational Database Management System (RDBMS) are rules applied to the data within a database to ensure its integrity and accuracy. These rules help maintain the reliability of the database by enforcing conditions on the data that can be stored in the tables. Constraints prevent the entry of invalid data, establish relationships between tables, and ensure that the data adheres to specific criteria.",
      topics: [
        "Primary Key Constraint: This constraint ensures that each row in a table is unique and can be uniquely identified. A primary key cannot contain NULL values and must contain unique values across the table. It establishes the identity of a record.",
        "Foreign Key Constraint: A foreign key is a field (or collection of fields) in one table that uniquely identifies a row in another table. This constraint establishes a relationship between the two tables, ensuring referential integrity by preventing actions that would leave orphaned records.",
        "Unique Constraint: The unique constraint ensures that all values in a column are distinct from one another. Unlike the primary key, a unique constraint can accept NULL values (though only one NULL value per column). This is useful for columns that require unique data, such as email addresses.",
        "Check Constraint: A check constraint enforces specific conditions on a column’s values. It ensures that all values meet certain criteria, such as being within a specific range or matching a specific pattern, enhancing data integrity.",
        "Not Null Constraint: This constraint ensures that a column cannot have NULL values, meaning every record must include a value for this column. This is essential for fields that are required for the logical integrity of the database, such as names or IDs.",
      ],
    },
    {
      _id: 3,
      file_name: "Data manipulation language(DML)",
      code: sendCode("SQL/code/03.DML.sql"),
      explanation:
        "Data Manipulation Language (DML) is a subset of SQL (Structured Query Language) used to manage and manipulate data stored in a relational database. DML provides commands for querying, inserting, updating, and deleting data, allowing users to perform essential operations on the data within database tables. DML is critical for application development and data management, enabling dynamic interaction with the database.",
      topics: [
        "SELECT Statement: The SELECT statement is used to query data from one or more tables. It allows users to specify which columns to retrieve, apply filters using the WHERE clause, and sort results with the ORDER BY clause, making it a powerful tool for data retrieval.",
        "INSERT Statement: The INSERT statement is used to add new rows of data to a table. Users can insert values for all columns or specify particular columns in which to place data. This command is fundamental for populating tables with initial or updated information.",
        "UPDATE Statement: The UPDATE statement modifies existing records in a table. Users can specify which records to update using the WHERE clause to prevent unintended changes to all rows. This command is essential for maintaining accurate and current data.",
        "DELETE Statement: The DELETE statement removes rows from a table based on specified criteria in the WHERE clause. Care must be taken when using this command to avoid accidental deletion of all records in the table. It is critical for data management and cleanup.",
        "Transaction Control: DML operations can be grouped into transactions, allowing multiple operations to be executed as a single unit of work. Commands like COMMIT and ROLLBACK control these transactions, ensuring data consistency and integrity even in the event of errors.",
      ],
    },
    {
      _id: 4,
      file_name: "Sub Query",
      code: sendCode("SQL/code/04.Sub query.sql"),

      explanation:
        "A subquery, also known as a nested query or inner query, is a SQL query embedded within another SQL query. Subqueries allow users to perform complex queries by retrieving data based on the results of another query. They can be used in various SQL statements such as SELECT, INSERT, UPDATE, and DELETE, and are often employed to filter or compute values that will be used in the main query.",
      topics: [
        "Types of Subqueries: Subqueries can be categorized as single-row subqueries, which return a single value, or multi-row subqueries, which return multiple values. They can also be classified based on their position in the main query, such as in the WHERE, FROM, or SELECT clauses.",
        "Correlated Subqueries: A correlated subquery references columns from the outer query, creating a dependency between the two. It is executed once for each row processed by the outer query, making it useful for comparing values on a row-by-row basis.",
        "Non-Correlated Subqueries: Unlike correlated subqueries, non-correlated subqueries do not reference any columns from the outer query. They can be executed independently and are often used to retrieve a set of values that will be used in the outer query's conditions.",
        "Using Subqueries in the WHERE Clause: Subqueries are commonly used in the WHERE clause to filter results based on the output of another query. For example, you can find records that match a certain condition derived from a subquery that retrieves relevant data from another table.",
        "Using Subqueries in the SELECT Clause: Subqueries can also be utilized in the SELECT clause to compute derived values or perform calculations based on data from other tables. This allows for more dynamic and complex data retrieval strategies.",
      ],
    },
    {
      _id: 5,
      file_name: "Data Definition Language(DDL)",
      code: sendCode("SQL/code/05.DDL.sql"),
      explanation:
        "Data Definition Language (DDL) is a subset of SQL (Structured Query Language) used to define and manage all structures in a database. DDL commands are responsible for creating, altering, and deleting database objects such as tables, indexes, views, and schemas. These commands help establish the schema of the database, which serves as a blueprint for how data is organized and how relationships between different data elements are structured.",
      topics: [
        "CREATE Statement: The CREATE statement is used to create new database objects, such as tables, indexes, and views. It defines the structure of the object, including the columns, data types, and any constraints that apply. For example, you can create a table with specific attributes and constraints to ensure data integrity.",
        "ALTER Statement: The ALTER statement modifies existing database objects. It can be used to add, delete, or modify columns in a table, change data types, or rename objects. This command is essential for evolving the database schema without needing to recreate tables.",
        "DROP Statement: The DROP statement removes database objects from the system, such as tables or indexes. Caution is necessary when using this command, as it permanently deletes the object and its data, which cannot be recovered unless a backup exists.",
        "TRUNCATE Statement: The TRUNCATE statement is used to delete all rows from a table without logging individual row deletions. This command is faster than DELETE as it does not generate individual row delete logs, but it cannot be rolled back in most database systems, making it less flexible for data management.",
        "RENAME Statement: The RENAME statement allows users to change the name of an existing database object. This is useful for improving the clarity of object names or adhering to naming conventions, without affecting the underlying structure or data.",
      ],
    },
    {
      _id: 6,
      file_name: "Transaction Control Language(TCL)",
      code: sendCode("SQL/code/06.TCL.sql"),
      explanation:
        "Transaction Control Language (TCL) is a subset of SQL (Structured Query Language) used to manage transactions in a database. TCL commands are essential for ensuring the integrity and consistency of data during operations that involve multiple steps, allowing users to define a sequence of operations as a single unit of work. By using TCL, database users can ensure that all parts of a transaction are executed successfully or, in the event of an error, rolled back to maintain data integrity.",
      topics: [
        "COMMIT Statement: The COMMIT statement is used to save all changes made during the current transaction to the database. Once a transaction is committed, the changes are permanent and cannot be undone, ensuring that the data reflects the successful completion of the operations.",
        "ROLLBACK Statement: The ROLLBACK statement undoes all changes made during the current transaction if an error occurs or if the user decides not to proceed with the changes. This command helps maintain data integrity by ensuring that incomplete or erroneous transactions do not affect the database.",
        "SAVEPOINT Statement: The SAVEPOINT statement allows users to set a point within a transaction to which they can later roll back. This provides finer control over transactions, enabling partial rollbacks and allowing users to undo operations without affecting the entire transaction.",
        "SET TRANSACTION Statement: The SET TRANSACTION statement is used to define the properties of a transaction, such as its isolation level or whether it is read-only. This command helps manage how transactions interact with each other, influencing data visibility and consistency.",
        "Transaction Management: TCL plays a crucial role in transaction management by ensuring that transactions are executed atomically, consistently, and in isolation. Proper use of TCL commands helps prevent data corruption and maintains the integrity of the database during concurrent operations.",
      ],
    },
  ];
  res.status(200).json(data);
});

module.exports=app;