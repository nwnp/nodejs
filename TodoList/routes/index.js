const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login");
  console.log("GET /");
});

router.get("/join", (req, res, next) => {
  res.render("join");
  console.log("GET /join");
});

module.exports = router;
