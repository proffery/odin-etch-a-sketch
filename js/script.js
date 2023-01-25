
function drawGrid(gridNumber) {
    const grid = document.querySelector(".main-container");
    let gridArr = [];
    // const squar = document.createElement('div');

    for (let i = 0; i < gridNumber; i++) {
        gridArr[i] = new Array(gridNumber);
    }

    for (let i = 0; i < gridNumber; i++) {
        let row = document.createElement('div');
        row.id = (`row${i}`);
        row.classList.add('row');
        grid.appendChild(row);
        let rowI = document.getElementById(`row${i}`);
        for (let j = 0; j < gridNumber; j++) {
            gridArr[i][j] = document.createElement('div');
            gridArr[i][j].classList.add('square');
            gridArr[i][j].id = (`square${i}-${j}`);
            rowI.appendChild(gridArr[i][j]);
        } 

    }
}
 console.log(drawGrid(16));