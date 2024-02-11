"use strict";
let btns;
btns = document.querySelectorAll(".btn");
let symbol;
const btnAddQuestion = document.querySelector(".btnAddQuestion");
const addQuestionPanel = document.querySelector(".addNewQuestionPanel");
const btnSubmitQuestion = document.querySelector(".submit");
const question = document.querySelector(".questionBox");
const answer = document.querySelector(".BoxForAnswer");
const questionsPanel = document.querySelector(".questionsPanel");
const closeFormButton = document.querySelector(".btnClose");

questionsPanel.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn");
  if (btn) {
    const foundClass = btn
      .closest(".questionPanel")
      .querySelector('[class*="answerBox"]');
    hideInfo(btn);
    foundClass.classList.toggle("hidden");
    changeSymbol(btn);
  }
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

btnAddQuestion.addEventListener("click", function (e) {
  e.preventDefault();
  addQuestionPanel.classList.remove("hidden");
});

btnSubmitQuestion.addEventListener("click", function (e) {
  e.preventDefault();
  if (question.value != "" && answer.value != "") {
    addNewQuestion(question.value, answer.value);
    addQuestionPanel.classList.add("hidden");
    question.value = "";
    answer.value = "";
  } else {
    alert("Please fill in all requred data");
  }
});

const addNewQuestion = function (inputedQuestion, inputedAnswer) {
  const html = `<div class="questionPanel">
  <div class="panel">
    <div>
      <h2 class="question">${inputedQuestion}</h2>
    </div>
    <div>
      <button class="btn">+</button>
    </div>
  </div>
  <div class="answerBox hidden">
    <p class="answer">
      ${inputedAnswer}
    </p>
  </div>
</div>`;
  questionsPanel.insertAdjacentHTML("beforeend", html);
  btns = document.querySelectorAll(".btn");
};

closeFormButton.addEventListener("click", function (e) {
  e.preventDefault();
  addQuestionPanel.classList.add("hidden");
});
