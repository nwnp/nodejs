const express = require("express");
// const { User } = require("../models");

/* multer */
// 게시글 작성 기능 추가
// 메인 페이지 로딩 시 메인 페이지와 게시글을 함게 로딩
const { Post, User, Hashtag } = require("../models");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user
    ? req.user.Followings.map((f) => f.id)
    : [];
  next();
});

// GET /
// router.get("/", (req, res, next) => {
//   res.render("main", { title: "jin's page" });
//   console.log(`\npage.js: ${req.method} ${req.url} - log`);
//   // res.send("라우팅 테스트");
// });

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

/* multer */
// 게시글 작성 기능 추가
// 메인 페이지 로딩 시 메인 페이지와 게시글을 함게 로딩
router.get("/", async (req, res, next) => {
  // res.render("main", { title: "jin's page" });
  try {
    console.log("error 어딨냐 1");
    const posts = await Post.findAll({
      include: {
        model: User,
        attributes: ["id", "nick"],
      },
      order: [["createdAt", "DESC"]],
    });
    // console.log("error 어딨냐 2");
    console.log(`posts------------------------------\n${posts}`);
    res.render("main", {
      title: "jin's page",
      twits: posts,
    });
    // console.log("error 어딨냐 3");
  } catch (err) {
    // console.log("error 어딨냐");
    console.error(`routes/page.js router.get('/') error: ${err}`);
    next(err);
  }
});

router.get("/hashtag", async (req, res, next) => {
  const query = req.query.Hashtag;
  if (!query) {
    return res.redirect("/");
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.render("main", {
      title: `${query} | jin's page`,
      twits: posts,
    });
  } catch (err) {
    console.error(`routes/page.js error: ${err}`);
    next(err);
  }
});

module.exports = router;
