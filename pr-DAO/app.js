const logger = require("./lib/logger.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const corsConfig = require("./config/corsConfig.json");
const models = require("./models/index.js");

const logRouter = require("./routes/test.js");

const app = express();
const PORT = 8080;

dotenv.config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// sequelize sync
models.sequelize.authenticate().then(() => {
  logger.info("DB connection success");

  models.sequelize
    .sync()
    .then(() => {
      logger.info("Sequelize sync success");
    })
    .catch((err) => {
      logger.error("Sequelize sync error", err);
    });
});

// cors settings
app.use(cors(corsConfig));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "cookiesecret",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use("/log-test", logRouter);

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중....");
  logger.info("app start");
});
