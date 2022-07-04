"use strict"
const mainBoard = document.querySelector('.items')

let rows = 5;
let cols = 15;

let rowsHard = 8; // усложненный уровень
let colsHard = 8; // усложненный уровень

//<div class="color__item"></div>
// красный, синий, зеленый

let colors = ['red', 'green', 'blue']
let colorsHard = ['red', 'green', 'blue', 'yellow', 'black', 'purple', 'orange'] // усложненный уровень
var lastColorsArrayIndex = 0;

// Генератор игрового поля. Ряды, колонки, массив цветов
function generationBoard(row, col, colorArr) {
    for (let i = 0; i < col; i++) {
        mainBoard.innerHTML += `<div class="items__cols"></div>`
    }
    const allColumns = mainBoard.querySelectorAll('.items__cols');
    for (let k of allColumns) {
        for (let i = 0; i < row; i++) {
            k.innerHTML += `<div class="items__item"></div>`
        }
    }
    function randomColor(cA) {
        lastColorsArrayIndex = cA.length - 1;
        const allItems = document.querySelectorAll('.items__item');
        for (let item of allItems) {
            var randomNumber = (Math.random() * lastColorsArrayIndex).toFixed(0);
            item.classList.add(cA[randomNumber])
        }
    }
    randomColor(colorArr)
}
generationBoard(rows, cols, colors)

// ахахахахахах я перепутал колонки и ряды, Никита из завтра - исправить!!!