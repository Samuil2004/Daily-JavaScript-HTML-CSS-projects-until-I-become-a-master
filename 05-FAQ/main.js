"use strict";

const btns = document.querySelectorAll(".btn");
let symbol;

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const foundClass = btn
      .closest(".questionPanel")
      .querySelector('[class*="answerBox"]');
    hideInfo(btn);
    foundClass.classList.toggle("hidden");
    changeSymbol(btn);
  });
});

const hideInfo = function (btn) {
  btns.forEach((btns) => {
    if (btns !== btn) {
      btns
        .closest(".questionPanel")
        .querySelector('[class*="answerBox"]')
        .classList.add("hidden");
      btns.textContent = "+";
    }
  });
};

const changeSymbol = function (btn) {
  if (btn.textContent === "+") {
    symbol = "-";
  } else {
    symbol = "+";
  }
  btn.textContent = symbol;
};
