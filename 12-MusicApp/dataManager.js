import * as configurator from "./configurator.js";
import { Song } from "./classHolder.js";
import { formatTime, moveSongProgressBar } from "./controlPanel.js";
let number = 0;
let timeIterval;
export async function fetchData() {
  try {
    const fetchData = await fetch(configurator.url, configurator.options).then(
      (res) => res.json()
    );
    storeInfo(fetchData);
    testLoadAlbum();
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

const testLoadAlbum = function () {
  configurator.albumImage.src =
    configurator.data[0].data[number].album.cover_xl;
  configurator.albumTitle.textContent =
    configurator.data[0].data[number].album.title;
  configurator.albumArtist.textContent =
    configurator.data[0].data[number].artist.name;
};

//fetch info from the tracklist link from the data in order to load all songs that are in the album - they are not the same as the initial array that we get in the console. We want the songs from the album, not the songs of the artist (an album may cntain more than one artist)
