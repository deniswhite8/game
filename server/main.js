fs = require("fs");
var io = require('socket.io').listen(1337);

io.configure(function() {
	io.set("log level", 0);
});

fs.readFile("conf.json", "utf8", function (err,data) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	ok(JSON.parse(data));
});


var bots = {};

var green, reset;
green   = '\033[32m';
reset = '\033[0m';

function ok(data) {
	io.sockets.on("connection", function (socket) {
		data.user = {};
		data.user.type = "hero";
		data.user.state = "stay down";
		data.user.x = 0;
		data.user.y = 0;
		data.user.id = socket.id;
		data.bots_mas = bots;
		socket.emit("hello", data);

		console.log(green + "   new player: " + reset, socket.id);
		bots[socket.id] = data.user;
		socket.broadcast.emit("new", data.user);

		socket.on("upd", function(data) {
			console.log(green + "   update player: " + reset, socket.id);
			if(data.x !== undefined) {
				console.log("      x: ", data.x);
				bots[socket.id].x = data.x;
			}
			if(data.y !== undefined) {
				console.log("      y: ", data.y);
				bots[socket.id].x = data.x;
			}
			if(data.state !== undefined) {
				console.log("      state: ", data.state);
				bots[socket.id].state = data.state;
			}
			data.id = socket.id;

			socket.broadcast.emit("upd", data);
		});

		socket.on("disconnect", function() {
			console.log(green + "   player has left: " + reset, socket.id);
			bots[socket.id] = undefined;
			socket.broadcast.emit("left", socket.id);
		});
	});
}