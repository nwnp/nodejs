const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8080;

const upload = multer({ dest: "uploads/" });

app.use(express.json());

// dummy data
const USERS = {
  1: {
    nickname: "jin",
    profileImageKey: undefined,
  },
};

// settings
app.set("views", "src/views");
app.set("view engine", "pug");

// params에 id가 들어왔을 때 검사
app.param("id", async (req, res, next, value) => {
  try {
    const user = USERS[value];
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    req.user = USERS[value];
    next();
  } catch (error) {
    next(error);
  }
});

// router
app.get("/", (req, res, next) => {
  res.render("main", {
    message: "pug와 multer를 이용해서 이미지 upload하기",
  });
});

/** to use multer */
app.post("/:id/profile", upload.single("profile"), (req, res, next) => {
  const { user } = req;
  const { filename } = req.file;
  user.profileImageKey = filename;
  res.send(`User profile uploaded: ${filename}`);
});

app.get("/:id", (req, res, next) => {
  const resMimeType = req.accepts(["json", "html"]);

  if (resMimeType === "json") {
    res.send(req.user);
  } else if (resMimeType === "html") {
    res.render("main", {
      nickname: req.user.nickname,
      userId: req.params.id,
      message: "success",
      userProfileImageURL: `/uploads/${req.user.profileImageKey}`,
    });
  }
});

// error-handling
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

app.use("/public", express.static("src/public"));
app.use("/uploads", express.static("uploads"));

// listening
app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중.....");
});
