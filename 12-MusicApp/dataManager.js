import * as configurator from "./configurator.js";
import { Song } from "./classHolder.js";
import { formatTime } from "./controlPanel.js";
let number = 0;
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
  const newSong = new Song(
    configurator.data[0].data[number].title,
    configurator.data[0].data[number].artist.name,
    configurator.data[0].data[number].duration,
    configurator.data[0].data[number].artist.picture_medium
  );
  fillInInfo(newSong);
};

const fillInInfo = function (song) {
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
