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
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, time) => {
        this.map.render(time);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  moveTo(x, y) {
    const { player } = this;
    if (player) {
      player.moveByCellCoord(x, y, (cell) => cell.findObjectsByType('grass').length);
    }
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.moveTo(-1, 0),
      ArrowRight: (keydown) => keydown && this.moveTo(1, 0),
      ArrowDown: (keydown) => keydown && this.moveTo(0, 1),
      ArrowUp: (keydown) => keydown && this.moveTo(0, -1),
    });
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;
