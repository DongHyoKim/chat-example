var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var bodyParser = require('body-parser');

var users = [];

app.use("/static", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
    console.log("접속 완료 : " + socket.id);
    users.push(socket.id);
    console.log(users);
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
        console.log("ID " + socket.id + ":" + msg);
    });
});

app.post("/", (req, res) => {
    res.send("POST request to the homepage");
    console.log("order : " + req.body.order);
    io.emit("chat message", req.body.order);
});

http.listen(3000, () => {
    console.log(__dirname);
    console.log("listening on *:3000");
});