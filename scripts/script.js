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
  countTimer('20 Aug 2021');

  // Меню
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');

    const handlerMenu = (e) => {
      const target = e.target;

      if (target.closest('.menu')) {
        menu.classList.toggle('active-menu');
      } else if (target !== menu && target.closest('[href^="#"]')) {

        menu.classList.toggle('active-menu');
      }
      if (!target.classList.contains('close-btn')) {
        menu.style.display = 'flex';
      }
    };

    btnMenu.addEventListener('click', handlerMenu);
    menu.addEventListener('click', handlerMenu);

  };
  toggleMenu();

  //Модальное окно
  const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),
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

    popup.addEventListener('click', event => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popup.style.display = 'none';
        }
      }
    });
  };
  togglePopup();

  //Табы
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };
    toggleTabContent(0);

    tabHeader.addEventListener('click', (e) => {
      let target = e.target;

      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();

  //Слайдер
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      dots = document.querySelector('.portfolio-dots'),
      slider = document.querySelector('.portfolio-content');

    for (let i = 0; i < slide.length; i++) {
      dots.insertAdjacentHTML('beforeend',
        `<li class="dot ${i === 0 ? 'dot-active' : ''}"></li>`);
    }

    const dot = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    });

    slider.addEventListener('mouseover', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (e) => {
      if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
        startSlide();
      }
    });
    startSlide();

  };
  slider();

  //переключение фотографий "Наша команда"
  const toggleImageCommand = () => {
    const command = document.querySelectorAll('#command .row img');

    let url;

    command.forEach(el => {

      el.addEventListener('mouseenter', (e) => {
        let target = e.target;
        url = e.target.src;
        target.src = target.getAttribute('data-img');
      });

      el.addEventListener('mouseout', (e) => {
        let target = e.target;
        target.src = url;
      });

    });

  };
  toggleImageCommand();

  //Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquary = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      calcSelectAll = document.querySelectorAll('select.calc-type'),
      totalValue = document.getElementById('total');

    const inputCalc = () => {
      const calc = document.querySelector('#calc');
      calc.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9 \.]/g, '');

      });
    };
    inputCalc();

    const countSum = () => {

      let total = 0,
        countValue = 1,
        dayValue = 10;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquary.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value) {
        if (calcDay.value < 5) {
          dayValue *= 2;
        } else if (calcDay.value < 10) {
          dayValue *= 1.5;
        }
      }

      if (!!typeValue && !!squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;

      }

      totalValue.textContent = +total.toFixed(0);

    };

    calcBlock.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('.calc-day') || target.matches('.calc-type') ||
        target.matches('.calc-square') || target.matches('.calc-count')) {
        countSum();

      }

    });

    calcSelectAll.forEach((elem) => {
      elem.addEventListener('change', e => {
        const target = e.target;
        if (!target.selectedIndex) {
          calcSquary.value = '';
          calcDay.value = '';
          calcCount.value = '';
        }

      });
    });

  };
  calc(100);

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';


    const preloader = () => {
      return (`<style>
      .preloader__container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        overflow: hidden;
        animation-delay: 1s;
        background-color: rgba(0,0,0,0.33);
        
        position: fixed;
        left: 0;
        top: 0;
            z-index: 999999;
      }
      .item-1 {
        width: 20px;
        height: 20px;
        background: #f583a1;
        border-radius: 50%;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes scale {
        0% {
          transform: scale(1);
        }
        50%,
          75% {
          transform: scale(2.5);
        }
        78%, 100% {
          opacity: 0;
        }
      }
      .item-1:before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eed968;
        opacity: 0.7;
        animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
        animation-delay: 100ms;
        transition: 0.5s all ease;
        transform: scale(1);
      }
      .item-2 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eece68;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes scale {
        0% {
          transform: scale(1);
        }
        50%,
          75% {
          transform: scale(2.5);
        }
        78%, 100% {
          opacity: 0;
        }
      }
      .item-2:before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eece68;
        opacity: 0.7;
        animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
        animation-delay: 200ms;
        transition: 0.5s all ease;
        transform: scale(1);
      }
      .item-3 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eec368;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes scale {
        0% {
          transform: scale(1);
        }
        50%,
          75% {
          transform: scale(2.5);
        }
        78%, 100% {
          opacity: 0;
        }
      }
      .item-3:before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eec368;
        opacity: 0.7;
        animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
        animation-delay: 400ms;
        transition: 0.5s all ease;
        transform: scale(1);
      }
      .item-4 {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eead68;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes scale {
        0% {
          transform: scale(1);
        }
        50%,
          75% {
          transform: scale(2.5);
        }
        78%, 100% {
          opacity: 0;
        }
      }
      .item-4:before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #eead68;
        opacity: 0.7;
        animation: scale 2s infinite cubic-bezier(0, 0, 0.49, 1.02);
        animation-delay: 600ms;
        transition: 0.5s all ease;
        transform: scale(1);
      }
      .item-5 {
        width: 20px;
        height: 20px;
        background: #f583a1;
        border-radius: 50%;
        background-color: #ee8c68;
        margin: 7px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @keyframes scale {
        0% {
          transform: scale(1);
        }
        50%,
          75% {
          transform: scale(2.5);
        }
        78%, 100% {
          opacity: 0;
        }
      }
      .item-5:before {
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: #ee8c68;
        opacity: 0.7;
        animation: scale 1s infinite cubic-bezier(0, 0, 0.49, 1.02);
        animation-delay: 800ms;
        transition: 0.2s all ease;
        transform: scale(1);
      }
      </style>
      <div class="preloader">
        <div class="preloader__container">
          <div class="item-1"></div>
          <div class="item-2"></div>
          <div class="item-3"></div>
          <div class="item-4"></div>
          <div class="item-5"></div>
        </div>
      </div>`);
};

    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest();

      request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      });

      request.open('POST', './server.php');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(body));
    };

    const clearInput = (idForm) => {
      const form = document.getElementById(idForm);
      [...form.elements]
      .filter(item =>
          item.tagName.toLowerCase() !== 'button' &&
          item.type !== 'button')
        .forEach(item =>
          item.value = '');
    };

    const isValid = e => {
      const target = e.target;
      if (target.matches('.form-phone')) {
        target.value = target.value.replace(/[^+\d]/g, '');
      }
      if (target.name === 'user_name') {
        target.value = target.value.replace(/[^а-яё ]/gi, '');
      }
      if (target.matches('.mess')) {
        target.value = target.value.replace(/[^\W а-яё\d]/gi, '');
      }
      if (target.matches('.form-email')) {
        target.value = target.value.replace(/[^a-z @ \- ! _ . ~ * '']/gi, '');
      }
    };

    const processingForm = (idForm) => {
      const form = document.getElementById(idForm);
      const statusMessage = document.createElement('div');

      statusMessage.style.cssText = 'font-size: 2rem; color: #fff';

      form.addEventListener('submit', event => {
        const formData = new FormData(form);
        
        form.insertAdjacentHTML(`beforeend`, preloader());
        const loaderForm = document.querySelector('.preloader');
        
        const body = {};
        
        statusMessage.textContent = loadMessage;
        event.preventDefault();
        form.appendChild(statusMessage);

        formData.forEach((val, key) => {
          body[key] = val;
        });

        postData(body, () => {
          statusMessage.textContent = successMessage;
          clearInput(idForm);
          loaderForm.remove();
        }, error => {
          statusMessage.textContent = errorMessage;
          console.error(error);
          loaderForm.remove();
        });
      });
      form.addEventListener('input', isValid);

    };
    processingForm('form1');
    processingForm('form2');
    processingForm('form3');

  };
  sendForm();

});