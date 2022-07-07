"use strict"
const mainBoard = document.querySelector('.color__items');
const colorTextScheme = document.querySelector('.color__text');
const boardTitle = document.querySelector('.color__title');
const finalButtonArea = document.querySelector('.main__button');
const popups = document.querySelectorAll('.popup');
const popupRules = document.querySelector('.header__rules');
const popupAboutDifficulties = document.querySelector('.select__about');
const clicksCounter = document.querySelector('.clicks__counter');
const clicksArea = document.querySelector('.clicks');
const rewardsArea = document.querySelector('.stars');

var clicks = 0;
var lastColorsArrayIndex = 0;

let gameModes = {
    easy: {
        rows: 5,
        cols: 5,
        colors: ['red', 'green', 'blue'],
        stars: [20, 25, 40]
    },
    medium: {
        rows: 7,
        cols: 7,
        colors: ['red', 'green', 'blue', 'yellow'],
        stars: [50, 55, 60]
    },
    hard: {
        rows: 8,
        cols: 8,
        colors: ['red', 'green', 'blue', 'yellow', 'purple'],
        stars: [90, 105, 120]
    },
    ultraHard: {
        rows: 10,
        cols: 10,
        colors: ['red', 'green', 'blue', 'yellow', 'black', 'purple', 'orange'],
        stars: [140, 170, 200]
    }
}
// Генератор игрового поля. Ряды, колонки, массив цветов, рейтинг звездочек
function generationBoard(row, col, colorArr, starsArr) {
    function changePage() {
        const welcomePage = document.querySelector('.welcome');
        const welcomeContent = welcomePage.querySelector('.content');
        welcomeContent.classList.add('_hide')
        const mainGame = document.querySelector('.main');
        const mainGameContent = mainGame.querySelector('.content')
        mainGameContent.classList.remove('_hide')
        const headerText = document.querySelector('.header__text');
        headerText.classList.add('_hide')
    }
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
                ifWin(target, colors, starsArr)
            } else {
                target.classList.add('_disapear');
            }
        }
    }
    randomColor(colorArr) // окраска
    generatorScheme(colorArr) // схема цветов
    listenerForItems(colorArr) // события кликов
    showClicksAndRewards(starsArr) // показать клики и награды
    setTimeout(changePage, 500) // смена блоков, запуск игры
}

/*------Проверка на победу. Засунуть функцию к клику----*/
function ifWin(t, arr, starsAr) {
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
        clicksCounter.innerHTML = clicks;
        mainBoard.classList.add('_win');
        winGame(starsAr);
    } else {
        clicks++;
        clicksCounter.innerHTML = clicks;
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
function winGame(starsAr) {
    if (mainBoard.classList.contains('_win')) {
        boardTitle.innerHTML = `Вы победили!`;
        colorTextScheme.innerHTML = `Вы справиились за ${clicks} кликов!`;
        rewardStar(starsAr)
        finalButtonArea.innerHTML += `<button class="color__button">Играть заново</button>`;
        document.querySelector('.color__button').addEventListener('click', () => location.reload());
    }
}
/*------Показ количества кликов и цели игры----*/
function showClicksAndRewards(starArr) {
    clicksArea.classList.remove('_hide')
    rewardsArea.classList.remove('_hide')
    const starsDescriptions = document.querySelectorAll('.stars__description');
    var star = 0;
    for (let s of starsDescriptions) {
        s.innerHTML = `${starArr[star]} кликов`
        star++;
    }
}
/*------Смотрим какое место занят игрок----*/
function rewardStar(starAr) {
    if (clicks > starAr[2]) {
        finalButtonArea.innerHTML = `<div class="main__rewarditem">
        <div class="main__rewardstar"></div>
        <div class="main__rewardtext">К сожалению, вы не получаете награду! Попробуйте еще раз!</div>
    </div>`
    } else if (clicks > starAr[1] && clicks <= starAr[2]) {
        finalButtonArea.innerHTML = `<div class="main__rewarditem">
        <div class="main__rewardstar">
            <img src="img/stars/3.png" class="main__star">
        </div>
        <div class="main__rewardtext">Вы занимаете 3 место! Вы молодец!</div>
    </div>`
    } else if (clicks > starAr[0] && clicks <= starAr[1]) {
        finalButtonArea.innerHTML = `<div class="main__rewarditem">
        <div class="main__rewardstar">
            <img src="img/stars/2.png" class="main__star">
        </div>
        <div class="main__rewardtext">Вы занимаете 2 место! Так держать!</div>
    </div>`
    } else if (clicks <= starAr[0]) {
        finalButtonArea.innerHTML = `<div class="main__rewarditem">
        <div class="main__rewardstar">
            <img src="img/stars/1.png" class="main__star">
        </div>
        <div class="main__rewardtext">Вы занимаете 1 место! Вы лучше всех!</div>
    </div>`
    }
}
/*------Главная функция-----*/
function main() {
    popup()
    const dificultyButtons = document.querySelectorAll('.select__button');
    const startButton = document.querySelector('.items__button');
    for (let b of dificultyButtons) {
        b.addEventListener('click', function (e) {
            if (!e.target.classList.contains('_selected') && !e.target.classList.contains('_opacity')) {
                for (let o of dificultyButtons) {
                    o.classList.add('_opacity')
                }
                e.target.classList.remove('_opacity');
                e.target.classList.add('_selected');
            } else if (e.target.classList.contains('_selected')) {
                for (let o of dificultyButtons) {
                    o.classList.remove('_opacity');
                }
                e.target.classList.remove('_selected');
            } else if (e.target.classList.contains('_opacity')) {
                for (let o of dificultyButtons) {
                    o.classList.remove('_opacity')
                    o.classList.remove('_selected')
                }
            }
            if (b.classList.contains('_selected')) {
                startButton.classList.remove('_unavailable');
            } else {
                startButton.classList.add('_unavailable');
            }
        })
    }
    startButton.addEventListener('click', function (e) {
        if (!startButton.classList.contains('_unavailable')) {
            startGame()
        } else {
            e.preventDefault()
        }
    })
    function startGame() {
        for (let b of dificultyButtons) {
            if (b.classList.contains('_selected')) {
                var mode = b.id;
                generationBoard(gameModes[mode].rows, gameModes[mode].cols, gameModes[mode].colors, gameModes[mode].stars)
            }
        }
    }
}
/*------Функция для попапчиков----*/
function popup() {
    for (let pop of popups) {
        if (pop.id == 'rules') {
            popupRules.addEventListener('click', () => pop.classList.toggle('_close'));
            const popupCross = pop.querySelector('.popup__cross');
            popupCross.addEventListener('click', () => pop.classList.toggle('_close'))
        } else if (pop.id == 'dif') {
            popupAboutDifficulties.addEventListener('click', () => pop.classList.toggle('_close'))
            const popupCross = pop.querySelector('.popup__cross');
            popupCross.addEventListener('click', () => pop.classList.toggle('_close'))
        }
    }
}

/*------Запуск глав-функции----*/
main()
