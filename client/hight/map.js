function Map(map_tileset, gap, d_tileset, size_w, size_h, draw_w, draw_h) { 
	_map = new Array(size_h);
	for(var i = 0; i < size_h; i++)
		_map[i] = new Array(size_w);

	_d_map = new Array(size_h);
	for(var i = 0; i < size_h; i++)
		_d_map[i] = new Array(size_w);

	var _tiles = {};
	var _d_tiles = {};

	sp0 = map_tileset.getSprite(0,0);
	this._sp_w = sp0.width-2*gap;
	this._sp_h = sp0.height-2*gap;

	var draw_r_w = Math.ceil(Math.ceil((draw_w/this._sp_w-1))/2) + 1;
	var draw_r_h = Math.ceil(Math.ceil((draw_h/this._sp_h-1))/2) + 1;

	this.setMap = function(data, decoration) {
		var mas;
		if(decoration === undefined) mas = _map;
		else mas = _d_map;

		for(var i = 0; i < size_h; i++)
			for(var j = 0; j < size_w; j++)
				mas[i][j] = data[i][j];
	}

	this.setTiles = function(tiles, decoration) {
		var tl;
		var tl_set;
		if(decoration === undefined) {
			tl = _tiles;
			tl_set = map_tileset;
		}
		else {
			tl = _d_tiles;
			tl_set = d_tileset;
		}

		for(var i = 0; i < tiles.length; i++) {
			var sp = tl_set.getSprite(tiles[i][1], tiles[i][2]);
			tl[tiles[i][0]] = sp;
		}
	}

	this.draw = function(x, y, dx, dy) {
		var xi = Math.floor(x/this._sp_w),
			yi = Math.floor(y/this._sp_h);

		for(var i = yi-draw_r_h; i <= yi+draw_r_h; i++)
			for(var j = xi-draw_r_w; j <= xi+draw_r_w; j++) {
				if(i >=0 && j >=0 && i < size_h && j < size_w) {
					var tl = _tiles[_map[i][j]];
					if(tl !== undefined) tl.draw(j*this._sp_w + dx, i*this._sp_h + dy);
				}
			}
	}

	this.drawDecorations = function(x, y, dx, dy) {
		var xi = Math.floor(x/this._sp_w),
			yi = Math.floor(y/this._sp_h);

		for(var i = yi-draw_r_h; i <= yi+draw_r_h; i++)
			for(var j = xi-draw_r_w; j <= xi+draw_r_w; j++) {
				if(i >=0 && j >=0 && i < size_h && j < size_w) {
					var de_tl = _d_tiles[_d_map[i][j]];
					if(de_tl !== undefined) de_tl.draw(j*this._sp_w + dx, i*this._sp_h + dy,-8,-16);
				}
			}
	}
}