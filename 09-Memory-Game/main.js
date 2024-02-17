"use strict";

const allImages = document.querySelectorAll(".img");

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
  // console.log(num);
  img.src = `./images/${shapes[num]}.png`;
});
