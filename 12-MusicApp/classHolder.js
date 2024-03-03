import { formatTime } from "./controlPanel.js";

export class Song {
  constructor(title, duration, image, id) {
    this.title = title;
    this.duration = duration;
    this.image = image;
    this.id = id;
    this.artist = [];
  }
}

export class Album {
  constructor(title, artist, duration, image) {
    this.title = title;
    this.duration = duration;
    this.image = image;
    this.songs = [];
    this.artist = artist;
  }
  addSongs(song) {
    const albumSong = new Song(
      song.title,
      song.artist.name,
      formatTime(song.duration),
      song.album.cover_xl,
      song.id
    );
    //console.log(albumSong.image);

    this.songs.push(albumSong);
  }
}
