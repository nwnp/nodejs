const express = require("express");
// const Trello = require('trello')
// const trello = new Trello('my')

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
  console.log("GET /");
});

router.get("/login", (req, res, next) => {
  // res.send("hello world!");
  res.render("login");
  console.log("GET /login");
});

router.get("/join", (req, res, next) => {
  res.render("join");
  console.log("GET /join");
});

module.exports = router;
