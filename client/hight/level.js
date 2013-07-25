function Level(eng, conf, socket) {
	var map = null;
	this.hero = null;
	var _this = this;
	var pointer = null;
	var pointer_cell = [null, null];
	var bots = [];
	var input = eng.input;
	var dx, dy;
	var click = false;
	var emit_ok = false;

	var tilesets = eng.loadTileSets(conf.tilesets);
	var tl_mas = [];
	for(var i in tilesets) tl_mas.push(tilesets[i]);

	eng.onload(tl_mas, function() {
		Bot.loadBots(conf.bots, tilesets);
		map = new Map(tilesets["map"], conf.map.gap, tilesets["decorations"], conf.map.size[0], conf.map.size[1], eng.width, eng.height);

		map.setMap(conf.map.data);
		map.setTiles(conf.map.tiles);

		map.setMap(conf.map.decorations.data,1);
		map.setTiles(conf.map.decorations.tiles,1);

		_this.hero = Bot.get(conf.user);

		pointer = Bot.get("pointer");
	});

	this.draw = function() {
		eng.clear();
		map.draw(this.hero.x,this.hero.y,dx,dy);

		//for(var i = 0; i < bots.length; i++)
		//	bots[i].draw();

		
		pointer.draw("stop", pointer_cell[0], pointer_cell[1]);
		if(this.hero.direction.x !== null) pointer.draw("go", this.hero.direction.x+dx, this.hero.direction.y+dy, 1);
		this.hero.draw("",dx,dy);

		map.drawDecorations(this.hero.x,this.hero.y,dx,dy);
	}

	this.update = function() {
		dx = -this.hero.x+eng.width/2;
		dy = -this.hero.y+eng.height/2;
		pointer_cell = [Math.floor((eng.input.mx-dx)/map._sp_w)*map._sp_w+dx, Math.floor((eng.input.my-dy)/map._sp_w)*map._sp_h+dy];

		if(input.mouse(0)) click = true;

		if(!input.mouse(0) && click) {
			this.hero.direction = {x:pointer_cell[0]-dx, y:pointer_cell[1]-dy};
			socket.emit("new direction", this.hero.direction);
			click = false;
			emit_ok = true;
		}

		this.hero.go();

		if(this.hero.direction.x == null && emit_ok) {
			socket.emit("direction completed", null);
			emit_ok = false;
		}
	}
}