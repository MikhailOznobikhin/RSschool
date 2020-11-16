const body = document.body;

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
    let randMas = []
    for(let i =0; i <=15; i++){
        mas.push(i)
    }

    while (randMas.length < 16){
        let a = Math.floor(Math.random()*mas.length)
        randMas.push(mas.splice(a,1)[0])
    }

    // заполнение рандомными блоками
    randMas.forEach(e =>{
        tempDiv = document.createElement('div');
        if(e !== 0){
            tempDiv.classList.add('item')
            tempDiv.innerHTML = e
        }
        divM.appendChild(tempDiv)
    })

    body.appendChild(divM)
}



GenHead();
GenMain();