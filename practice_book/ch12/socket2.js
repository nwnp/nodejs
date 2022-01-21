const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;

    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("new client access", ip, socket.id, req.ip);

    // 연결 종료 시
    socket.on("disconnect", () => {
      console.log("disconnect client access", ip, socket.id);
    });

    // 에러 발생 시
    socket.on("error", (err) => {
      console.log(`socket2.js error - ${err}`);
    });

    // 클라이언트로부터 메시지를 받을 때
    socket.on("reply", (data) => {
      console.log("socket2.js -", data);
    });

    // 3초마다 클라이언트에 메시지를 보냄
    socket.interval = setInterval(() => {
      socket.emit("news", "server : hello Socket.IO");
    }, 3000);
  });
};
