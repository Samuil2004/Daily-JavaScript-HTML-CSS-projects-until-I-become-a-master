import * as configurator from "./configurator.js";
import { Song, Album } from "./classHolder.js";
import { formatTime, moveSongProgressBar } from "./controlPanel.js";
let number = 0;
let timeIterval;
export async function fetchData() {
  try {
    const fetchData = await fetch(configurator.url, configurator.options).then(
      (res) => res.json()
    );
    storeInfo(fetchData);
    // loadAlbum();
    // testLoadAlbum();
    // .then((rest) => createObject(rest));
    // .then((rest) => console.log(rest));
  } catch (error) {
    console.error(error);
  }
}
const storeInfo = function (storedData) {
  configurator.data.push(storedData);
  createObject();
};

const createObject = function () {
  console.log(configurator.data[0]);
  const newSong = new Song(
    configurator.data[0].data[number].title,
    configurator.data[0].data[number].artist.name,
    configurator.data[0].data[number].duration,
    configurator.data[0].data[number].artist.picture_medium
  );

  fillInInfo(newSong);
};

const fillInInfo = function (song) {
  configurator.songDurationBar.value = 0;
  configurator.timePassed.textContent = "0:00";
  configurator.img.src = song.image;
  checkSongTitle(song.title);

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
  createObject();
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
  allAlbumSongs.forEach((song) => addSongsToDOM(song));
};

const printAlbum = function (album) {
  configurator.albumImage.src = album.image;
  configurator.albumTitle.textContent = album.title;
  checkAlbumTitle(album.title);
  configurator.albumArtist.textContent = album.artist;
};
export async function loadAlbum() {
  await fetch(
    `${configurator.urlForAlbum}${configurator.data[0].data[number].album.id}`,
    configurator.options
  )
    .then((res) => res.json())
    .then((res) => createAlbum(res));
  // .then((res) => console.log(res));
}

const addSongsToDOM = function (song) {
  console.log(song);
  const html = `<div class="songPanel">
  <div class="leftSide">
    <img src="${song.image}"  class="songImg" />
    <h2 class="songName">${song.title}</h2>
  </div>
  <div class="rightSide">
    <img
      class="albumSongsPlayBtn"
      src="./images/playSongBtnImg.png"
    />
  </div>
</div>`;
  configurator.albumSongs.insertAdjacentHTML("beforeend", html);
};

const checkAlbumTitle = function (title) {
  if (title.length > 20) {
    configurator.albumTitle.style.animation = "scroll-left 12s linear infinite";
  }
};

const checkSongTitle = function (title) {
  if (title.length > 20) {
    configurator.songTitle.style.animation = "scroll-left 12s linear infinite";
  } else {
    configurator.songTitle.style.removeProperty("animation");
  }
};
