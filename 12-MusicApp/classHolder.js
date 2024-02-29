export class Song {
  constructor(title, artist, duration, image) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.image = image;
  }
}

export class Album {
  constructor(title, artist, duration, image, songs) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.image = image;
    this.songs = songs;
  }
}
