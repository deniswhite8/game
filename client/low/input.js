function Input(rect) {
	this._key = [];
	this._mouse = [];
	this._rect = rect;

	this.mx = this.my = 0;

	var _this = this;

	this._keyDown = function(e) {
		_this._key[e.keyCode] = true;
	};

	this._keyUp = function(e) {
		_this._key[e.keyCode] = false;
	};

	this._mouseDown = function(e) {
		_this._mouse[e.button] = true;
	};

	this._mouseUp = function(e) {
		_this._mouse[e.button] = false;
	};

	this._mouseMove = function(e) {
		_this.mx = e.clientX - _this._rect.left;
		_this.my = e.clientY - _this._rect.top;
	};

	this.key = function(key_code) {
		if(_this._key === undefined) return false;
		return _this._key[key_code];
	};

	this.mouse = function(key_code) {
		if(_this._mouse === undefined) return false;
		return _this._mouse[key_code];
	};
}