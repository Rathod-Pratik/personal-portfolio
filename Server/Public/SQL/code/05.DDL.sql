/*DDL stand for Data Definition language*/

/*Create table*/
create table mytable(id int,name varchar(50));

/*Delete table*/
drop table mytable;

/*check structure of table*/
select * from mytable;

/*insert one column in table*/
alter table mytable add email varchar(50);

/*delete one column in table*/
alter table mytable drop column email;

/*insert multiple column in table*/
alter table mytable add ClassNo int,add gread varchar(1); 

/*delete multiple column in table*/
alter table mytable drop column ClassNo,drop column gread; 

/*insert some data*/
insert into mytable values(1,'Mohan'),(2,'mohit');

/*delete all rows from table*/
truncate table mytable;
