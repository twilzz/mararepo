import ClientGame from './client/ClientGame';
import './index.scss';
import Character from './assets/Male-3-Walk.png';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

const canvas = document.getElementById('game');
const canvContext = canvas.getContext('2d');
document.querySelector('h3').remove();

const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pX = 276;
let pY = 256;
let charDir = 0;
const sprW = 48;
const sprH = 48;

function modifyPosition(key) {
  switch (key) {
    case 'ArrowUp':
      charDir = sprW * 3;
      if (pY > 0) {
        pY -= 10;
      }
      break;
    case 'ArrowRight':
      charDir = sprW * 2;
      if (pX < 600 - sprW) {
        pX += 10;
      }
      break;
    case 'ArrowLeft':
      charDir = sprW * 1;
      if (pX > 0) {
        pX -= 10;
      }
      break;
    default:
      charDir = 0;
      if (pY < 600 - sprH) {
        pY += 10;
      }
      cycle = (cycle + 1) % shots;
      break;
  }
}

function keyDownHandler(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    bottomPressed = true;
    modifyPosition(e.key);
  }
}
function keyUpHandler(e) {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    bottomPressed = false;
  }
}
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = Character;

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      cycle = (cycle + 1) % shots;
    }
    canvContext.drawImage(img, cycle * sprW, charDir, sprW, sprH, pX, pY, sprW, sprH);
  }, 100);
});
