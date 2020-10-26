const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burgerMenu');
const zatmen = document.querySelector('.covering-panel');

const popup__close = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

const sliderButtonLeft = document.querySelector('.slider__left');
const sliderButtonRight = document.querySelector('.slider__right')
const sliderButtonLeftM = document.querySelector('.slider__leftM');
const sliderButtonRightM = document.querySelector('.slider__rightM');

const cards = document.querySelector('.cards')
let data;
let currentDate = [];
let card

function openBurger() {
    if (burgerMenu.classList.contains('burgerMenu-open')) {
        burgerMenu.classList.remove('burgerMenu-open');
        burger.style.transform = "rotate(0deg)";
        document.querySelector('.header').style.position = "absolute";
        zatmen.style.display = "none";
    } else {
        burgerMenu.classList.add('burgerMenu-open');
        burger.style.transform = "rotate(90deg)";
        zatmen.style.display = "block"
        document.querySelector('.header').style.position = "fixed";
    }
}

function openPopup(e = '') {
    console.log(e)
    if (popup.classList.contains('popup__open')) {
        popup.classList.remove('popup__open');
        zatmen.style.display = "none";
    } else {
        popup.classList.add('popup__open');
        zatmen.style.display = "block";
    }
}

function closeModal() {
    if (burgerMenu.classList.contains('burgerMenu-open')) {
        openBurger()
    }
    if (popup.classList.contains('popup__open')) {
        openPopup()
    }
    zatmen.style.display = "none";
}


const url = "../../assets/pets.json"
async function getPets() {
    const responce = await fetch(url)
    data = await responce.json()
    startCards(data)
}

function rand(data) {
    return parseInt((Math.random() * (data - 1)));
}
function generateCard(e, last = true) {
    var pdiv = document.createElement("div")
    pdiv.classList.add('card');
    var pimg = document.createElement("img");
    var ptext = document.createElement("p")
    ptext.classList.add('card__title');
    var pbutton = document.createElement("button")
    pbutton.classList.add('card__button');
    pbutton.innerText = 'Learn more'
    pimg.src = e.img
    ptext.innerText = e.name
    pbutton.name = e.name
    pdiv.appendChild(pimg);
    pdiv.appendChild(ptext);
    pdiv.appendChild(pbutton);
    
    if (last === true) {
        cards.appendChild(pdiv);
    } else {
        cards.prepend(pdiv);
    }
}

function setPets(data, last = true) {
    let a = rand(data.length)
    generateCard(data[a], last)
    currentDate.push(data.splice(a, 1)[0]);
}

function startCards(data) {
    j = 0;
    while (j < 3) {
        setPets(data)
        j++;
    }
    card = document.querySelectorAll('.card');
}

// Слайдер после генерации
let i = 0;
let b = 4.5;

function sliderL() {
    data.push(currentDate.splice(0, 1)[0])
    setPets(data)

    let card = document.querySelectorAll('.card')
    let marginFirst = parseFloat(card[0].style.margin.split(' ')[3])

    if (document.body.clientWidth >= 1280) {
        if (isNaN(marginFirst) || i === 4.5) {
            i = -36;
            b = 9;
        } else {
            i = i + (-36)
        }
        if (i === 0) {
            i = 4.5
            b = 4.5
        }
    } else {
        if (isNaN(marginFirst) || i === 2) {
            i = -31;
            b = 4;
        } else {
            i = i + (-31)
        }
        if (i === 0) {
            i = 2
            b = 2
        }
    }
    card[0].style.margin = `0 ${b}rem 0 ${i}rem`
}

function sliderR() {
    let card = document.querySelectorAll('.card')
    let marginFirst = parseFloat(card[0].style.margin.split(' ')[3])
    if (marginFirst < 0 && !isNaN(marginFirst)) {
        if (document.body.clientWidth >= 1280) {
            if (isNaN(marginFirst) || i === 4.5) {
                i = 36
            } else {
                i = i - (-36)
            }
            if (i === 0) {
                i = 4.5
                b = 4.5
            }
        } else {
            if (isNaN(marginFirst) || i === 2) {
                i = 31
            } else {
                i = i - (-31)
            }
            if (i === 0) {
                i = 2
                b = 2
            }
        }
    } else {
        data.push(currentDate.splice(currentDate.length - 1, 1)[0])
        setPets(data, false)

        card = document.querySelectorAll('.card')
        marginFirst = parseFloat(card[0].style.margin.split(' ')[3])
        if (document.body.clientWidth >= 1280) {
            i = 4.5
            b = 4.5
        } else {
            i = 2
            b = 2
        }
    }
    card[0].style.margin = `0 ${b}rem 0 ${i}rem`
}


sliderButtonLeft.addEventListener('click', sliderL);
sliderButtonRight.addEventListener('click', sliderR);
sliderButtonLeftM.addEventListener('click', sliderL);
sliderButtonRightM.addEventListener('click', sliderR);

function addEven(){
    console.log(card)
    card.forEach(el => {
        el.addEventListener('clicl', openPopup)
    });    
}
setTimeout(addEven,2000)

burger.addEventListener('click', openBurger);
popup__close.addEventListener('click', openPopup);
zatmen.addEventListener('click', closeModal);


getPets();