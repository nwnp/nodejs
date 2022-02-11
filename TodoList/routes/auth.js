const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { userId, password, email, nickname } = req.body;
  console.log(userId, password, email, nickname);
  try {
    const exUser = await User.findOne({ where: { userId: userId } });
    if (!exUser) {
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        userId,
        password: hash,
        email,
        nickname,
      });
      return res.redirect("/");
    } else {
      res.send("이미 가입되어 있는 아이디");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", isNotLoggedIn, async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    console.log("????????");
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
      console.log("????");
      return res.render("main");
    });
  })(req, res, next);
});

module.exports = router;
