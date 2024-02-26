import * as configurator from "./configurator.js";
import { Song } from "./classHolder.js";

export async function fetchData() {
  try {
    await fetch(configurator.url, configurator.options)
      .then((res) => res.json())
      .then((rest) => createObject(rest));
    // .then((rest) => console.log(rest));
  } catch (error) {
    console.error(error);
  }
}

const createObject = function (info) {
  const newSong = new Song(
    info.data[0].title,
    info.data[0].artist.name,
    info.data[0].duration,
    info.data[0].artist.picture_medium
  );
  fillInInfo(newSong);
};

const fillInInfo = function (song) {
  configurator.img.src = song.image;
  configurator.songTitle.textContent = song.title;
  configurator.songArtist.textContent = song.artist;
  configurator.songTimeLeft.textContent = formatTime(song.duration);
};

const formatTime = function (time) {
  return `-${Math.floor(time / 60)}:${
    time % 60 > 9 ? time % 60 : "0" + (time % 60)
  }`;
};
