// A small game written in JavaScript


const canvas   = document.getElementById('game');
const context  = canvas.getContext('2d');

// ugly hack to let class manipulate the canvas and its context
window.canvas = canvas
window.context = context


import Area from './Area'

// Start the game
var game = new Area();

window.requestAnimationFrame(function() {
  game.update(game);
});


