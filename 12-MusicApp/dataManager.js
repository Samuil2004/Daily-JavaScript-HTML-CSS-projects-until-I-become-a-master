import * as configurator from "./configurator.js";
import { Song, Album } from "./classHolder.js";
import { formatTime, moveSongProgressBar } from "./controlPanel.js";
//import { attachListenersToSongs } from "./main.js";
let number = 0;
let timeIterval;
let currentlyPlayingSong;
export let currentAlbum;
// export async function fetchData() {
//   try {
//     const fetchData = await fetch(configurator.url, configurator.options).then(
//       (res) => res.json()
//     );
//     storeInfo(fetchData);
//     // loadAlbum();
//     // testLoadAlbum();
//     // .then((rest) => createObject(rest));
//     // .then((rest) => console.log(rest));
//   } catch (error) {
//     console.error(error);
//   }
// }
// const storeInfo = function (storedData) {
//   configurator.data.push(storedData);
//   createSong(configurator.data[0].data[number]);
// };

export function createSong(storedData) {
  const newSong = new Song(
    storedData.title,
    storedData.duration,
    storedData.album.cover_xl,
    storedData.id
  );
  storedData.contributors.forEach((artist) => newSong.artist.push(artist.name));
  fillInfoForSongSongPage(newSong);

  //console.log(newSong.artist);

  //console.log();
  //console.log(newSong);
  //fillInInfo(newSong);
  currentlyPlayingSong = newSong;
}

const fillInInfo = function (song) {
  configurator.songDurationBar.value = 0;
  configurator.timePassed.textContent = "0:00";
  configurator.img.src = song.image;
  checkTitle(configurator.songTitle, song.title);
  configurator.songTitle.textContent = song.title;

  configurator.songArtist.textContent = song.artist;
  configurator.songTimeLeft.textContent = formatTime(song.duration);
  configurator.songDurationBar.max = song.duration;
};

export function loadNextOrPrevSong(nextSong) {
  if (nextSong) {
    if (number < configurator.data[0].data.length - 1) {
      number++;
    }
  } else {
    if (number > 0) {
      {
        number--;
      }
    }
  }
  createSong(configurator.data[0].data[number]);
}

export function startTimer() {
  timeIterval = setInterval(moveSongProgressBar, 1000);
}

export function stopTimer() {
  clearInterval(timeIterval);
}

const createAlbum = function (album) {
  const newAlbum = new Album(
    album.title,
    album.artist.name,
    formatTime(album.duration),
    album.cover_xl
  );
  const allSongs = album.tracks.data;
  allSongs.forEach((song) => {
    newAlbum.addSongs(song);
  });

  printAlbum(newAlbum);
  console.log(newAlbum.songs);
  const allAlbumSongs = newAlbum.songs;
  clearSongsFromOldAlbum();
  allAlbumSongs.forEach((song) => addSongToDOM(configurator.albumSongs, song));
  currentSongInfoAlbumPage();
  currentAlbum = newAlbum;
  //attachListenersToSongs();
};
export function clearSongsFromOldAlbum() {
  const songPanelFromAlbum = document.querySelectorAll(".songPanel");
  songPanelFromAlbum.forEach((panel) => panel.remove());
}

const printAlbum = function (album) {
  configurator.albumImage.src = album.image;
  configurator.albumTitle.textContent = album.title;
  checkTitle(configurator.albumTitle, album.title);
  configurator.albumArtist.textContent = album.artist;
};
export async function loadAlbum() {
  console.log(currentlyPlayingSong);
  const songData = await openSong(currentlyPlayingSong.id);
  //const ne = songData.json();
  console.log(songData);
  await fetch(
    `${configurator.urlForAlbum}${songData.album.id}`,
    configurator.options
  )
    .then((res) => res.json())
    .then((res) => createAlbum(res));
  // .then((res) => console.log(res));
}

// const addSongsToDOM = function (song) {
//   //console.log(song);
//   const html = `<div class="songPanel">
//   <div class="leftSide">
//     <img src="${song.image}"  class="songImg" />
//     <h2 class="songName">${song.title}</h2>
//   </div>
//   <div class="rightSide">
//     <img
//       class="albumSongsPlayBtn"
//       src="./images/playSongBtnImg.png"
//     />
//   </div>
// </div>`;
//   configurator.albumSongs.insertAdjacentHTML("beforeend", html);
// };

// const checkAlbumTitle = function (title) {
//   if (title.length > 20) {
//     configurator.albumTitle.style.animation = "scroll-left 12s linear infinite";
//   } else {
//     configurator.albumTitle.style.removeProperty("animation");
//   }
// };

const currentSongInfoAlbumPage = function () {
  configurator.currentSongAlbumPageImage.src = currentlyPlayingSong.image;
  checkTitle(
    configurator.currentSongAlbumPageTitle,
    currentlyPlayingSong.title
  );
  configurator.currentSongAlbumPageTitle.textContent =
    currentlyPlayingSong.title;
};

const checkTitle = function (className, title) {
  if (title.length > 20) {
    className.style.animation = "scroll-left 12s linear infinite";
  } else {
    className.style.removeProperty("animation");
  }
};

export async function openSong(songID) {
  const result = await fetch(
    `${configurator.urlForSong}${songID}`,
    configurator.options
  ).then((res) => res.json());
  console.log(result);
  return await result;
}

export async function fetchSearchedData() {
  const searchResults = await fetch(
    `${configurator.urlForSearch}${configurator.searchBoxInputSearchPage.value}`,
    configurator.options
  ).then((res) => res.json());
  console.log(searchResults);
  printSearchedData(searchResults);
  //.then((res) => console.log(res));
}
const printSearchedData = function (searchResults) {
  searchResults.data.forEach((song) => {
    addSongToDOM(configurator.resultBoxSearchPage, song);
  });
};

const addSongToDOM = function (placeToBeAdded, song) {
  const html = `
  <div class="songPanel">
    <div class="leftSide">
      <img  class="songImg" src="${song.album.cover_xl}" />
      <h2 class="id hidden">${song.id}</h2>
      <h2 class="songName">${song.title}</h2>
    </div>
    <div class="rightSide">
      <img
        class="albumSongsPlayBtn"
        src="./images/playSongBtnImg.png"
      />
    </div>
  </div>`;

  placeToBeAdded.insertAdjacentHTML("beforeend", html);
};

export function fillInfoForSongSongPage(song) {
  configurator.songDurationBar.value = 0;
  configurator.timePassed.textContent = "0:00";
  configurator.img.src = song.image;
  checkTitle(configurator.songTitle, song.title);
  configurator.songTitle.textContent = song.title;
  // const artists = song.contributors.map((artist) => artist.name).join(",");
  //console.log(artists);
  configurator.songArtist.textContent = song.artist.join(", ");
  configurator.songTimeLeft.textContent = formatTime(song.duration);
  configurator.songDurationBar.max = song.duration;
}

// export function createSong2(storedData) {
//   console.log(configurator.data[0]);
//   const newSong = new Song(
//     storedData.title,
//     storedData.artist.name,
//     storedData.duration,
//     storedData.album.cover_xl,
//     storedData.id
//   );
//   console.log(newSong);
//   fillInInfo(newSong);
//   currentlyPlayingSong = newSong;
// }
