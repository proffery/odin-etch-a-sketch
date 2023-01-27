const mainContainer = document.querySelector('.main-container');
const cleanButton = document.querySelector('.clean');
let allSquares;


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

function changeBack(e) {
    e.stopPropagation();
    e.target.style.backgroundColor = 'black';
}

function removeBack() {
    allSquares.forEach(square => square.style.backgroundColor = '');
}

function stop() {
    allSquares.forEach(square => square.removeEventListener('mouseenter', changeBack));
}

function start() {
    allSquares.forEach(square => square.addEventListener('mouseenter', changeBack));;
}

console.log(drawGrid(100));
allSquares = document.querySelectorAll('.square');
allSquares.forEach(square => square.addEventListener('mousedown', start));
allSquares.forEach(square => square.addEventListener('click', changeBack));
allSquares.forEach(square => square.addEventListener('mouseup', stop));
cleanButton.addEventListener('click', removeBack);
// console.log(height);
// console.log(calcSquare(3));

