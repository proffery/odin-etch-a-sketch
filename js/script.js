const mainContainer = document.querySelector('.main-container');
const cleanButton = document.querySelector('.clean');
const options = ['Draw', 'Earse', 'Rainbow'];
function drawGrid(gridNumber) {
    let gridArr = [];
    for (let i = 0; i < gridNumber; i++) {
        gridArr[i] = new Array(gridNumber);
    }

    for (let i = 0; i < gridNumber; i++) {
        let row = document.createElement('div');
        row.id = (`row${i}`);
        row.classList.add('row');
        mainContainer.appendChild(row);
        let rowI = document.getElementById(`row${i}`);
        for (let j = 0; j < gridNumber; j++) {
            gridArr[i][j] = document.createElement('div');
            gridArr[i][j].classList.add('square');
            gridArr[i][j].id = (`square${i}-${j}`);
            gridArr[i][j].setAttribute(`style`, `height: ${calcSquare(gridNumber)}px; width: ${calcSquare(gridNumber)}px;`);
            rowI.appendChild(gridArr[i][j]);
        } 
    }
}

function calcSquare(num) {
    const style = getComputedStyle(mainContainer);
    const height = style.height;
    return Math.round(parseInt(height) * 10 / num) / 10;
}

function changeSquareBackground(e, color) {
    if (color == undefined) {
        color = 'black';
    }
const radioButtons = document.querySelectorAll('input[name="option"]'); 
    e.stopPropagation();
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[0].checked) {
                e.target.style.backgroundColor = `${color}`;
            }
            if (radioButtons[1].checked) {
                e.target.style.backgroundColor = '';
            }
            if (radioButtons[2].checked) {
                e.target.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
            }
        }
}

function cleanAll() {
    allSquares.forEach(square => square.style.backgroundColor = '');
}

function stopDraw() {
    allSquares.forEach(square => square.removeEventListener('mouseover', changeSquareBackground));
}

function startDraw() {
    allSquares.forEach(square => square.addEventListener('mouseover', changeSquareBackground));;
}


console.log(drawGrid(64));
 
const group = document.querySelector(".draw-options");

let allSquares = document.querySelectorAll('.square');  

group.innerHTML = options.map((option) => `<div>
    <input type="radio" name="option" value="${option}" id="${option}">
    <label for="${option}">${option}</label>
</div>`).join(' ');

   
allSquares.forEach(square => square.addEventListener('mousedown', startDraw));
allSquares.forEach(square => square.addEventListener('mouseup', stopDraw)); 
allSquares.forEach(square => square.addEventListener('click', changeSquareBackground));      
cleanButton.addEventListener('click', cleanAll);


// const radioButtons = document.querySelectorAll('input[class="option"]');
// for(const radioButton of radioButtons){
//     radioButton.addEventListener('change', selected);
// }


// function selected() {
//     let allSquares = document.querySelectorAll('.square');
//     for (let i = 0; i < radioButtons.length; i++) {
//         if (radioButtons[i].checked) {
//             switch (radioButtons[i].getAttribute('id')) {
//                 case 'Draw':
//                     allSquares.forEach(square => square.addEventListener('mousedown', startDraw));
//                     allSquares.forEach(square => square.addEventListener('mouseup', stopDraw));
//                     allSquares.forEach(square => square.addEventListener('click', drawBlack));
//                     continue;
//             }
//         }
//     }
// }
// console.log(height);
// console.log(calcSquare(3));

