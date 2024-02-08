// import icons from `url:images/icons.svg`;

"use strict";

const API_KEY = "b5eb2a1e621e9dc5f4fae36248afc49f";
const btnSearch = document.querySelector(".btn-search");
const input = document.querySelector(".cityInput");
const cityLabel = document.querySelector(".city");
const degreesLabel = document.querySelector(".temp");
const humidityLabel = document.querySelector(".humidity");
const windLabel = document.querySelector(".wind");
const image = document.querySelector(".weather-icon");

const getJson = async function (city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to find information");
      }
      return response.json();
    });
    console.log(data);
    updateInfo(
      data.name,
      data.main.temp,
      data.main.humidity,
      data.wind.speed,
      data.weather[0].main
    );
  } catch (err) {
    alert(err);
  }
};
btnSearch.addEventListener("click", function (e) {
  e.preventDefault();
  getJson(input.value);
});

const transformDegrees = function (degrees) {
  return Math.round(+degrees - 273.15);
};
const updateInfo = function (city, degrees, humidity, wind, overall) {
  input.value = "";
  cityLabel.textContent = city;
  degreesLabel.textContent = transformDegrees(degrees) + "°C";
  humidityLabel.textContent = humidity + "%";
  windLabel.textContent = wind + " km/h";
  console.log(overall);
  image.src = `images/${overall.toLowerCase()}.png`;
};

const renderSpinner = function () {
  const path = "images/icons.svg";
  const html = `<div class="spinner">
  <svg>
    <use href="${path}#icon-loader"></use>
  </svg>
</div>`;
  degreesLabel.insertAdjacentHTML("afterbegin", html);
};

async function currentLocation() {
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
