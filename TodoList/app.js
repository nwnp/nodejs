const express = require("express");
const dotenv = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//routing
const indexRoute = require("./routes/index");

const app = express();

const PORT = 8080;

app.use("/", indexRoute);

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기중");
});
