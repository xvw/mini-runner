import Sprite from './Sprite'
import Circle from './Circle'
import config from './config'

class SpriteCloud extends Sprite {
  constructor(y = 50) {
    super();
    this.x = config.width+config.cloud_rayon
    this.y = y
    this.bitmap = new Circle(
        config.colors.player,
        config.cloud_rayon
      );
  }

  update() {
    this.x -= 1.5
    if (this.x <= 0) this.x = config.width+config.cloud_rayon
    //console.log(this.x)
    this.draw(this.x, this.y)
  }
}

export default SpriteCloud
