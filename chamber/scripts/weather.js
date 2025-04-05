const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-23.95953755372069&lon=-46.33504514195621&appid=8914a83cc13ec4ee3da68d6b2b2092f7&units=metric';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-23.95953755372069&lon=-46.33504514195621&appid=8914a83cc13ec4ee3da68d6b2b2092f7&units=metric';
const currentWeather = document.querySelector('#currentWeather');
const weatherForecast = document.querySelector('#weatherForecast');

async function apiFetch() {
  const response = await fetch(url);
  const data = await response.json();

  displayCurrentWeather(data);
  displayForecast(data);
}

function displayCurrentWeather(data) {
    const icon = document.createElement('img');
    const info = document.createElement('div');
    const temp = document.createElement('p');
    const description = document.createElement('p');
    const high = document.createElement('p');
    const low = document.createElement('p');
    const humidity = document.createElement('p');
    const sunrise = document.createElement('p');
    const sunset = document.createElement('p');
  
    temp.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    high.textContent = `High: ${data.main.temp_max}°C`;
    low.textContent = `Low: ${data.main.temp_min}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  
    const sunriseDate = new Date(data.sys.sunrise * 1000);
    const sunsetDate = new Date(data.sys.sunset * 1000);
    sunrise.textContent = `Sunrise: ${sunriseDate.toLocaleTimeString()}`;
    sunset.textContent = `Sunset: ${sunsetDate.toLocaleTimeString()}`;
  

icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
 
icon.alt = data.weather[0].description;
    currentWeather.appendChild(icon);
    info.appendChild(temp);
    info.appendChild(description);
    info.appendChild(high);
    info.appendChild(low);
    info.appendChild(humidity);
    info.appendChild(sunrise);
    info.appendChild(sunset);
    currentWeather.appendChild(info);
  }

  function displayForecast(data) {
    const tomorrow = document.createElement('p');
    const afterTomorrow = document.createElement('p');
  
    weatherForecast.appendChild(tomorrow);
    weatherForecast.appendChild(afterTomorrow);
  }

apiFetch();    