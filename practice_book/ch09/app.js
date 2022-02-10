const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");

// passport setting 1(1 ~ 3)
const passport = require("passport");
const passportConfig = require("./passport");

const app = express();
const PORT = 8081;

// route
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

// dotenv setting
dotenv.config();

// database connect
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(`******************database error-${err}`);
  });

// passport setting 2
passportConfig();

// view template set
// app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// set middleware
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

// passport setting 3
app.use(passport.initialize());
app.use(passport.session());

// routing setting
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

// 404 middleware
app.use((err, req, res, next) => {
  const error = new Error(`app.js error: ${req.method} ${req.url}`);
  error.status = 404;
  next(error);
});

// error middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// listen
app.listen(PORT, () => {
  console.log(PORT, "번에서 대기중");
});
