function Player(user_conf, map) {
	this.bot = Bot.get(user_conf.type);

	var speed = user_conf.speed;

	this.direction = {x:null, y:null};
	var _this = this;

	var path = null;

	this.draw = function(dx, dy) {
		this.bot.draw(dx, dy);
	}

	var go_axis = function(d, dir) {
		
		var r = map.map2realCoord(c[0], c[1]);

		if(dir == "x") {
			if(_this.bot.x > d) {
				_this.bot.state = "go left";
			}
			else {
				_this.bot.state = "go right";
			}

			if(Math.abs(d-_this.bot.x) <= speed) _this.bot.x = d;
			if(_this.bot.x < d) _this.bot.x += speed;
			else if(_this.bot.x > d) _this.bot.x -= speed;

			
		}
		else if(dir == "y") {
			if(_this.bot.y > d) _this.bot.state = "go up";
			else _this.bot.state = "go down";

			if(Math.abs(d-_this.bot.y) <= speed) _this.bot.y = d;

			if(_this.bot.y < d) _this.bot.y += speed;
			else if(_this.bot.y > d) _this.bot.y -= speed;
		}
	}

	this.findPath = function() {
		var _cp = map.real2mapCoord(this.bot.x, this.bot.y);
		var _cd = map.real2mapCoord(this.direction.x, this.direction.y);
		var f = false;
		var s = false;

		var cp = {x:_cp[0], y:_cp[1]};
		var cd = {x:_cd[0], y:_cd[1]};

		while(true) {
			if(map.isSolid(cp.x, cp.y)) {
				f = false;
				break;
			}

			if(cp.x > cd.x) cp.x--;
			else if(cp.x < cd.x) cp.x++;
			else {
				if(cp.y > cd.y) cp.y--;
				else if(cp.y < cd.y) cp.y++;
				else {
					f = true;
					break;
				}
			}
		}

		cp = {x:_cp[0], y:_cp[1]};
		while(!f) {
			if(map.isSolid(cp.x, cp.y)) {
				s = false;
				break;
			}

			if(cp.y > cd.y) cp.y--;
			else if(cp.y < cd.y) cp.y++;
			else {
				if(cp.x > cd.x) cp.x--;
				else if(cp.x < cd.x) cp.x++;
				else {
					s = true;
					break;
				}
			}
		}

		if(!f && !s) this.path = 0;
		else if(f) this.path = "x";
		else this.path = "y";
	}

	this.go = function() {
		var x = this.direction.x;
		var y = this.direction.y;

		if(x === null || y === null) return;
		if(x == this.bot.x && y == this.bot.y) {
			this.stop();
			return;
		}

		//if(x != this.bot.x) go_axis(x, "x");
		//else go_axis(y, "y");
		if(this.path == "x") {
			if(x != this.bot.x) go_axis(x, "x");
			else go_axis(y, "y");
		}
		else if(this.path == "y") {
			if(y != this.bot.y) go_axis(y, "y");
			else go_axis(x, "x");
		}
	}

	this.stop = function() {
		this.direction = {x:null, y:null};
		this.bot.state = this.bot.state.replace("go", "stay");
	}
}