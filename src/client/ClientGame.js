import ClientEngine from './ClientEngine';
import sprites from '../configs/sprites';
import ClientWorld from './ClientWorld';
import levelCfg from '../configs/world.json';
import gameObjects from '../configs/gameObjects.json';

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });
    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.engine.camera.focusAtGameObject(this.player);
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  moveToNewPos(x, y, dir) {
    const { player } = this;
    let canMovie = null;
    if (player && player.motionProgress === 1) {
      canMovie = player.moveByCellCoord(x, y, (cell) => cell.findObjectsByType('grass').length);
    }

    if (canMovie) {
      player.setState(dir);
      player.once('motion-stopped', () => player.setState('main'));
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.moveToNewPos(-1, 0, 'left'),
      ArrowRight: (keydown) => keydown && this.moveToNewPos(1, 0, 'right'),
      ArrowDown: (keydown) => keydown && this.moveToNewPos(0, 1, 'down'),
      ArrowUp: (keydown) => keydown && this.moveToNewPos(0, -1, 'up'),
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
