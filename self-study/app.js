const express = require("express");
const fs = require("fs");

const userRouter = express.Router();

const app = express();
const PORT = 8080;

app.set("views");
app.set("view engine", "pug");

// app.get("/", (req, res, next) => {
//   res.send("root - get");
// });

userRouter.param("id", (req, res, next, value) => {
  console.log(value);
  next();
});

userRouter.get("/", (req, res, next) => {
  res.send("User info with ID");
});

userRouter.get("/:id", (req, res, next) => {
  res.send(req.params.id);
});

userRouter.post("/", (req, res, next) => {
  res.send("register user");
});

userRouter.post("/:id", (req, res, next) => {
  const userId = req.params.id;
  res.send(`id: ${userId} - success register`);
});

app.use("/users", userRouter);

app.get("/", (req, res, next) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`${PORT}번에서 대기중...`);
});
