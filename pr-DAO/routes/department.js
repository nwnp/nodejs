const express = require("express");

const router = express.Router();
const ctrlDepartment = require("../controller/ctrl.department.js");

router.post("/", ctrlDepartment.signup);

module.exports = router;
