var SlackBot = require("slackbots");
var channel = "general";

var bot = new SlackBot({
    token: "xoxb-539496404048-544364496215-PuY065hZR3NpJyHtiomiLrVI",
    name: "Slacky"
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
        case "hi":
        case "hello":
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
            "hello!",
            "hi there!",
            "cheerio!",
            "how do you do!",
            "¡hola!"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)] + " blah";
    }