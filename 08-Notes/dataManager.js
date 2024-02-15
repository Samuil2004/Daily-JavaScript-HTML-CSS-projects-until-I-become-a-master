import * as configurator from "./configurator.js";
import { Note } from "./objectHolder.js";
let isNoteOpened = true;
let allNotes = [];
let currentNote;

export function addNote() {
  const newNote = new Note(configurator.noteTitle.value);
  if (configurator.noteTitle.value !== "") {
    if (configurator.contentOfNote.value !== "") {
      newNote._addContent(configurator.contentOfNote.value);
    }
    addNoteToFrontPage(newNote);
    allNotes.push(newNote);
    storeNotes();
  }
}

export function addNoteToFrontPage(note) {
  const html = `
  <div class="note">
    <p class="title">${note.title}</p>
    <p class="description">${note.content ? note.heading : null}</p>
  </div>`;
  configurator.allNotesPanel.insertAdjacentHTML("beforeend", html);
}

export function addFunctionalityToNotes() {
  const notes = document.querySelectorAll(".note");
  notes.forEach((note) => {
    note.addEventListener("click", function (e) {
      e.preventDefault();
      openNote(note);
    });
  });
}

export function updateCounter() {
  configurator.countOfNotes.textContent = `Notes: ${allNotes.length}`;
}

//dm
export function extractNotes() {
  configurator.allNotesPanel.innerHTML = "";
  const storage = localStorage.getItem("notes");
  if (storage) {
    allNotes = JSON.parse(storage);
    allNotes.forEach((note) => addNoteToFrontPage(note));
    addFunctionalityToNotes();
  }
  updateCounter();
}

export function storeNotes() {
  localStorage.setItem("notes", JSON.stringify(allNotes));
}

export function openNote(note) {
  const title = note.querySelector(".title").textContent;
  configurator.noteTitle.value = title;
  const description = note.querySelector(".description").textContent;
  const selectedNote = allNotes.find((lookForNote) => {
    if (lookForNote.heading) {
      return lookForNote.title === title && lookForNote.heading == description;
    } else {
      return lookForNote.title === title;
    }
  });
  if (description !== "null") configurator.contentOfNote.value = description;
  configurator.pages.forEach((page) => page.classList.toggle("hidden"));
  isNoteOpened = false;
  currentNote = selectedNote;
  configurator.noteTitle.value = selectedNote.title;
  configurator.contentOfNote.value = selectedNote.content;
}

export function updateNote(selectedNote) {
  selectedNote.title = configurator.noteTitle.value;
  selectedNote.content = configurator.contentOfNote.value;
  storeNotes();
}

export function searchNotes() {
  const input = configurator.searchBar.value.toLowerCase();
  const notes = document.querySelectorAll(".note");

  notes.forEach((note) => {
    const title = note.querySelector(".title").textContent.toLowerCase();
    if (title.startsWith(input)) {
      note.classList.remove("hidden");
    } else {
      note.classList.add("hidden");
    }
  });
}
export function deleteNote() {
  const newArr = allNotes.filter((item) => item !== currentNote);
  allNotes = newArr;
  console.log(allNotes);
  storeNotes();
  configurator.pages.forEach((page) => page.classList.toggle("hidden"));
  extractNotes();
}

export function setIsNoteOpenedToTrue() {
  isNoteOpened = true;
}

export function statusOfNoteOpened() {
  return isNoteOpened;
}

export function getCurrentNote() {
  return currentNote;
}
