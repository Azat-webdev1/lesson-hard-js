'use strict';

document.addEventListener("DOMContentLoaded", () => {
  class DomElement {
    constructor(selector, height, width, bg, fontSize) {
      this.selector = selector;
      this.height = '100px';
      this.width = '100px';
      this.bg = 'blue';
      this.fontSize = '10px';
    }
  
    createElem() {
      let elem;
      if (this.selector.substr(0, 1) === '.') {
        
        elem = document.createElement('div');
        elem.classList.add(this.selector.slice(1));
        
      } else if (this.selector.substr(0, 1) === '#') {
        elem = document.createElement('p');
        elem.setAttribute('id', this.selector.slice(1));
      }
      elem.style.cssText =`height:${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px`;
  
      document.body.append(elem);
    }
    
  }
  let square = new DomElement({
    position: 'absolute'
  });
  
  document.body.appendChild(square.newElem());

});

