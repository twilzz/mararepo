import terrainIMG from '../assets/terrain.png';

export default {
  terrain: {
    grass: {
      img: terrainIMG,
      frames: [[64, 576, 64, 64]],
    },
    water: {
      img: terrainIMG,
      frames: [[0, 576, 64, 64]],
    },
    wall: {
      img: terrainIMG,
      frames: [[448, 0, 64, 64]],
    },
    spawn: {
      img: terrainIMG,
      frames: [[384, 640, 64, 64]],
    },
    npcSpawn: {
      img: terrainIMG,
      frames: [[896, 576, 64, 64]],
    },
  },
};
