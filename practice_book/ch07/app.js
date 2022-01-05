const express = require("express");
const app = express();

const PORT = 8080;

const indexRouter = require("./routes/index.js");
const testRouter = require("./routes/test.js");
const userRouter = require("./routes/user");

app.use("/", indexRouter);
app.use("/test", testRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`${PORT}번에서 대기중....`);
});
