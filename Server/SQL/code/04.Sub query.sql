/*Create database and use*/
create database subDB;
use subDB;

/*Create table*/
create table employees(emp_id int ,emp_name varchar(30),salary long,dept_id int);

/*insert some data*/
INSERT INTO employees (emp_id, emp_name, salary, dept_id)
VALUES
(1, 'Anish', 50000.00, 101),
(2, 'Mohit', 60000.00, 102),
(3, 'Karan', 55000.50, 103),
(4, 'Hardik', 72000.75, 104),
(5, 'vikas', 45000.00, 101);

select * from employees;


/*sub query*/
/*(select Emp_name from employees where emp_id=4) this query return emp name from table which id is 4*/
/*main query */
/*select emp_id,emp_name from employees where emp_name=   this query accept name from sub query*/
select emp_id,emp_name from employees where emp_name=(select Emp_name from employees where emp_id=4);

/*sub query */
/*SELECT salary, emp_name FROM sub_table WHERE emp_id = 3 this query return return salary and name which's id is 3*/
/*main query*/
/* SELECT emp_id, emp_name FROM sub_table WHERE (salary, emp_name) IN (55000.50, 'Karan') this query accept value and search value in table*/
select emp_id ,emp_name,salary from employees where (salary,emp_name) in (select salary,emp_name from employees where emp_id=3);

/*sub query*/
/*(SELECT AVG(salary) FROM employees AS sub WHERE sub.dept_id = employees.dept_id ) this query return average salary using emp_id and dept_id*/
/*main query*/
/*SELECT emp_id, emp_name, salary FROM employees WHERE salary > this query return higner of equal salary of employee compare to average salary*/
SELECT emp_id, emp_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees AS sub WHERE sub.dept_id = employees.dept_id );
