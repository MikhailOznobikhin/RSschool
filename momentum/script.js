// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  button = document.querySelector('.btn'),
  buttonQ = document.querySelector('.btnQ');

// counts
let numImg = parseInt((Math.random() * 13)+1);
let numImgMax = numImg + 6;
let per = ['night','morning','day','evening'];



// Options
const showAmPm = true;
const options = {
  month: 'long',
  day: 'numeric',
  weekday: 'long'
};

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Output Time
  time.innerHTML = `
  <p>${today.toLocaleString("ru", options) }</p>
  ${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} `;

  if(min === 0 && sec === 0){
    numImg = numImgMax - 6;
    numImg = numImg + hour % 6;
    setBgGreet();
  }
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}
function whatIsPeriod(hour){
  if(hour >= 0 && hour < 6){
    dayPeriod = per[0];
    greeting.textContent = 'Доброй ночи, ';
    document.body.style.color = 'white';
  }

  if (hour >= 6 && hour < 12) {
    dayPeriod = per[1];
    greeting.textContent = 'Доброе утро, ';
  } 
  if (hour >= 12 && hour < 18) {
    dayPeriod = per[2];
    greeting.textContent = 'Добрый день, ';
  }
  if(hour >= 18 && hour < 24){
    // Evening
    dayPeriod = per[3];
    greeting.textContent = 'Добрый вечер, ';
    document.body.style.color = 'white';
  } 
}

// Set Background and Greeting
function setBgGreet() {
  const img = document.createElement('img');
  let today = new Date(),
    hour = today.getHours();
    min = today.getMinutes();
    dayPeriod = ''

  whatIsPeriod(hour)
  numImg = numImg + hour % 6;
  let src = "assets/images/"+dayPeriod+"/"+ numImg +".jpg"
  img.src = src;
  img.onload = () => {      
    document.body.style.backgroundImage =`url(${src})`;
  }; 
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if( e.target.innerText === ''){
        getName();
        name.blur();
      }else{
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  }else if(e.target.innerText === ''){
    getName();
    name.blur();
  }
  else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if( e.target.innerText === ''){
         getFocus();
        focus.blur();
      }else{
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  }else if( e.target.innerText === ''){
    getFocus();
   focus.blur();
  }else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function clearAll(e){
  e.target.innerHTML = ''
}


function changeImg(){
  button.disabled = true;
  if(parseFloat(numImg) < numImgMax){
    numImg = ''+(parseFloat(numImg)+1);
  }else{
  numImg = numImgMax-5
    if(per.indexOf(dayPeriod)+1 !== 4 ){
      dayPeriod = per[per.indexOf(dayPeriod)+1]
    }else{
      dayPeriod = per[0]
    }
  }
  const img = document.createElement('img');
  let src = "assets/images/"+dayPeriod+"/"+ numImg +".jpg"
  img.src = src;
  img.onload = () => {document.body.style.backgroundImage =`url(${src})`; };
  setTimeout(function() { button.disabled = false }, 1000);
}


// async function getQuote() {  
//   const url = `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand`;
//   const res = await fetch(url);
//   const data = await res.json(); 
//   blockquote.textContent = data.quoteText;
//   figcaption.textContent = data.quoteAuthor;
// }
// document.addEventListener('DOMContentLoaded', getQuote);
// btn.addEventListener('click', getQuote);

const url = `https://favqs.com/api/qotd`;
const quote = document.querySelector('.quote'),
  blockquote = document.querySelector('blockquote'),
  figcaption = document.querySelector('figcaption');

async function fetchAsyncTodos(){
  buttonQ.disabled = true;
  const response = await fetch(url)
  const data = await response.json()
  blockquote.innerText = data.quote.body
  figcaption.innerText = data.quote.author
  setTimeout(function() { buttonQ.disabled = false }, 1000);
}





name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearAll);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearAll);
button.addEventListener('click', changeImg)
buttonQ.addEventListener('click', fetchAsyncTodos)

// Run
showTime();
setBgGreet();
getName();
getFocus();
fetchAsyncTodos()