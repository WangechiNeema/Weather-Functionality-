// index.js

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = new Date();

let dayOfWeek = days[currentDate.getDay()];
let hours = String(currentDate.getHours()).padStart(2, "0");
let minutes = String(currentDate.getMinutes()).padStart(2, "0");
let span = document.querySelector("span");

span.textContent = `${dayOfWeek} ${hours}:${minutes}`;

function city() {
  let cityForm = document.querySelector("form");
  let cityInput = document.querySelector("input[type='search']");
  let cityName = document.querySelector("h1");
  let currentTemperature = document.querySelector(".day");

  cityForm.addEventListener("submit", function (event) {
    event.preventDefault();
    cityName.textContent = cityInput.value;

    // New Code: Display temperature for the searched city
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=2980ff43226d67e53abfcdb6d457dcc8&units=metric`;

    axios.get(apiUrl).then(function (response) {
      // Update the current temperature
      currentTemperature.textContent = `${Math.round(
        response.data.main.temp
      )}°C`;
    });
  });
}

// New Function: Get and display weather based on geolocation
function showWeatherByGeolocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // New Code: Fetch weather data based on geolocation
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2980ff43226d67e53abfcdb6d457dcc8&units=metric`;

    axios.get(apiUrl).then(function (response) {
      let cityName = document.querySelector("h1");
      cityName.textContent = response.data.name;

      // Update the current temperature
      currentTemperature.textContent = `${Math.round(
        response.data.main.temp
      )}°C`;
    });
  });
}

city();

// Add event listener for the "Current Location" button
let currentButton = document.querySelector("#button1");
currentButton.addEventListener("click", showWeatherByGeolocation);
