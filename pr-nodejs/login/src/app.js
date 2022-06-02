// @ts-check

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.set("views", "src/views");
app.set("view engine", "pug");

const userRouter = require("./routes/user");
const mainRouter = require("./routes/main.js");
const setupPassportFBAuth = require("./passport-auth-fb.js");

app.use(cookieParser());
app.use(async (req, res, next) => {
  const { access_token } = req.cookies;
  if (access_token) {
    // TODO: implement here
  }
  next();
});

setupPassportFBAuth(app);
app.use("/users", userRouter);
app.use("/public", express.static("src/public"));
app.use("/", mainRouter);

// @ts-ignore
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.statusCode = err.statusCode || 500;
  res.send(err.message);
});

module.exports = app;
