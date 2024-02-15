"use strict";

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
    if (isNoteOpened) {
      addNote();
    } else {
      updateNote(currentNote);
    }
    extractNotes();
    isNoteOpened = true;
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
    const heading = content.split(" ").slice(0, 8).join(" ");
    this.heading = heading;
  }
  _updateTitle(newTitle) {
    this.title = newTitle;
  }
}
const addNote = function (note = undefined) {
  const newNote = new Note(noteTitle.value);
  if (noteTitle.value !== "") {
    if (contentOfNote.value !== "") {
      newNote._addContent(contentOfNote.value);
    }
    addNoteToFrontPage(newNote);
    allNotes.push(newNote);
    storeNotes();
  }
};
const attachEventListener = function (note) {
  note.addEventListener("click", function (e) {
    e.preventDefault();
    openNote(note);
  });
};

const addNoteToFrontPage = function (note) {
  const html = `
  <div class="note">
    <p class="title">${note.title}</p>
    <p class="description">${note.content ? note.heading : null}</p>
  </div>`;
  allNotesPanel.insertAdjacentHTML("beforeend", html);
};

const addFunctionalityToNotes = function () {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    note.addEventListener("click", function (e) {
      e.preventDefault();
      openNote(note);
    });
  });
};

const updateCounter = function () {
  countOfNotes.textContent = `Notes: ${allNotes.length}`;
};

const extractNotes = function () {
  allNotesPanel.innerHTML = "";
  const storage = localStorage.getItem("notes");
  if (storage) {
    allNotes = JSON.parse(storage);
    allNotes.forEach((note) => addNoteToFrontPage(note));
    addFunctionalityToNotes();
  }
  updateCounter();
};
extractNotes();

const storeNotes = function () {
  localStorage.setItem("notes", JSON.stringify(allNotes));
};

const openNote = function (note) {
  const title = note.querySelector(".title").textContent;
  noteTitle.value = title;
  const description = note.querySelector(".description").textContent;
  const selectedNote = allNotes.find(
    (lookForNote) =>
      lookForNote.title === title && lookForNote.heading == description
  );
  if (description !== "null") contentOfNote.value = description;
  pages.forEach((page) => page.classList.toggle("hidden"));
  isNoteOpened = false;
  currentNote = selectedNote;
  noteTitle.value = selectedNote.title;
  contentOfNote.value = selectedNote.content;
};

const updateNote = function (selectedNote) {
  selectedNote.title = noteTitle.value;
  selectedNote.content = contentOfNote.value;
  storeNotes();
};

//edit of notes
//search bar
//attach event listener to the div, not the the object
