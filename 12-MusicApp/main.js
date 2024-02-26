"use strict";

import * as configurator from "./configurator.js";
import { fetchData } from "./dataManager.js";
import { playPauseBtnFunctionality } from "./controlPanel.js";
fetchData();
configurator.pausePlaySongBtn.addEventListener("click", function () {
  playPauseBtnFunctionality(this);
});
//add a timer each second to decrease the itme left of the song unless the song is paused
//add volume bar
//add song progress bar
