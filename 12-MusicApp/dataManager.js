import * as configurator from "./configurator.js";
import { Song } from "./classHolder.js";

export async function fetchData() {
  try {
    await fetch(configurator.url, configurator.options)
      .then((res) => res.json())
      .then((rest) => createObject(rest));
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
};

// class Song {
//   constructor(title, artist, duration, image) {
//     this.title = title;
//     this.artist = artist;
//     this.duration = duration;
//     this.image = image;
//   }
// }
