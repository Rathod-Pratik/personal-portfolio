/*1. Create table if database name is exist it will throw an error*/
CREATE DATABASE myDB;

/*2. Create database if database name is not exist*/
CREATE DATABASE if not exists myDB;

/*3. Delete database if database not exist it will throw an error*/
DROP DATABASE  mydb;

/*4. If the table in exist  then delete it*/
DROP DATABASE if exists myDB;

/*5. Show all databases in server*/
SHOW databases;

/*6. Select specific database from multiple databases*/
use mydb;

/*5. Create table in database*/
create table College(id int primary key,Name varchar(50),Course varchar(50));

/*6. use for drop table*/
drop table College;

/*7. This query use to insert value column vice*/
INSERT into College
(id,Name,Course)
 value(1,"Rathod Pratik","BCA"),
 (2,"Mohan dash","BCOM"),
 (3,"Rohan dusara","BBA");

/*8. This query show all rows from table*/
select * from college;

/*9. This query show all table in database*/
SHOW tables;

