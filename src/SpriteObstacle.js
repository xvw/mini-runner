import Sprite from './Sprite'
import Rect from './Rect'
import config from './config'

class SpriteObstacle extends Sprite {
  constructor(x = config.width) {
    super();
    this.x = x
    this.v = Math.random() * 2.5
    this.y = 164
    this.bitmap = new Rect(
      config.colors.obstacle,
      config.obstacle_w,
      config.obstacle_h);
  }

  update() {
    this.x -= this.v
    if (this.x <= 0)
      this.x = config.width + config.obstacle_w
    this.draw(this.x, this.y)
  }

}

export default SpriteObstacle
