const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const field = document.querySelector('.game_field');
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game_button');
const gameTimer = document.querySelector('.game_timer');
const gameScore = document.querySelector('.game_score');

const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop_up_message');
const popUpRefresh = document.querySelector('.pop-up_refresh');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    }
    else {
        startGame();
    }
    started = !started;
})

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame() {
    stopGameTimer();
    hideGameButton();
    showPopUpWithText("REPLAY?");
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}
function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec)
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000)
}

function stopGameTimer() {
    clearInterval(timer);
}
function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}
function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide');
}
function initGame() {
    field.innerHTML = '';
    gameScore.innerText = CARROT_COUNT;
    console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width;
    const y2 = fieldRect.height;

    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNum(x1, x2 - CARROT_SIZE);
        const y = randomNum(y1, y2 - CARROT_SIZE);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}
