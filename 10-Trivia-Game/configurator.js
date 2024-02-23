export const questionType = document.querySelector(".questionType");
export const difficulty = document.querySelector(".difficulty");
export const question = document.querySelector(".questionPanel");
export const multipleChoiseQuestion = document.querySelector(".multipleChoise");
export const answerBtns = document.querySelectorAll(".btn");
export const messagePanel = document.querySelector(".messagePanel");
export const gamePanel = document.querySelector(".gamePanel");
export const score = document.querySelector(".score");
export const messageWinOtLose = document.querySelector(".message");
export const playAgainBtn = document.querySelector(".playAgain");
export const btnToHide = document.querySelectorAll(".bool");
export function correctString(text) {
  const replacements = {
    "&#039;": "'",
    "&quot;": '"',
    "&eacute;": "é",
    "&amp;": "&",
  };
  for (const entry in replacements) {
    if (text.includes(entry)) {
      text = text.replace(new RegExp(entry, "g"), replacements[entry]);
    }
  }
  return text;
}
