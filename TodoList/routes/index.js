const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
  console.log("GET /");
});

router.get("/join", isNotLoggedIn, (req, res, next) => {
  res.render("join");
  console.log("GET /join");
});

router.post("/login", (req, res, next) => {
  console.log("POST /login");
});

module.exports = router;
