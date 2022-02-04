const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const router = express.Router();

/** GET */
// /
// /login
// /join
router.get("/", (req, res, next) => {
  res.render("index");
  console.log("GET /");
});

router.get("/login", (req, res, next) => {
  // res.send("hello world!");
  res.render("login");
  console.log("GET /login");
});

router.get("/join", (req, res, next) => {
  res.render("join");
  console.log("GET /join");
});

/** POST */
// /join
// login
router.post("/join", async (req, res, next) => {
  const { userId, password, email, nickname } = req.body;
  try {
    const findedId = await User.findOne({ where: { userId: userId } });
    if (!findedId) {
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
    console.error(`create err`);
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { userId, password } = req.body;
  try {
    const finded = await User.findOne({ where: { userId } });

    // 비밀번호 검증
    // bcrypt.compareSync(찾고자 하는 password, database에서 가져온 password)
    const match = bcrypt.compareSync(password, finded.password);
    if (match) {
      res.send("success login");
      console.log(`${userId} 로그인 성공`);
    } else {
      res.send("비밀번호가 틀렸습니다.");
    }
  } catch (err) {
    console.error(`/login err: ${err}`);
    next(err);
  }
});

module.exports = router;
