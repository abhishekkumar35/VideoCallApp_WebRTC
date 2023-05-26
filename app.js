const express = require("express");
const http = require("http");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname, "/public/index.html");
});

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Listening at ", PORT);
});
