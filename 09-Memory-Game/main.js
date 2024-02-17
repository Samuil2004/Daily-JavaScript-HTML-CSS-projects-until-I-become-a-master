"use strict";

const allImages = document.querySelectorAll(".img");
const gameGrid = document.querySelector(".gameGrid");
const allPanels = gameGrid.querySelectorAll("div");
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

allPanels.forEach((panel) => {
  panel.addEventListener("click", function () {
    const smallDivs = panel.querySelectorAll(".img,.backSide");
    smallDivs.forEach((div) => {
      div.classList.toggle("hidden");
      console.log(div.classList);
    });
  });
});

btnRestart.addEventListener("click", function () {
  window.location.reload();
});
