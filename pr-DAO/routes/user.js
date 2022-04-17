const express = require("express");

const router = express.Router();
const ctrlUser = require("../controller/ctrl.user.js");
const { isLoggedIn } = require("../lib/middleware.js");

router.get("/", isLoggedIn, ctrlUser.list);
router.post("/signup", ctrlUser.signup);

module.exports = router;
