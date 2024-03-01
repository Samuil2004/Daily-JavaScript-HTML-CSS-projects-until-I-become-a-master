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

// export const testImg = document.querySelector(".songImg");
// export const testName = document.querySelector(".songName");
export const albumSongs = document.querySelector(".albumSongs");

export const songTab = document.querySelector(".songInfo");
export const albumTab = document.querySelector(".albumInfo");

export const data = [];
export const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c09033b211msh096e9d7d447afabp1dd192jsnb170c41dabd6",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

export const urlForAlbum = "https://deezerdevs-deezer.p.rapidapi.com/album/";
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'c09033b211msh096e9d7d447afabp1dd192jsnb170c41dabd6',
// 		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
// 	}
// };
