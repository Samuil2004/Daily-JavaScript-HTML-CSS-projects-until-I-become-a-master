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
  constructor(title, duration, image, artist) {
    this.title = title;
    this.duration = duration;
    this.image = image;
    this.artist = artist;
    this.songs = [];
  }

  addSongs(song) {
    const albumSong = new Song(
      song.title,
      formatTime(song.duration),
      song.album.cover_xl,
      song.id
      //song.artist
    );
    albumSong.artist.push(song.artist.name);
    //console.log(albumSong.image);

    this.songs.push(albumSong);
  }
  // addArtists(artist) {
  //   attachListenersToSongs.push(artist);
  // }
}
