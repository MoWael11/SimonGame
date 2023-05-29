"use strict";
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level;
const numberStorage = localStorage.getItem('number');
if (numberStorage) {
    level = parseInt(numberStorage);
}
else {
    level = 0;
}
let started = false;
const buttons = document.querySelectorAll('.game');
const playButton = document.getElementById('play');
const score = document.getElementById('score');
const aside = document.querySelector('aside');
const text = document.getElementById('level-title');
const body = document.body;
const rulesButton = document.getElementById('rules');
const rules = document.getElementById('rules-content');
const rulesButtonClose = document.getElementById('rules-close');
score.innerHTML = level.toString();
const nextSequence = () => {
    userClickedPattern = [];
    level++;
    text.textContent = `Level ${level}`;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
};
const playSound = (name) => {
    var audio = new Audio();
    audio.src = `../SimonGame/sounds/${name}.mp3`;
    audio.play();
};
const animatePress = (currentColor) => {
    const button = document.getElementById(currentColor);
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
};
const checkAnswer = (currentLevel) => {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => { nextSequence(); }, 1000);
        }
    }
    else {
        playSound('wrong');
        body.classList.add('game-over');
        text.textContent = `You lost!, with a score of ${level}`;
        setTimeout(() => {
            body.classList.remove('game-over');
        }, 200);
        started = false;
        gamePattern = [];
        aside.classList.remove('hide');
        if (+(score.innerHTML) < level) {
            score.innerHTML = level.toString();
            localStorage.setItem('number', level.toString());
        }
        level = 0;
    }
};
playButton.addEventListener('click', () => {
    started = true;
    aside.classList.add('hide');
    text.textContent = `Level ${level}`;
    nextSequence();
});
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.id && started) {
            const userChosenColour = e.target.id;
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length - 1);
        }
    });
});
rulesButton.addEventListener('click', () => {
    rules.classList.remove('hide');
});
rulesButtonClose.addEventListener('click', () => {
    rules.classList.add('hide');
});
