const mainContainer = document.querySelector('.main-container');
const cleanButton = document.querySelector('.clean');
const options = ['Draw', 'Erase', 'Rainbow'];
const COLORS_NUM = 19;
let slider = document.getElementById("myRange");
let color;
let colorElements;
let allSquares;

function drawGrid(gridNumber) {
    gridNumber = parseInt(slider.value);
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

    drawOptions();
    drawColors(COLORS_NUM);

    colorElements = document.querySelectorAll('.color-element');
    allSquares = document.querySelectorAll('.square');
    
    
    allSquares.forEach(square => square.addEventListener('mousedown', startDraw));
    allSquares.forEach(square => square.addEventListener('mouseup', stopDraw)); 
    allSquares.forEach(square => square.addEventListener('click', changeSquareBackground));
    colorElements.forEach(color => color.addEventListener('click', pickColor));
    colorElements.forEach(color => color.addEventListener('transitionend', removeAllTransition));
}

function calcSquare(num) {
    const style = getComputedStyle(mainContainer);
    const height = style.height;
    return Math.round(parseInt(height) * 10 / num) / 10;
}

function changeSquareBackground(e) {
    const radioButtons = document.querySelectorAll('input[name="option"]'); 
    if (color == undefined) {
        color = 'black';
    }

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[0].checked) {
            e.target.style.backgroundColor = `${color}`;
        }
        if (radioButtons[1].checked) {
            e.target.style.backgroundColor = '';
        }
        if (radioButtons[2].checked) {
            e.target.style.backgroundColor = randomColor();
        }
    }   
}

function randomColor() {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }

function drawOptions() {
    const group = document.querySelector('.draw-options');
    group.innerHTML = options.map((option) => `<div class="draw-option">
    <input type="radio" name="option" value="${option}" id="${option}">
    <label for="${option}">${option}</label>
    </div>`).join(' ');
    const inputPick = document.querySelector ('input[id="Draw"]');
    inputPick.setAttribute('checked', ''); 
}

function cleanAll() {
    cleanButton.classList.add('color-element-pick');
    allSquares.forEach(square => square.style.backgroundColor = '');
}

function stopDraw() {
    allSquares.forEach(square => square.removeEventListener('mouseover', changeSquareBackground));
}

function startDraw() {
    allSquares.forEach(square => square.addEventListener('mouseover', changeSquareBackground));;
}

function drawColors(num) {
    const drawDiv = document.querySelector('div:has(> input[value="Draw"]');
    for (let i = 0; i < num; i++ ) {
        let colorElement = document.createElement('div');
        colorElement.id = (`color${i}`);
        colorElement.classList.add('color-element');
        colorElement.style.backgroundColor = `${randomColor()}`;
        drawDiv.appendChild(colorElement);
    }
    const firstDiv = document.querySelector('div#color0');
    firstDiv.style.backgroundColor = 'black';
}

function pickColor(e) {
    const colorDiv = document.querySelector(`div#${e.target.id}`);
    colorDiv.classList.add('color-element-pick');
    color = e.target.style.backgroundColor;
    cleanButton.style.backgroundColor = color;
}

function removeAllTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('color-element-pick');
} 

function cleanGrid() {
    let child = mainContainer.lastElementChild;
    while (child) {
        mainContainer.removeChild(child);
        child = mainContainer.lastElementChild;
    }
}

function sliderFunction(value) {
    console.log(value);
    slider.innerHTML = value;
    sliderNumber = value;
}

drawGrid();

slider.addEventListener('mousedown', cleanGrid);
slider.addEventListener('mousedown', sliderFunction);
slider.addEventListener('mouseup', drawGrid);

cleanButton.addEventListener('click', cleanAll);
cleanButton.addEventListener('transitionend', removeAllTransition);
