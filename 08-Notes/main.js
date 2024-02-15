("use strict");

import * as configurator from "./configurator.js";
import {
  addNote,
  addNoteToFrontPage,
  addFunctionalityToNotes,
  updateCounter,
  extractNotes,
  storeNotes,
  openNote,
  updateNote,
  searchNotes,
  setIsNoteOpenedToTrue,
  statusOfNoteOpened,
  getCurrentNote,
} from "./dataManager.js";
// export let isNoteOpened = true;
// let currentNote;
// configurator.isNoteOpened = true;
// let allNotes = [];

// console.log(configurator.navBtnsNotesPage);
// configurator.allNotes.push(1);
// console.log(configurator.allNotes);
//config
// const countOfNotes = document.querySelector(".countOfNotes");
// const navBtnsNotesPage = document.querySelectorAll(".btn");
// const frontPage = document.querySelector(".frontPage");
// const pages = document.querySelectorAll(".page");
// const allNotesPanel = document.querySelector(".allNotesPanel");
// const noteTitle = document.querySelector(".headingOfNote");
// const contentOfNote = document.querySelector(".contentOfNote");
// const btnNewNote = document.querySelector(".BtnNewLetter");
// const searchBar = document.querySelector(".searchBar");
// let isNoteOpened = true;
// let currentNote;
// let allNotes = [];

//config
//control center
//data manager
//object holder
//cc

//cc
configurator.navBtnsNotesPage.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    configurator.pages.forEach((page) => page.classList.toggle("hidden"));
    if (statusOfNoteOpened()) {
      addNote();
    } else {
      updateNote(getCurrentNote());
    }
    extractNotes();
    setIsNoteOpenedToTrue();
    // configurator.isNoteOpened = true;
    configurator.searchBar.value = "";
  })
);

//cc
configurator.btnNewNote.addEventListener("click", function (e) {
  e.preventDefault();
  configurator.pages.forEach((page) => page.classList.toggle("hidden"));
  configurator.noteTitle.value = "";
  configurator.contentOfNote.value = "";
});
extractNotes();
//oh
// class Note {
//   constructor(title) {
//     this.title = title;
//   }
//   _addContent(content) {
//     this.content = content;
//     const heading = content.split(" ").slice(0, 8).join(" ");
//     this.heading = heading;
//   }
//   _updateTitle(newTitle) {
//     this.title = newTitle;
//   }
// }

// //dm
// const addNote = function () {
//   const newNote = new Note(configurator.noteTitle.value);
//   if (configurator.noteTitle.value !== "") {
//     if (configurator.contentOfNote.value !== "") {
//       newNote._addContent(configurator.contentOfNote.value);
//     }
//     addNoteToFrontPage(newNote);
//     allNotes.push(newNote);
//     storeNotes();
//   }
// };

// //dm
// const addNoteToFrontPage = function (note) {
//   const html = `
//   <div class="note">
//     <p class="title">${note.title}</p>
//     <p class="description">${note.content ? note.heading : null}</p>
//   </div>`;
//   configurator.allNotesPanel.insertAdjacentHTML("beforeend", html);
// };

// //dm
// const addFunctionalityToNotes = function () {
//   const notes = document.querySelectorAll(".note");
//   notes.forEach((note) => {
//     note.addEventListener("click", function (e) {
//       e.preventDefault();
//       openNote(note);
//     });
//   });
// };

// //dm
// const updateCounter = function () {
//   configurator.countOfNotes.textContent = `Notes: ${allNotes.length}`;
// };

// //dm
// const extractNotes = function () {
//   configurator.allNotesPanel.innerHTML = "";
//   const storage = localStorage.getItem("notes");
//   if (storage) {
//     // allNotes.push(JSON.parse(storage));

//     allNotes = JSON.parse(storage);
//     allNotes.forEach((note) => addNoteToFrontPage(note));
//     addFunctionalityToNotes();
//   }
//   updateCounter();
// };

//cc
// extractNotes();

// //dm
// const storeNotes = function () {
//   localStorage.setItem("notes", JSON.stringify(allNotes));
// };

// //dm
// const openNote = function (note) {
//   const title = note.querySelector(".title").textContent;
//   configurator.noteTitle.value = title;
//   const description = note.querySelector(".description").textContent;
//   const selectedNote = allNotes.find((lookForNote) => {
//     if (lookForNote.heading) {
//       return lookForNote.title === title && lookForNote.heading == description;
//     } else {
//       return lookForNote.title === title;
//     }
//   });
//   if (description !== "null") configurator.contentOfNote.value = description;
//   configurator.pages.forEach((page) => page.classList.toggle("hidden"));
//   isNoteOpened = false;
//   currentNote = selectedNote;
//   configurator.noteTitle.value = selectedNote.title;
//   configurator.contentOfNote.value = selectedNote.content;
// };

// //dm
// const updateNote = function (selectedNote) {
//   selectedNote.title = configurator.noteTitle.value;
//   selectedNote.content = configurator.contentOfNote.value;
//   storeNotes();
// };

//cc
configurator.searchBar.addEventListener("input", searchNotes);

//cc
// configurator.searchBar.addEventListener("blur", function () {
//   if (configurator.searchBar.value === "") {
//     const notes = document.querySelectorAll(".note");
//     notes.forEach((note) => note.classList.remove("hidden"));
//   }
// });

// //dm
// function searchNotes() {
//   const input = configurator.searchBar.value.toLowerCase();
//   const notes = document.querySelectorAll(".note");

//   notes.forEach((note) => {
//     const title = note.querySelector(".title").textContent.toLowerCase();
//     if (title.startsWith(input)) {
//       note.classList.remove("hidden");
//     } else {
//       note.classList.add("hidden");
//     }
//   });
// }
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// //config
// const countOfNotes = document.querySelector(".countOfNotes");
// const navBtnsNotesPage = document.querySelectorAll(".btn");
// const frontPage = document.querySelector(".frontPage");
// const pages = document.querySelectorAll(".page");
// const allNotesPanel = document.querySelector(".allNotesPanel");
// const noteTitle = document.querySelector(".headingOfNote");
// const contentOfNote = document.querySelector(".contentOfNote");
// const btnNewNote = document.querySelector(".BtnNewLetter");
// const searchBar = document.querySelector(".searchBar");
// let isNoteOpened = true;
// let currentNote;
// let allNotes = [];

// //config
// //control center
// //data manager
// //object holder
// //cc

// navBtnsNotesPage.forEach((btn) =>
//   btn.addEventListener("click", function (e) {
//     e.preventDefault();
//     pages.forEach((page) => page.classList.toggle("hidden"));
//     if (isNoteOpened) {
//       addNote();
//     } else {
//       updateNote(currentNote);
//     }
//     extractNotes();
//     isNoteOpened = true;
//     searchBar.value = "";
//   })
// );
// //cc
// btnNewNote.addEventListener("click", function (e) {
//   e.preventDefault();
//   pages.forEach((page) => page.classList.toggle("hidden"));
//   noteTitle.value = "";
//   contentOfNote.value = "";
// });

// //oh
// class Note {
//   constructor(title) {
//     this.title = title;
//   }
//   _addContent(content) {
//     this.content = content;
//     const heading = content.split(" ").slice(0, 8).join(" ");
//     this.heading = heading;
//   }
//   _updateTitle(newTitle) {
//     this.title = newTitle;
//   }
// }

// //dm
// const addNote = function () {
//   const newNote = new Note(noteTitle.value);
//   if (noteTitle.value !== "") {
//     if (contentOfNote.value !== "") {
//       newNote._addContent(contentOfNote.value);
//     }
//     addNoteToFrontPage(newNote);
//     allNotes.push(newNote);
//     storeNotes();
//   }
// };

// //dm
// const addNoteToFrontPage = function (note) {
//   const html = `
//   <div class="note">
//     <p class="title">${note.title}</p>
//     <p class="description">${note.content ? note.heading : null}</p>
//   </div>`;
//   allNotesPanel.insertAdjacentHTML("beforeend", html);
// };

// //dm
// const addFunctionalityToNotes = function () {
//   const notes = document.querySelectorAll(".note");
//   notes.forEach((note) => {
//     note.addEventListener("click", function (e) {
//       e.preventDefault();
//       openNote(note);
//     });
//   });
// };

// //dm
// const updateCounter = function () {
//   countOfNotes.textContent = `Notes: ${allNotes.length}`;
// };

// //dm
// const extractNotes = function () {
//   allNotesPanel.innerHTML = "";
//   const storage = localStorage.getItem("notes");
//   if (storage) {
//     allNotes = JSON.parse(storage);
//     allNotes.forEach((note) => addNoteToFrontPage(note));
//     addFunctionalityToNotes();
//   }
//   updateCounter();
// };

// //cc
// extractNotes();

// //dm
// const storeNotes = function () {
//   localStorage.setItem("notes", JSON.stringify(allNotes));
// };

// //dm
// const openNote = function (note) {
//   const title = note.querySelector(".title").textContent;
//   noteTitle.value = title;
//   const description = note.querySelector(".description").textContent;
//   const selectedNote = allNotes.find((lookForNote) => {
//     if (lookForNote.heading) {
//       return lookForNote.title === title && lookForNote.heading == description;
//     } else {
//       return lookForNote.title === title;
//     }
//   });
//   if (description !== "null") contentOfNote.value = description;
//   pages.forEach((page) => page.classList.toggle("hidden"));
//   isNoteOpened = false;
//   currentNote = selectedNote;
//   noteTitle.value = selectedNote.title;
//   contentOfNote.value = selectedNote.content;
// };

// //dm
// const updateNote = function (selectedNote) {
//   selectedNote.title = noteTitle.value;
//   selectedNote.content = contentOfNote.value;
//   storeNotes();
// };

// //cc
// searchBar.addEventListener("input", searchNotes);

// //cc
// // searchBar.addEventListener("blur", function () {
// //   if (searchBar.value === "") {
// //     const notes = document.querySelectorAll(".note");
// //     notes.forEach((note) => note.classList.remove("hidden"));
// //   }
// // });

// //dm
// function searchNotes() {
//   const input = searchBar.value.toLowerCase();
//   const notes = document.querySelectorAll(".note");

//   notes.forEach((note) => {
//     const title = note.querySelector(".title").textContent.toLowerCase();
//     if (title.startsWith(input)) {
//       note.classList.remove("hidden");
//     } else {
//       note.classList.add("hidden");
//     }
//   });
// }
