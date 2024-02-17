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
console.log(window1, window2);

allPanels.forEach((panel) => {
  panel.addEventListener("click", function () {
    // console.log(panel);
    const image = panel.querySelector(".img");
    // console.log(image);
    const backSide = panel.querySelector(".backSide");
    // console.log(backSide);
    if (window1 === undefined || window2 == undefined) {
      image.classList.toggle("hidden");
      backSide.classList.toggle("hidden");
      if (window1 === undefined) {
        window1 = panel;
        console.log(window1);
      } else {
        window2 = panel;
        console.log(window2);
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
      window1.querySelector(".img").classList.toggle("hidden");
      window2.querySelector(".img").classList.toggle("hidden");
      window1.querySelector(".backSide").classList.toggle("hidden");
      window2.querySelector(".backSide").classList.toggle("hidden");
      console.log(window1);
      console.log(window2);
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
