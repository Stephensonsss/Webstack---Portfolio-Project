// Code section of weather app with Five Days Forecast 

const apiKey = "7ccfece36c0298268b533e25cabb3b80";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/forecast";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchInput = document.querySelector(".weather__searchform");
const celsiusToggle = document.querySelector(".weather_unit_celsius");
const fahrenheitToggle = document.querySelector(".weather_unit_farenheit");
const currentWeatherContainer = document.getElementById("current-weather");
const forecastContainer = document.getElementById("forecast");

let isCelsius = true;

// This section fetches for data and display weather data
const fetchWeather = async (city) => {
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`${currentWeatherUrl}?q=${city}&appid=${apiKey}`),
      fetch(`${weatherApiUrl}?q=${city}&appid=${apiKey}`),
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error("City not found");
    }

    const currentWeather = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrentWeather(currentWeather);
    displayForecast(forecastData);
  } catch (error) {
    alert("Error fetching weather data. Please check the city name and try again.");
  }
};

// this section display the current weather
const displayCurrentWeather = (data) => {
  const temperature = isCelsius ? kelvinToCelsius(data.main.temp) : kelvinToFahrenheit(data.main.temp);

  currentWeatherContainer.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${temperature}&#176; ${isCelsius ? "C" : "F"}</p>
    <div class="current-details">
      <span>Humidity: ${data.main.humidity}%</span>
      <span>Wind: ${data.wind.speed} m/s</span>
      <span>Pressure: ${data.main.pressure} hPa</span>
    </div>
  `;
};

// Section of to display 5 days forecast
const displayForecast = (data) => {
  const dailyForecasts = data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));

  forecastContainer.innerHTML = dailyForecasts
    .slice(0, 5)
    .map((day) => {
      const temperature = isCelsius ? kelvinToCelsius(day.main.temp) : kelvinToFahrenheit(day.main.temp);

      return `
        <div class="forecast-day">
          <h3>${formatDate(day.dt_txt)}</h3>
          <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}">
          <p>${temperature}&#176; ${isCelsius ? "C" : "F"}</p>
          <div class="forecast-details">
            <span>Humidity: ${day.main.humidity}%</span>
            <span>Wind: ${day.wind.speed} m/s</span>
            <span>Pressure: ${day.main.pressure} hPa</span>
          </div>
        </div>
      `;
    })
    .join("");
};

// Temperature Conversion Calculation Section Celcuis , Celcuis to Fahrenheit
const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);
const kelvinToFahrenheit = (kelvin) => Math.round((kelvin - 273.15) * 9/5 + 32);

// the date format
const formatDate = (dateString) => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// The Event Listeners
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
//Toggle point of choice of unit for measurement
celsiusToggle.addEventListener("click", () => {
  if (!isCelsius) {
    isCelsius = true;
    celsiusToggle.classList.add("active-unit");
    fahrenheitToggle.classList.remove("active-unit");
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
//Toggle point of choice of unit for measurement
fahrenheitToggle.addEventListener("click", () => {
  if (isCelsius) {
    isCelsius = false;
    fahrenheitToggle.classList.add("active-unit");
    celsiusToggle.classList.remove("active-unit");
    const city = searchInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});
