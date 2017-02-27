import BitmapFun from './BitmapFun'
import Sprite from './Sprite'

class Circle extends Sprite {
  constructor(color, r) {
    super()
    this.rayon  = r
    this.color  = color
    this.bitmap = new BitmapFun((c, ctx, x, y) => {
      ctx.fillStyle = this.color
      ctx.beginPath()
      ctx.arc(x, y, this.rayon, 0, 2*Math.PI)
      ctx.fill()
    })
  }
}

export default Circle
