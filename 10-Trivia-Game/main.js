"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".questionPanel");
const multipleChoiseQuestion = document.querySelector(".multipleChoise");
const answerBtns = document.querySelectorAll(".btn");
const messagePanel = document.querySelector(".messagePanel");
const gamePanel = document.querySelector(".gamePanel");
const score = document.querySelector(".score");
const messageWinOtLose = document.querySelector(".message");
const playAgainBtn = document.querySelector(".playAgain");
const btnToHide = document.querySelectorAll(".bool");

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

const printQuestionAndAnswers = function (data) {
  questionType.textContent = data.category;
  let questionDifficulty = data.difficulty;
  difficulty.textContent =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);
  question.textContent = data.question;
};

const defineQuestion = function () {
  if (allQuestions[questionNum].type === "multiple") {
    btnToHide.forEach((btn) => btn.classList.remove("hidden"));
  } else {
    btnToHide.forEach((btn) => btn.classList.add("hidden"));
  }
};

const insertAnswers = function (data) {
  const allAnswers = [...data.incorrect_answers, data.correct_answer];
  console.log(data.correct_answer);
  const shuffledAnswersArray = allAnswers.sort(() => Math.random() - 0.5);

  let i = 0;
  answerBtns.forEach((btn) => {
    btn.textContent = shuffledAnswersArray[i];
    i++;
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
  answerBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let color;
      if (btn.textContent === allQuestions[questionNum].correct_answer) {
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
  messagePanel.classList.remove("hidden");
  messageWinOtLose.textContent = message;
  score.textContent = `${questionNum + 1}/${allQuestions.length}`;
  messageWinOtLose.textContent = message;
  playAgainBtn.addEventListener("click", function () {
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

//add configurator
