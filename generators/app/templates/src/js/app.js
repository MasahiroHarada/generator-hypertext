import loaded from './utils/loaded';

loaded(() => {
  document.querySelector('h2').innerText = 'Hello from app.js';
});
