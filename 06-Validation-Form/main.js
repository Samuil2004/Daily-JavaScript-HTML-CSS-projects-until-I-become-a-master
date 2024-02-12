"use strict";

const fName = document.querySelector(".inputFirstName");
const lName = document.querySelector(".inputLastName");
const email = document.querySelector(".inputEmail");
const phone = document.querySelector(".inputPhone");
const password = document.querySelector(".inputPassword");
const btnSubmit = document.querySelector(".submitBtn");
const allValidators = document.querySelectorAll(".validator");
const panel = document.querySelector(".fields");

const findValidator = function (item) {
  return item.closest(".inputBox").querySelector(".validator");
};
const validateInput = function (item) {
  const validator = findValidator(item);
  let symbol = true;
  if (item.value === "") {
    symbol = false;
  }
  changeValidationSymbol(item, validator, symbol);
};

const addValidator = function (path) {
  return `images/${path}.png`;
};

const changeValidationSymbol = function (item, validator, symbol = true) {
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

phone.addEventListener("input", function () {
  const phonePattern = /^\+\d{9,15}$/;
  if (phone.value.match(phonePattern)) {
    validateInput(phone);
  } else {
    changeValidationSymbol(phone, findValidator(phone), false);
  }
});

password.addEventListener("blur", function () {
  validateInput(fName);
  const validation = validatePassword(password.value);
  if (validation === "true") {
    validateInput(password);
  } else {
    changeValidationSymbol(password, findValidator(password), false);
    alert(validation);
  }
});

const validatePassword = function (inputedPassword) {
  let num;
  if (inputedPassword.lenght < 5) {
    num = 0;
  } else if (!/[A-Z]/.test(inputedPassword)) {
    num = 1;
  } else if (!/[0-9]/.test(inputedPassword)) {
    num = 2;
  } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(inputedPassword)) {
    num = 3;
  }

  switch (num) {
    case 0:
      return "The password should be at least 5 digits long";
    case 1:
      return "The password should contain at least one capital letter";
    case 2:
      return "The password should contain at least one small letter";
    case 3:
      return "The password should contain at least one special character";
    default:
      return "true";
  }
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const isTrue = (item) => item.src.includes("check");
  if (Array.from(allValidators).every(isTrue)) {
    alert("Your credentials have been successfully validated");
    fName.value = lName.value = email.value = phone.value = password.value = "";
    allValidators.forEach((item) => (item.src = ""));
    [fName, lName, email, phone, password].forEach(
      (item) => (item.style.border = `2px solid #444444`)
    );
  }
});

panel.addEventListener("mouseover", function (e) {
  const val = e.target.closest(".validator");
  if (val) {
    if (val.src.includes("cross")) {
      // val.addEventListener("mouseover", function () {
      const span = val
        .closest(".inputBox")
        .previousElementSibling.querySelector(".error-message");

      span.style.display = "inline";
      // });
      val.addEventListener("mouseout", function () {
        span.style.display = "none";
      });
      // val.addEventListener("mouseout", function () {
      //   const span2 = val
      //     .closest(".inputBox")
      //     .previousElementSibling.querySelector(".error-message");

      //   // const span = val
      //   //   .closest(".inputBox")
      //   //   .closest(".top")
      //   //   .querySelector(".error-message");
      //   span2.style.display = "none";
      // });
    }
  }
});

// allValidators.forEach((item) => {
//   if (item.src.includes("cross")) {
//     item.addEventListener("mouseover", function () {
//       const span = item.closest(".top").querySelector(".error-message");
//       span.style.display = "inline";
//     });
//   }
// });
