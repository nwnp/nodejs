const express = require("express");

const { Post } = require("../models/post");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const { title, comment, UserId } = req.body;
  console.log(title, comment, UserId);
  try {
    await Post.create({
      title,
      comment,
      UserId,
    });
    res.send("success");
  } catch (err) {
    console.error(`create err`);
    next(err);
  }
});

module.exports = router;
