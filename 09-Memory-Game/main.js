"use strict";

const allImages = document.querySelectorAll(".img");
const gameGrid = document.querySelector(".gameGrid");
const allPanels = gameGrid.querySelectorAll(".cell");
const btnRestart = document.querySelector(".restartGame");

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
let window1;
let window2;

const flipCell = function (cell) {
  cell.querySelector(".img").classList.toggle("hidden");
  cell.querySelector(".backSide").classList.toggle("hidden");
};

allPanels.forEach((panel) => {
  panel.addEventListener("click", function () {
    if (window1 === undefined || window2 == undefined) {
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
    console.log("TRUE");
  } else {
    setTimeout(() => {
      flipCell(window1);
      flipCell(window2);
      window1 = undefined;
      window2 = undefined;
      console.log(`ready`);
    }, 1000);
    console.log(`FALSE`);
  }
};

btnRestart.addEventListener("click", function () {
  window.location.reload();
});
