function Net(socket, data) {

	this.mas = {};
	var _this = this;
	var user_data = {x:null, y:null, state:null};

	this.send = function(data) {
		var s = {};

		if(user_data.x != data.x) s.x = data.x;
		if(user_data.y != data.y) s.y = data.y;
		if(user_data.state != data.state) s.state = data.state;

		user_data = data;

		if(Object.keys(s).length) socket.emit("upd", s);
	}

	this.getMas = function() {
		var m = data.bots_mas;

		for(i in m) {
			this.mas[i] = Bot.get(m[i].type);
			this.mas[i].set(m[i]);
		}
	}

	socket.on("new", function(data) {
		var b = Bot.get(data.type);
		b.set(data);

		_this.mas[data.id] = b;
	});

	socket.on("upd", function(data) {
		_this.mas[data.id].set(data);
	});

	socket.on("left", function(data) {
		delete _this.mas[data];
	});
}