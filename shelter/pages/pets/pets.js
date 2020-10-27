const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burgerMenu');
const zatmen = document.querySelector('.covering-panel');

const popup__close = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');


const cards = document.querySelector('.cards')
let data;
let currentDate = [];
let card

function openBurger() {
    if (burgerMenu.classList.contains('burgerMenu-open')) {
        burgerMenu.classList.remove('burgerMenu-open');
        burger.style.transform = "rotate(0deg)";
        document.querySelector('.header').style.position = "stiky";
        zatmen.style.display = "none";
    } else {
        burgerMenu.classList.add('burgerMenu-open');
        burger.style.transform = "rotate(90deg)";
        zatmen.style.display = "block"
        document.querySelector('.header').style.position = "fixed";
    }
}
function generatePopup(name) {
    let dataPopup

    currentDate.forEach(e => {
        if (e.name === name) {
            dataPopup = e
        }
    })

    if (dataPopup === undefined) {
        data.forEach(e => {
            if (e.name === name) {
                dataPopup = e
            }
        })
    }

    let inoculations = ""
    let parasites = ""
    let diseases = ""
    dataPopup.inoculations.forEach(e => {
        inoculations = `${inoculations} ${e},`
    }) 
    dataPopup.parasites.forEach(e => {
        parasites = `${parasites} ${e},`
    }) 
    dataPopup.diseases.forEach(e => {
        diseases = `${diseases} ${e},`
    }) 

    popup.children[1].children[0].src = dataPopup.img
    popup.children[1].children[1].children[0].innerText = dataPopup.name;
    popup.children[1].children[1].children[1].innerText = `${dataPopup.type} - ${dataPopup.breed}`;
    popup.children[1].children[1].children[2].innerText = dataPopup.description;
    popup.children[1].children[1].children[3].children[0].children[1].innerText = dataPopup.age;
    popup.children[1].children[1].children[3].children[1].children[1].innerText = inoculations;
    popup.children[1].children[1].children[3].children[2].children[1].innerText = diseases;
    popup.children[1].children[1].children[3].children[3].children[1].innerText = parasites;
    console.log(currentDate)
}

function openPopup(e = '') {
    if (popup.classList.contains('popup__open')) {
        popup.classList.remove('popup__open');
        zatmen.style.display = "none";
    } else {
        generatePopup(e.path[1].children[1].innerText)
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
    addEven()
}

function startCards(data) {
    j = 0;
    while (j < 8) {
        setPets(data)
        j++;
    }
}

function addEven() {
    card = document.querySelectorAll('.card')
    for (let c of card) {
        c.addEventListener('click', openPopup)
    }
}

burger.addEventListener('click', openBurger);
popup__close.addEventListener('click', openPopup);
zatmen.addEventListener('click', closeModal);


getPets();