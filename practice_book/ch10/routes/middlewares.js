const jwt = require("jsonwebtoken");
const RateLimit = require("express-rate-limit");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

// 토큰 인증 과정
exports.verifyToken = (req, res, next) => {
  try {
    req.recoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    console.error(`routes/middlewares.js err : ${err}`);
    // next(err);
    if (err.name === "TokenExpiredError") {
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었음",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰임",
    });
  }
};

// api 사용량을 제한하는 미들웨어 등록
exports.apiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1m
  max: 1,
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode, // default value = 429
      message: "1분에 한 번만 요청할 수 있음",
    });
  },
});

// deprecated 미들웨어 등록
// exports.deprecated = (req, res) => {
//   res.status(401).json({
//     code: 401,
//     message: "새로운 버전을 사용하세요.",
//   });
// };
