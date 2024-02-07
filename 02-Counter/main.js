"use strict";
const btnDecrease = document.querySelector(".decrease");
const btnReset = document.querySelector(".reset");
const btnIncrease = document.querySelector(".increase");
const number = document.querySelector(".number");
const changeNumber = function (num) {
  number.textContent = +number.textContent + num;
  if (number.textContent >= 0) {
    document.body.style.background = `rgb(166, 166, 248)`;
  } else {
    document.body.style.background = `rgb(255, 213, 61)`;
  }
};
btnDecrease.addEventListener("click", function () {
  changeNumber(-1);
});
btnIncrease.addEventListener("click", function () {
  changeNumber(1);
});
btnReset.addEventListener("click", function () {
  number.textContent = 0;
});
