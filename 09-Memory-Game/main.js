"use strict";
import * as configurator from "./configurator.js";

let window1;
let window2;
let timerSeconds = 240;

const randomImage = function () {
  const chosenNum = Math.floor(Math.random() * configurator.shapes.length);
  if (configurator.storage.filter((num) => num === chosenNum).length < 2) {
    configurator.storage.push(chosenNum);
    return chosenNum;
  } else {
    return null;
  }
};

const reloadBoard = function () {
  // export function reloadBoard() {
  configurator.allImages.forEach((img) => {
    let foundNumber = false;
    let num;
    while (!foundNumber) {
      num = randomImage();
      if (num !== null) {
        foundNumber = true;
      }
    }
    img.src = `./images/${configurator.shapes[num]}.png`;
  });
};
reloadBoard();

const flipCell = function (cell) {
  cell.querySelector(".img").classList.toggle("hidden");
  cell.querySelector(".backSide").classList.toggle("hidden");
};

const undefineWindows = function () {
  window1 = undefined;
  window2 = undefined;
};

configurator.allPanels.forEach((panel) => {
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
      [...configurator.allPanels].every(
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

configurator.btnRestart.addEventListener("click", function () {
  window.location.reload();
});

const startTimer = function () {
  setInterval(timerChange, 1000);
};

function timerChange() {
  if (timerSeconds > 0) {
    timerSeconds = timerSeconds - 1;
    let secondsStamp = timerSeconds % 60;
    configurator.timeLeft.textContent = `Time Left ${Math.floor(
      timerSeconds / 60
    )}:${secondsStamp > 9 ? secondsStamp : "0" + secondsStamp}`;
  } else {
    messagePanelShow("You lost :(");
  }
}

const messagePanelShow = function (text) {
  configurator.messagePanel.classList.remove("hiddenPanel");
  configurator.messageForMessagePanel.textContent = text;
  configurator.gameGrid.style.opacity = 0.3;
};

configurator.playAgainBtn.addEventListener("click", function () {
  window.location.reload();
});
