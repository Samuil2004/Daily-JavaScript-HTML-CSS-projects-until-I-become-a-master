"use strict";

const btns = document.querySelectorAll(".btn");
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
  const type = findClass.classList[1].slice(0, -7);
  if (type === "number") {
    number(btn);
  } else if (type === "grey") {
    greyBtn(btn);
  } else if (type === "right") {
    signBtn(btn);
  }
};

const number = function (btn) {
  const value = btn.textContent;
  let result2;
  // if (activeBtn === undefined) {
  //   display.value = "";
  // }
  if (display.value !== "") {
    if (value === ".") {
      const sss = display.value;
      result2 = sss + ".";
    } else {
      const prevInput = display.value;
      result2 = +(prevInput + btn.textContent);
    }
    display.value = result2;
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
        result = numOfDigits(input / 100, 6);
      } else {
        result = 0;
        activeBtn = undefined;
      }
    }
  }
  display.value = result;
};

const signBtn = function (btn) {
  const value = btn.textContent;
  const input = +display.value;
  if (display.value !== " ") {
    if (value !== "=") {
      result = "";
      valueHolder = input;
      activeBtn = btn;
      btn.classList.add("active");
    } else if (value === "=") {
      result = numOfDigits(equalbtn(activeBtn, valueHolder, input), 2);
      activeBtn.classList.remove("active");
      activeBtn = undefined;
    }
  }
  display.value = result;
};
const numOfDigits = function (num, digits) {
  if (num > Math.floor(num) && num < Math.ceil(num)) {
    return num.toFixed(digits);
  } else {
    return num;
  }
};

const equalbtn = function (btn, valueHolder, curInput) {
  if (valueHolder !== null) {
    if (activeBtn !== undefined) {
      const value = btn.textContent;
      if (value === "/") {
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
