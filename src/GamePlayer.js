import config from './config.js'
import Point from './Point.js'

class GamePlayer extends Point {
  constructor() {
    super(10, config.height - config.ground_h - config.player_h)
    this.attachEvents()
    this.base_y = this.y
    this.jump = false
    this.fall = false
    this.jumpTick = 0
    this.tick = 1
  }

  attachEvents() {
    window.document.onkeydown = (ev) => {
      let kc = ev.keyCode
      if (this.canJump() && (kc == 32 || kc == 38)) {
        this.performJump()
        /*
         * I removed the previous way of computing score.
         * Below, by triggering a jump event, this is how you should
         * notify the game that a new jump is actually performed
         * then the Game instance, in case of 1 jump = 1 point, should listen
         * for this event and a 1 point to the score
         */
        // this.trigger("jump")
      }
    }
  }

  performJump() {
    this.jump = true
  }

  performFall() {
    this.jump = false
    this.fall = true
  }

  canJump() {
    return !this.jump && !this.fall
  }

  coeffJump() {
    return this.jump ? 1 : -1
  }

  update() {
    this.updateWalk()
    this.updateJump()
  }

  updateJump() {
    if (this.jump || this.fall) {
      this.jumpTick += this.coeffJump()
    }
    if (this.jump && this.jumpTick > config.gravity) {
      this.performFall()
    }
    if (this.fall && this.jumpTick < 0) {
      this.jumpTick = 0
      this.tick = 1
      this.fall = false
    }
    this.y = this.computeY()
  }

  updateWalk() {
    if (this.canJump()) {
      this.tick += 1
      this.tick %= config.walkrate
      if (this.tick == 0) {
        this.switchSpriteForWalk()
      }
    }
  }

  switchSpriteForWalk() {
    // TODO
  }

  computeY() {
    const c = this.jumpTick.toFixed(2) / config.gravity.toFixed(2)
    const f = c * config.inertia.toFixed(2)
    return this.base_y - f.toFixed(1)
  }
}


export default GamePlayer
