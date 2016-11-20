// Bitmappable
// FOR DEBUGGING
class BitmapFun {
  constructor(callback) {
    this.fun = callback
  }

  draw(x, y) {
    this.fun(window.canvas, window.context, x, y)
  }
}

export default BitmapFun