import Point from './Point.js'

// A minimalistic Sprite representation
class Sprite extends Point {
  constructor() {
    super(0, 0)
    this.bitmap = null
  }

  // Draw function
  draw(x, y) {
    if (this.bitmap !== null) {
      window.context.save()
      this.bitmap.draw(x, y)
      window.context.restore()
    }
  }
}

export default Sprite