const express = require('express');
const inquirer = require('inquirer');
const path = require('path');
const chalk = require('chalk');
const mysql = require('mysql')

const connectionSettings = {
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db",
}

const connection = mysql.createConnection(connectionSettings);
connection.connect();

//process.env.port is how to assign ports to Heroku || defaults it to 3001. 
const PORT = process.env.PORT || 3001;
const app = express();

//Middleware for parsing JSON and urlencoded form data
app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));

  //Starting the Server
  app.listen(PORT, () => {
    console.log(chalk.dim(`App listening at http://localhost:${PORT} 🚀\n`));
    console.log(chalk.bgMagenta.bold('Employee Tracker Application'));
    startProgram();
  });

//Create a function that prompts the user for what action they should take
function startProgram() {
  inquirer.prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  })

    .then((answer) => {
      switch (answer.menu) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployee();
          break;
        default:
          quit();
      }
    })
  }
//Function Junction (look to maybe export some functions out of file to keep it clean)
function viewDepartments() {
    let query = "SELECT * FROM departments";
    connection.query(query, function(err, res){
      if (err) throw err;
      console.table(res);
      startProgram();
    })
}

function viewRoles() {
  //The INNER JOIN keyword selects records that have matching values in both tables.
  let query = `SELECT roles.id, roles.title, roles.salary, departments.department_name FROM roles INNER JOIN departments ON roles.department_id = departments.id`;
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    startProgram();
  })
}

function viewEmployees() {
  // The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2). The result is 0 records from the right side, if there is no match.
  let query = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.department_id, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee
  LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  connection.query(query, function(err, res){
    if (err) throw err;
    console.table(res);
    startProgram();
  })
}

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "What is the department name?",
    name: "departmentName"
  }).then(function(answer){
      //add connection query here <----- The query here needs to be defined*****
      connection.query("INSERT INTO departments (department_name) VALUES (?)", [answer.departmentName] , function(err, res) {
        if (err) throw err;
        //Creates a table of response fr the Department
        console.log('This department had been added.')
        startProgram()
      })
})
}

function addRole() {
  const roleNames = [];
  inquirer.prompt([
    {
    type: "input",
    message: "What is the role name?",
    name: "roleName"
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "roleSalary"
    },
    {
      type: "input",
      message: "What Department?",
      name: "department_id" 
    }
  ]).then(function(answer) {
      // var departmentId = getDepartmentId(answer.roleDepartment);
      connection.query("INSERT INTO role (title, salary, department_id VALUES  (?, ?, ?)",
      [answer.roleName, answer.roleSalary, answer.department_id],
      function (err, res) {
        if (err) throw (err),
        console.log("The Role has been Created"),
        startProgram()
      }
      )
  })
}

function addEmployee() {
  startProgram()
}

function updateEmployee() {
  startProgram()
}

function quit () {
  connection.end();
  process.exit();
}

