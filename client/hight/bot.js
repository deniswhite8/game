function Bot() {
	this.x = this.y = 0;
	this._render = {};
	this._speed;
	this.direction = {x:null, y:null};

	var _this = this;

	var anim = "stay down";

	this.draw = function(name, dx, dy, fl) {
		if(name == "") name = anim;

		//var half_w = this._render[name].width / 2;
		//var half_h = this._render[name].height / 2;
		//if(fl !== undefined) {
			half_w = half_h = 0;
		//}
		this._render[name].draw(this.x+dx-half_w, this.y+dy-half_h);
	}

	var go_axis = function(d, dir) {
		if(dir == "x") {
			if(_this.x > d) anim = "go left";
			else anim = "go right";

			if(Math.abs(d-_this.x) <= _this._speed) _this.x = d;
			if(_this.x < d) _this.x += _this._speed;
			else if(_this.x > d) _this.x -= _this._speed;
		}
		else if(dir == "y") {
			if(_this.y > d) anim = "go up";
			else anim = "go down";

			if(Math.abs(d-_this.y) <= _this._speed) _this.y = d;

			if(_this.y < d) _this.y += _this._speed;
			else if(_this.y > d) _this.y -= _this._speed;
		}
	}

	this.go = function() {
		var x = this.direction.x;
		var y = this.direction.y;

		if(x === null || y === null) return;
		if(x == this.x && y == this.y) {
			this.stop();
			return;
		}

		if(x != this.x) go_axis(x, "x");
		else go_axis(y, "y");
	}

	this.stop = function() {
		this.direction = {x:null, y:null};
		anim = anim.replace("go", "stay");
	}
}

Bot._bots_conf = {};

Bot.loadBots = function(conf, tilesets) {
	for(b in conf) {
		Bot._bots_conf[b] = {};
		Bot._bots_conf[b].speed = conf[b].speed;
		Bot._bots_conf[b].render = {};
		for(i in conf[b].render) {
			if(conf[b].render[i].length == 2)
				Bot._bots_conf[b].render[i] = tilesets[b].getSprite(conf[b].render[i][0], conf[b].render[i][1]);
			else if(conf[b].render[i].length == 3)
				Bot._bots_conf[b].render[i] = tilesets[b].getAnim(conf[b].render[i][0], conf[b].render[i][1], conf[b].render[i][2]);
		}
	}
}

Bot.get = function(name) {
	var b = new Bot();
	b._render = Bot._bots_conf[name].render;
	b._speed = Bot._bots_conf[name].speed;
	return b;
}