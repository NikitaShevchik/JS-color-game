"use strict"
const mainBoard = document.querySelector('.items')

let rows = 3;
let cols = 3;

//<div class="color__item"></div>
// красный, синий, зеленый

let colors = ['red', 'green', 'blue']
var lastColorsIndex = colors.length - 1;

function generationBoard(row, col) {
    for (let i = 0; i < col; i++) {
        mainBoard.innerHTML += `<div class="items__cols"></div>`
    }
    const allColumns = mainBoard.querySelectorAll('.items__cols');
    for (let k of allColumns) {
        for (let i = 0; i < row; i++) {
            k.innerHTML += `<div class="items__item"></div>`
        }
    }
    function randomColor() {
        const allItems = document.querySelectorAll('.items__item');
        for (let item of allItems){
            var randomNumber = (Math.random()*lastColorsIndex).toFixed(0);
            item.classList.add(colors[randomNumber])
        }
    }
    randomColor()
}
generationBoard(rows, cols)

