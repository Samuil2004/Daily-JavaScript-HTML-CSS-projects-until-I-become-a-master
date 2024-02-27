import * as configurator from "./configurator.js";
// let isSongPaused = false;
export function playPauseBtnFunctionality(e) {
  console.log(configurator.pausePlaySongBtn.src);
  configurator.pausePlaySongBtn.src === "./images/pauseSongBtnImg.png"
    ? (configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png")
    : (configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png");
}
