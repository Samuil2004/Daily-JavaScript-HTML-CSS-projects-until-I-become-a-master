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
  SongToAlbumAndAlbumToSong,
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
  SongToAlbumAndAlbumToSong();
  await loadAlbum();
  attachListenersToSongs();
});

configurator.leftSideOfTheCurrentlyPlayingSong.addEventListener(
  "click",
  function () {
    SongToAlbumAndAlbumToSong();
  }
);

configurator.searchButtonSearchPage.addEventListener(
  "click",
  async function () {
    clearSongsFromOldAlbum();
    await fetchSearchedData();
    attachListenersToSongs();
  }
);
