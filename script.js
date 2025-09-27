const colorButton = document.querySelector('#color');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');
const grid = document.querySelector('.grid');
const inputSize = document.querySelector('#size');

const gridSizePx = Number(getComputedStyle(grid).height.replace('px',''));

let color = 'black';

const cellSizePx = gridSizePx/16;
for (i = 0; i < 16; i++) {
    for (j = 0; j < 16; j++) {
        let cell = document.createElement("div");
        cell.className = 'cell';
        cell.setAttribute('style', `width:${cellSizePx}px; height:${cellSizePx}px`);
        
        cell.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = color;
        })

        
        grid.appendChild(cell);
    }
}

eraseButton.addEventListener('click', () => {
    color = 'white';
})

colorButton.addEventListener('click', () => {
    color = 'black';
})

clearButton.addEventListener('click', () => {
    let cells = [...document.getElementsByClassName('cell')];
    // console.log(cells);
    for (let c of cells) {
        c.style.backgroundColor = 'white';
    }
})