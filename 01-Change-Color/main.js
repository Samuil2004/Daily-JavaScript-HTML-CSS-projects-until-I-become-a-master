"use strict";

const btn = document.querySelector(".button");
const body = document.body;
const randomNums = function () {
  return Math.floor(Math.random() * 255);
};
btn.addEventListener("click", function () {
  btn.style.backgroundColor = `rgb(${randomNums()}, ${randomNums()}, ${randomNums()})`;
  body.style.backgroundColor = `rgb(${randomNums()}, ${randomNums()}, ${randomNums()})`;
});
