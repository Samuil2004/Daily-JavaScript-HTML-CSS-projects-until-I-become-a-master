export const img = document.querySelector(".songImage");
export const songTitle = document.querySelector(".songTitle");
export const songArtist = document.querySelector(".songArtist");
export const btnGoToAlbum = document.querySelector(".songAlbum");
export const timePassed = document.querySelector(".timePassed");
export const songTimeLeft = document.querySelector(".timeLeft");
export const pausePlaySongBtn = document.querySelector(".pausePlaySongBtn");
export const songDurationBar = document.querySelector(".songProgressbar");
export const nextSongBtn = document.querySelector(".nextSongBtn");
export const prevSongBtn = document.querySelector(".previousSongBtn");
export const albumImage = document.querySelector(".albumImage");
export const albumTitle = document.querySelector(".AlbumTitle");
export const albumArtist = document.querySelector(".albumArtist");
export const albumSongs = document.querySelector(".albumSongs");
export const currentSongAlbumPageImage = document.querySelector(".songImg");
export const currentSongAlbumPageTitle = document.querySelector(
  ".curPlayingSongTitle"
);
export const currentSongPlayPauseBtnAlbumPage = document.querySelector(
  ".currentSongPlayBtn"
);
export const leftSideOfTheCurrentlyPlayingSong = document.querySelector(
  ".curPlayingSongLeftSide"
);
export const playBtnSongFromAlbum =
  document.querySelector(".albumSongsPlayBtn");

export const songPanelFromAlbum = document.querySelectorAll(".songPanel");

export const resultBoxSearchPage = document.querySelector(".resultsBox");
export const searchBoxInputSearchPage = document.querySelector(".searchBar");
export const searchButtonSearchPage =
  document.querySelector(".magnifyingGlass");

export const songTab = document.querySelector(".songInfo");
export const albumTab = document.querySelector(".albumInfo");
export const searchTab = document.querySelector(".searchPanel");

export const data = [];
export const results = [];
// export const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c09033b211msh096e9d7d447afabp1dd192jsnb170c41dabd6",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

export const urlForAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
export const urlForSong = "https://deezerdevs-deezer.p.rapidapi.com/track/";
export const urlForSearch =
  "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
