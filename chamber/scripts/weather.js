const url = 'https://api.openweathermap.org/data/2.5/weather?lat=-23.95953755372069&lon=-46.33504514195621&appid=8914a83cc13ec4ee3da68d6b2b2092f7';
const currentTemp = document.querySelector('#currentWeather');
const weatherIcon = document.querySelector('#weatherForecast');

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        // displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();
  