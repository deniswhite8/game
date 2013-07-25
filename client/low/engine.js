window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame;
})();

function Engine(canvas) {
	var _ctx = canvas.getContext("2d");
	var _run = false;
	this.step = null;
	var _fps = null;

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
		setTimeout(function() {
				if(_run) {
	        		requestAnimFrame(_step);
	        		_this.step();
        		}
    		}, 1000/_fps);
	}

	this.run = function(fps) {
		_fps = fps;
		_run = true;
		_step();
	}

	this.stop = function() {
		_run = false;
	}

	this.clear = function() {
		_ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	this.onload = function(items, callback) {
	    if (items.length === undefined) {
	        items = [items];
	    }

	    var count = items.length;
	    var loadedImages = 0;
	    for(var i = 0; i < count; i++) {
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