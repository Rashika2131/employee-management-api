const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;
const FILE = "employees.json";

app.use(express.json());


let employees = [];
if (fs.existsSync(FILE)) {
  const data = fs.readFileSync(FILE);
  employees = data.length ? JSON.parse(data) : [];
}


function saveData() {
  fs.writeFileSync(FILE, JSON.stringify(employees, null, 2));
}

app.get("/", (req, res) => {
  res.send("Employee Management REST API is running 🚀");
});


app.post("/employees", (req, res) => {
  const { name, salary } = req.body;

  if (!name || !salary) {
    return res.status(400).json({
      message: "Name and Salary are mandatory"
    });
  }

  const newEmployee = {
    id: employees.length + 1,
    name,
    salary: Number(salary),
    status: "Active",
    lateFine: 0
  };

  employees.push(newEmployee);
  saveData();

  res.status(201).json({
    message: "Employee added successfully",
    employee: newEmployee
  });
});


app.get("/employees", (req, res) => {
  res.json(employees);
});


app.get("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.json(emp);
});


app.put("/employees/:id/increment", (req, res) => {
  const { amount } = req.body;
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (!amount) {
    return res.status(400).json({ message: "Increment amount required" });
  }

  emp.salary += Number(amount);
  saveData();

  res.json({
    message: "Salary incremented successfully",
    employee: emp
  });
});


app.put("/employees/:id/latefine", (req, res) => {
  const { fine } = req.body;
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  if (!fine) {
    return res.status(400).json({ message: "Fine amount required" });
  }

  emp.salary -= Number(fine);
  emp.lateFine += Number(fine);
  saveData();

  res.json({
    message: "Late fine applied successfully",
    employee: emp
  });
});


app.delete("/employees/:id", (req, res) => {
  const emp = employees.find(e => e.id == req.params.id);

  if (!emp) {
    return res.status(404).json({ message: "Employee not found" });
  }

  emp.status = "Fired";
  saveData();

  res.json({
    message: "Employee fired successfully",
    employee: emp
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});