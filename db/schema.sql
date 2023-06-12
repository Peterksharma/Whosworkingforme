-- Clear out the old DB
DROP DATABASE IF EXISTS employee_db;
-- Makes New DB 
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30),
 

CREATE TABLE roles
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    -- the first int is the number of numbers to display, the second is decimal places.
    salary DECIMAL(5,2) NOT  NULL,
    department_id INT,

CREATE TABLE employee
    INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30) NOT NULL
    last_name VARCHAR (30) NOT  NULL
    role_id INT NULL
    manager_id INT NULL

USE registrar_db;