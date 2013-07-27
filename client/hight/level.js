function Level(eng, conf, socket, tilesets) {
	var map = null;
	this.hero = null;
	var pointer = null;
	var pointer_cell = [null, null];
	var input = eng.input;
	var dx, dy;
	var click = false;
	var bots = {};
	var net = new Net(socket, conf);

	this.onload = function() {
		Bot.loadBots(conf.bots, tilesets);
		map = new Map(tilesets["map"], conf.map.gap, tilesets["decorations"], conf.map.size[0], conf.map.size[1], eng.width, eng.height);

		map.setMap(conf.map.data);
		map.setTiles(conf.map.tiles);

		map.setMap(conf.map.decorations.data,1);
		map.setTiles(conf.map.decorations.tiles,1);

		this.hero = new Player(conf.user.type);
		this.hero.bot.set(conf.user);

		pointer = Bot.get("pointer");

		net.getMas();
	};

	this.draw = function() {
		eng.clear();
		map.draw(this.hero.bot.x,this.hero.bot.y,dx,dy);

		for(var i in bots) {
			bots[i].draw(dx,dy);
		}

		this.hero.draw(dx, dy);
		
		pointer.draw(pointer_cell[0], pointer_cell[1], "stop");
		if(this.hero.direction.x !== null) pointer.draw(this.hero.direction.x+dx, this.hero.direction.y+dy,"go");

		map.drawDecorations(this.hero.bot.x,this.hero.bot.y,dx,dy);
	}

	this.update = function() {
		bots = net.mas;

		dx = -this.hero.bot.x+eng.width/2;
		dy = -this.hero.bot.y+eng.height/2;
		pointer_cell = [Math.floor((eng.input.mx-dx)/map._sp_w)*map._sp_w+dx, Math.floor((eng.input.my-dy)/map._sp_h)*map._sp_h+dy];

		if(input.mouse(0)) click = true;

		if(!input.mouse(0) && click) {
			if(!map.isSolid((pointer_cell[0]-dx)/map._sp_w, (pointer_cell[1]-dy)/map._sp_h)) this.hero.direction = {x:pointer_cell[0]-dx, y:pointer_cell[1]-dy};
			click = false;
		}

		this.hero.go();
		net.send(this.hero.bot.get());
	}
}