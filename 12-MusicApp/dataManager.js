import * as configurator from "./configurator.js";
import { Song, Album } from "./classHolder.js";
import { formatTime, moveSongProgressBar } from "./controlPanel.js";
let number = 0;
let timeIterval;
let currentlyPlayingSong;
export let currentAlbum;
let currentSearchResults;
let currentSongOpenedFromSearch;

export function changeSongSource(setToWhat) {
  currentSongOpenedFromSearch = setToWhat;
}

export function createSong(storedData) {
  console.log(storedData);
  const newSong = new Song(
    storedData.title,
    storedData.duration,
    storedData.album ? storedData.album.cover_xl : storedData.image,
    storedData.id
  );
  if (storedData.contributors) {
    storedData.contributors.forEach((artist) =>
      newSong.artist.push(artist.name)
    );
    fillInfoForSongSongPage(newSong);
  } else {
    console.log(storedData);
    newSong.artist.push(storedData.artist.name);
    fillInfoForSongSongPage(newSong);
  }

  currentlyPlayingSong = newSong;
}

export function loadNextOrPrevSong(nextSong) {
  if (!currentSongOpenedFromSearch) {
    const currentSong = currentAlbum.songs.find(
      (song) => song.title === currentlyPlayingSong.title
    );
    let index = currentAlbum.songs.indexOf(currentSong);
    if (nextSong) {
      if (index < currentAlbum.songs.length - 1) {
        index++;
      }
    } else {
      if (index > 0) {
        {
          index--;
        }
      }
    }
    createSong(currentAlbum.songs[index]);
  } else {
    const currentSong = currentSearchResults.find(
      (song) => song.title === currentlyPlayingSong.title
    );
    let index = currentSearchResults.indexOf(currentSong);
    if (nextSong) {
      if (index < currentSearchResults.length - 1) {
        index++;
      }
    } else {
      if (index > 0) {
        {
          index--;
        }
      }
    }
    createSong(currentSearchResults[index]);
  }
}

export function startTimer() {
  timeIterval = setInterval(moveSongProgressBar, 1000);
}

export function stopTimer() {
  clearInterval(timeIterval);
}

const createAlbum = function (album) {
  console.log(album);

  const newAlbum = new Album(
    album.title,
    formatTime(album.duration),
    album.cover_xl,
    album.artist.name
  );

  const allSongs = album.tracks.data;
  allSongs.forEach((song) => {
    newAlbum.addSongs(song);
  });
  printAlbum(newAlbum);
  const allAlbumSongs = newAlbum.songs;
  clearSongsFromOldAlbum();
  allAlbumSongs.forEach((song) => {
    addSongToDOM(configurator.albumSongs, song);
  });
  currentSongInfoAlbumPage();
  currentAlbum = newAlbum;
  console.log(currentAlbum);
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
  const songData = await openSong(currentlyPlayingSong.id);

  await fetch(
    `${configurator.urlForAlbum}${songData.album.id}`,
    configurator.options
  )
    .then((res) => res.json())
    .then((res) => createAlbum(res));
}

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
  return await result;
}

export async function fetchSearchedData() {
  const searchResults = await fetch(
    `${configurator.urlForSearch}${configurator.searchBoxInputSearchPage.value}`,
    configurator.options
  ).then((res) => res.json());
  //console.log(searchResults);
  printSearchedData(searchResults);
}
const printSearchedData = function (searchResults) {
  searchResults.data.forEach((song) => {
    addSongToDOM(configurator.resultBoxSearchPage, song);
  });
  currentSearchResults = searchResults.data;
  console.log(searchResults);
  console.log(currentSearchResults);
};

const addSongToDOM = function (placeToBeAdded, song) {
  const html = `
  <div class="songPanel">
    <div class="leftSide">
      <img  class="songImg" src="${
        song.album ? song.album.cover_xl : song.image
      }" />
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
  configurator.songArtist.textContent = song.artist.join(", ");
  configurator.songTimeLeft.textContent = formatTime(song.duration);
  configurator.songDurationBar.max = song.duration;
}
