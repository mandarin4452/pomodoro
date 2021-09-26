
const items = document.getElementsByClassName('item');
const theme = document.getElementsByClassName('theme')[0];
const background = document.querySelector('body');
const duration = document.getElementsByClassName('duration')[0];
const values = document.getElementsByClassName('quantity');
const colors = [
    '#ABDEE6',
    '#CBAACB',
    '#FFFFB5',
    '#FFCCB6',
    '#F3B0C3',
    '#C6DBDA',
    '#55CBCD',
    '#D4F0F0',
    '#ECEAE4'
]
let pomodoro = 25;
let dBreak = 4;
let lBreak = 8;

const buttons = document.querySelectorAll('button');
Array.from(buttons).forEach(button => button.addEventListener('click', (e) => e.preventDefault()));

function changed(value, i) {
    if (i == 0) {
        localStorage.setItem("pomodoro", value);
    }
    if (i == 1) {
        localStorage.setItem("dBreak", value);
    }
    if (i == 2) {
        localStorage.setItem("lBreak", value);
    }
}


buttons[0].addEventListener('click', () => changed(values[0].value, 0));
buttons[1].addEventListener('click', () => changed(values[0].value, 0));
buttons[2].addEventListener('click', () => changed(values[1].value, 1));
buttons[3].addEventListener('click', () => changed(values[1].value, 1));
buttons[4].addEventListener('click', () => changed(values[2].value, 2));
buttons[5].addEventListener('click', () => changed(values[2].value, 2));

colors.map((color, index) => {
    items[index].style.backgroundColor = color;
});
Array.from(items).forEach(
    item => item.addEventListener("click", () => {
        localStorage.setItem("theme", item.style.backgroundColor)
        background.style.backgroundColor = item.style.backgroundColor;
        duration.style.backgroundColor = item.style.backgroundColor;
        theme.style.backgroundColor = item.style.backgroundColor;
        duration.style.setProperty("filter", "brightness(0.9)");
        theme.style.setProperty("filter", "brightness(0.9)");
        item.style.setProperty("filter", "brightness(1.2)");
    }));

function loadColor() {
    const loadedColor = localStorage.getItem("theme");
    if (loadedColor !== null) {
        background.style.backgroundColor = loadedColor;
        theme.style.backgroundColor = loadedColor;
        duration.style.backgroundColor = loadedColor;
        duration.style.setProperty("filter", "brightness(0.9)");
        theme.style.setProperty("filter", "brightness(0.9)");
        Array.from(items).forEach(item => {
            item.style.setProperty("filter", "brightness(1.2)");
            item.style.setProperty("opacity", "1");
        });

    }
}

function loadValues() {
    pomodoro = localStorage.getItem("pomodoro");
    dBreak = localStorage.getItem("dBreak");
    lBreak = localStorage.getItem("lBreak");

    if (pomodoro === null) {
        values[0].value = 25;
    }
    else {
        values[0].value = pomodoro;
    }

    if (dBreak === null) {
        values[1].value = 4;
    }
    else {
        values[1].value = dBreak;
    }

    if (lBreak === null) {
        values[2].value = 8;
    }
    else {
        values[2].value = lBreak;
    }
}

function init() {
    loadColor();
    loadValues();
}

init();