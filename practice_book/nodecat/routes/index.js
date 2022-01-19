const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/test", async (req, res, next) => {
  try {
    if (!req.session.jwt) {
      // 세션에 토큰이 없으면 토큰 발급 시도

      const tokenResult = await axios.post("http://localhost:8081/v1/token", {
        clientSecret: process.env.CLIENT_SECRET,
      });
      if (tokenResult.data && tokenResult.data.code === 200) {
        // 토큰 발급 성공
        req.session.jwt = tokenResult.data.token;
      } else {
        // 토큰 발급 실패
        return res.json(tokenResult.data); // 발급 실패 사유 응답
      }
    }
    // 발급받은 토큰 테스트
    const result = await axios.get("http://localhost:8081/v1/test", {
      headers: { authorization: req.session.jwt },
    });

    return res.json(result.data);
  } catch (err) {
    console.error(`routes/index.js err: ${err}`);
    if (err.response.status === 419) {
      // 토큰 만료시
      return res.json(err.response.data);
    }
    return next(err);
  }
});

module.exports = router;
