"use strict";

import * as configurator from "./configurator.js";
import { fetchData, loadNextSong, loadPreviousSong } from "./dataManager.js";
import {
  playPauseBtnFunctionality,
  songTimeStampsChanger,
} from "./controlPanel.js";

fetchData();

configurator.pausePlaySongBtn.addEventListener("click", function () {
  console.log(`btn clicked`);
  playPauseBtnFunctionality(this);
});

configurator.songDurationBar.addEventListener("input", function () {
  songTimeStampsChanger();
});

configurator.nextSongBtn.addEventListener("click", function () {
  loadNextSong();
});
configurator.prevSongBtn.addEventListener("click", function () {
  loadPreviousSong();
});
