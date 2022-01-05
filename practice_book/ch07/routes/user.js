const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.url, "routing");
  res.send("USER PAGE");
});

module.exports = router;
