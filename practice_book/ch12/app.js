const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const nunjucks = require("nunjucks");
const path = require("path");
const app = express();
const ColorHash = require("color-hash");

// connection with mongodb
const connect = require("./schemas");

// websocket middleware
// const webSocket = require("./socket");
const webSocket = require("./socket2");

// PORT
const PORT = 8080;

// routing name
const indexRouter = require("./routes/index");

dotenv.config();
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// connection with mongodb
connect();

// Socket.IO middleware
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

// app.use((req, res, next) => {
//   if (!req.session.color) {
//     const colorHash = new ColorHash();
//     req.session.color = colorHash.hex(req.sessionID);
//   }
//   next();
// });

// routing
app.use("/", indexRouter);

// 404 error
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없음`);
  error.status = 404;
  next(error);
});

// 500 error
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const server = app.listen(PORT, () => {
  console.log(PORT, "번에서 대기중...");
});

// socket 간에 express-session 미들웨어를 공유하기 위해
// 인자로 같이 넣어줌
webSocket(server, app, sessionMiddleware);
