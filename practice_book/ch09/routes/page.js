const express = require("express");
const { User } = require("../models");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

// GET /
router.get("/", (req, res, next) => {
  res.render("main", { title: "jin's page" });
  console.log(`\npage.js: ${req.method} ${req.url} - log`);
  // res.send("라우팅 테스트");
});

// GET /profile
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", { title: "profile page" });
  console.log(`\npage.js ${req.method} ${req.url} - log`);
  // res.send("profile page");
});

// GET /join
router.get("/join", isNotLoggedIn, (req, res, next) => {
  const twits = [];
  res.render("join", { title: "join page", twits });
  console.log(`\npage.js ${req.method} ${req.url} - log`);
  // res.send("join page");
});

module.exports = router;
