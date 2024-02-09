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
const highestTempLabel = document.querySelector(".highest");
const lowestTempLabel = document.querySelector(".lowest");
const card = document.querySelector(".card");
const sunriseLabel = document.querySelector(".sunrise");
const sunsetLabel = document.querySelector(".sunset");

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
    sunSetRise(data);
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

const updateInfo = function (data, sunData) {
  input.value = "";
  cityLabel.textContent = data.name;
  degreesLabel.textContent = transformDegrees(data.main.temp) + "°C";
  humidityLabel.textContent = data.main.humidity + "%";
  windLabel.textContent = data.wind.speed + " km/h";
  image.src = `images/${data.weather[0].main.toLowerCase()}.png`;
  highestTempLabel.textContent =
    "H:" + transformDegrees(data.main.temp_max) + "°C";
  lowestTempLabel.textContent =
    "L:" + transformDegrees(data.main.temp_min) + "°C";
  sunriseLabel.textContent = sunData.results.sunrise.slice(0, -6) + "AM";
  sunsetLabel.textContent = sunData.results.sunset.slice(0, -6) + "PM";
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

const changeBackground = function (result, data) {
  const currentTimeAtLocation = getCurrentTimeForTimeZone(data.timezone);
  const hours = currentTimeAtLocation.getHours();

  let path;
  console.log(hours);
  if (hours > 6 && hours < 18) {
    path = "images/dailySky.jpeg";
  } else {
    path = "images/nightSky.jpg";
  }
  card.style.backgroundImage = `url(${path})`;
  console.log(`ready`);
};

const getCurrentTimeForTimeZone = function (offsetSeconds) {
  const currentDate = new Date();
  const currentGBTime = currentDate.toLocaleString("en-GB", {
    timeZone: "Europe/London",
  });
  const currentGBTime2 = new Date(currentGBTime);
  const currentTimeMilliseconds = currentGBTime2.getTime();
  const currentTimeInNewTimeZone =
    currentTimeMilliseconds + offsetSeconds * 1000;
  console.log(currentTimeInNewTimeZone);
  return new Date(currentTimeInNewTimeZone);
};

const sunSetRise = async function (country) {
  const { lat, lon: lng } = await country.coord;
  const data = await fetch(
    `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}`
  );
  const result = await data.json();
  console.log(result);
  updateInfo(country, result);
  loadMap(country, lat, lng);
  changeBackground(result, country);
};
let mapInitialized = false;
let map;
const loadMap = function (data, lat, lng) {
  if (!mapInitialized) {
    map = L.map("map").setView([lat, lng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    mapInitialized = true;
  } else {
    map.setView([lat, lng], 13);
  }
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup("Temp: " + transformDegrees(data.main.temp) + "°C")
    .openPopup();

  console.log(`ready`);
};
