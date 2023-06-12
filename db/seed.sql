INSERT INTO departments (department_name)
VALUES 
("Kitchen"), 
("Waitstaff"),
("Bartending"),
("Human Resources"),
("Accounting"),
("Management"),
("Events");

INSERT INTO roles (title, salary, department_id)
VALUES 
("Chef", 65000, 6),
("Sous Chef", 60000, 1),
("Waiter", 30000, 2),
("Bartender", 35000, 3), 
("Customer Service", 35000, 6),
("Event Coordinator", 45000, 7), 
("HR Manager", 55000, 4),
("Marketing Specialist", 50000, 6),
("Accountant", 55000, 5), 
("Restaurant Manager", 70000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("John", "Smith", 1, 10),
("James", "Brown", 2, 10),
("Emily", "Johnson", 3, 10),
("Sarah", "Miller", 4, 10), 
("Rachel", "Davis", 5, 10),
("Michael", "Wilson", 6, 10),
("Jessica", "Taylor", 7, 10),
("David", "Anderson", 8, 10), 
("Sophia", "Thomas", 9, 10), 
("Liam", "White", 1, 10), 
("Oliver", "Harris", 2, 10), 
("Ava", "Martin", 3, 10), 
("Lucas", "Jackson", 4, 10), 
("Isabella", "Thompson", 5, 10), 
("Mason", "Martinez", 6, 10), 
("Emma", "Robinson", 7, 10), 
("Logan", "Clark", 8, 10), 
("Mia", "Rodriguez", 9, 10), 
("Elijah", "Lewis", 1, 10), 
("Amelia", "Walker", 2, 10), 
("Benjamin", "Hall", 3, 10), 
("Harper", "Allen", 4, 10), 
("Ethan", "Young", 5, 10), 
("Madison", "Hernandez", 6, 10), 
("William", "King", 7, 10), 
("Charlotte", "Wright", 8, 10), 
("Daniel", "Lopez", 9, 10), 
("Aiden", "Hill", 1, 10), 
("Ella", "Scott", 2, 10), 
("Matthew", "Green", 3, 10), 
("Abigail", "Adams", 4, 10), 
("Lucy", "Baker", 5, 10), 
("Alexander", "Gonzalez", 6, 10), 
("Victoria", "Nelson", 7, 10), 
("Jack", "Carter", 8, 10);
