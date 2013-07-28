function Pointer(input, map, hero) {
	var bot = Bot.get("pointer");
	var pointer_cell = [];
	var click = false;

	this.draw = function(dx, dy) {
		var c = map.map2realCoord(pointer_cell[0], pointer_cell[1]);
		bot.draw(c[0]+dx, c[1]+dy, "stop");
		if(hero.direction.x !== null) bot.draw(hero.direction.x+dx, hero.direction.y+dy,"go");
	}

	this.update = function(dx, dy) {
		pointer_cell = map.real2mapCoord(eng.input.mx-dx, eng.input.my-dy);

		if(input.mouse(0)) click = true;

		if(!input.mouse(0) && click) {
			var c = map.map2realCoord(pointer_cell[0], pointer_cell[1]);
			if(!map.isSolid(pointer_cell[0], pointer_cell[1])) {
				hero.direction = {x:c[0], y:c[1]};
				hero.findPath();
			}
			click = false;
		}
	}
}