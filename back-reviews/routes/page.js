const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get("/", (req, res) => {
  const twits = [];
  res.render("main", {
    title: "jin's page",
    twits,
  });
});

router.get("/join", isNotLoggedIn, (req, res, next) => {
  res.render("join", { title: "회원가입 - jin's page" });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", { title: "내 정보" });
});

module.exports = router;
