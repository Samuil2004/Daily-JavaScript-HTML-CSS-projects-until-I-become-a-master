"use strict";
// console.log(`hello`);

// const dataFetch = async function () {
//   const data = await fetch(
//     "https://itunesvolodimir-kudriachenkov1.p.rapidapi.com/searchMovies"
//   )
//     .then((res) => res.json())
//     .then((rest) => console.log(rest));
// };

// dataFetch();

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
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

tester();