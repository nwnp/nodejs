// @ts-check

const express = require("express");

const app = express();
const PORT = 8080;

const USERS = {
  15: {
    nickname: "foo",
  },
  16: {
    nickname: "bar",
  },
};

app.use(express.json());
app.use("/public", express.static("src/public"));

app.set("views", "src/views"); // src 폴더 안에 viwes폴더를 추적할 수 있게 설정
app.set("view engine", "pug");

// params에 id가 들어왔을 때
app.param("id", async (req, res, next, value) => {
  try {
    const user = USERS[value];
    if (!user) {
      const err = new Error("User not found");
      // @ts-ignore
      err.statusCode = 404;
      throw err;
    }
    // @ts-ignore
    req.user = USERS[value];
    next();
  } catch (err) {
    next(err);
  }
});

app.get("/", (req, res, next) => {
  res.render("user-profile", {
    message: "Hello, pug!!!", // index.pug 파일에 변수로 넘겨줌
  });
});

app.get("/:id", (req, res, next) => {
  const resMimeType = req.accepts(["json", "html"]);

  if (resMimeType === "json") {
    // @ts-ignore
    res.send(req.user);
  } else if (resMimeType === "html") {
    res.render("user-profile", {
      // @ts-ignore
      nickname: req.user.nickname, // index.pug 파일에 변수로 넘겨줌
    });
  }
});

// error-handling
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중...");
});
