("use strict");

import * as configurator from "./configurator.js";
import {
  addNote,
  extractNotes,
  updateNote,
  searchNotes,
  setIsNoteOpenedToTrue,
  statusOfNoteOpened,
  getCurrentNote,
  deleteNote,
  checkTitle,
} from "./dataManager.js";

configurator.navBtnsNotesPage.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!checkTitle(configurator.noteTitle.value)) {
      configurator.pages.forEach((page) => page.classList.toggle("hidden"));
      if (statusOfNoteOpened()) {
        addNote();
      } else {
        updateNote(getCurrentNote());
      }
      extractNotes();
      setIsNoteOpenedToTrue();
      configurator.searchBar.value = "";
    } else {
      alert("Note with such title already exists");
    }
  })
);

configurator.btnNewNote.addEventListener("click", function (e) {
  e.preventDefault();
  configurator.pages.forEach((page) => page.classList.toggle("hidden"));
  configurator.noteTitle.value = "";
  configurator.contentOfNote.value = "";
});
extractNotes();

configurator.searchBar.addEventListener("input", searchNotes);

configurator.btnDeleteNote.addEventListener("click", deleteNote);
