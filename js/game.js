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

			// A small game writted in JavaScript

			// Canvas element
			var width = 720;
			var height = 200;
			var canvas = document.getElementById('game');
			var context = canvas.getContext('2d');
			var jumptime = 12;
			var jumphigh = 112;

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
									var that = _this2;
									_this2.bitmap = new Bitmap_fun(function (c, ctx, x, y) {
												ctx.fillStyle = that.color;
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

									var _this3 = _possibleConstructorReturn(this, (Game_player.__proto__ || Object.getPrototypeOf(Game_player)).call(this, 10, 160));

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
												var that = this;
												window.document.onkeydown = function (ev) {
															var kc = ev.keyCode;
															if (that.canJump() && (kc == 32 || kc == 38)) {
																		that.performJump();
															}
												};
									}
						}, {
									key: 'performJump',
									value: function performJump() {
												this.jump = true;
												console.log('jump');
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
															console.log(this.jumpTick);
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
						}, {
									key: 'updateWalk',
									value: function updateWalk() {
												if (this.canJump()) {
															this.tick += 1;
															this.tick %= 8;
															if (this.tick == 0) {
																		console.log('Step walk');
															}
												}
									}
						}, {
									key: 'computeY',
									value: function computeY() {
												var c = this.jumpTick.toFixed(2) / jumptime.toFixed(2);
												var f = c * jumphigh.toFixed(2);
												return this.base_y - f.toFixed(1);
									}
						}]);

						return Game_player;
			}(Point);

			var Sprite_player = function (_Sprite2) {
						_inherits(Sprite_player, _Sprite2);

						function Sprite_player(player) {
									_classCallCheck(this, Sprite_player);

									var _this4 = _possibleConstructorReturn(this, (Sprite_player.__proto__ || Object.getPrototypeOf(Sprite_player)).call(this));

									_this4.player = player;
									_this4.bitmap = new Rect('red', 32, 32);
									return _this4;
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
						}

						_createClass(Area, [{
									key: 'update',
									value: function update(game) {
												this.internalClock();
												context.clearRect(0, 0, width, height);
												// console.log(this.clock);
												this.performUpdate();
												// Buffered Loop
												window.requestAnimationFrame(function () {
															game.update(game);
												});
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
									}
						}, {
									key: 'initializeCanvas',
									value: function initializeCanvas() {
												canvas.width = width;
												canvas.height = height;
												canvas.style.width = '' + width + 'px';
												canvas.style.height = '' + height + 'px';
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