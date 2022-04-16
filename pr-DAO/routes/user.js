const express = require("express");

const router = express.Router();
const ctrlUser = require("../controller/ctrl.user.js");

router.get("/", ctrlUser.list);
router.post("/signup", ctrlUser.signup);

module.exports = router;
