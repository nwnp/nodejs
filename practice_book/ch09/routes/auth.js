const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect(`/join?error=exist`);
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(`page.js error: ${error}`);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // 실패했을 때
      console.error(`authError: ${authError}`);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(`loginError: ${loginError}`);
        return next(loginError);
      }
      // return res.send("post login page");
      return res.redirect("join");
    });
  })(req, res, next);
  // res.send("post login page");
  // res.redirect("/profile");
});

router.get("/logout", isLoggedIn, async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
