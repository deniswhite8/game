function Model() {
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

Model._models_conf = {};

Model.loadModels = function(conf, tilesets) {
	for(b in conf) {
		Model._models_conf[b] = {};
		Model._models_conf[b] = {};
		for(i in conf[b]) {
			if(conf[b][i].length == 2)
				Model._models_conf[b][i] = tilesets[b].getSprite(conf[b][i][0], conf[b][i][1]);
			else if(conf[b][i].length == 3)
				Model._models_conf[b][i] = tilesets[b].getAnim(conf[b][i][0], conf[b][i][1], conf[b][i][2]);
		}
	}
}

Model.get = function(name) {
	var b = new Model();
	b._render = Model._models_conf[name];
	return b;
}