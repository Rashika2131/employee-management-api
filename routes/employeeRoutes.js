const express = require("express");
const router = express.Router();
const controller = require("../controllers/employeeController");

router.post("/employees", controller.addEmployee);
router.get("/employees", controller.getAllEmployees);
router.get("/employees/:id", controller.getEmployeeById);
router.put("/employees/:id/increment", controller.incrementSalary);
router.put("/employees/:id/latefine", controller.applyLateFine);
router.delete("/employees/:id", controller.fireEmployee);

module.exports = router;