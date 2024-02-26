"use strict";

import * as configurator from "./configurator.js";
import { fetchData } from "./dataManager.js";
import { playPauseBtnFunctionality } from "./controlPanel.js";
fetchData();
configurator.pausePlaySongBtn.addEventListener("click", function () {
  playPauseBtnFunctionality(this);
});
//add duration of song bar
//how much time has passed since beginning and the total duration
