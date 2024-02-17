"use strict";

const allImages = document.querySelectorAll(".img");
const test = document.querySelector(".first");

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

test.addEventListener("click", function () {
  test.classList.toggle("hidden");
  const smallDivs = test.querySelectorAll(".img,.backSide");
  smallDivs.forEach((div) => {
    div.classList.toggle("hidden");
    console.log(div.classList);
  });
});
