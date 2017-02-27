import BitmapFun from './BitmapFun'
import Sprite from './Sprite'

class Circle extends Sprite {
  constructor(color, w, h) {
    super()
    this.width = w
    this.height = h
    this.color = color
    this.bitmap = new BitmapFun((c, ctx, x, y) => {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
      ctx.fillStyle = 'green'
      ctx.fill()
    })
  }
}

export default Circle
