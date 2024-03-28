import * as configurator from "./configurator.js";
import data from "./countries.js";
("use strict");

function uncheckCheckbox() {
  configurator.checkBox.checked = false;
}

window.addEventListener("resize", function () {
  if (window.innerWidth < 915) {
    uncheckCheckbox();
  }
});

const uploadCountryCodes = function () {
  const addCountryInfo = function (flag, code, dial_code) {
    const html = `<option>${flag}${code} (${dial_code})</option>`;
    configurator.selectedCountry.insertAdjacentHTML("beforeend", html);
  };

  data.forEach((item) => addCountryInfo(item.flag, item.code, item.dial_code));
};

uploadCountryCodes();
