'use strict';

const startAnimate = () => {

  const startBtn = document.querySelector('#startBtn');
  const stopBtn = document.querySelector('#stopBtn');
  const resetBtn = document.querySelector('#resetBtn');
  const canvas = document.querySelector('#stage');
  const ctx = canvas.getContext('2d');

  let requestID;

  ctx.fillStyle = '#212121';
  
  stopBtn.style.background = 'red';
  resetBtn.style.background = '#ffbf00';

  let posX = 0;
  let boxWidth = 50;
  let pixelsPerFrame = 5; 

  ctx.fillRect(posX, 0, boxWidth, canvas.height);

  // Animate.
  const animate = () => {
    requestID = requestAnimationFrame(animate);

    if (posX <= (canvas.width - boxWidth)) {
      ctx.clearRect((posX - pixelsPerFrame), 0, boxWidth, canvas.height);
      ctx.fillRect(posX, 0, boxWidth, canvas.height);
      posX += pixelsPerFrame;
    } else {
      cancelAnimationFrame(requestID);
    }
  }

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    requestID = requestAnimationFrame(animate);
  });

  stopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cancelAnimationFrame(requestID);
  });

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    posX = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(posX, 0, boxWidth, canvas.height);
  });

};

startAnimate();