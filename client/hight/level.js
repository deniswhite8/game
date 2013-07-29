function Level(eng, conf, socket, tilesets) {
	var map = null;
	this.hero = null;
	var pointer = null;
	var input = eng.input;
	var dx, dy;
	var bots = {};
	var net = new Net(socket, conf);

	this.onload = function() {
		Model.loadModels(conf.models, tilesets);
		map = new Map(conf.map, tilesets["map"], tilesets["decorations"], eng.width, eng.height);

		map.setMap(conf.map.data);
		map.setTiles(conf.map.tiles);

		map.setMap(conf.map.decorations.data,1);
		map.setTiles(conf.map.decorations.tiles,1);

		this.hero = new Player(conf.user, map, tilesets, bots);
		this.hero.model.set(conf.user);

		pointer = new Pointer(input, map, this.hero);

		net.getMas();
	};

	this.draw = function() {
		eng.clear();
		map.draw(this.hero.model.x,this.hero.model.y,dx,dy);

		for(var i in bots) {
			bots[i].draw(dx,dy);
		}

		this.hero.draw(dx, dy);
		pointer.draw(dx, dy);
		map.drawDecorations(this.hero.model.x,this.hero.model.y,dx,dy);
	}

	this.update = function() {
		bots = net.mas;

		dx = -this.hero.model.x+eng.width/2;
		dy = -this.hero.model.y+eng.height/2;

		pointer.update(dx, dy);

		this.hero.go();
		net.send(this.hero.model.get());
	}
}