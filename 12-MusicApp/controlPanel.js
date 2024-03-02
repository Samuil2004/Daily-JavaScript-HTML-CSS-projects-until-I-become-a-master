import * as configurator from "./configurator.js";
import {
  stopTimer,
  startTimer,
  loadNextOrPrevSong,
  openSong,
  createSong,
} from "./dataManager.js";
import { currentAlbum } from "./dataManager.js";
export function playPauseBtnFunctionality() {
  if (configurator.pausePlaySongBtn.src.includes("pause")) {
    configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png";
    configurator.currentSongPlayPauseBtnAlbumPage.src =
      "./images/playSongBtnImg.png";
    stopTimer();
  } else {
    configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png";
    configurator.currentSongPlayPauseBtnAlbumPage.src =
      "./images/pauseSongBtnImg.png";
    startTimer();
  }
}

export function songTimeStampsChanger() {
  configurator.timePassed.textContent = formatTime(
    configurator.songDurationBar.value
  );
}

export function formatTime(time) {
  return `${Math.floor(time / 60)}:${
    time % 60 > 9 ? time % 60 : "0" + (time % 60)
  }`;
}

export function moveSongProgressBar() {
  if (
    configurator.timePassed.textContent == configurator.songTimeLeft.textContent
  ) {
    loadNextOrPrevSong(true);
  } else {
    configurator.songDurationBar.value++;
    console.log(configurator.songDurationBar.value);
    songTimeStampsChanger();
  }
}

export function SongToAlbumAndAlbumToSong() {
  configurator.songTab.classList.toggle("hidden");
  configurator.albumTab.classList.toggle("hidden");
}

export function attachListenersToSongs() {
  const songPanelFromAlbum = document.querySelectorAll(".songPanel");
  console.log(songPanelFromAlbum);
  songPanelFromAlbum.forEach((panel) => {
    if (!panel.classList.contains("hasEventListener")) {
      panel.classList.add("hasEventListener");
      panel.addEventListener("click", async function () {
        //console.log(`clckckc`);

        const name = panel.querySelector(".songName").textContent;
        console.log(name);
        console.log(currentAlbum);
        const selectedSong = currentAlbum.songs.find(
          (song) => song.title === name
        );
        console.log(selectedSong);
        const data = await openSong(selectedSong.id);
        console.log(data);
        createSong(data);
        SongToAlbumAndAlbumToSong();
        console.log(selectedSong);
      });
    }
  });
}
