const WebSocket = require("ws");

// app.js에서 listen server를 보낸걸 받아옴
module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);

    // client가 메시지를 수신함
    ws.on("message", (message) => {
      console.log(message.toString());
    });

    // error
    ws.on("error", (err) => {
      console.error(`socket.js error - ${err}`);
    });

    // end(close)
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });

    // 3초마다 클라이언트로 메시지 전송
    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("server : 서버에서 클라이언트로 메시지를 보냅니다.");
      }
    }, 3000);
  });
};
