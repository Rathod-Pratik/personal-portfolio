/*TCL stand for trasaction control Language*/
/*Create user and use database*/
CREATE DATABASE mydb;
USE mydb;

/*Create table*/
CREATE TABLE mytable (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  value VARCHAR(255)
);
/*insert value*/
INSERT INTO mytable (id, name, value) VALUES (1, 'Item1', 'Value1');

/*save the query into spp1 point*/
SAVEPOINT sp1;

/*insert value*/
INSERT INTO mytable (id, name, value) VALUES (2, 'Item2', 'Value2');
INSERT INTO mytable (id, name, value) VALUES (3, 'Item3', 'Value3');

/*undo 2 previous query using sp1 name*/
ROLLBACK TO sp1;

/*commit all query*/
COMMIT;
