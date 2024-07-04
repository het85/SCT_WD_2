let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
restartBtn.addEventListener("click", restart);
lapBtn.addEventListener("click", lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() -(difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        restartBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function restart() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = "00:00:00.00";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    restartBtn.disabled = true;
    lapBtn.disabled = true;
    lapCounter = 0;
    laps.innerHTML = "";
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = display.innerHTML;
        const lapElement = document.createElement("li");
        lapElement.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        (milliseconds < 10 ? "0" + milliseconds : milliseconds);
}
