"use strict";

import * as configurator from "./configurator.js";
import { fetchData } from "./dataManager.js";
import {
  playPauseBtnFunctionality,
  songTimeStampsChanger,
} from "./controlPanel.js";

fetchData();

configurator.pausePlaySongBtn.addEventListener("click", function () {
  playPauseBtnFunctionality(this);
});

configurator.songDurationBar.addEventListener("input", function () {
  songTimeStampsChanger();
});
