const mainContainer = document.querySelector('.main-container');
const allSquares = document.querySelectorAll('.square');


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
    const ide = e.target.id;
    e.stopPropagation();
    const square = document.query(`div#${ide}`);
    square.setAttribute('background: black;');
    // e.target.style.background = 'blue';
}

allSquares.forEach(keys => keys.addEventListener('click', changeBack));
// console.log(height);
//  console.log(calcSquare(3));
console.log(drawGrid(18));