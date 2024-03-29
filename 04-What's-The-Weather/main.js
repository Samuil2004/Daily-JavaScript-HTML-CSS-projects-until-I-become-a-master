import * as constants from "./config.js";
import { currentLocation } from "./locator.js";
import { getJson } from "./locator.js";
("use strict");

constants.btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  getJson(constants.input.value);
});
constants.input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getJson(constants.input.value);
  }
});

constants.btnLocate.addEventListener("click", function (e) {
  e.preventDefault();
  currentLocation();
});

currentLocation();
