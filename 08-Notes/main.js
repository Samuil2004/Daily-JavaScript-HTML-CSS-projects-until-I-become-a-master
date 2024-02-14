"use strict";

// const btnNewNote = document.querySelector(".BtnNewLetter");
const countOfNotes = document.querySelector(".countOfNotes");
const navBtns = document.querySelectorAll(".btn");
const frontPage = document.querySelector(".frontPage");
const pages = document.querySelectorAll(".page");
const allNotesPanel = document.querySelector(".allNotesPanel");
const noteTitle = document.querySelector(".headingOfNote");
const contentOfNote = document.querySelector(".contentOfNote");
const btnNewNote = document.querySelector(".BtnNewLetter");

navBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    pages.forEach((page) => page.classList.toggle("hidden"));
    addNote();
  })
);
btnNewNote.addEventListener("click", function (e) {
  e.preventDefault();
  pages.forEach((page) => page.classList.toggle("hidden"));
  noteTitle.value = "";
  contentOfNote.value = "";
});

let allNotes = [];
class Note {
  constructor(title) {
    this.title = title;
  }
  _addContent(content) {
    this.content = content;
  }
}
const addNote = function () {
  const newNote = new Note(noteTitle.value);
  if (contentOfNote.value !== "") {
    newNote._addContent(contentOfNote.value);
  }
  addNoteToFrontPage(newNote);
  allNotes.push(newNote);
  storeNotes();
};

const addNoteToFrontPage = function (note) {
  const html = `<div class="allNotesPanel">
  <div class="note">
    <p class="title">${note.title}</p>
    <p class="description">${note.content ? note.content : null}</p>
  </div>`;
  allNotesPanel.insertAdjacentHTML("beforeend", html);
};

const extractNotes = function () {
  const storage = localStorage.getItem("notes");
  if (storage) {
    allNotes = JSON.parse(storage);
    allNotes.forEach((note) => addNoteToFrontPage(note));
  }
};
extractNotes();

const storeNotes = function () {
  localStorage.setItem("notes", JSON.stringify(allNotes));
};

console.log(`ff`);
