"use-strict";

import * as configurator from "./configurator.js";

let allQuestions = [];
let questionNum = 0;
let isTheAnswerCorrect = undefined;

const fetchQuestions = async function () {
  try {
    allQuestions = await fetch("https://opentdb.com/api.php?amount=10")
      .then((res) => res.json())
      .then((res) => res.results);
    printData();
  } catch (err) {
    alert(err.message);
  }
};
fetchQuestions();

const printData = function () {
  isTheAnswerCorrect = undefined;
  defineQuestion();
  printQuestionAndAnswers(allQuestions[questionNum]);
  insertAnswers(allQuestions[questionNum]);
};
// const correctString = function (text) {
//   if (text.includes("&#039;")) {
//     text = text.replace(/&#039;/g, "'");
//     console.log(text);
//   }
//   if (text.includes("&quot;")) {
//     text = text.replace(/&quot;/g, "'");
//     console.log(text);
//   }
//   if (text.includes("&eacute;")) {
//     text = text.replace(/&eacute;/g, "é");
//     console.log(text);
//   }
//   if (text.includes("&amp;")) {
//     text = text.replace(/&amp;/g, "&");
//     console.log(text);
//   }
//   return text;
// };
const printQuestionAndAnswers = function (data) {
  configurator.questionType.textContent = configurator.correctString(
    data.category
  );
  let questionDifficulty = data.difficulty;
  configurator.difficulty.textContent =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);
  configurator.question.textContent = configurator.correctString(data.question);
};

const defineQuestion = function () {
  if (allQuestions[questionNum].type === "multiple") {
    configurator.btnToHide.forEach((btn) => btn.classList.remove("hidden"));
  } else {
    configurator.btnToHide.forEach((btn) => btn.classList.add("hidden"));
  }
};

const insertAnswers = function (data) {
  const allAnswers = [...data.incorrect_answers, data.correct_answer];
  console.log(data.correct_answer);
  const shuffledAnswersArray = allAnswers.sort(() => Math.random() - 0.5);

  let i = 0;
  configurator.answerBtns.forEach((btn) => {
    btn.textContent = configurator.correctString(shuffledAnswersArray[i]);
    if (i < shuffledAnswersArray.length - 1) {
      i++;
    }
  });
};

const addHoverFunctionalityBtn = function (btn) {
  btn.addEventListener("mouseover", function () {
    if (isTheAnswerCorrect === undefined) {
      btn.style.backgroundColor = "rgb(171,171,171)";
    }
  });
  btn.addEventListener("mouseout", function () {
    if (isTheAnswerCorrect === undefined) {
      btn.style.backgroundColor = "white";
    }
  });
};

const attachEventListeners = function () {
  configurator.answerBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let color;
      if (
        btn.textContent ===
        configurator.correctString(allQuestions[questionNum].correct_answer)
      ) {
        color = "green";
        isTheAnswerCorrect = true;
        checkLastQuestion(btn);
      } else {
        color = "red";
        isTheAnswerCorrect = false;
        setTimeout(showMessagePanel("You lost :("), 1500);
      }
      btn.style.backgroundColor = color;
    });
    addHoverFunctionalityBtn(btn);
  });
};
attachEventListeners();

const nextQuestion = function (btn) {
  setTimeout(function () {
    questionNum++;
    btn.style.backgroundColor = "white";
    printData();
  }, 1500);
};

const showMessagePanel = function (message) {
  configurator.messagePanel.classList.remove("hidden");
  configurator.messageWinOtLose.textContent = message;
  configurator.score.textContent = `${questionNum + 1}/${allQuestions.length}`;
  configurator.messageWinOtLose.textContent = message;
  configurator.playAgainBtn.addEventListener("click", function () {
    window.location.reload();
  });
};

const checkLastQuestion = function (btn) {
  if (questionNum + 1 === allQuestions.length) {
    showMessagePanel("You Win!");
  } else {
    nextQuestion(btn);
  }
};
