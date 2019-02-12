require('dotenv').config();
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var SlackBot = require("slackbots");
var channel = "general";
var location = 3
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
// app.get('/', function(request, response) {
//     response.sendfile('index.html');
// })

// SOCKET.IO -----------------------------------------------------
io.on('connection', function(data) {
    data.send("parked in spot" + location);
    console.log("it worked");
})


server.listen(3000);
// WARNING: app.listen(80) will NOT work here!



// BOT -------------------------------------------------------------
var bot = new SlackBot({
    token: process.env.slackToken,
    name: "Starportbot"
});

bot.on("start", function() {
    bot.postMessageToChannel(channel, "Starport connected");
    console.log("Starport connected");
});

bot.on("message", function(data) {
    if (data.type !== "message") {
        return;
    }
    handleMessage(data.text);
});

function handleMessage(message) {
    console.log(message);
    switch(message) {
        case "Penny24":
        case "Comet12":
            sendGreeting();
            break;
        default:
            return;
    }
}

function sendGreeting() {
        var greeting = getGreeting();
        bot.postMessageToChannel(channel, greeting);
    }

    function getGreeting() {
        var greetings = [
            "received"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }