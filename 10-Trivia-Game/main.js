"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".questionPanel");
const multipleChoiseQuestion = document.querySelector(".multipleChoise");
const booleanQuestion = document.querySelector(".boolean");
const answerBtns = document.querySelectorAll(".btn");

let data = [];
let questionNum = 0;
let isTheAnswerCorrect = undefined;
const fetchQuestions = async function () {
  try {
    const fetchedData = await fetch(
      "https://opentdb.com/api.php?amount=10"
    ).then((res) => res.json());
    data = await fetchedData.results;
    console.log(data);
    defineQuestion();
    printQuestionAndAnswers(data[questionNum]);
    insertAnswers(data[questionNum]);
  } catch (err) {
    alert(err.message);
  }
};

fetchQuestions();

const printQuestionAndAnswers = async function (data) {
  questionType.textContent = data.category;
  let questionDifficulty = data.difficulty;
  difficulty.textContent =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);
  question.textContent = data.question;
};

const defineQuestion = function () {
  if (data[questionNum].type === "multiple") {
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
  let allAnswers = [];
  data.incorrect_answers.forEach((answ) => allAnswers.push(answ));
  allAnswers.push(data.correct_answer);
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

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (btn.textContent === data.correct_answer) {
        btn.style.backgroundColor = "green";
        isTheAnswerCorrect = true;
      } else {
        btn.style.backgroundColor = "red";
        isTheAnswerCorrect = false;
      }
      // ? (btn.style.backgroundColor = "green")
      // : (btn.style.backgroundColor = "red");
    });
    addHoverFunctionalityBtn(btn);
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

//change the answer buttons according to to the type of question - boolean or multiple choise
//add functionality
