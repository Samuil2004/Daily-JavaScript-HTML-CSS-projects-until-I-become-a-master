import * as configurator from "./configurator.js";
import { Song } from "./classHolder.js";
import { formatTime } from "./controlPanel.js";
let number = 1;
export async function fetchData() {
  try {
    const fetchData = await fetch(configurator.url, configurator.options).then(
      (res) => res.json()
    );
    storeInfo(fetchData);
    // .then((rest) => createObject(rest));
    // .then((rest) => console.log(rest));
  } catch (error) {
    console.error(error);
  }
}
const storeInfo = function (storedData) {
  // console.log(typeof storedData);
  configurator.data.push(storedData);
  createObject();
};

const createObject = function () {
  console.log(configurator.data[0].data);
  console.log(configurator.data[0].data.length);
  console.log(number);
  if (number < configurator.data[0].data.length - 1 && number > 0) {
    console.log(123);
    const newSong = new Song(
      configurator.data[0].data[number].title,
      configurator.data[0].data[number].artist.name,
      configurator.data[0].data[number].duration,
      configurator.data[0].data[number].artist.picture_medium
    );
    fillInInfo(newSong);
  }
};

const fillInInfo = function (song) {
  configurator.img.src = song.image;
  configurator.songTitle.textContent = song.title;
  configurator.songArtist.textContent = song.artist;
  configurator.songTimeLeft.textContent = formatTime(song.duration);
  configurator.songDurationBar.max = song.duration;
  console.log(configurator.songDurationBar.max);
};
export function loadNextSong() {
  increaseNumeber();
  createObject();
}
export function loadPreviousSong() {
  decreaseNumber();
  createObject();
}
const increaseNumeber = function () {
  number++;
};
const decreaseNumber = function () {
  number--;
};
