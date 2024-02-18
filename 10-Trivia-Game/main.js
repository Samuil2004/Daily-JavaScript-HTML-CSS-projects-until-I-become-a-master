"use-strict";

let data = [];
const fetchQuestions = async function () {
  const fetchedData = await fetch("https://opentdb.com/api.php?amount=10").then(
    (res) => res.json()
  );
  data = fetchedData.results;
  console.log(data);
};

fetchQuestions();
