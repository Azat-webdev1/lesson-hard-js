'use strict';

let body = document.querySelector('body');
let div = document.createElement('div');

class DomElement {

  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
  }

  createElem() {
    
    let selector = this.selector;

    if (selector[0] === '.') { 
      div.setAttribute('class', selector.slice(1));
      body.insertAdjacentElement('afterbegin', div);

      div.style.cssText = `
        height: ${this.height};
        width: ${this.width};
        background: ${this.bg};
        font-size: ${this.fontSize};
        position: absolute;
        text-align: center;
      `;
        
      div.textContent = 'Квадрат';
    } else if (selector[0] === '#') { 
      div.setAttribute('id', selector.slice(1));
      body.insertAdjacentElement('afterbegin', div);
      div.textContent = 'Квадрат2';
    }
  }
}

const square = new DomElement('.square', '200px', '200px', 'orange', '25px'); 

document.addEventListener('DOMContentLoaded', () => { 
  
  square.createElem();

  let divLeft = 10;
  let divTop = 10;

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      div.style.marginLeft = divLeft + 'px';
      divLeft += 10;
    }
    if (event.key === 'ArrowLeft') {
      div.style.marginLeft = divLeft - 10 + 'px';
      divLeft -= 10;
    }
    if (event.key === 'ArrowUp') {
      div.style.marginTop = divTop - 10 + 'px';
      divTop -= 10;
    }
    if (event.key === 'ArrowDown') {
      div.style.marginTop = divTop + 'px';
      divTop += 10;
    }
  });

});