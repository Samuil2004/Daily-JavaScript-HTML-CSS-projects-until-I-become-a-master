import * as constants from "./config.js";

class WeatherData {
  #mapInitialized = false;
  #map;
  #outZoom = 10;
  transformDegrees(degrees) {
    return Math.round(+degrees - 273.15);
  }

  updateInfo(data, sunData) {
    constants.input.value = "";
    constants.cityLabel.textContent = data.name;
    constants.degreesLabel.textContent =
      this.transformDegrees(data.main.temp) + "°C";
    constants.humidityLabel.textContent = data.main.humidity + "%";
    constants.windLabel.textContent = data.wind.speed + " km/h";
    constants.image.src = `images/${data.weather[0].main.toLowerCase()}.png`;
    constants.highestTempLabel.textContent =
      "H:" + this.transformDegrees(data.main.temp_max) + "°C";
    constants.lowestTempLabel.textContent =
      "L:" + this.transformDegrees(data.main.temp_min) + "°C";
    constants.sunriseLabel.textContent =
      sunData.results.sunrise.slice(0, -6) + "AM";
    constants.sunsetLabel.textContent =
      sunData.results.sunset.slice(0, -6) + "PM";
    constants.feelsLikeLabel.textContent =
      this.transformDegrees(data.main.feels_like) + "°C";
  }

  changeBackground(data) {
    const currentTimeAtLocation = this.getCurrentTimeForTimeZone(data.timezone);
    const hours = currentTimeAtLocation.getHours();
    let path;
    console.log(hours);
    if (hours > 6 && hours < 18) {
      path = `images/${data.weather[0].main.toLowerCase()}.jpeg`;
      console.log(data.weather[0].main);
      constants.sunPhases.style.backgroundColor = `rgba(140, 192, 231, 255)`;
      constants.feelsLikeBox.style.backgroundColor = `rgba(140, 192, 231, 255)`;
    } else {
      path = "images/nightSky.jpg";
      constants.sunPhases.style.backgroundColor = `rgba(74, 93, 115, 255)`;
      constants.feelsLikeBox.style.backgroundColor = `rgba(74, 93, 115, 255)`;
    }
    constants.card.style.backgroundImage = `url(${path})`;
    console.log(`ready`);
  }

  getCurrentTimeForTimeZone(offsetSeconds) {
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
  }

  loadMap(data, lat, lng) {
    if (!this.#mapInitialized) {
      this.#map = L.map("map").setView([lat, lng], this.#outZoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.#map);
      this.#mapInitialized = true;
    } else {
      this.#map.setView([lat, lng], this.#outZoom);
    }
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup("Temp: " + this.transformDegrees(data.main.temp) + "°C")
      .openPopup();
  }
}
export default new WeatherData();
