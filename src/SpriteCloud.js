import Sprite from './Sprite'
import Rect from './Rect'
import config from './config'

class SpriteCloud extends Sprite {
  constructor(cloud) {
    super();
    this.cloud = cloud;
    this.bitmap = new Rect(config.colors.cloud, config.cloud_w, config.cloud_h);
  }

  update() {
    this.cloud.update();
    this.x = this.player.x;
    this.y = this.player.y;
    this.draw(this.x, this.y);
  }
}

export default SpriteCloud
