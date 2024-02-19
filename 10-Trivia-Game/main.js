"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".questionPanel");
const multipleChoiseQuestion = document.querySelector(".multipleChoise");
const booleanQuestion = document.querySelector(".boolean");
const answerBtns = document.querySelectorAll(".btn");
const messagePanel = document.querySelector(".messagePanel");
const gamePanel = document.querySelector(".gamePanel");
const score = document.querySelector(".score");
const messageWinOtLose = document.querySelector(".message");
const playAgainBtn = document.querySelector(".playAgain");

let allQuestions = [];
let questionNum = 0;
let isTheAnswerCorrect = undefined;
const fetchQuestions = async function () {
  try {
    const fetchedData = await fetch(
      "https://opentdb.com/api.php?amount=10"
    ).then((res) => res.json());
    allQuestions = await fetchedData.results;
    console.log(allQuestions);
    printData();
    // defineQuestion();
    // printQuestionAndAnswers(data[questionNum]);
    // insertAnswers(data[questionNum]);
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
  console.log(allQuestions[questionNum]);
};
const printQuestionAndAnswers = async function (data) {
  questionType.textContent = data.category;
  let questionDifficulty = data.difficulty;
  difficulty.textContent =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);
  question.textContent = data.question;
};

const defineQuestion = function () {
  if (allQuestions[questionNum].type === "multiple") {
    hideAndUnhideClasses(multipleChoiseQuestion, booleanQuestion);
  } else {
    hideAndUnhideClasses(booleanQuestion, multipleChoiseQuestion);
  }
};

const hideAndUnhideClasses = function (toUnhide, toHide) {
  toUnhide.classList.remove("hidden");
  toHide.classList.add("hidden");
};

const insertAnswers = function (data) {
  const allAnswers = [...data.incorrect_answers, data.correct_answer];
  console.log(data.correct_answer);
  const shuffledAnswersArray = allAnswers.sort(() => Math.random() - 0.5);
  console.log(shuffledAnswersArray);

  let i = 0;
  answerBtns.forEach((btn) => {
    const ans = btn.closest(".answ");
    if (!ans.classList.contains("hidden")) {
      btn.textContent = shuffledAnswersArray[i];
      i++;
    }
    attachEventListeners(btn, data);
    addHoverFunctionalityBtn(btn);
  });
};

const attachEventListeners = function (btn, data) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let color;
    console.log(data);
    if (btn.textContent === data.correct_answer) {
      color = "green";
      isTheAnswerCorrect = true;
      nextQuestion(btn);
      // questionNum++;
      // printData();
    } else {
      color = "red";
      isTheAnswerCorrect = false;
      // setTimeout(showMessagePanel("You lost"), 1500);
      showMessagePanel("You lost");
    }
    btn.style.backgroundColor = color;
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

const nextQuestion = function (btn) {
  setTimeout(function () {
    questionNum++;
    btn.style.backgroundColor = "white";
    printData();
  }, 2000);
};

const showMessagePanel = function (message) {
  messagePanel.classList.remove("hidden");
  gamePanel.style.opacity = 0.5;
  messageWinOtLose.textContent = message;
  score.textContent = `${questionNum + 1}/${allQuestions.length}`;
  messageWinOtLose.textContent = message;
  playAgainBtn.addEventListener("click", function () {
    window.location.reload();
  });
};

//change the answer buttons according to to the type of question - boolean or multiple choise
//add functionality
