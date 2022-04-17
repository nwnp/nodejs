const express = require("express");

const router = express.Router();
const ctrlAuth = require("../controller/ctrl.auth.js");

router.post("/token", ctrlAuth.token);

module.exports = router;
