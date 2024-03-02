"use strict";

import * as configurator from "./configurator.js";
import { fetchData, loadNextOrPrevSong, loadAlbum } from "./dataManager.js";
import {
  playPauseBtnFunctionality,
  songTimeStampsChanger,
  SongToAlbumAndAlbumToSong,
} from "./controlPanel.js";

fetchData();

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

configurator.btnGoToAlbum.addEventListener("click", function () {
  SongToAlbumAndAlbumToSong();
  loadAlbum();
});

configurator.leftSideOfTheCurrentlyPlayingSong.addEventListener(
  "click",
  function () {
    SongToAlbumAndAlbumToSong();
  }
);
