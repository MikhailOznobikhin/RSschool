const burger = document.querySelector('.burger')
const burgerMenu = document.querySelector('.burgerMenu')

function openBurger(){
    burgerMenu.classList.add('burgerMenu-open')
}

burger.addEventListener('click', openBurger);