'use strict';

// урок №13 сложный
const getRandomColor = () => {
  let getColor = '0123456789ABCDEF',
      color = '#';
  for (let i = 0; i < 6; i++) {
      color += getColor[Math.floor(Math.random() * 16)];
  }
  return color;
};