CREATE DATABASE myDB;
use myDB;

Create table employee(name varchar(10), salary int,id int);

insert into employee values("Rathod ",20000,1),("Mohit ",30000,2),("Anish ",40000,3),("Noob ",15000,4),("Karn ",35000,5);

select * from employee;

--return sum of salary
select sum(salary) from employee;

--return the number of rows
select count(*) from employee;

--return average of salary
select avg(salary) from employee;

--return maximum of salary
select max(salary) from employee;

--return minimum of salary
select min(salary) from employee;