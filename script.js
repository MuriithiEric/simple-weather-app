const apiKey = "22c4d4ad61790d456b6d5a494a2ae5c9";
// Stores the API key needed to authenticate requests to the OpenWeatherMap API.

const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
// Sets the base URL for the OpenWeatherMap API endpoint that retrieves weather data.

const locationInput = document.getElementById("locationInput");
// Selects the HTML input element where the user will enter the location name.

const searchButton = document.getElementById("searchButton");
// Selects the HTML button element that the user will click to search for weather information.

const locationElement = document.getElementById("location");
// Selects the HTML element where the location name will be displayed.

const temperatureElement = document.getElementById("temperature");
// Selects the HTML element where the temperature will be displayed.

const descriptionElement = document.getElementById("description");
// Selects the HTML element where the weather description will be displayed.

searchButton.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    fetchWeather(location);
  }
});
// Adds an event listener to the search button that triggers a function to fetch the weather data
// when clicked, using the location entered by the user.

function fetchWeather(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
  // Defines a function that constructs the API request URL using the entered location,
  // API key, and units set to metric.

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Weather data not available for the entered location.");
      }
      return response.json();
    })
    // Sends a GET request to the OpenWeatherMap API, checks if the response is successful,
    // and converts the response to JSON.

    .then((data) => {
      locationElement.textContent = data.name;
      temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
      descriptionElement.textContent = data.weather[0].description;
    })
    // Updates the HTML elements with the location name, temperature,
    // and weather description from the API response.

    .catch((error) => {
      console.error("Error fetching weather data:", error);
      locationElement.textContent = "Error fetching data";
      temperatureElement.textContent = "";
      descriptionElement.textContent = "";
    });
  // Handles any errors that occur during the API request by logging the error
  // and updating the HTML elements to indicate the failure.
}
