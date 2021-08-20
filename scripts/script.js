'use strict';

window.addEventListener('DOMContentLoaded', () => {
  // Таймер
  const countTimer = (dedline) => {
    let idInterval = 0;
    let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');

    const getTimeRemaining = () => {

      let dateStop = new Date(dedline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000;

      let seconds = 0,
        minutes = 0,
        hours = 0;

      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor((timeRemaining / 60) % 60);
        hours = Math.floor(timeRemaining / 60 / 60);
      }

      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    };

    const addZero = (elem) => {
      if (String(elem).length === 1) {
        return '0' + elem;
      } else {
        return String(elem);
      }
    };

    const updateClock = () => {
      let timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining <= 0) {
        clearInterval(idInterval);
      }
    };
    updateClock();
    idInterval = setInterval(updateClock, 1000);
  };

  countTimer('21 Aug 2021');

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu'),
      closeBtn = document.querySelector('.close-btn'),
      menuItems = menu.querySelectorAll('ul>li');
    
    let count = -100;
    const animate = () => {
      if (document.documentElement.clientWidth < 768) {
        menu.style.transform = `translate(0)`;
        return;
      }
      let requestId = requestAnimationFrame(animate);
      count += 2;
      menu.style.transform = `translate(${count}%)`;
      if (count === 0) {
        cancelAnimationFrame(requestId);
      }
    };
    
    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  //Модальное окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
      popupClose = document.querySelector('.popup-close'),
      popupContent = document.querySelector('.popup-content'),
      popupData = {
        count: -445,
        speed: 15,
        startPos: -445,
        endPos: 0
      };

    const popupShow = () => {

      if (popupData.startPos > popupData.endPos) {
        popupData.count -= popupData.speed;
      } else {
        popupData.count += popupData.speed;
        popupContent.style.transform = `translateY(${popupData.count}px)`;
      }

      if (popupData.startPos > popupData.endPos &&
        popupData.count > popupData.endPos ||
        popupData.count < popupData.endPos) {
        requestAnimationFrame(popupShow);
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        if (screen.width > 768) {
          popupData.count = popupData.startPos;
          requestAnimationFrame(popupShow);
        }
      });
    });

    popupClose.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  };
  togglePopup();

});