"use strict";
const allSpots = document.querySelectorAll(".redGrid");
const playerSign = document.querySelector(".player");
let player = 0;

allSpots.forEach((cell) =>
  cell.addEventListener("click", function () {
    if (!cell.classList.contains("occupied")) {
      console.log(cell);
      insertStone(cell);
      checkPlayer(cell);
    }
  })
);

const checkPlayer = function (holder) {
  const stone = holder.querySelector(".stone");
  let color;
  player == 0 ? (color = "white") : (color = "black");
  player == 0 ? (player = 1) : (player = 0);
  stone.style.backgroundColor = color;
  playerSign.textContent = `Player's turn: ${player}`;
};

const insertStone = function (holder) {
  const html = `<div class="stoneHolder">
  <div class="stone"></div>
</div>`;
  holder.insertAdjacentHTML("afterbegin", html);
  holder.classList.add("occupied");
};

const checkNeighbours = function () {};
