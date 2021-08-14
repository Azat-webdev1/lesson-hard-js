'use strict';

class DomElement {
  constructor(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
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

let elDiv = new DomElement('.block', 120, 120, 'grey', 20).createElem();
let elParagraph = new DomElement('#clock', 120, 120, 'blue', 20).createElem();