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
    updateInfo(data);
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

const updateInfo = function (data) {
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
  // const sunrise = result.results.sunrise;
  // const sunset = result.results.sunset;
  // console.log(sunrise, sunset);

  const currentTimeAtLocation = getCurrentTimeForTimeZone(data.timezone);
  const hours = currentTimeAtLocation.getHours();
  //console.log(currentTimeAtLocation.getHours());
  let path;
  console.log(hours);
  if (hours > 6 && hours < 18) {
    path = "images/dailySky.jpeg";
  } else {
    path = "images/nightSky.jpg";
  }
  card.style.backgroundImage = `url(${path})`;
  console.log(`ready`);

  // const [hour, minute, second] = timeString.split(":").map(Number);
  // const isPM = timeString.includes("PM");
  // let totalSeconds = (hour % 12) * 3600 + minute * 60 + second;
  // if (isPM) {
  //   totalSeconds += 12 * 3600; // Add 12 hours for PM times
  // }
  // console.log(currentTimeAtLocation);
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
  changeBackground(result, country);
  // console.log(result.results.sunrise);
};

// sunSetRise();
// const test = async function () {
//   const data = await fetch(`https://www.timeanddate.com/worldclock/`);
//   const resule = await data.json();
//   console.log(resule);
// };
// test();
