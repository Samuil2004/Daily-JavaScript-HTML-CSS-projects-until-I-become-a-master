"use strict";

const btnNewNote = document.querySelector(".BtnNewLetter");
const countOfNotes = document.querySelector(".countOfNotes");
const navBtns = document.querySelectorAll(".btn");
const frontPage = document.querySelector(".frontPage");
const pages = document.querySelectorAll(".page");

navBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    pages.forEach((page) => page.classList.toggle("hidden"));
  })
);
