// A small game written in JavaScript

const canvas   = document.getElementById('game');
const context  = canvas.getContext('2d');

const Config   = {
    
    // Canvas data
    width    : 720,
    height   : 200,
    ground_h : 16,
    player_h : 54,
    player_w : 32,
    
    // Character
    gravity  : 12,
    inertia  : 180,
    walkrate : 24,
    
    // Colors (for boxes)
    colors : {
	player : '#DBDFE8',
	ground : '#24476F',
	score  : '#ECD900',
    }
}


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
	this.bitmap = new Bitmap_fun((c, ctx, x, y) => {
	    ctx.fillStyle = this.color;
	    ctx.fillRect(x ,y, w, h);
	});
    }
}

// Model

// Player
class Game_player extends Point {
    constructor() {
	super(10, Config.height - Config.ground_h - Config.player_h);
	this.attachEvents();
	this.base_y = this.y;
	this.jump = false;
	this.fall = false;
	this.jumpTick = 0;
	this.tick     = 1;
    }

    attachEvents() {
	window.document.onkeydown = (ev) => {
	    let kc = ev.keyCode;
	    if (this.canJump() && (kc == 32 || kc == 38)) {
		this.performJump();
	    }
	}
    }

    performJump() {
	this.jump = true;
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
	this.updateWalk();
	this.updateJump();
    }
    
    updateJump() {
	if (this.jump || this.fall) {
	    this.jumpTick += this.coeffJump();
	}
	if (this.jump && this.jumpTick > Config.gravity) {
	    this.performFall();
	}
	if (this.fall && this.jumpTick < 0) {
	    this.jumpTick = 0;
	    this.tick = 1;
	    this.fall = false;
	}
	this.y = this.computeY();
    }

    updateWalk() {
	if (this.canJump()) {
	    this.tick += 1;
	    this.tick %= Config.walkrate;
	    if (this.tick == 0) {
		this.switchSpriteForWalk();
	    }
	}
    }

    switchSpriteForWalk() {
	// TODO
    }

    computeY() {
	const c = this.jumpTick.toFixed(2) / Config.gravity.toFixed(2);
	const f = c * Config.inertia.toFixed(2);
	return this.base_y - f.toFixed(1);
    }
}

// Views

class Sprite_player extends Sprite {
    constructor(player) {
	super();
	this.player = player;
	this.bitmap = new Rect(Config.colors.player, Config.player_w, Config.player_h);
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
	this.tick    = 0;
	this.score   = 0;
    }

    update(game) {
	this.internalClock();
	this.redesignGround();
	this.rewriteScore();
	this.garbageCollector();
	this.performUpdate();
	// Buffered Loop
	window.requestAnimationFrame(function() {
	    game.update(game);
	});

    }

    rewriteScore() {
	context.font      = "12px sans-serif";
	context.fillStyle = Config.colors.score;
	context.textAlign = "right";
	let f = ' pt';
	if (this.score > 1) f += 's';
	context.fillText(this.score+f, Config.width - 8, 16);
    }

    redesignGround() {
	context.clearRect(0,0,Config.width, Config.height);
	context.fillStyle = Config.colors.ground;
	context.fillRect(0, Config.height - Config.ground_h, Config.width, Config.ground_h);
    }

    performUpdate() {
	// Update function
	this.sprite_player.update();
    }

    internalClock() {
	this.clock = new Date();
	this.tick += 1;
	this.tick %= 60;
	if(this.tick == 0) {
	    this.score += 1;
	}
    }

    initializeCanvas() {
	canvas.width        = Config.width;
	canvas.height       = Config.height;
	canvas.style.width  = ''+Config.width+'px';
	canvas.style.height = ''+Config.height+'px';
    }

    initializeSprites() {
	this.sprite_player = new Sprite_player(this.player);
	this.clouds  = [];
	this.objs    = [];
	this.flyings = [];
    }

    garbageCollector() {
	// Remove useless sprites
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


