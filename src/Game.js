import GamePlayer from './GamePlayer'
import SpritePlayer from './SpritePlayer'
import SpriteCloud from './SpriteCloud'
import SpriteObstacle from './SpriteObstacle'
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
    context.fillRect(0, config.height - config.ground_h,
      config.width, config.ground_h)
  }

  performUpdate() {
    // Update function
    this.spritePlayer.update()
    this.clouds.forEach((s) => s.update())
    this.objs.forEach((s) => {
      s.update()
      this.collidingWith(s)
    })
  }

  collidingWith(s){
    const distX = Math.abs(
      this.spritePlayer.x - s.x-config.obstacle_w/2);
    const distY = Math.abs(
      this.spritePlayer.y - s.y-config.obstacle_h/2);
    if (distX >  (config.player_w/2 + config.obstacle_w/2))
      return false
  }

  initializeCanvas() {
    this.canvas.width        = config.width
    this.canvas.height       = config.height
    this.canvas.style.width  = ''+config.width+'px'
    this.canvas.style.height = ''+config.height+'px'
  }

  initializeSprites() {
    this.spritePlayer = new SpritePlayer(this.player)
    this.clouds  = this.initializeClouds()
    this.objs    = this.initializeObstacles()
    this.flyings = []
  }

  initializeClouds(){
    let clouds = []
    for (let i = 0; i < 3; i++){
      const y = Math.random() * 50
      clouds.push(new SpriteCloud(y))
    }
    return clouds
  }

  initializeObstacles(){
    let obstacles = []
    for (let i = 0; i < 3; i++){
      const x = Math.random() * config.width + 75
      obstacles.push(new SpriteObstacle(x))
    }
    return obstacles
  }

  garbageCollector() {
    // Remove useless sprites
  }

  getPlayer() {
    return this.player
  }
}

export default Game
