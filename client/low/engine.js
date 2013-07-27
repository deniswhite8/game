window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame	 ||
          function( callback ){
		  	window.setTimeout(callback, 1000 / 60);
          };
})();

function Engine(canvas) {
	var _ctx = canvas.getContext("2d");
	var _run = false;
	this.level = null;

	this.width = canvas.width;
	this.height = canvas.height;

	this.loadTileSet = function(url, x_count, y_count) {
		var tl_set = new TileSet(url, x_count, y_count);
		tl_set._ctx = _ctx;
		return tl_set;
	};

	this.loadTileSets = function(data) {
		var ret = {};
		for(var i in data) {
			ret[i] = this.loadTileSet(data[i][0], data[i][1], data[i][2]);
		}
		return ret;
	}

	var _this = this;
	var _step = function() {
			if(_run) {
        		requestAnimFrame(_step);
        		_this.level.update();
        		_this.level.draw();
    		}
	}

	this.run = function() {
		_run = true;
		this.level.onload();
		_step();
	}

	this.stop = function() {
		_run = false;
	}

	this.clear = function() {
		_ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	this.onload = function(items, callback) {
	    var count = Object.keys(items).length;
	    var loadedImages = 0;
	    for(var i in items) {
			items[i]._img.onload = function() {
				if(++loadedImages >= count) {
					callback();
				}
			};
        }
	}

	this.input = new Input(canvas.getBoundingClientRect());
	window.onkeydown = this.input._keyDown;
	window.onkeyup = this.input._keyUp;
	window.onmousedown = this.input._mouseDown;
	window.onmouseup = this.input._mouseUp;
	canvas.addEventListener('mousemove', this.input._mouseMove, false);
}