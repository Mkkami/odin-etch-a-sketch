const colorButton = document.querySelector('#color-enable');
const clearButton = document.querySelector('#clear');
const eraseButton = document.querySelector('#erase');
const grid = document.querySelector('.grid');
const inputSize = document.querySelector('#size');
const RandomButton = document.querySelector('#random');
const darkenButton = document.querySelector('#darken');
const colorInput = document.querySelector("#color");
const inputSizeRange = document.querySelector("#size-range");

const gridSizePx = Number(getComputedStyle(grid).height.replace('px',''));

let color = 'black';

let size = 16;
let cellSizePx = gridSizePx/16;
inputSize.value = size;
inputSizeRange.value = size;

let randomColor = false;
let darken = false;

createGrid();

function createGrid() {
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.className = 'cell';
            cell.setAttribute('style', `width:${cellSizePx}px; height:${cellSizePx}px`);
            cell.style.filter = 'brightness(1)';
            cell.style.backgroundColor = 'white';
            cell.addEventListener('mouseover', (e) => {
                if (darken) {
                    darkenCell(e);
                } else {
                    cell.style.filter = 'brightness(1)';
                    e.target.style.backgroundColor = color;
                    if (randomColor) {
                        randomRGB();
                    }
                }
            });
            
            grid.appendChild(cell);
        }
    }
}

eraseButton.addEventListener('click', () => {
    color = 'white';
    randomColor = false;
    darken = false;
})

colorButton.addEventListener('click', () => {
    color = 'black';
    randomColor = false;
    darken = false;
})

clearButton.addEventListener('click', () => {
    let cells = [...document.getElementsByClassName('cell')];
    for (let c of cells) {
        c.style.backgroundColor = 'white';
        c.style.filter = 'brightness(1)';
    }
})

inputSize.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        parseInput();
        inputSizeRange.value = inputSize.value;
    }
});

darkenButton.addEventListener('click', () => {
    darken = true;
    randomColor = false;
})

RandomButton.addEventListener('click', () => {
    randomRGB();
    randomColor = true;
    darken = false;
})

colorInput.addEventListener('change', () => {
    darken=false;
    randomColor=false;
    color = colorInput.value;
})

inputSizeRange.addEventListener('input', () => {
    inputSize.value = inputSizeRange.value;
})

inputSizeRange.addEventListener('change', () => {
    parseInput();
})

function parseInput() {
    size = inputSize.value;
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

function darkenCell(e) {
    let filter = e.target.style.filter;
    let brightness = filter.split('(')[1];
    brightness = brightness.split(')')[0];
    brightness = Number(brightness);
    e.target.style.filter = `brightness(${brightness > 0 ? brightness-0.1 : 0})`;
}