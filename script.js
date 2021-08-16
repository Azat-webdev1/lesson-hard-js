'use strict';

// урок №13 сложный
const btn = document.querySelector('button');
const h1 = document.querySelector('h1');

document.body.style.textAlign = 'center';
document.body.style.marginTop = '300px';

const getRandomColor = () => {
  let getColor = '0123456789ABCDEF',
      color = '#';
  for (let i = 0; i < 6; i++) {
      color += getColor[Math.floor(Math.random() * 16)];
  }
  return color;
};

const setBodyColor = () => {
  const newColor = getRandomColor();
  document.body.style.backgroundColor = newColor;
  h1.textContent = newColor;
};

btn.addEventListener('click', setBodyColor);