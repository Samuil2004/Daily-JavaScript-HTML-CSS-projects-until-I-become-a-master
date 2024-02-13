"use strict";

const btns = document.querySelectorAll(".btn");
console.log(btns);
const display = document.querySelector(".display");

btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    searchForButton(btn);
  })
);

const searchForButton = function (btn) {
  const findClass = btn.closest(".panel");
  console.log(findClass);
  const type = findClass.classList[1].slice(0, -7);
  console.log(type);
  if (type === "number") {
    console.log(`number`);
    number(btn);
    console.log(btn.textContent);
  } else if (type === "grey") {
    console.log(`grey`);
    greyBtn(btn);
  } else if (type === "right") {
    console.log(`right`);
    signBtn(btn);
  }
};

const number = function (btn) {
  const value = btn.textContent;
  // console.log(typeof value);
  if (display.value !== "") {
    const prevInput = display.value;
    const result = +(prevInput + btn.textContent);
    display.value = result;
  } else {
    display.value = value;
  }
};

const greyBtn = function (btn) {
  const value = btn.textContent;
  const input = +display.value;
  let result;
  if (value === "AC") {
    result = "";
  } else if (display.value !== "" && display.value !== 0) {
    if (value === "+/-") {
      if (input > 0) {
        result = input * -1;
      } else {
        result = Math.abs(input);
      }
    } else if (value === "%") {
      if (input > 0) {
        result = (input / 100).toFixed(6).replace(/0+$/, "");
      }
    }
  }
  display.value = result;
};

let activeBtn;
let valueHolder;
const signBtn = function (btn) {
  const value = btn.textContent;
  const input = +display.value;
  let result;
  if (display.value !== " ") {
    if (value !== "=") {
      activeBtn = btn;
      valueHolder = input;
      result = "";
    } else if (value === "=") {
      result = equalbtn(input);
      // result = valueHolder
    }
  }
  display.value = result;
};

const equalbtn = function (input) {
  // const input = +display.value;

  if (valueHolder !== null) {
    // const result2 = 6;
    // display.value = result2;
    return valueHolder + input;
    console.log(typeof valueHolder, valueHolder);
    console.log(typeof input, input);
    console.log(typeof (valueHolder + input));
  }
};
