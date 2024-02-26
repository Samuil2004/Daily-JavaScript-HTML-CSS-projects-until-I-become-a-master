import * as configurator from "./configurator.js";

export function playPauseBtnFunctionality(e) {
  console.log(e);
  configurator.pausePlaySongBtn.src === "./images/pauseSongBtnImg.png"
    ? (configurator.pausePlaySongBtn.src = "./images/playSongBtnImg.png")
    : (configurator.pausePlaySongBtn.src = "./images/pauseSongBtnImg.png");
}
