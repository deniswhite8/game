function Player(type) {
	this.bot = Bot.get(type);

	this.direction = {x:null, y:null};
	var _this = this;

	this.draw = function(dx, dy) {
		this.bot.draw(dx, dy);
	}

	var go_axis = function(d, dir) {
		if(dir == "x") {
			if(_this.bot.x > d) _this.bot.state = "go left";
			else _this.bot.state = "go right";

			if(Math.abs(d-_this.bot.x) <= _this.bot._speed) _this.bot.x = d;
			if(_this.bot.x < d) _this.bot.x += _this.bot._speed;
			else if(_this.bot.x > d) _this.bot.x -= _this.bot._speed;
		}
		else if(dir == "y") {
			if(_this.bot.y > d) _this.bot.state = "go up";
			else _this.bot.state = "go down";

			if(Math.abs(d-_this.bot.y) <= _this.bot._speed) _this.bot.y = d;

			if(_this.bot.y < d) _this.bot.y += _this.bot._speed;
			else if(_this.bot.y > d) _this.bot.y -= _this.bot._speed;
		}
	}

	this.go = function() {
		var x = this.direction.x;
		var y = this.direction.y;

		if(x === null || y === null) return;
		if(x == this.bot.x && y == this.bot.y) {
			this.stop();
			return;
		}

		if(x != this.bot.x) go_axis(x, "x");
		else go_axis(y, "y");
	}

	this.stop = function() {
		this.direction = {x:null, y:null};
		this.bot.state = this.bot.state.replace("go", "stay");
	}
}