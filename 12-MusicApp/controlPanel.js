import * as configurator from "./configurator.js";
// let isSongPaused = false;
export function playPauseBtnFunctionality(e) {
  console.log(e);
  // if (isSongPaused) {
  //   configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png";
  // } else {
  //   configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png";
  //   isSongPaused = true;
  // }
  console.log(configurator.pausePlaySongBtn.src);
  configurator.pausePlaySongBtn.src === "./images/pauseSongBtnImg.png"
    ? (configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png")
    : (configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png");
}
