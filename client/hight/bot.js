function Bot() {
	this.x = this.y = 0;
	this.state = "";
	this._render = {};

	this.draw = function(dx, dy, stay) {
		if(stay == undefined) stay = this.state;

		this._render[stay].draw(this.x+dx, this.y+dy);
	}

	this.set = function(obj) {
		if(obj.x !== undefined) this.x = obj.x;
		if(obj.y !== undefined) this.y = obj.y;
		if(obj.state !== undefined) this.state = obj.state;
	}

	this.get = function() {
		return {x:this.x, y:this.y, state:this.state};
	}
}

Bot._bots_conf = {};

Bot.loadBots = function(conf, tilesets) {
	for(b in conf) {
		Bot._bots_conf[b] = {};
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
	return b;
}