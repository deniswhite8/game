function Player(user_conf, map, tilesets, bots) {
	this.model = Model.get(user_conf.model);

	var speed = user_conf.speed;
	var armor = user_conf.armor;

	this.direction = {x:null, y:null};
	this.target = null;

	var stage_d = {x:null, y:null};
	var _this = this;

	var path = [];

	this.draw = function(dx, dy) {
		this.model.draw(dx, dy);
	}

	var go_axis = function(d, dir) {
		
		var r = map.map2realCoord(c[0], c[1]);

		if(dir == "x") {
			if(_this.model.x > d) {
				_this.model.state = "go left";
			}
			else {
				_this.model.state = "go right";
			}

			if(Math.abs(d-_this.model.x) <= speed) _this.model.x = d;
			if(_this.model.x < d) _this.model.x += speed;
			else if(_this.model.x > d) _this.model.x -= speed;

			
		}
		else if(dir == "y") {
			if(_this.model.y > d) _this.model.state = "go up";
			else _this.model.state = "go down";

			if(Math.abs(d-_this.model.y) <= speed) _this.model.y = d;

			if(_this.model.y < d) _this.model.y += speed;
			else if(_this.model.y > d) _this.model.y -= speed;
		}
	}

	this.findPath = function() {
		var _cp = map.real2mapCoord(this.model.x, this.model.y);
		var _cd = map.real2mapCoord(this.direction.x, this.direction.y);
		var f = false;
		var s = false;

		if(path[0] !== undefined) _cp = map.real2mapCoord(path[0].x, path[0].y);

		var cp = {x:_cp[0], y:_cp[1]};
		var cd = {x:_cd[0], y:_cd[1]};

		var t = path[0];
		path = [];
		if(t !== undefined) path.push(t);

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
			var c = map.map2realCoord(cp.x, cp.y);
			path.push({x:c[0], y:c[1]});
		}

		cp = {x:_cp[0], y:_cp[1]};

		if(!f) {
			path = [];
			if(t !== undefined) path.push(t);
		}

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
			var c = map.map2realCoord(cp.x, cp.y);
			path.push({x:c[0], y:c[1]});
		}

		if(!f && !s) path.pop();
	}

	this.go = function() {
		if(path[0] === undefined) {
			this.stop();
			return;
		};

		var x = path[0].x;
		var y = path[0].y;

		var l = path.length;

		if(x === null || y === null) return;
		if(path[l-1].x == this.model.x && path[l-1].y == this.model.y) {
			this.stop();
			return;
		}

		if(path[0].x != this.model.x) {
			if(x != this.model.x) go_axis(x, "x");
		}
		else if(path[0].y != this.model.y) {
			if(y != this.model.y) go_axis(y, "y");
		}
		else {
			path.shift();
		}
	}

	this.stop = function() {
		this.direction = {x:null, y:null};
		path = [];
		this.model.state = this.model.state.replace("go", "stay");
	}

	this.setTarget = function(x, y) {
		this.direction = {x:x, y:y};
		this.findPath();
	}
}