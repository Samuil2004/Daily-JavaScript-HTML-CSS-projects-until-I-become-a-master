import * as constants from "./config.js";
import WeatherData from "./dataManager.js";

export async function currentLocation() {
  try {
    renderSpinner();
    const currentPossitionData = await new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude: lat, longitude: lng } = currentPossitionData.coords;
    await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then((result) => result.json())
      .then((response) => getJson(response.city));
  } catch (err) {
    alert(err.message);
  }
}
export async function getJson(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${constants.API_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to find information");
      }
      return response.json();
    });
    console.log(data);
    sunSetRise(data);
  } catch (err) {
    alert(err);
  }
}

const renderSpinner = function () {
  const path = "images/icons.svg";
  const html = `<div class="spinner">
  <svg>
    <use href="${path}#icon-loader"></use>
  </svg>
</div>`;
  constants.degreesLabel.insertAdjacentHTML("afterbegin", html);
};

export const sunSetRise = async function (country) {
  const { lat, lon: lng } = await country.coord;
  const data = await fetch(
    `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`
  );
  const result = await data.json();
  console.log(result);
  WeatherData.updateInfo(country, result);
  WeatherData.loadMap(country, lat, lng);
  WeatherData.changeBackground(result, country);
};
