import './index.scss';
import Character from './assets/Male-3-Walk.png';

const canvas = document.getElementById('game');
const canvContext = canvas.getContext('2d');
document.querySelector('h3').remove();

const windowWidth = 600;
const windowHeight = 600;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
let pX = 276;
let pY = 256;
let charDir = 0;

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
const spriteW = 48;
const spriteH = 48;
const img = document.createElement('img');
img.src = Character;

function modifyPosition(key) {
  switch (key) {
    case 'ArrowUp':
      charDir = 144;
      if (pY > 0) {
        pY -= 10;
      }
      regenerateWorld();
      break;
    case 'ArrowRight':
      charDir = 96;
      if (pX < 600 - spriteW) {
        pX += 10;
      }
      regenerateWorld();
      break;
    case 'ArrowLeft':
      charDir = 48;
      if (pX > 0) {
        pX -= 10;
      }
      regenerateWorld();
      break;
    default:
      charDir = 0;
      if (pY < 600 - spriteH) {
        pY += 10;
      }
      regenerateWorld();
      break;
  }
}

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      cycle = (cycle + 1) % shots;
    }
    canvContext.drawImage(img, cycle * spriteW, charDir, spriteW, spriteH, pX, pY, spriteW, spriteH);
  }, 100);
});
