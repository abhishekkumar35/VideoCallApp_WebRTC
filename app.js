const express = require("express");
const http = require("http");
// const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));
let connectedPeers = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user " + socket.id + " connected to socketio server");
  connectedPeers.push(socket.id);
  console.log(connectedPeers);
  socket.on("disconnect", () => {
    console.log("user " + socket.id + " disconnected from socketio server");
    const newConnectedPeers = connectedPeers.filter((peerSocketId) => {
      peerSocketId !== socket.id;
    });
    connectedPeers = newConnectedPeers;
  });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening on Port", PORT);
});
