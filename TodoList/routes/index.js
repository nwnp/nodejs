const express = require("express");
// const Trello = require('trello')
// const trello = new Trello('my')

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("hello world!");
  console.log("GET /");
});

module.exports = router;
