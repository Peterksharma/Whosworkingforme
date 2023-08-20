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
      message: "What is the Department ID?",
      name: "department_id"
    }
  ]).then(function(answer) {
    connection.query(
      "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", // Notice "roles" instead of "role"
      [answer.roleName, answer.roleSalary, answer.department_id],
      function (err, res) {
        if (err) throw err;
        console.log("The Role has been Created");
        startProgram();
      }
    );
  });
}


function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "Enter the employee's first name:",
      name: "firstName"
    },
    {
      type: "input",
      message: "Enter the employee's last name:",
      name: "lastName"
    },
    {
      type: "input",
      message: "Enter the employee's role:",
      name: "roleName"
    },
    {
      type: "input",
      message: "Enter the employee's manager's first name (leave empty if no manager):",
      name: "managerFirstName"
    }
  ]).then(function(answer) {
    // Fetch role_id for the provided role name
    connection.query(
      "SELECT id FROM roles WHERE title = ?",
      [answer.roleName],
      function (err, roleResults) {
        if (err) throw err;
        if (roleResults.length === 0) {
          console.error("Role not found!");
          startProgram();
          return;
        }

        const roleId = roleResults[0].id;
        
        // If manager's name is provided, fetch manager_id
        if (answer.managerFirstName) {
          connection.query(
            "SELECT id FROM employee WHERE first_name = ?",
            [answer.managerFirstName],
            function (err, managerResults) {
              if (err) throw err;
              if (managerResults.length === 0) {
                console.error("Manager not found!");
                startProgram();
                return;
              }

              const managerId = managerResults[0].id;
              insertEmployee(answer.firstName, answer.lastName, roleId, managerId);
            }
          );
        } else {
          // No manager provided, so insert employee with no manager
          insertEmployee(answer.firstName, answer.lastName, roleId, null);
        }
      }
    );
  });
}

function insertEmployee(firstName, lastName, roleId, managerId) {
  connection.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [firstName, lastName, roleId, managerId],
    function (err, res) {
      if (err) throw err;
      console.log("The Employee has been Created");
      startProgram();
    }
  );
}

// function updateEmployee() {
//   startProgram()
// }

function updateEmployee() {
  connection.query("SELECT CONCAT(first_name, ' ', last_name) AS fullName FROM employee", function(err, employees) {
    if (err) throw err;

    inquirer.prompt([
      {
        type: "list",
        message: "Which employee would you like to update?",
        name: "employeeName",
        choices: employees.map(e => e.fullName)
      },
      {
        type: "input",
        message: "Enter the employee's new role:",
        name: "roleName"
      },
      {
        type: "input",
        message: "Enter the employee's new manager's first name:",
        name: "managerFirstName"
      }
    ]).then(function(answer) {
      const [firstName, lastName] = answer.employeeName.split(' ');

      if (answer.roleName) {
        connection.query(
          "SELECT id FROM roles WHERE title = ?",
          [answer.roleName],
          function(err, roleResults) {
            if (err) throw err;
            if (roleResults.length === 0) {
              console.error("Role not found!");
              startProgram();
              return;
            }

            const roleId = roleResults[0].id;
            
            if (answer.managerFirstName) {
              connection.query(
                "SELECT id FROM employee WHERE first_name = ?",
                [answer.managerFirstName],
                function(err, managerResults) {
                  if (err) throw err;
                  if (managerResults.length === 0) {
                    console.error("Manager not found!");
                    startProgram();
                    return;
                  }

                  const managerId = managerResults[0].id;
                  performUpdate(firstName, lastName, roleId, managerId);
                }
              );
            } else {
              performUpdate(firstName, lastName, roleId, null);
            }
          }
        );
      } else {
        startProgram();
      }
    });
  });
}

function performUpdate(firstName, lastName, roleId, managerId) {
  connection.query(
    "UPDATE employee SET role_id = ?, manager_id = ? WHERE first_name = ? AND last_name = ?",
    [roleId, managerId, firstName, lastName],
    function(err, res) {
      if (err) throw err;
      console.log("The Employee has been Updated");
      startProgram();
    }
  );
}


function quit () {
  connection.end();
  process.exit();
}

