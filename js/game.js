(function (global, factory) {
			if (typeof define === "function" && define.amd) {
						define([], factory);
			} else if (typeof exports !== "undefined") {
						factory();
			} else {
						var mod = {
									exports: {}
						};
						factory();
						global.game = mod.exports;
			}
})(this, function () {
			'use strict';

			function _possibleConstructorReturn(self, call) {
						if (!self) {
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
						}

						return call && (typeof call === "object" || typeof call === "function") ? call : self;
			}

			function _inherits(subClass, superClass) {
						if (typeof superClass !== "function" && superClass !== null) {
									throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
						}

						subClass.prototype = Object.create(superClass && superClass.prototype, {
									constructor: {
												value: subClass,
												enumerable: false,
												writable: true,
												configurable: true
									}
						});
						if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
			}

			function _classCallCheck(instance, Constructor) {
						if (!(instance instanceof Constructor)) {
									throw new TypeError("Cannot call a class as a function");
						}
			}

			var _createClass = function () {
						function defineProperties(target, props) {
									for (var i = 0; i < props.length; i++) {
												var descriptor = props[i];
												descriptor.enumerable = descriptor.enumerable || false;
												descriptor.configurable = true;
												if ("value" in descriptor) descriptor.writable = true;
												Object.defineProperty(target, descriptor.key, descriptor);
									}
						}

						return function (Constructor, protoProps, staticProps) {
									if (protoProps) defineProperties(Constructor.prototype, protoProps);
									if (staticProps) defineProperties(Constructor, staticProps);
									return Constructor;
						};
			}();

			// A small game written in JavaScript

			var canvas = document.getElementById('game');
			var context = canvas.getContext('2d');

			var Config = {

						// Canvas data
						width: 720,
						height: 200,
						ground_h: 16,
						player_h: 54,
						player_w: 32,

						// Character
						gravity: 12,
						inertia: 180,
						walkrate: 24,

						// Colors (for boxes)
						colors: {
									player: '#DBDFE8',
									ground: '#24476F',
									score: '#ECD900'
						}
			};

			// Utils

			// Mixins for coordinate element

			var Point = function () {
						function Point(x, y) {
									_classCallCheck(this, Point);

									this.x = x;
									this.y = y;
						}

						_createClass(Point, [{
									key: 'getX',
									value: function getX() {
												return this.x;
									}
						}, {
									key: 'getY',
									value: function getY() {
												return this.y;
									}
						}, {
									key: 'setX',
									value: function setX(x) {
												this.x = x;
									}
						}, {
									key: 'setY',
									value: function setY(y) {
												this.y = y;
									}
						}]);

						return Point;
			}();

			var Sprite = function (_Point) {
						_inherits(Sprite, _Point);

						function Sprite() {
									_classCallCheck(this, Sprite);

									var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, 0, 0));

									_this.bitmap = null;
									return _this;
						}

						// Draw function


						_createClass(Sprite, [{
									key: 'draw',
									value: function draw(x, y) {
												if (this.bitmap !== null) {
															context.save();
															this.bitmap.draw(x, y);
															context.restore();
												}
									}
						}]);

						return Sprite;
			}(Point);

			var Bitmap_fun = function () {
						function Bitmap_fun(callback) {
									_classCallCheck(this, Bitmap_fun);

									this.fun = callback;
						}

						_createClass(Bitmap_fun, [{
									key: 'draw',
									value: function draw(x, y) {
												this.fun(canvas, context, x, y);
									}
						}]);

						return Bitmap_fun;
			}();

			var Rect = function (_Sprite) {
						_inherits(Rect, _Sprite);

						function Rect(color, w, h) {
									_classCallCheck(this, Rect);

									var _this2 = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this));

									_this2.width = w;
									_this2.height = h;
									_this2.color = color;
									_this2.bitmap = new Bitmap_fun(function (c, ctx, x, y) {
												ctx.fillStyle = _this2.color;
												ctx.fillRect(x, y, w, h);
									});
									return _this2;
						}

						return Rect;
			}(Sprite);

			var Game_player = function (_Point2) {
						_inherits(Game_player, _Point2);

						function Game_player() {
									_classCallCheck(this, Game_player);

									var _this3 = _possibleConstructorReturn(this, (Game_player.__proto__ || Object.getPrototypeOf(Game_player)).call(this, 10, Config.height - Config.ground_h - Config.player_h));

									_this3.attachEvents();
									_this3.base_y = _this3.y;
									_this3.jump = false;
									_this3.fall = false;
									_this3.jumpTick = 0;
									_this3.tick = 1;
									return _this3;
						}

						_createClass(Game_player, [{
									key: 'attachEvents',
									value: function attachEvents() {
												var _this4 = this;

												window.document.onkeydown = function (ev) {
															var kc = ev.keyCode;
															if (_this4.canJump() && (kc == 32 || kc == 38)) {
																		_this4.performJump();
															}
												};
									}
						}, {
									key: 'performJump',
									value: function performJump() {
												this.jump = true;
									}
						}, {
									key: 'performFall',
									value: function performFall() {
												this.jump = false;
												this.fall = true;
									}
						}, {
									key: 'canJump',
									value: function canJump() {
												return !this.jump && !this.fall;
									}
						}, {
									key: 'coeffJump',
									value: function coeffJump() {
												if (this.jump) {
															return 1;
												}
												return -1;
									}
						}, {
									key: 'update',
									value: function update() {
												this.updateWalk();
												this.updateJump();
									}
						}, {
									key: 'updateJump',
									value: function updateJump() {
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
						}, {
									key: 'updateWalk',
									value: function updateWalk() {
												if (this.canJump()) {
															this.tick += 1;
															this.tick %= Config.walkrate;
															if (this.tick == 0) {
																		this.switchSpriteForWalk();
															}
												}
									}
						}, {
									key: 'switchSpriteForWalk',
									value: function switchSpriteForWalk() {
												// TODO
									}
						}, {
									key: 'computeY',
									value: function computeY() {
												var c = this.jumpTick.toFixed(2) / Config.gravity.toFixed(2);
												var f = c * Config.inertia.toFixed(2);
												return this.base_y - f.toFixed(1);
									}
						}]);

						return Game_player;
			}(Point);

			var Sprite_player = function (_Sprite2) {
						_inherits(Sprite_player, _Sprite2);

						function Sprite_player(player) {
									_classCallCheck(this, Sprite_player);

									var _this5 = _possibleConstructorReturn(this, (Sprite_player.__proto__ || Object.getPrototypeOf(Sprite_player)).call(this));

									_this5.player = player;
									_this5.bitmap = new Rect(Config.colors.player, Config.player_w, Config.player_h);
									return _this5;
						}

						_createClass(Sprite_player, [{
									key: 'update',
									value: function update() {
												this.player.update();
												this.x = this.player.getX();
												this.y = this.player.getY();
												this.draw(this.x, this.y);
									}
						}]);

						return Sprite_player;
			}(Sprite);

			var Area = function () {
						function Area() {
									_classCallCheck(this, Area);

									this.internalClock();
									this.initializeCanvas();
									this.player = new Game_player();
									this.initializeSprites();
									this.tick = 0;
									this.score = 0;
						}

						_createClass(Area, [{
									key: 'update',
									value: function update(game) {
												this.internalClock();
												this.redesignGround();
												this.rewriteScore();
												// console.log(this.clock);
												this.performUpdate();
												// Buffered Loop
												window.requestAnimationFrame(function () {
															game.update(game);
												});
									}
						}, {
									key: 'rewriteScore',
									value: function rewriteScore() {
												context.font = "12px Arial";
												context.fillStyle = Config.colors.score;
												context.textAlign = "right";
												context.fillText(this.score, Config.width - 16, 16);
									}
						}, {
									key: 'redesignGround',
									value: function redesignGround() {
												context.clearRect(0, 0, Config.width, Config.height);
												context.fillStyle = Config.colors.ground;
												context.fillRect(0, Config.height - Config.ground_h, Config.width, Config.ground_h);
									}
						}, {
									key: 'performUpdate',
									value: function performUpdate() {
												// Update function
												this.sprite_player.update();
									}
						}, {
									key: 'internalClock',
									value: function internalClock() {
												this.clock = new Date();
												this.tick += 1;
												this.tick %= 60;
												if (this.tick == 0) {
															this.score += 1;
															console.log(this.score);
												}
									}
						}, {
									key: 'initializeCanvas',
									value: function initializeCanvas() {
												canvas.width = Config.width;
												canvas.height = Config.height;
												canvas.style.width = '' + Config.width + 'px';
												canvas.style.height = '' + Config.height + 'px';
									}
						}, {
									key: 'initializeSprites',
									value: function initializeSprites() {
												this.sprite_player = new Sprite_player(this.player);
									}
						}, {
									key: 'getPlayer',
									value: function getPlayer() {
												return this.player;
									}
						}]);

						return Area;
			}();

			// Start the game
			var game = new Area();
			window.requestAnimationFrame(function () {
						game.update(game);
			});
});