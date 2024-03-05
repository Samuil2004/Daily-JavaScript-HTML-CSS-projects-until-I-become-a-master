"use strict";

import * as configurator from "./configurator.js";
import {
  loadNextOrPrevSong,
  loadAlbum,
  fetchSearchedData,
  clearSongsFromOldAlbum,
} from "./dataManager.js";
import {
  playPauseBtnFunctionality,
  songTimeStampsChanger,
  changeTabs,
  attachListenersToSongs,
} from "./controlPanel.js";

configurator.pausePlaySongBtn.addEventListener("click", function () {
  playPauseBtnFunctionality();
});
configurator.currentSongPlayPauseBtnAlbumPage.addEventListener(
  "click",
  function () {
    playPauseBtnFunctionality();
  }
);

configurator.songDurationBar.addEventListener("input", function () {
  songTimeStampsChanger();
});

configurator.nextSongBtn.addEventListener("click", function () {
  loadNextOrPrevSong(true);
});

configurator.prevSongBtn.addEventListener("click", function () {
  loadNextOrPrevSong(false);
});

configurator.btnGoToAlbum.addEventListener("click", async function () {
  changeTabs(configurator.songTab, configurator.albumTab);
  await loadAlbum();
  attachListenersToSongs();
});

configurator.leftSideOfTheCurrentlyPlayingSong.addEventListener(
  "click",
  function () {
    changeTabs(configurator.albumTab, configurator.songTab);
  }
);

console.log(`asdsa`);
configurator.searchButtonSearchPage.addEventListener(
  "click",
  async function () {
    clearSongsFromOldAlbum();
    await fetchSearchedData();
    attachListenersToSongs();
  }
);
configurator.searchBoxInputSearchPage.addEventListener(
  "keypress",
  async function (e) {
    if (e.key === "Enter") {
      clearSongsFromOldAlbum();
      await fetchSearchedData();
      attachListenersToSongs();
    }
  }
);

configurator.goBackButton.addEventListener("click", function () {
  if (!configurator.albumTab.classList.contains("hidden")) {
    changeTabs(configurator.albumTab, configurator.songTab);
    configurator.searchBoxInputSearchPage.value = "";
  } else if (!configurator.songTab.classList.contains("hidden")) {
    changeTabs(configurator.songTab, configurator.searchTab);
  }
});
