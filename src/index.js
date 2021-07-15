import ClientGame from './client/ClientGame';
import './index.scss';

window.addEventListener('load', () => {
  ClientGame.init({ tagId: 'game' });
});

document.querySelector('h3').remove();
