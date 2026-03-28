let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return formattedMM + ":" + formattedSS + "." + formattedMS;
}

function print(txt) {
    display.innerHTML = txt;
}

function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        showButton("PAUSE");
        lapBtn.disabled = false;
        isRunning = true;
    } else {
        clearInterval(timerInterval);
        showButton("START");
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.00");
    elapsedTime = 0;
    isRunning = false;
    showButton("START");
    lapBtn.disabled = true;
    lapsList.innerHTML = "";
}

function recordLap() {
    let lapTime = timeToString(elapsedTime);
    let li = document.createElement("li");
    li.innerText = "Lap " + (lapsList.children.length + 1) + ": " + lapTime;
    lapsList.prepend(li);
}

function showButton(buttonKey) {
    if (buttonKey === "PAUSE") {
        startStopBtn.innerHTML = "Pause";
        startStopBtn.style.backgroundColor = "#ff9800";
    } else {
        startStopBtn.innerHTML = "Start";
        startStopBtn.style.backgroundColor = "#4CAF50";
    }
}