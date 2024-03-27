import * as configurator from "./configurator.js";

function uncheckCheckbox() {
  configurator.checkBox.checked = false;
}

window.addEventListener("resize", function () {
  if (window.innerWidth < 915) {
    uncheckCheckbox();
  }
});
