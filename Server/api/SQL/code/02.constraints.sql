
create database constraints;
use constraints;

/*1. not null use to this column can't be null*/
create table fees(
id int not null,
name varchar(50)
); 
insert into fees value(1,"Rathod");
select * from fees;


/*2. unique use to enter every time unique value in column*/
create table student(
course varchar(5) unique,
name varchar(50)
); 
insert into student value(1,"Rathod"),(2,"Dusara");
select * from student;


/*3. primary key use to access row*/
create table college(
Enrollment_no int primary key,
name varchar(50)
);
insert into college value(1,"Rohan"),(2,"mohan");
select * from college;


/*4. default use assign default value to the row*/
create table employee(
Id int ,
salary int default 5000
);
insert into employee (Id) value(15);
select * from employee;


/*5. Check is use to add condition in table*/
create table shop(
income int,
invest int,
constraint money check (income >25000 and invest <100000)
);
insert into shop value(26000,99000);
select * from shop;

