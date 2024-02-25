"use strict";

import * as configurator from "./configurator.js";
import { fetchData } from "./dataManager.js";
// const tester = async function () {
//   try {
//     await fetch(configurator.url, configurator.options)
//       .then((res) => res.json())
//       .then((rest) => fillInInfo(rest));
//   } catch (error) {
//     console.error(error);
//   }
// };
fetchData();

// const fillInInfo = function (info) {
//   configurator.img.src = info.data[0].artist.picture_medium;
//   configurator.songTitle.textContent = info.data[0].title;
//   configurator.songArtist.textContent = info.data[0].artist.name;
// };
