"use strict"
const mainBoard = document.querySelector('.items');
const colorTextScheme = document.querySelector('.color__text');
const boardTitle = document.querySelector('.color__title');
const finalButtonArea = document.querySelector('.main__button');
const popup = document.querySelector('.popup');
const popupCross = document.querySelector('.popup__cross');
const popupRules = document.querySelector('.header__rules');

let rows = 5;
let cols = 5;

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
            if (!mainBoard.classList.contains('_win')) {
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
            } else {
                target.classList.add('_disapear');
            }
        }
    }
    randomColor(colorArr)
    generatorScheme(colorArr)
    listenerForItems(colorArr)
}

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
        mainBoard.classList.add('_win');
        winGame();
    } else {
        clicks++;
    }
}
/*------Генератор правил расположения цветов----*/
function generatorScheme(colors) {
    //colorTextScheme
    for (let k of colors) {
        if (colors.indexOf(k) < lastColorsArrayIndex) {
            colorTextScheme.innerHTML += `<p class="${k}"></p><span>&#8594;</span>`
        } else if (colors.indexOf(k) == lastColorsArrayIndex) {
            colorTextScheme.innerHTML += `<p class="${k}"></p>`
        }
    }
}
/*------Победная функция----*/
function winGame() {
    if (mainBoard.classList.contains('_win')) {
        boardTitle.innerHTML = `Вы победили!`
        colorTextScheme.innerHTML = `Вы справиились за ${clicks} кликов!`
        finalButtonArea.innerHTML = `<button class="color__button">Играть заново</button>`
        document.querySelector('.color__button').addEventListener('click', () => location.reload())
    }
}

generationBoard(rows, cols, colors) // запуск генерации. Ряды, колонки, массив цветов



function welcomeBlock() {

}


popupRules.addEventListener('click', () => popup.classList.toggle('_close'))
popupCross.addEventListener('click', () => popup.classList.toggle('_close'))
