const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("TEST PAGE");
  console.log(req.url, "routing");
});

module.exports = router;
