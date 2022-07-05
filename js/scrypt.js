"use strict"
const mainBoard = document.querySelector('.items')

let rows = 3;
let cols = 3;

let rowsHard = 8; // усложненный уровень
let colsHard = 8; // усложненный уровень

var clicks = 0;
//<div class="color__item"></div>
// красный, синий, зеленый

let colors = ['red', 'green', 'blue']
let colorsHard = ['red', 'green', 'blue', 'yellow', 'black', 'purple', 'orange'] // усложненный уровень
var lastColorsArrayIndex = 0;

// Генератор игрового поля. Ряды, колонки, массив цветов
function generationBoard(row, col, colorArr) {
    for (let i = 0; i < row; i++) {
        mainBoard.innerHTML += `<div class="items__cols"></div>`
    }
    const allColumns = mainBoard.querySelectorAll('.items__cols');
    for (let k of allColumns) {
        for (let i = 0; i < col; i++) {
            k.innerHTML += `<div class="items__item"></div>`
        }
    }
    /*----------------Случайная окраснка всех кубиков в цвета из массива colors--------------*/
    function randomColor(colors) {
        lastColorsArrayIndex = colors.length - 1;
        const allItems = document.querySelectorAll('.items__item');
        for (let item of allItems) {
            var randomNumber = (Math.random() * lastColorsArrayIndex).toFixed(0);
            item.classList.add(colors[randomNumber])
        }
    }
    /*-------------Навешивание событий клика по ячейкам. + ф-я о смене цвета-------------*/
    function listenerForItems(colors) {
        const allItems = document.querySelectorAll('.items__item');
        for (let item of allItems) {
            item.addEventListener('click', () => changeColor(colors, item))
        }
        /*------Смена цвета + проверка на победу------*/
        function changeColor(arr, target) {
            for (let i = 0; i <= lastColorsArrayIndex; i++) {
                if (target.classList.contains(arr[i])) {
                    if (i < lastColorsArrayIndex) {
                        target.classList.remove(arr[i]);
                        target.classList.add(arr[i + 1])
                    } else if (i == lastColorsArrayIndex) {
                        target.classList.remove(arr[i]);
                        i = 0;
                        target.classList.add(arr[i]);
                    }
                    break
                }
            }
            ifWin(target, colors)
        }
    }
    randomColor(colorArr)
    listenerForItems(colorArr)
}




generationBoard(rows, cols, colors) // запуск генерации. Ряды, колонки, массив цветов

// ахахахахахах я перепутал колонки и ряды, Никита из завтра - исправить!!!
// есть!

/*------Проверка на победу. Засунуть функцию к клику----*/
function ifWin(t, arr) {
    const allItems = document.querySelectorAll('.items__item');
    var win = false;
    for (let i = 0; i <= lastColorsArrayIndex; i++) {
        if (t.classList.contains(arr[i])) {
            for (let it of allItems) {
                if (it.classList.contains(arr[i])) {
                    win = true;
                } else {
                    win = false
                    break
                }
            }
            break
        }
    }
    if (win) {
        clicks++;
        console.log('ПОБЕДА', clicks, 'кликов')
    } else {
        clicks++;
    }
}

