"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");
const question = document.querySelector(".questionPanel");
const multipleChoiseQuestion = document.querySelector(".multipleChoise");
const booleanQuestion = document.querySelector(".boolean");
const answerBtns = document.querySelectorAll(".btn");

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
  const shuffledAnswersArray = allAnswers.sort(() => Math.random() - 0.5);
  console.log(shuffledAnswersArray);
  let i = 0;
  answerBtns.forEach((btn) => {
    // console.log(btn.closest(".answ"));
    const ans = btn.closest(".answ");
    // console.log(ans);
    if (!ans.classList.contains("hidden")) {
      console.log(ans);
      btn.textContent = shuffledAnswersArray[i];
      i++;
    }
  });
};

//change the answer buttons according to to the type of question - boolean or multiple choise
//add functionality
