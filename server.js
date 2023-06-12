
//options to be used in the request
// -   view all departments
// -   view all roles
// -   view all employees
// -   add a department
// -   add a role, add an employee
// -   and update an employee role

//Make the tables
//Connect with keys
//Fill seed with Data
//



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
// function viewDepartments() {

// }

function viewRoles() {
  
  let query = "SELECT * FROM roles";
  connectionSettings.query(query, function(err, res){
    if (err) throw err,
    console.table(res);
    startScreen();
  })
}

// function viewEmployees() {

// 

function addDepartment() {
  inquirer.prompt({
    type: "input",
    message: "What is the department name?",
    name: "departmentName"
  }).then(function(answer){
      //add connection query here <----- The query here needs to be defined*****
      connectionSettings.query("INSERT INTO department (name) VALUES (?)", [answer.deptartmentName] , function(err, res) {
        if (err) throw err;
        //Creates a table of response fr the Department
        console.table(res)
        startScreen()
      })
})
}

function addRole() {
  inquirer.prompt([
    {
    type: "input",
    message: "What is the role name?",
    name: "roleName"
    },
    {
      type: "input",
      message: "What is the role name?",
      name: "roleName"
    },
  ])
}

// function addEmployee() {

// }

// function updateEmployee() {

// }

function quit () {
  connection.end();
  process.exit();
}

