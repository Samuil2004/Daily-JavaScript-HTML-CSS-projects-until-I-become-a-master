export const img = document.querySelector(".songImage");
export const songTitle = document.querySelector(".songTitle");
export const songArtist = document.querySelector(".songArtist");
export const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c09033b211msh096e9d7d447afabp1dd192jsnb170c41dabd6",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};