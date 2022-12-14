const body = document.body;
let countItems = localStorage.getItem('countItems') !== null ? localStorage.getItem('countItems') : 4;
let randArrayPositionEl = [];
let currentArrayEl = [];
let answer = [];
let answerClone = [];
let pause = true;
let move = localStorage.getItem('move') !== null ? localStorage.getItem('move') : 0;
let time = localStorage.getItem('time') !== null ? localStorage.getItem('time') : 0;

function clear() {
    localStorage.removeItem('countItems');
    localStorage.removeItem('time');
    localStorage.removeItem('move');
    localStorage.removeItem('randArrayPositionEl');
    time = 0;
    move = 0;
    randArrayPositionEl = [];
    currentArrayEl = [];
    answer = [];

    body.children[1].children[0].children[0].innerHTML = 'Time: <span class="time">00:00</span>';
    body.children[1].children[1].children[0].innerHTML = 'Move: <span class="move">0</span>';
    oldMainBlock = document.getElementsByClassName('main')[0];
    body.removeChild(oldMainBlock);
}

function toggleModal() {
    if (document.getElementsByClassName("menuModal")[0].style.display === 'none') {
        document.getElementsByClassName("menuModal")[0].style.display = 'block';
        pause = true;
    } else {
        document.getElementsByClassName("menuModal")[0].style.display = 'none';
        pause = false;
    }
}

// Audio
function playSound() {
    var audio = new Audio();
    audio.src = 'error.mp3';
    audio.autoplay = true;
}
function playSoundFail() {
    var audio = new Audio();
    audio.src = 'true.mp3';
    audio.autoplay = true;
}

function GenHead() {
    let header = document.createElement('header');
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let button = document.createElement('button');
    let timeP = document.createElement('p');
    let moveP = document.createElement('p');

    header.appendChild(div);
    header.appendChild(div1);
    header.appendChild(button);
    body.appendChild(header);

    // time
    body.children[1].children[0].appendChild(timeP);
    body.children[1].children[0].children[0].innerHTML = `Time: <span class="time">${time}</span>`;
    // moves
    body.children[1].children[1].appendChild(moveP);
    body.children[1].children[1].children[0].innerHTML = `Move: <span class="move">${move}</span>`;
    // button menu
    body.children[1].children[2].innerHTML = 'menu';
}



function GenMain() {
    let divM = document.createElement('div');
    divM.classList.add('main');
    divM.style = `grid-template-columns: repeat(${countItems},1fr)`;

    // random
    for (let i = 0; i < countItems ** 2; i++) {
        currentArrayEl.push(i);
        answer.push(i);
    }
    // ansver
    answerClone = answer;
    answerClone.push(answerClone.slice(0, 1));
    answerClone = answerClone.flat();

    if (localStorage.getItem('randArrayPositionEl') === null) {
        while (randArrayPositionEl.length < countItems ** 2) {
            let a = Math.floor(Math.random() * currentArrayEl.length);
            randArrayPositionEl.push(currentArrayEl.splice(a, 1)[0]);
        }
    } else {
        randArrayPositionEl = localStorage.getItem('randArrayPositionEl').split(',');
        randArrayPositionEl = randArrayPositionEl.map(e => +e);
    }
    // filling random blocks
    randArrayPositionEl.forEach(e => {
        tempDiv = document.createElement('div');
        if (e !== 0) {
            tempDiv.classList.add('item');
            tempDiv.innerHTML = e;
        } else {
            tempDiv.classList.add('emp');
        }
        divM.appendChild(tempDiv);
    })
    body.appendChild(divM);
    document.getElementsByTagName("button")[0].addEventListener('click', toggleModal);
    addEvent();
}


function moveItem(e) {
    let index = randArrayPositionEl.indexOf(parseInt(e.target.innerHTML));
    let indexZero = randArrayPositionEl.indexOf(0);

    let indZi = indexZero % countItems;
    let indZj = parseInt(indexZero / countItems);

    let indNi = index % countItems;
    let indNj = parseInt(index / countItems);

    if (Math.abs(indZi - indNi) + Math.abs(indZj - indNj) === 1) {
        playSoundFail();
        let empDiv = document.getElementsByClassName('emp')[0];
        randArrayPositionEl[indexZero] = randArrayPositionEl[index];
        randArrayPositionEl[index] = 0;

        empDiv.classList.add('item');
        empDiv.innerHTML = e.target.innerHTML;
        empDiv.classList.remove('emp');
        document.getElementsByClassName('emp')[0];
        e.target.classList.remove('item');
        e.target.classList.add('emp');
        e.target.innerHTML = '';
        move++;
        document.getElementsByClassName('move')[0].innerHTML = move;
        if (randArrayPositionEl.join('') === answer.join('') || randArrayPositionEl.join('') === answerClone.join('')) {
            alert(`You win time: ${parseInt(time / 60)} min ${time % 60} sec. moves: ${move}`);
        }
    } else {
        playSound();
    }
}

function setTime() {
    if (!pause) {
        time++;
        let sec = time % 60;
        let min = parseInt(time / 60);
        if (String(sec).length < 2) {
            sec = `0${sec}`;
        }
        if (String(min).length < 2) {
            min = `0${min}`;
        }
        document.getElementsByClassName('time')[0].innerHTML = `${min}:${sec}`;
    }
    setTimeout(setTime, 1000);
}

function addEvent() {
    for (let i = 0; i < countItems ** 2; i++) {
        document.getElementsByClassName('main')[0].children[i].addEventListener('click', moveItem);
    }
}


function startGame() {
    document.getElementsByClassName("menuModal")[0].style.display = "none";
    pause = false;
    clear();
    GenMain();
}
function saveGame() {
    localStorage.setItem('countItems', countItems);
    localStorage.setItem('time', time);
    localStorage.setItem('move', move);
    localStorage.setItem('randArrayPositionEl', randArrayPositionEl);
}
function bestGame() { }

function changeArea(e) {
    countItems = e.target.value;
}


function addEventMenu() {
    document.getElementsByClassName("menuModal")[0].children[0].children[0].addEventListener('click', startGame);
    document.getElementsByClassName("menuModal")[0].children[0].children[1].addEventListener('click', saveGame);
    document.getElementsByClassName("menuModal")[0].children[0].children[2].addEventListener('click', bestGame);
    document.getElementsByTagName('select')[0].addEventListener('change', changeArea);
}

function GenMenu() {
    let divMenu = document.createElement('div');
    divMenu.classList.add('menuModal');

    let NMenu = document.createElement('li');
    NMenu.innerHTML = "New Game";

    let SMenu = document.createElement('li');
    SMenu.innerHTML = "Saved Games";

    let BMenu = document.createElement('li');
    BMenu.innerHTML = "Best";

    let ulMenu = document.createElement('ul');
    ulMenu.appendChild(NMenu);
    ulMenu.appendChild(SMenu);
    ulMenu.appendChild(BMenu);

    divMenu.appendChild(ulMenu);

    let SelectMenu = document.createElement('select');

    for (let i = 1; i <= 6; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', i + 2);
        option.innerHTML = `${i + 2}x${i + 2}`;

        if (localStorage.getItem('countItems') !== null && +localStorage.getItem('countItems') === i + 2) {
            option.setAttribute('selected', true);
        }
        else if (i === 2) {
            option.setAttribute('selected', true);
        }
        SelectMenu.appendChild(option);
    }
    divMenu.appendChild(SelectMenu);
    body.appendChild(divMenu);
    addEventMenu();
}

// init
function init() {
    GenHead();
    GenMain();
    GenMenu();
    setTime();
}

init();

