function TileSet(url, x_count, y_count) {
	this._img = new Image();
	this._img.src = url;

	this._ctx = null;

	this.getSprite = function(x_num, y_num) {
		var sp = new Sprite();
		sp._tileset = this;
		sp.width = this._img.width / x_count;
		sp.height = this._img.height / y_count;
		sp._x_tileset = sp.width * x_num;
		sp._y_tileset = sp.height * y_num;
		sp._ctx = this._ctx;
		return sp;
	};

	this.getAnim = function(line_y, count, delay) {
		var anim = new Anim();
		anim._ctx = this._ctx;
		anim._line_y = line_y;
		anim._count = count;
		anim._delay = delay;
		anim._tileset = this;
		anim.width = this._img.width / x_count;
		anim.height = this._img.height / y_count;
		return anim;
	};
}

function Sprite() {
	this._tileset = this._x_tileset = this._y_tileset = this.width = this.height = this._ctx = null;

	this.draw = function(x, y, dx, dy) {
		if(dx === undefined || dy === undefined) {
			dx = dy = 0;	
		}

		this._ctx.drawImage(this._tileset._img, 
					   this._x_tileset, this._y_tileset, this.width, this.height,
					   x+dx, y+dy, this.width, this.height);
	};
}

function Anim() {
	this.width = this.height = this._tileset = this._line_y = this._count = this._ctx = this._delay = null;
	var _step, _cur;
	_step = _cur = 0;
	var _this = this;

	var play = function() {
		_step++;
		if(_step >= _this._delay) {
			_step = 0;
			_cur++;
			if(_cur >= _this._count) _cur = 0;
		}
	};

	/*this.stop = function() {
		_cur = 0;
	};*/

	this.draw = function(x, y) {
		this._ctx.drawImage(this._tileset._img, 
				   _cur*this.width, this._line_y*this.height, this.width, this.height,
				   x, y, this.width, this.height);
		play();
	};
}