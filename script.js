const colorButton = document.querySelector('#color');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');
const grid = document.querySelector('.grid');
const inputSize = document.querySelector('#size');
const RandomButton = document.querySelector('#random');

const gridSizePx = Number(getComputedStyle(grid).height.replace('px',''));

let color = 'black';

let size = 16;
let cellSizePx = gridSizePx/16;
inputSize.value = size;

let randomColor = false;

createGrid();

function createGrid() {
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.className = 'cell';
            cell.setAttribute('style', `width:${cellSizePx}px; height:${cellSizePx}px`);
            
            cell.addEventListener('mouseover', (e) => {
                e.target.style.backgroundColor = color;
                if (randomColor) {
                    randomRGB();
                }
            })
            grid.appendChild(cell);
        }
    }
}

eraseButton.addEventListener('click', () => {
    color = 'white';
    randomColor = false;
})

colorButton.addEventListener('click', () => {
    color = 'black';
    randomColor = false;
})

clearButton.addEventListener('click', () => {
    let cells = [...document.getElementsByClassName('cell')];
    // console.log(cells);
    for (let c of cells) {
        c.style.backgroundColor = 'white';
    }
})

inputSize.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        parseInput(e);
    }
});

RandomButton.addEventListener('click', () => {
    randomRGB();
    randomColor = true;
})

function parseInput(e) {
    size = e.target.value;
    console.log(size);
    if (size > 100) {
        size = 100;
        e.target.value = size;
    }
    updateGrid();
}

function updateGrid() {
    grid.replaceChildren();
    cellSizePx = gridSizePx/size;
    createGrid();
}

const MAX_RGB = 255;

function randomRGB() {
    let rgb = [];
    for (i = 0; i < 3; i++) {
        rgb.push(Math.floor( Math.random() * (MAX_RGB+1) ));
    }
    color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
}