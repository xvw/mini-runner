// A small game writted in JavaScript

// Canvas element
const width    = 720;
const height   = 200;
const canvas   = document.getElementById('game');
const context  = canvas.getContext('2d');
const jumptime = 10;
const jumphigh = 72;


// Utils

// Mixins for coordinate element
class Point {
    constructor(x, y) {
	this.x = x;
	this.y = y;
    }
    getX()  { return this.x; }
    getY()  { return this.y; }
    setX(x) { this.x = x;    }
    setY(y) { this.y = y;    }
}

// A minimalistic Sprite representation
class Sprite extends Point {
    constructor() {
	super(0, 0);
	this.bitmap = null;
    }
    
    // Draw function
    draw(x, y) {
	if (this.bitmap !== null) {
	    context.save();
	    this.bitmap.draw(x, y);
	    context.restore();
	}
    }
}

// Bitmappable
// FOR DEBUGGING
class Bitmap_fun {
    constructor(callback) {
	this.fun = callback;
    }
    draw(x, y) { this.fun(canvas, context, x, y); }
    
}

// Visual Rect
// FOR DEBUGGING
class Rect extends Sprite {
    constructor(color, w, h) {
	super();
	this.width  = w;
	this.height = h;
	this.color  = color;
	let that = this;
	this.bitmap = new Bitmap_fun(function(c, ctx, x, y) {
	    ctx.fillStyle = that.color;
	    ctx.fillRect(x ,y, w, h);
	});
    }
}

// Model

// Player
class Game_player extends Point {
    constructor() {
	super(10, 160);
	this.attachEvents();
	this.base_y = this.y;
	this.jump = false;
	this.fall = false;
	this.jumpTick = 0;
    }

    attachEvents() {
	let that = this;
	window.document.onkeydown = function(ev) {
	    let kc = ev.keyCode;
	    if (that.canJump() && (kc == 32 || kc == 38)) {
		that.performJump();
	    }
	}
    }

    performJump() {
	this.jump = true;
	console.log('jump');
    }

    performFall() {
	this.jump = false;
	this.fall = true;
    }

    canJump() {
	return !this.jump && !this.fall;
    }

    coeffJump() {
	if (this.jump) {
	    return 1;
	}
	return -1;
    }
    
    update() {
	console.log(this.jumpTick);
	if (this.jump || this.fall) {
	    this.jumpTick += this.coeffJump();
	}
	if (this.jump && this.jumpTick > jumptime) {
	    this.performFall();
	}
	if (this.fall && this.jumpTick < 0) {
	    this.jumpTick = 0;
	    this.fall = false;
	}
	this.y = this.computeY();
    }

    computeY() {
	// This function need EASING !
	const c = this.jumpTick.toFixed(2) / jumptime.toFixed(2);
	const f = c * jumphigh.toFixed(2);
	return this.base_y - f.toFixed(1);
    }
}

// Views

class Sprite_player extends Sprite {
    constructor(player) {
	super();
	this.player = player;
	this.bitmap = new Rect('red', 32, 32);
    }
    update() {
	this.player.update();
	this.x = this.player.getX();
	this.y = this.player.getY();
	this.draw(this.x, this.y);
    }
}



// Game representation
class Area {
    
    constructor() {
	this.internalClock();
	this.initializeCanvas();
	this.player = new Game_player();
	this.initializeSprites();
    }

    update(game) {
	this.internalClock();
	context.clearRect(0,0,width, height);
	// console.log(this.clock);
	this.performUpdate();
	// Buffered Loop
	window.requestAnimationFrame(function() {
	    game.update(game);
	});

    }

    performUpdate() {
	// Update function
	this.sprite_player.update();
    }

    internalClock() {
	this.clock = new Date();
    }

    initializeCanvas() {
	canvas.width        = width;
	canvas.height       = height;
	canvas.style.width  = ''+width+'px';
	canvas.style.height = ''+height+'px';
    }

    initializeSprites() {
	this.sprite_player = new Sprite_player(this.player);
    }

    getPlayer() {
	return this.player;
    }
    
}

// Start the game
var game = new Area();
window.requestAnimationFrame(function() {
    game.update(game);
});


