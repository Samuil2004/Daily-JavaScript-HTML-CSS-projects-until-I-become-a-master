"use-strict";

const questionType = document.querySelector(".questionType");
const difficulty = document.querySelector(".difficulty");

let data = [];
let questionNum = 0;
const fetchQuestions = async function () {
  try {
    const fetchedData = await fetch(
      "https://opentdb.com/api.php?amount=10"
    ).then((res) => res.json());
    data = await fetchedData.results;
    console.log(data);
    printQuestion();
  } catch (err) {
    alert(err.message);
  }
};

fetchQuestions();

const printQuestion = async function () {
  questionType.textContent = data[questionNum].category;
  difficulty.textContent = data[questionNum].difficulty;
};
