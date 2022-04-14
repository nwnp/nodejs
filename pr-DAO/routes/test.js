const express = require("express");
const logger = require("../lib/logger.js");

const router = express.Router();

router.get("/", (req, res, next) => {
  logger.error("This is Error messsage");
  logger.warn("This is Warn messsage");
  logger.info("This is Info messsage");
  logger.verbose("This is Verbose messsage");
  logger.debug("This is debug messsage");
  logger.silly("This is silly messsage");

  res.send("<h1>Log TEST</h1>");
});

module.exports = router;
