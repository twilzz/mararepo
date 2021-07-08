import './index.scss';
import Character from './assets/Male-3-Walk.png';

const canvas = document.getElementById('game');
const canvContext = canvas.getContext('2d');
document.querySelector('h3').remove();

const windowWidth = canvas.getAttribute('width');
const windowHeight = canvas.getAttribute('height');
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pX = 276;
let pY = 256;
let charDir = 0;
const sprW = 48;
const sprH = 48;

function regenerateWorld() {
  canvContext.clearRect(0, 0, 600, 600);
  for (let j = 0; j <= windowHeight; j += 100) {
    for (let i = 20; i <= windowWidth; i += 100) {
      canvContext.beginPath();
      canvContext.moveTo(i, j + 40);
      canvContext.lineTo(i + 30, j + 10);
      canvContext.lineTo(i + 60, j + 40);
      canvContext.closePath();
      canvContext.stroke();
      canvContext.strokeRect(i + 10, j + 40, 40, 40);
    }
  }
}
regenerateWorld();

function modifyPosition(key) {
  switch (key) {
    case 'ArrowUp':
      charDir = sprW * 3;
      if (pY > 0) {
        pY -= 10;
      }
      regenerateWorld();
      break;
    case 'ArrowRight':
      charDir = sprW * 2;
      if (pX < 600 - sprW) {
        pX += 10;
      }
      regenerateWorld();
      break;
    case 'ArrowLeft':
      charDir = sprW * 1;
      if (pX > 0) {
        pX -= 10;
      }
      regenerateWorld();
      break;
    default:
      charDir = 0;
      if (pY < 600 - sprH) {
        pY += 10;
      }
      cycle = (cycle + 1) % shots;
      regenerateWorld();
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
