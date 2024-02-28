import * as configurator from "./configurator.js";
// let isSongPaused = false;
export function playPauseBtnFunctionality(e) {
  console.log(configurator.pausePlaySongBtn.src);
  if (configurator.pausePlaySongBtn.src.includes("pause")) {
    configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png";
  } else {
    configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png";
  }
  console.log(configurator.pausePlaySongBtn.src);
  // configurator.pausePlaySongBtn.src === "./images/pauseSongBtnImg.png"
  //   ? (configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png")
  //   : (configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png");
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
