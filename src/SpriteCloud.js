import Sprite from './Sprite'
import Circle from './Circle'
import config from './config'

class SpriteCloud extends Sprite {
  constructor(y = 50) {
    super();
    this.x = config.width + config.cloud_rayon
    this.y = y
    this.v = Math.random() * 1.5
    this.bitmap = new Circle(
        config.colors.cloud,
        config.cloud_rayon
      );
  }

  update() {
    this.x -= this.v
    if (this.x <= 0)
      this.x = config.width + config.cloud_rayon
    this.draw(this.x, this.y)
  }
}

export default SpriteCloud
