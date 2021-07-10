class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    const { map } = this.levelCfg;
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        this.engine.renderSpriteFrame({
          sprite: ['terrain', 'grass'],
          frame: 0,
          x,
          y,
          w: 48,
          h: 48,
        });
      });
    });
  }
}
export default ClientWorld;
