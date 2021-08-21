'use strict';

// урок №11 сложный
const start = document.getElementById('start');
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
//const incomeTitle = document.querySelector('.income-title');
const incomeItems = document.querySelectorAll('.income-items');
//const expensesTitle = document.querySelector('.expenses-title');
const expensesItems = document.querySelectorAll('.expenses-items');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');


let isNumber = (n) => {
  return !isNaN(parseFloat(n) && isFinite(n));
};

let isString = (str, comma = false) => {
  const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
  return pattern.test(str);
};

let appData = {

  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start() {

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },

  showResult() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', appData.changePeriodSelect);
  },

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    if (document.querySelectorAll('.expenses-items').length === 3) {
      expensesPlus.style.display = 'none';
    }
  },

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    if (document.querySelectorAll('.income-items').length === 3) {
      incomePlus.style.display = 'none';
    }
  },

  getExpenses() {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },

  getIncome() {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
        appData.incomeMonth += +cashIncome;
      }
    });
  },

  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },

  //возвращает сумму обязательных расходов
  getExpensesMonth() {

    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  //возвращает  накопления за месяц. Доход минус расходы
  getBudget() {

    if (!appData.budget) {
      appData.budget = 0;
    }
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  //результат месячного накопления
  getTargetMonth() {
    return targetAmount.value / appData.budgetMonth;
  },

  //функция уровень дохода
  getStatusIncome() {
    let budget = appData.budget;
    if (budget > 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (budget === 1200) {
      console.log('У вас почти получилось попасть в группу с высоким уровнем дохода');
    } else if (budget > 600 && budgetDay < 1200) {
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
  },

  getInfoDeposit() {
    if (appData.deposit) {
      let n = 0;
      do {
        n = prompt('Какой годовой процент?', '10');
      } while (!isNumber(n) && n < 0);
      appData.precentDeposit = +n;
      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', 15000);
      } while (!isNumber(n) && n < 0);
      appData.moneyDeposit = +n;
    }
  },

  calcPeriod() {
    return appData.budgetMonth * periodSelect.value;
  },

  changePeriodSelect(event) {
    document.querySelector('.period-amount').textContent = event.target.value;
    incomePeriodValue.value = appData.calcPeriod();
  },

  blockStart() {
    start.disabled = !salaryAmount.value.trim();
  },

  check(e) {
    let etvValue = e.target.value.trim();
    let target = e.target;

    const changeInput = (e) => {
      let condition = /.+/,
        textAlert;
      if (target.placeholder === 'Наименование') {
        condition = /^[,. а-яА-ЯёЁ]+$/;
        textAlert = 'Допускается ввод только русских букв, пробела, точки и запятой!';
      }
      if (target.placeholder === 'Сумма') {
        condition = /^[\d]+$/;
        textAlert = 'Допускается ввод только цифр!';
      }
      if (!condition.test(e.target.value.trim()) && e.target.value.trim() !== '') {
        alert(textAlert);
        e.target.value = etvValue;
        e.target.removeEventListener('change', changeInput);
      }
      
      etvValue = e.target.value.trim();
    };
    e.target.addEventListener('change', changeInput);
  }

};


appData.blockStart();
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
salaryAmount.addEventListener('input', appData.blockStart);
document.querySelectorAll('.data input').forEach(input => {
  input.addEventListener('focus', appData.check);
});