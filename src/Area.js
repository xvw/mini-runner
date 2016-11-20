import GamePlayer from './GamePlayer'
import SpritePlayer from './SpritePlayer'
import config from './config'

// Game representation
class Area {
  constructor() {
    this.internalClock()
    this.initializeCanvas()
    this.player = new GamePlayer()
    this.initializeSprites()
    this.tick    = 0
    this.score   = 0
  }

  update(game) {
    this.internalClock()
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
    context.font      = "12px sans-serif"
    context.fillStyle = config.colors.score
    context.textAlign = "right"
    let f = ' pt'
    if (this.score > 1) f += 's'
    context.fillText(this.score+f, config.width - 8, 16)
  }

  redesignGround() {
    context.clearRect(0,0,config.width, config.height)
    context.fillStyle = config.colors.ground
    context.fillRect(0, config.height - config.ground_h, config.width, config.ground_h)
  }

  performUpdate() {
    // Update function
    this.sprite_player.update()
  }

  internalClock() {
    this.clock = new Date()
    this.tick += 1
    this.tick %= 60
    if(this.tick == 0) {
        this.score += 1
    }
  }

  initializeCanvas() {
    canvas.width        = config.width
    canvas.height       = config.height
    canvas.style.width  = ''+config.width+'px'
    canvas.style.height = ''+config.height+'px'
  }

  initializeSprites() {
    this.sprite_player = new SpritePlayer(this.player)
    this.clouds  = []
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

export default Area