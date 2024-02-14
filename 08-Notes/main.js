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
let isNoteOpened = true;
let currentNote;

navBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    pages.forEach((page) => page.classList.toggle("hidden"));
    addNote();
    addFunctionalityToNotes();
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
  _updateTitle(newTitle) {
    this.title = newTitle;
  }
}
const addNote = function (note = undefined) {
  if (isNoteOpened) {
    const newNote = new Note(noteTitle.value);
    if (noteTitle.value !== "") {
      if (contentOfNote.value !== "") {
        newNote._addContent(contentOfNote.value);
      }
      addNoteToFrontPage(newNote);
      allNotes.push(newNote);
      storeNotes();
    }
  } else {
    // currentNote._updateTitle(contentOfNote.value);
    // currentNote.title = noteTitle.value;
    // note._updateTitle(noteTitle.value);
  }
};

const addNoteToFrontPage = function (note) {
  const html = `
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
    // const notes = document.querySelectorAll(".note");
    // addFunctionalityToNotes(notes);
    // addFunctionalityToNotes();
  }
};
extractNotes();

const storeNotes = function () {
  localStorage.setItem("notes", JSON.stringify(allNotes));
};

const openNote = function (note) {
  noteTitle.value = note.querySelector(".title").textContent;
  let description = note.querySelector(".description").textContent;
  if (description !== "null") contentOfNote.value = description;
  pages.forEach((page) => page.classList.toggle("hidden"));
  isNoteOpened = false;
  addNote(note);
  // currentNote = note;
};
const notes = document.querySelectorAll(".note");
const addFunctionalityToNotes = function () {
  // const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    note.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(`1`);
      openNote(note);
    });
  });
};
addFunctionalityToNotes();
