const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: "http://localhost:5173",
   },
});
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
   res.send("Hello World!");
});

const DB = {
   onlineUser: [],
};

io.on("connection", (socket) => {
   console.log("user connected", socket.id);
   console.log("username:", socket.handshake.auth.username);
   if (socket.handshake.auth.username) {
      DB.onlineUser.push({
         socketId: socket.id,
         username: socket.handshake.auth.username,
      });
   }
   console.log(DB.onlineUser);
   io.emit("User: Online", DB.onlineUser);

   socket.emit("message", "Welcome to Son Goku's Kinton Cloud ChatApp! " + socket.id);

   socket.on("chat:new-chat", (message) => {
      socket.broadcast.emit("chat:update", {
         message,
         sender: socket.handshake.auth.username,
      });
      console.log(message);
   });

   socket.on("disconnect", () => {
      DB.onlineUser = DB.onlineUser.filter((user) => user.socketId !== socket.id);
      io.emit("User: Online", DB.onlineUser);
   });
});

httpServer.listen(port, () => {
   console.log(`Example app listening on port ${port}`);
});
