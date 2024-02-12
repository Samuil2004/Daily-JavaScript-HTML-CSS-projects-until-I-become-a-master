"use strict";

const fName = document.querySelector(".inputFirstName");
const lName = document.querySelector(".inputLastName");
const email = document.querySelector(".inputEmail");
const phone = document.querySelector(".inputPhone");
const password = document.querySelector(".inputPassword");
const btnSubmit = document.querySelector(".submitBtn");

// btnSubmit.addEventListener("click", function (e) {
//   e.preventDefault();
// });
const findValidator = function (item) {
  return item.closest(".inputBox").querySelector(".validator");
};
const validateInput = function (item) {
  const validator = findValidator(item);
  validator.classList.remove("hidden");
  let symbol = true;
  if (item.value === "") {
    symbol = false;
  }
  changeValidationSymbol(item, validator, symbol);
};

const addValidator = function (path) {
  return `images/${path}.png`;
};

const changeValidationSymbol = function (item, validator, symbol) {
  let validatorImg = "check";
  let color = `#39b54a`;
  if (!symbol) {
    validatorImg = "cross";
    color = `#ff0000`;
  }
  validator.src = addValidator(validatorImg);
  item.style.border = `3px solid ${color}`;
};

fName.addEventListener("input", function () {
  validateInput(fName);
});

lName.addEventListener("input", function () {
  validateInput(lName);
});

email.addEventListener("input", function () {
  if (email.value.includes("@")) {
    validateInput(email);
  } else {
    changeValidationSymbol(email, findValidator(email), false);
  }
});
