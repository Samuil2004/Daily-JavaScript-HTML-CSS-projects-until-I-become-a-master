import * as constants from "./config.js";
import { currentLocation } from "./locator.js";
import { getJson } from "./locator.js";
("use strict");

constants.btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  getJson(constants.input.value);
});

currentLocation();
