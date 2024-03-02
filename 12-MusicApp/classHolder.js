import { formatTime } from "./controlPanel.js";

export class Song {
  constructor(title, artist, duration, image, id) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.image = image;
    this.id = id;
  }
}

export class Album {
  constructor(title, artist, duration, image) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.image = image;
    this.songs = [];
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
