"use strict";

const btns = document.querySelectorAll(".btn");
console.log(btns);
const display = document.querySelector(".display");
let result;
let activeBtn;
let valueHolder;

btns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    searchForButton(btn);
  })
);

const searchForButton = function (btn) {
  const findClass = btn.closest(".panel");
  // console.log(findClass);
  const type = findClass.classList[1].slice(0, -7);
  // console.log(type);
  if (type === "number") {
    // console.log(`number`);
    number(btn);
    console.log(btn.textContent);
  } else if (type === "grey") {
    // console.log(`grey`);
    greyBtn(btn);
  } else if (type === "right") {
    // console.log(`right`);
    signBtn(btn);
  }
};

const number = function (btn) {
  const value = btn.textContent;
  // console.log(typeof value);
  // display.value = "";
  let result2;
  if (activeBtn !== undefined) {
    display.value = "";
  }
  if (display.value !== "") {
    if (value === ".") {
      const sss = display.value;
      result2 = sss + ".";
      display.value = result2;
      console.log(sss);
      console.log(result2);
      console.log(typeof result2);
    } else {
      const prevInput = display.value;
      result2 = +(prevInput + btn.textContent);
      display.value = result2;
    }
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
    activeBtn = undefined;
  } else if (display.value !== "" && display.value !== 0) {
    if (value === "+/-") {
      if (input > 0) {
        result = input * -1;
      } else {
        result = Math.abs(input);
      }
    } else if (value === "%") {
      if (input > 0) {
        result = (input / 100).toFixed(3).replace(/0+$/, "");
      } else {
        result = 0;
        activeBtn = undefined;
      }
    }
  }
  display.value = result;
};

// let fresult;
const signBtn = function (btn) {
  const value = btn.textContent;
  const input = +display.value;
  if (display.value !== " ") {
    if (value !== "=") {
      valueHolder = input;
      activeBtn = btn;
    } else if (value === "=") {
      display.value = equalbtn(activeBtn, valueHolder, input);
      activeBtn = undefined;
    }
  }
};
const equalbtn = function (btn, valueHolder, curInput) {
  if (valueHolder !== null) {
    if (activeBtn !== undefined) {
      const value = btn.textContent;

      if (value === "/") {
        console.log(valueHolder / curInput);
        return valueHolder / curInput;
      } else if (value === "X") {
        return valueHolder * curInput;
      } else if (value === "-") {
        return valueHolder - curInput;
      } else if (value === "+") {
        return valueHolder + curInput;
      }
    }
  }
};
