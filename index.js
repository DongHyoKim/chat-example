var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

var users = [];

app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    res.send("POST request to the homepage");
});

io.on("connection", (socket) => {
    console.log("접속 완료 : " + socket.id);
    users.push(socket.id);
    console.log(users);
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
        console.log("ID] " + socket.id + ":" + msg);
    });
});

http.listen(3000, () => {
    console.log(__dirname);
    console.log("listening on *:3000");
});
