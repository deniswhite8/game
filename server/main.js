fs = require("fs");
var io = require('socket.io').listen(1337);

fs.readFile("conf.json", "utf8", function (err,data) {
	if (err) {
		console.log(err);
		process.exit(1);
	}
	ok(JSON.parse(data));
});

function ok(data) {
	data.user = "hero";
	io.sockets.on("connection", function (socket) {
		socket.emit("hello", data);

		socket.on("new direction", function(data) {
			console.info("new direction: ", data);
		});

		socket.on("direction completed", function(data) {
			console.info("direction completed");
		});
	});
}