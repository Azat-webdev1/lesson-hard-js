'use strict';

// урок №15 сложный
const start = document.getElementById('start');
const cancel = document.getElementById('cancel');
const btnPlus = document.getElementsByTagName('button');
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryAmount = document.querySelector('.salary-amount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
const inputTypeText = document.querySelectorAll('input[type=text]');
const periodAmount = document.querySelector('.period-amount');

let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');

const isNumber = (n) => {
  return !isNaN(parseFloat(n) && isFinite(n));
};

const isString = (str, comma = false) => {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
};

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposi = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }

  start() {

    if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
    }
    const dataInputTypeText = document.querySelectorAll('.data input[type = text]');
    dataInputTypeText.forEach((item) => {
      item.setAttribute('disabled', 'true');
    });

    expensesPlus.setAttribute('disabled', 'true');
    incomePlus.setAttribute('disabled', 'true');
    start.style.display = 'none';
    cancel.style.display = 'block';

    this.budget = +salaryAmount.value;
    
    this.getExpInc()
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    //this.getTargetMonth();
    //this.getStatusIncome();

    this.showResult();

  };

  showResult() {
    let _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', () => {
      incomePeriodValue.value = _this.calcPeriod();
    });
  };

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  };

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  };

  getExpInc() {
    
    const count = (item) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = +itemAmount;
        this.incomeMonth += +itemAmount;
      }
    };
    
    incomeItems.forEach(count);
    expensesItems.forEach(count);

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];

    }
  };

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    let _this = this;
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  };

  getAddIncome() {
    let _this = this;
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    })
  };

  //возвращает сумму обязательных расходов
  getExpensesMonth() {

    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  };

  //возвращает  накопления за месяц. Доход минус расходы
  getBudget() {

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  };

  //результат месячного накопления
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  };

  //функция уровень дохода
  getStatusIncome() {
    let budget = this.budget;
    if (budget > 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (budget === 1200) {
      console.log('У вас почти получилось попасть в группу с высоким уровнем дохода');
    } else if (budget > 600 && budget < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (budget === 600) {
      console.log('У вас почти средний уровень дохода, но немного не хватает...');
    } else if (budget < 600 && budget > 0) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budget < 0) {
      console.log('Что то пошло не так');
    } else if (isNaN(budget)) {
      console.log('Где-то закралась ошибка...');
    }
    return budget;
  };

  getInfoDeposit() {
    if (this.deposit) {
      let n = 0;
      do {
        n = prompt('Какой годовой процент?', '10');
      } while (!isNumber(n) && n < 0);
      this.precentDeposit = +n;
      do {
        this
          .moneyDeposit = prompt('Какая сумма заложена?', 15000);
      } while (!isNumber(n) && n < 0);
      this.moneyDeposit = +n;
    }
  };

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };

  blockStart() {
    start.disabled = !salaryAmount.value.trim();
  };

  reset() {

    let resultInputAll = document.querySelectorAll('.result input[type = text]'),
      dataInputTypeText = document.querySelectorAll('.data input[type = text]');

    dataInputTypeText.forEach((elem) => {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });

    resultInputAll.forEach((elem) => {
      elem.value = '';
    });

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      expensesPlus.style.display = 'block';
    }

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      incomePlus.style.display = 'block';
    }

    this.income = {};
    this.expenses = {};
    this.addIncome = [];
    this.butget = 0;
    this.incomeMonth = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;

    cancel.style.display = 'none';
    start.style.display = 'block';
    incomePlus.removeAttribute('disabled');
    expensesPlus.removeAttribute('disabled');
    depositCheck.checked = false;
  };

  eventsListeners() {
    this.blockStart();
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    incomePlus.addEventListener('click', this.addIncomeBlock);
    salaryAmount.addEventListener('input', this.blockStart);
    cancel.addEventListener('click', this.reset.bind(this));
    periodSelect.addEventListener('input', function () {
      periodAmount.innerText = periodSelect.value;
    });
  };
}

const appData = new AppData();

appData.eventsListeners();