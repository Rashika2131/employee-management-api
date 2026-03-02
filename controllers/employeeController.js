const model = require("../models/employeeModel");

// Add Employee
exports.addEmployee = (req, res) => {
  const { name, salary } = req.body;

  if (!name || !salary) {
    return res.status(400).json({ message: "Name and Salary are mandatory" });
  }

  const employee = model.add(name, salary);
  res.status(201).json(employee);
};

// Get All Employees
exports.getAllEmployees = (req, res) => {
  res.json(model.getAll());
};

// Get Employee By ID
exports.getEmployeeById = (req, res) => {
  const employee = model.getById(req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
};

// Increment Salary
exports.incrementSalary = (req, res) => {
  const { amount } = req.body;

  const employee = model.increment(req.params.id, amount);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
};

// Apply Late Fine
exports.applyLateFine = (req, res) => {
  const { fine } = req.body;

  const employee = model.lateFine(req.params.id, fine);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(employee);
};

// Fire Employee
exports.fireEmployee = (req, res) => {
  const success = model.fire(req.params.id);

  if (!success) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json({ message: "Employee fired successfully" });
};