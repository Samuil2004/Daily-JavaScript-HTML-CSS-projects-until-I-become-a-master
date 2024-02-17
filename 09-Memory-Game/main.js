"use strict";

const allImages = document.querySelectorAll(".img");
const gameGrid = document.querySelector(".gameGrid");
const allPanels = gameGrid.querySelectorAll(".cell");
const btnRestart = document.querySelector(".restartGame");
const timeLeft = document.querySelector(".timeLeft");
const messagePanel = document.querySelector(".messagePanel");
const messageForMessagePanel = document.querySelector(".message");
const playAgainBtn = document.querySelector(".playAgain");
let window1;
let window2;
let timerSeconds = 240;
const shapes = [
  "circle",
  "hexagon",
  "octagon",
  "oval",
  "pentagon",
  "rectangle",
  "rhombus",
  "square",
  "trapezium",
  "triangle",
];
const storage = [];

const randomImage = function () {
  const chosenNum = Math.floor(Math.random() * shapes.length);
  if (storage.filter((num) => num === chosenNum).length < 2) {
    storage.push(chosenNum);
    return chosenNum;
  } else {
    return null;
  }
};

const reloadBoard = function () {
  allImages.forEach((img) => {
    let foundNumber = false;
    let num;
    while (!foundNumber) {
      num = randomImage();
      if (num !== null) {
        foundNumber = true;
      }
    }
    img.src = `./images/${shapes[num]}.png`;
  });
};

const flipCell = function (cell) {
  cell.querySelector(".img").classList.toggle("hidden");
  cell.querySelector(".backSide").classList.toggle("hidden");
};

const undefineWindows = function () {
  window1 = undefined;
  window2 = undefined;
};

allPanels.forEach((panel) => {
  panel.addEventListener("click", function () {
    if (timerSeconds === 240) {
      startTimer();
    }
    if (window1 === undefined || (window2 == undefined && panel !== window1)) {
      flipCell(panel);
      if (window1 === undefined) {
        window1 = panel;
      } else {
        window2 = panel;
        checkOpenedPanles();
      }
    }
  });
});

const checkOpenedPanles = function () {
  if (window1.querySelector(".img").src === window2.querySelector(".img").src) {
    undefineWindows();
    if (
      [...allPanels].every(
        (cell) => !cell.querySelector(".img").classList.contains("hidden")
      )
    ) {
      messagePanelShow("You win!");
    }
  } else {
    setTimeout(() => {
      flipCell(window1);
      flipCell(window2);
      undefineWindows();
    }, 1000);
  }
};

btnRestart.addEventListener("click", function () {
  window.location.reload();
});

const startTimer = function () {
  setInterval(timerChange, 1000);
};

function timerChange() {
  if (timerSeconds > 0) {
    timerSeconds = timerSeconds - 1;
    let minStamp = Math.floor(timerSeconds / 60);
    let secondsStamp = timerSeconds % 60;
    timeLeft.textContent = `Time Left ${minStamp}:${
      secondsStamp > 9 ? secondsStamp : "0" + secondsStamp
    }`;
  } else {
    messagePanelShow("You lost :(");
  }
}

const messagePanelShow = function (text) {
  messagePanel.classList.remove("hiddenPanel");
  messageForMessagePanel.textContent = text;
  gameGrid.style.opacity = 0.3;
};

playAgainBtn.addEventListener("click", function () {
  window.location.reload();
});
