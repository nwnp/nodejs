const express = require("express");
const dotenv = require("express");
const morgan = require("morgan");
// const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
// const sequelize = require("sequelize");

const app = express();
const PORT = 8080;

// routing
const indexRoute = require("./routes/index");

// connect database
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(`데이터베이스 연결 에러 ${err}`);
  });

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
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

app.use("/", indexRoute);

// error
app.use((err, req, res, next) => {
  console.error(err);
  res.send(err.message);
});

app.use((req, res, next) => {
  console.log("cannot found");
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기중");
});
