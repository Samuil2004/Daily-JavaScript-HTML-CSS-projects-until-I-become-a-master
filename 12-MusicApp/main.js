"use strict";

import * as configurator from "./configurator.js";
import { fetchData } from "./dataManager.js";
import { playPauseBtnFunctionality, formatTime } from "./controlPanel.js";
fetchData();
configurator.pausePlaySongBtn.addEventListener("click", function () {
  playPauseBtnFunctionality(this);
});
configurator.songDurationBar.addEventListener("input", function () {
  configurator.timePassed.textContent = formatTime(
    configurator.songDurationBar.value
  );
  // console.log(configurator.songDurationBar.value);
});
//add a timer each second to decrease the itme left of the song unless the song is paused
//add volume bar
//add song progress bar
