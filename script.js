'use strict';

const input = document.querySelector('input');
const p = document.querySelector('.block');


const handleInput = (e) => {
  p.textContent = e.target.value;
};

const debounce = (fn, ms, ...args) => {
  let timer;
  return (value) => {
    timer = setTimeout(() => {
      
      fn.apply(this, [value, ...args]);
      
      clearTimeout(timer);
      
      timer = null;
    }, ms);
  };
};

input.addEventListener('keyup', debounce(handleInput, 300));

