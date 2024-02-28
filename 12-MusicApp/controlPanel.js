import * as configurator from "./configurator.js";
import { stopTimer, startTimer, loadNextOrPrevSong } from "./dataManager.js";
export function playPauseBtnFunctionality(e) {
  // console.log(configurator.pausePlaySongBtn.src);
  if (configurator.pausePlaySongBtn.src.includes("pause")) {
    configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png";
    stopTimer();
  } else {
    configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png";
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
