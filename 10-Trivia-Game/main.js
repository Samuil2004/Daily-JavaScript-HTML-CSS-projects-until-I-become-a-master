"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".questionPanel");
const multipleChoiseQuestion = document.querySelector(".multipleChoise");
const booleanQuestion = document.querySelector(".boolean");

let data = [];
let questionNum = 0;
const fetchQuestions = async function () {
  try {
    const fetchedData = await fetch(
      "https://opentdb.com/api.php?amount=10"
    ).then((res) => res.json());
    data = await fetchedData.results;
    console.log(data);
    defineQuestion();
    printQuestionAndAnswers();
  } catch (err) {
    alert(err.message);
  }
};

fetchQuestions();

const printQuestionAndAnswers = async function () {
  questionType.textContent = data[questionNum].category;
  let questionDifficulty = data[questionNum].difficulty;
  difficulty.textContent =
    questionDifficulty[0].toUpperCase() + questionDifficulty.slice(1);
  question.textContent = data[questionNum].question;
};

const defineQuestion = function () {
  if (data[questionNum].type === "multiple") {
    multipleChoiseQuestion.classList.remove("hidden");
    booleanQuestion.classList.add("hidden");
  } else {
    multipleChoiseQuestion.classList.add("hidden");
    booleanQuestion.classList.remove("hidden");
  }
};

//change the answer buttons according to to the type of question - boolean or multiple choise
//add functionality
