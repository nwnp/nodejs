const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");

dotenv.config();

const indexRouter = require("./routes");

const app = express();
const PORT = 4000;

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/", indexRouter);

// 404 에러 핸들링
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음`);
  error.status = 404;
  next(err);
});

// 500 에러 핸들링
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 대기 중...`);
});
