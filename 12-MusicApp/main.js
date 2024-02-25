"use strict";
const img = document.querySelector(".songImage");
const songTitle = document.querySelector(".songTitle");
const songArtist = document.querySelector(".songArtist");

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=azis";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "c09033b211msh096e9d7d447afabp1dd192jsnb170c41dabd6",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const tester = async function () {
  try {
    await fetch(url, options)
      .then((res) => res.json())
      .then((rest) => fillInInfo(rest));
  } catch (error) {
    console.error(error);
  }
};
tester();

const fillInInfo = function (info) {
  img.src = info.data[0].artist.picture_medium;
  songTitle.textContent = info.data[0].title;
  songArtist.textContent = info.data[0].artist.name;
};
