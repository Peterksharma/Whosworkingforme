
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

const connectionSettings = require('./config/connection');

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
      switch (anwser.menu) {
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
        case 'Exit':
      }
    })
  }
//Function Junction (look to maybe export some functions out of file to keep it clean)
// function viewDepartments() {

// }

// function viewRoles() {

// }

// function viewEmployees() {

// }

// function addDepartment() {

// }

// function addRole() {

// }

// function addEmployee() {

// }

// function updateEmployee() {

// }

