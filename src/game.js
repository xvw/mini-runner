import GamePlayer from './GamePlayer'
import Cloud from './Cloud'
import SpritePlayer from './SpritePlayer'
import SpriteCloud from './SpriteCloud'
import config from './config'

class Game {
  constructor({canvas, context}) {
    this.canvas = canvas
    this.context = context
    this.initializeCanvas()
    this.player = new GamePlayer()
    this.cloud = new Cloud()
    this.initializeSprites()
    this.score = 0
  }

  update() {
    this.redesignGround()
    this.rewriteScore()
    this.garbageCollector()

    this.performUpdate()

    // Buffered Loop
    window.requestAnimationFrame(() => {
      this.update()
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
    context.fillRect(0, config.height - config.ground_h, config.width, config.ground_h)
  }

  performUpdate() {
    this.sprites.forEach((sprite) => {
      //console.log("update : ", sprite)
      sprite.update()
    })
  }

  initializeCanvas() {
    this.canvas.width        = config.width
    this.canvas.height       = config.height
    this.canvas.style.width  = ''+config.width+'px'
    this.canvas.style.height = ''+config.height+'px'
  }

  initializeSprites() {
    this.spritePlayer = new SpritePlayer(this.player)
    this.clouds  = [new SpriteCloud(this.cloud)]
    this.objs    = []
    this.flyings = []

    this.sprites = []
    this.sprites.push(this.spritePlayer)
    this.sprites.concat(this.clouds, this.objs, this.flyings)
  }

  garbageCollector() {
    // Remove useless sprites
  }

  getPlayer() {
    return this.player
  }
}

export default Game
