import GamePlayer from './GamePlayer'
import SpritePlayer from './SpritePlayer'
import SpriteCloud from './SpriteCloud'
import config from './config'

class Game {
  constructor({canvas, context}) {
    this.canvas = canvas
    this.context = context
    this.initializeCanvas()
    this.player = new GamePlayer()
    this.initializeSprites()
    this.score = 0
  }

  update(game) {
    this.redesignGround()
    this.rewriteScore()
    this.garbageCollector()
    this.performUpdate()
    // Buffered Loop
    window.requestAnimationFrame(function() {
      game.update(game)
    })
  }

  rewriteScore() {
    this.context.font      = "12px sans-serif"
    this.context.fillStyle = config.colors.score
    this.context.textAlign = "right"

    let f = this.score > 1 ? 'pts' : ' pt'

    this.context.fillText(`${this.score} ${f}`, config.width - 8, 16)
  }

  redesignGround() {
    context.clearRect(0,0,config.width, config.height)
    context.fillStyle = config.colors.ground
    console.log(1)
    context.fillRect(0, config.height - config.ground_h, config.width, config.ground_h)
  }

  performUpdate() {
    // Update function
    this.spritePlayer.update()
    this.clouds.update()
  }

  initializeCanvas() {
    this.canvas.width        = config.width
    this.canvas.height       = config.height
    this.canvas.style.width  = ''+config.width+'px'
    this.canvas.style.height = ''+config.height+'px'
  }

  initializeSprites() {
    this.spritePlayer = new SpritePlayer(this.player)
    this.clouds  = new SpriteCloud()
    this.objs    = []
    this.flyings = []
  }

  garbageCollector() {
    // Remove useless sprites
  }

  getPlayer() {
    return this.player
  }
}

export default Game
