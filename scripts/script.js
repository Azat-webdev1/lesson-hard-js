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

  countTimer('24 Aug 2021');

  // Меню
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    let count = -100;
    const animate = () => {
      if (document.documentElement.clientWidth < 768) {
        menu.style.transform = `translate(0)`;
        return;
      }
      let requestId = requestAnimationFrame(animate);
      count += 10;
      menu.style.transform = `translate(${count}%)`;
      if (count === 0) {
        cancelAnimationFrame(requestId);
      }
    };

    const handlerMenu = (e) => {
      e.preventDefault();
      const target = e.target;

      if (target.closest('.menu') === null && target.closest('menu') === null) {
        menu.style.transform = `translate(-100%)`;
        return;
      }

      if (target.tagName === 'A' && target.className !== 'close-btn') {
        scrolling(target);
      }

      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        count = -100;
        animate();
      } else if (target.tagName === 'A' || target.closest('.menu')) {
        menu.style.transform = `translate(-100%)`;
      }
    };

    document.body.addEventListener('click', (e) => {
      handlerMenu(e);
    });

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

  //скролинг
  const scrolling = (el) => {
    if (el.href === undefined) return;
    let link = el.href.split('#')[1];
    document.querySelector('#' + link).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrolHead = () => {
    const btnScrolling = document.querySelector('a[href="#service-block"]');
    btnScrolling.addEventListener('click', (e) => {
      e.preventDefault();
      scrolling(btnScrolling);
    });
  };
  scrolHead();

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
  const slider1 = () => {
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
  slider1();

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

  // проверка инпутов
  const inputValid = () => {
    const calc = document.querySelector('#calc'),
      inputTexts = document.querySelectorAll('input[placeholder="Ваше имя"], input[placeholder="Ваше сообщение"]'),
      emailInputs = document.querySelectorAll('input[placeholder="E-mail"]'),
      phoneInputs = document.querySelectorAll('input[placeholder="Номер телефона"]'),
      inputAll = document.querySelectorAll('input');


    const inputCalc = () => {
      calc.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9 \.]/g, '');

      });
    };
    inputCalc();


    const inputNameText = () => {

      inputTexts.forEach(elem => {
        elem.addEventListener('input', e => {
          e.target.value = e.target.value.replace(/[^А-Яа-яёЁ -]/gi, '');
        });
      });

    };
    inputNameText();

    const inputEmail = () => {

      emailInputs.forEach(elem => {
        elem.addEventListener('input', e => {
          e.target.value = e.target.value.replace(/[^a-z @ \- ! _ . ~ * '']/gi, '');
        });
      });

    };
    inputEmail();

    const inputPhone = () => {

      phoneInputs.forEach(elem => {
        elem.addEventListener('input', e => {
          e.target.value = e.target.value.replace(/[^0-9 \- ()]/gi, '');
        });
      });

    };
    inputPhone();

    const checkInputAll = (elem) => {
      elem.value = elem.value.trim();
      elem.value = elem.value.replace(/-+/g, '-');
      elem.value = elem.value.replace(/ +/g, ' ');
      elem.value = elem.value.replace(/^-/, '');
      elem.value = elem.value.replace(/-$/, '');
      if (elem.closest('input[placeholder="Ваше имя"]')) {
        let text = elem.value;
        text = text[0].toUpperCase() + text.substring(1);
        elem.value = text;
      }
    };

    inputAll.forEach((elem) => {
      elem.addEventListener('blur', e => {

        if (e.target.closest('input')) {
          checkInputAll(e.target);
        }

      }, true);
    });


  };
  inputValid();

  //Калькулятор
  const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquary = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      calcSelectAll = document.querySelectorAll('select.calc-type'),
      totalValue = document.getElementById('total');

    let animateId;
    const renderTotal = (sum) => {
      cancelAnimationFrame(animateId);
      let total = +totalValue.textContent;
      const step = (sum - total) / 30;

      const calcAnimate = () => {
        totalValue.textContent = Math.floor(total);
        if ((step > 0 && total >= sum) ||
          (step < 0 && total <= sum)) {
          totalValue.textContent = sum;
          cancelAnimationFrame(animateId);
        }
        else {
          requestAnimationFrame(calcAnimate);
        }
        total += step;
      };

      if (sum !== total) animateId = requestAnimationFrame(calcAnimate);
    };

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

      return +total.toFixed(0);
      
    };


    calcBlock.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('.calc-day') || target.matches('.calc-type') ||
        target.matches('.calc-square') || target.matches('.calc-count')) {
          renderTotal(countSum());
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

});