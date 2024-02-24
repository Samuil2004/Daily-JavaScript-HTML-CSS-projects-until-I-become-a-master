"use strict";
const allSpots = document.querySelectorAll(".redGrid");

let player = 0;

allSpots.forEach((cell) =>
  cell.addEventListener("click", function () {
    if (!cell.classList.contains("occupied")) {
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
};

const insertStone = function (holder) {
  const html = `<div class="stoneHolder">
  <div class="stone"></div>
</div>`;
  holder.insertAdjacentHTML("afterbegin", html);
  holder.classList.add("occupied");
};
