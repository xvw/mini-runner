import BitmapFun from './BitmapFun'
import Sprite from './Sprite'

class Rect extends Sprite {
  constructor(color, w, h) {
    super()
    this.width  = w
    this.height = h
    this.color  = color
    this.bitmap = new BitmapFun((c, ctx, x, y) => {
      ctx.fillStyle = this.color
      ctx.fillRect(x ,y, w, h)
    })
  }
}

export default Rect