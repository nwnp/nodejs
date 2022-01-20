const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken, apiLimiter } = require("./middlewares");
const { Domain, User, Post, Hashtag } = require("../models");

const router = express.Router();

router.post("/token", apiLimiter, async (req, res, next) => {
  const { clientSecert } = req.body;
  console.log(clientSecert);
  // domain에서 비밀 키가 맞는 유저를 찾아옴
  try {
    const domain = await Domain.findOne({
      where: { clientSecert },
      include: {
        model: User,
        attributes: ["nick", "id"],
      },
    });
    // 없다면 error 등록
    if (!domain) {
      return res.status(401).json({
        code: 401,
        message: "등록되지 않은 도메인",
      });
    }

    // token 새로 등록
    const token = jwt.sign(
      {
        id: domain.User.id,
        nick: domain.User.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m",
        issuer: "jin",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다.",
      token,
    });
  } catch (err) {
    console.error(`routes/v2.js err: ${err}`);
    // next(err);
    return res.status(500).json({
      code: 500,
      message: "v2 /test 서버 에러",
    });
  }
});

router.get("/test", verifyToken, apiLimiter, (req, res, next) => {
  res.json(req.decoded);
});

router.get("/posts/my", apiLimiter, verifyToken, (req, res, next) => {
  Post.findAll({ where: { userId: req.decoded.id } })
    .then(() => {
      console.log(posts);
      res.json({
        code: 200,
        payload: posts,
      });
    })
    .catch((err) => {
      console.error(`routes/v2.js err - ${err}`);
      return res.status(500).json({
        code: 500,
        message: "v2 /posts/my 서버 에러",
      });
    });
});

router.get(
  "/posts/hashtag/title/:id",
  verifyToken,
  apiLimiter,
  async (req, res, next) => {
    try {
      const hashtag = await Hashtag.findOne({
        where: { title: req.params.title },
      });
      if (!hashtag) {
        return res.status(404).json({
          code: 404,
          message: "검색 결과가 없음",
        });
      }
      const posts = await Post.getPosts();
      return res.json({
        code: 200,
        payload: posts,
      });
    } catch (err) {
      console.error(`routes/v2.js err - ${err}`);
      // next(err);
      return res.status(500).json({
        code: 500,
        message: "routes/v2.js /posts/hashtag/title/:id server error",
      });
    }
  }
);

module.exports = router;
