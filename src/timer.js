const remaining = document.getElementsByClassName("remaining")[0];
const status = document.getElementById("status");
const background = document.querySelector("body");
const modeStatus = document.getElementById("mode_status");
let remainTime = 45;
let paused = true;
let totalTime = remainTime * 60;
let loader = document.getElementById('loader'), border = document.getElementById('border'), α = 360.0, π = Math.PI;
let border2 = document.getElementById('border2');

function pause() {
    paused = !paused;
    if (paused) {
        clearInterval(timeInterval);
        status.innerHTML = "Paused";
    }
    else {
        timer();
        status.innerHTML = "&nbsp;";
    }
}

function changeMode() {
    console.log(modeStatus);
    if (localStorage.getItem("mode") == 0) {
        localStorage.setItem("mode", 1);
        modeStatus.innerHTML = "Break";
        remainTime = localStorage.getItem("dBreak");
        remaining.innerHTML = `${remainTime} : 00 `;
    }
    else {
        localStorage.setItem("mode", 0);
        modeStatus.innerHTML = "Pomodoro";
        remainTime = localStorage.getItem("pomodoro");
        remaining.innerHTML = `${remainTime} : 00 `;
    }
}

function loadColor() {
    const color = localStorage.getItem("theme");
    loader.setAttribute('d', "M 0 0 v -125 A 125 125 1 1 1 -0.001 -125 z");
    border.setAttribute('d', "M 0 0 v -125 A 125 125 1 1 1 -0.001 -125 z");
    border2.setAttribute('d', "M 0 0 v -125 A 125 125 1 1 1 -0.001 -125 z");
    if (color === null) {
        border2.style.fill = '#ABDEE6';
        background.style.backgroundColor = '#ABDEE6';
        localStorage.setItem("theme", '#ABDEE6');
    }
    else {
        border2.style.fill = color;
        background.style.backgroundColor = color;
    }
}

function loadDuration() {
    current = localStorage.getItem("mode");
    if (current === null) {
        localStorage.setItem("mode", 0);
        localStorage.setItem("pomodoro", 25);
        remainTime = 25;
        remaining.innerHTML = `${remainTime} : 00 `;
        modeStatus.innerHTML = "Pomodoro";
    }
    else {
        if (current == 0) {
            remainTime = localStorage.getItem("pomodoro");
            remaining.innerHTML = `${remainTime} : 00 `;
            modeStatus.innerHTML = "Pomodoro";
        }
        if (current == 1) {
            remainTime = localStorage.getItem("dBreak");
            remaining.innerHTML = `${remainTime} : 00 `;
            modeStatus.innerHTML = "Break";
        }
        if (current == 2) {
            remainTime = localStorage.getItem("lBreak");
            remaining.innerHTML = `${remainTime} : 00 `;
            modeStatus.innerHTML = "Long Break";
        }
    }
}


function getDefault() {
    remainTime = localStorage.getItem("remaining");
    if (remainTime === null) {
        remainTime = 25;
    }
}

function draw(time) {
    let percentage = (remainTime * 60 - time - 0.999) / (remainTime * 60);
    α = 360 * (1 - percentage);
    var r = (α * π / 180)
        , x = Math.sin(r) * 125
        , y = Math.cos(r) * - 125
        , mid = (α > 180) ? 1 : 0
        , anim = 'M 0 0 v -125 A 125 125 1 '
            + mid + ' 1 '
            + x + ' '
            + y + ' z';
    loader.setAttribute('d', anim);
}

function timer() {
    timeInterval = setInterval(() => {
        let min = parseInt(totalTime / 60);
        let sec = parseInt(totalTime % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        remaining.innerHTML = `${min} : ${sec} `;
        totalTime -= 1;
        draw(totalTime);
        if (totalTime < 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}



function init() {
    loadColor();
    loadDuration();
    remaining.innerHTML = `${remainTime} : 00 `;
    totalTime = remainTime * 60;
    if (!paused) {
        timer();
    }
    else {
        status.innerHTML = "Press to Start";
    }
}

init();





