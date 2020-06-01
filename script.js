// global const
const main = document.getElementById('main');

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

const url = 'https://randomuser.me/api';

// empty array to hold the information fetched by the api
let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch(url);
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

// double the current amount of moeney everyone is showing
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDom();
}

// filter to show only the millionaires
function showMillions() {
  data = data.filter((user) => user.money > 1000000);
  updateDom();
}

// Sort users by riches
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDom();
}

// sum up all the wealth and show total at the bottom of the table
function calculateWealth() {
  wealth = data.reduce((acc, user) => (acc += user.money), 0);
  let wealthElement = document.createElement('div');
  wealthElement.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

//Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDom();
}

//Update the DOM to Clear main div
function updateDom(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((item) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format numbers to look like Money
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); // 12,345.67
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillions);
calculateWealthBtn.addEventListener('click', calculateWealth);
