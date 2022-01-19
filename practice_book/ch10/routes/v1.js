const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken } = require("./middlewares");
const { Domain, User } = require("../models");

const router = express.Router();

router.post("/token", async (req, res, next) => {
  const { clientSecret } = req.body;
  console.log(`req.body ------ ${req.body}`);
  console.log(clientSecret);
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: {
        model: User,
        attributes: ["nick", "id"],
      },
    });
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.",
      });
    }
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
        issuer: "jin",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (err) {
    console.error(`routes/v1.js err : ${err}`);
    // next(err);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

router.get("/test", verifyToken, (req, res, next) => {
  res.json(req.decoded);
});

module.exports = router;
