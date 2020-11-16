const body = document.body;
const countItems = 4;
let randMas = []

function GenHead(){
    let header = document.createElement('header');
    let div = document.createElement('div');
    let div1 = document.createElement('div');
    let button = document.createElement('button');
    let timeP = document.createElement('p');
    let moveP = document.createElement('p');

    header.appendChild(div)
    header.appendChild(div1)
    header.appendChild(button)
    body.appendChild(header)

    // время
    body.children[1].children[0].appendChild(timeP);
    body.children[1].children[0].children[0].innerHTML = 'Time: <span class="time"></span>';
    // ходы
    body.children[1].children[1].appendChild(moveP);
    body.children[1].children[1].children[0].innerHTML = 'Move: <span class="move"></span>';
    // кнопка
    body.children[1].children[2].innerHTML = 'menu';
}


function GenMain(){
    let divM = document.createElement('div');
    divM.classList.add('main')

    // рандом
    let mas = []
    for(let i =0; i < countItems*countItems; i++){
        mas.push(i)
    }

    while (randMas.length < countItems*countItems){
        let a = Math.floor(Math.random()*mas.length)
        randMas.push(mas.splice(a,1)[0])
    }

    // заполнение рандомными блоками
    randMas.forEach(e =>{
        tempDiv = document.createElement('div');
        if(e !== 0){
            tempDiv.classList.add('item')
            tempDiv.innerHTML = e
        }else{
            tempDiv.classList.add('emp')
        }
        divM.appendChild(tempDiv)
    })
    body.appendChild(divM)
    addEvent();
}

function moveItem(e){
    let index = randMas.indexOf(parseInt(e.target.innerHTML))
    let indexZero = randMas.indexOf(0)
    
    let indZi = indexZero%4
    let indZj = parseInt(indexZero/4)

    let indNi = index%4
    let indNj = parseInt(index/4)
    // console.log(`Zero: (${indZi};${indZj})`)
    // console.log(`Точка: (${indNi};${indNj})`)
    
    if(Math.abs(indZi - indNi) + Math.abs(indZj - indNj) === 1){
        let empDiv = document.getElementsByClassName('emp')[0]
        randMas[indexZero] = randMas[index]
        randMas[index] = 0 
        
        empDiv.classList.add('item')
        empDiv.innerHTML = e.target.innerHTML
        empDiv.classList.remove('emp')
        document.getElementsByClassName('emp')[0]
        e.target.classList.remove('item')
        e.target.classList.add('emp')
        e.target.innerHTML = ''        
    }
}


function addEvent(){
    for(let i = 0; i < countItems*countItems; i++){
        body.children[2].children[i].addEventListener('click', moveItem)
    }
}


GenHead();
GenMain();
