import EventSourceMixin from '../common/EventSourceMixin';

class ClientEngine {
  constructor(canvas) {
    Object.assign(this, {
      canvas,
      context: null,
      imageLoaders: [],
      sprites: {},
      images: {},
    });
    this.context = canvas.getContext('2d');
    this.loop = this.loop.bind(this);
  }

  start() {
    this.loop();
  }

  loop(timestamp) {
    const { context, canvas } = this;
    context.fillStyle = 'black';
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.trigger('render', timestamp);
    this.initNextFrame();
  }

  initNextFrame() {
    window.requestAnimationFrame(this.loop);
  }

  loadSprites(spritesGroup) {
    this.imageLoaders = [];
    Object.keys(spritesGroup).forEach((groupName) => {
      const group = spritesGroup[groupName];
      this.sprites[groupName] = group;
      Object.keys(group).forEach((spriteName) => {
        const { img } = group[spriteName];
        if (!this.images[img]) {
          this.imageLoaders.push(this.loadImage(img));
        }
      });
    });
    return Promise.all(this.imageLoaders);
  }

  loadImage(url) {
    return new Promise((resolve) => {
      const i = new Image();
      this.images[url] = i;
      i.onload = () => resolve(i);
      i.src = url;
    });
  }

  renderSpriteFrame({ sprite, frame, x, y, w, h }) {
    const spriteCfg = this.sprites[sprite[0]][sprite[1]];
    const [fx, fy, fw, fh] = spriteCfg.frames[frame];
    const img = this.images[spriteCfg.img];
    this.context.drawImage(img, fx, fy, fw, fh, x * w, y * h, w, h);
  }
}
Object.assign(ClientEngine.prototype, EventSourceMixin);
export default ClientEngine;
