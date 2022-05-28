const dotenv = require("dotenv");
const Koa = require("koa");
const Pug = require("koa-pug");
const path = require("path");
const websockify = require("koa-websocket");
const route = require("koa-route");
const serve = require("koa-static");
const mount = require("koa-mount");

const app = websockify(new Koa());
const PORT = 8080;

dotenv.config();

// template engine setup
new Pug({
  viewPath: path.resolve(__dirname, "./views"), // file 경로 지정
  app,
});

app.use(mount("/public", serve("src/public")));

app.use(async (ctx, next) => {
  await ctx.render("main");
});

app.ws.use(
  route.all("/ws", (ctx) => {
    ctx.websocket.on("message", (data) => {
      if (typeof data !== "string") {
        console.log("return");
        return;
      }
      const { nickname, message } = JSON.parse(data);

      // broadcasting
      const { server } = app.ws;
      if (!server) {
        return;
      }

      server.clients.forEach((client) => {
        client.send(
          JSON.stringify({
            message,
            nickname,
          })
        );
      });
    });
  })
);

app.listen(PORT, () => {
  console.log(PORT, "번에서 대기 중");
});
