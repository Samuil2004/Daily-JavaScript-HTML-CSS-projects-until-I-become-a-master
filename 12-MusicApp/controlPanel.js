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

export function changeTabs(panel1ToToggle, panel2ToToggle) {
  panel1ToToggle.classList.toggle("hidden");
  panel2ToToggle.classList.toggle("hidden");
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

        const songID = panel.querySelector(".id").textContent;
        console.log(songID);
        console.log(name);
        console.log(currentAlbum);
        // if (!configurator.albumTab.classList.contains("hidden")) {
        //   findAlbumSong(songID);
        // } else if (!configurator.searchTab.classList.contains("hidden")) {
        //   findSongSeachPanel(songID);
        // }
        const data = await openSong(songID);
        createSong(data);
        !configurator.albumTab.classList.contains("hidden")
          ? changeTabs(configurator.albumTab, configurator.songTab)
          : changeTabs(configurator.searchTab, configurator.songTab);

        // ) {
        //   findAlbumSong(songID);
        // } else if (!configurator.searchTab.classList.contains("hidden")) {
        //   findSongSeachPanel(songID);
        // }
        // changeTabs(configurator.albumTab, configurator.songTab);
        // const selectedSong = currentAlbum.songs.find(
        //   (song) => song.title === name
        // );
        // console.log(selectedSong);
        // const data = await openSong(selectedSong.id);
        // console.log(data);
        // createSong(data);
        // SongToAlbumAndAlbumToSong();
        // console.log(selectedSong);
      });
    }
  });
}

const findAlbumSong = async function (id) {
  //const selectedSong = currentAlbum.songs.find((song) => song.title === name);
  //console.log(selectedSong);
  const data = await openSong(id);
  //console.log(data);
  createSong(data);
  changeTabs(configurator.albumTab, configurator.songTab);
  //console.log(selectedSong);
};

const findSongSeachPanel = async function (id) {
  const data = await openSong(id);
  createSong(data);
  // const artists = data.contributors.map((artist) => artist.name).join(",");
  // console.log(artists);
  //console.log(data);
  changeTabs(configurator.searchTab, configurator.songTab);

  // const allSongs = document.querySelectorAll(".songPanel");
  // const selectedSong = allSongs.find(
  //   (panel) => panel.querySelector(".id").textContent === id
  // );
  // console.log(selectedSong);
  //store all search result songs in an array
  //find the id of the object of which the name from the function above equals song of the array
};
