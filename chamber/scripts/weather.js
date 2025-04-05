const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-23.95953755372069&lon=-46.33504514195621&appid=8914a83cc13ec4ee3da68d6b2b2092f7&units=metric';
const currentWeather = document.querySelector('#currentWeather');
const weatherForecast = document.querySelector('#weatherForecast');

async function apiFetch() {
  const response = await fetch(url);
  const data = await response.json();

  displayCurrentWeather(data);
  displayForecast(data);
}

function displayCurrentWeather(data) {
    const icon = document.createElement('div');
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
  
    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    icon.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
  
    currentWeather.appendChild(icon);
    currentWeather.appendChild(temp);
    currentWeather.appendChild(description);
    currentWeather.appendChild(high);
    currentWeather.appendChild(low);
    currentWeather.appendChild(humidity);
    currentWeather.appendChild(sunrise);
    currentWeather.appendChild(sunset);
  }

  function displayForecast(data) {
    const tomorrow = document.createElement('p');
    const afterTomorrow = document.createElement('p');
  
    const todayDate = new Date();
    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);
    const afterTomorrowDate = new Date(todayDate);
    afterTomorrowDate.setDate(todayDate.getDate() + 2);
  
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const tomorrowName = daysOfWeek[tomorrowDate.getDay()];
    const afterTomorrowName = daysOfWeek[afterTomorrowDate.getDay()];

    const tomorrowForecast = data.list[8];
    const afterTomorrowForecast = data.list[16];

    today.textContent = `Today: ${main.temp}°C`
    tomorrow.textContent = `${tomorrowName}: ${tomorrowForecast.main.temp}°C`;
    afterTomorrow.textContent = `${afterTomorrowName}: ${afterTomorrowForecast.main.temp}°C`;
    
    weatherForecast.appendChild(today)
    weatherForecast.appendChild(tomorrow);
    weatherForecast.appendChild(afterTomorrow);
  }

apiFetch();    