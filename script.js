import { darkMode, lightMode } from "./dark-light-mode-toggle.js";
import { gettingUserCurrentLocation, initMap, updateMap } from "./location.js";
import { fetchWeatherObjectUsingLatAndLon, fetchWeatherObjectUsingLocationName, getWeatherIconAndColor, weatherIconRanges} from "./weather.js";
import {generateWeatherHTML} from "./components.js"


let map;
const toggleBtn = document.querySelector('.mode-toggle');

if (document.documentElement.classList.contains('dark')) {
  toggleBtn.querySelector('i').className = 'fas fa-sun'
} else {
  toggleBtn.querySelector('i').className = 'fas fa-moon'
}



async function getWeatherDataUsingLatAndLon () {
  const mapContainer = document.getElementById('map')
  
  const weatherContainer = document.querySelector('.js-overall-weather-container');
  weatherContainer.innerHTML = `
  <!-- From Uiverse.io by adamgiebl --> 
  <div class="center-wrapper">
<div class="loader">
  <span></span>
</div>
</div>
  `
  let weatherId = 0;
  let weatherDesc = '';
  try {
  const coords = await gettingUserCurrentLocation();
  if (!coords) {
      weatherContainer.innerHTML = `
      <div class="error-box">
      <span class="error-icon"><i class="fas fa-map-marker-alt"></i></span>
      <h2 class="error-heading">Location access denied </h2>
      <p class="error-text">Please enable location access or search manually</p>
      </div>
      `;
      return 
    }
  const weather = await fetchWeatherObjectUsingLatAndLon(coords.latitude, coords.longitude)
  if (weather.error === 'network-error') {
      weatherContainer.innerHTML = `
      <div class="error-box">
      <span class="error-icon"><i class="fas fa-circle-exclamation"></i></span>
      <h2 class="error-heading">Something went wrong </h2>
      <p class="error-text">Please check internet connection or try another city</p>
      </div>
      `

      return;
    }
  if (!weather) {
    weatherContainer.innerHTML = `
    <div class="error-box">
      <span class="error-icon"><i class="fas fa-search-location"></i></span>
      <h2 class="error-heading">City not found </h2>
      <p class="error-text">Check spelling and try again </p>
      </div>
      
    `
    return;
  }
  weather.weather.forEach(weatherDetails => {
      weatherId  = weatherDetails.id
      weatherDesc = weatherDetails.description 
  })
  const match = getWeatherIconAndColor(weatherId);
  console.log(match);
  const weatherInfo = {
    weatherId,
    weatherDesc,
    name: weather.name,
    feelsLike: weather.main.feels_like,
    grndLvl: weather.main.grnd_level,
    humidity: weather.main.humidity,
    pressure: weather.main.pressure,
    seaLvl: weather.main.sea_level,
    temp: weather.main.temp,
    tempMax: weather.main.temp_max,
    tempMin: weather.main.temp_min,
    lat: coords.latitude,
    lon: coords.longitude,
    windSpeed: weather.wind.speed,
    icon: match.icon,
    color: match.color
  }
  
  const weatherHTML = generateWeatherHTML(weatherInfo);
  weatherContainer.innerHTML = weatherHTML;
  document.querySelector('.weather-icon').style.color = `hsl(${match.color})`
  mapContainer.style.display = 'block';
  
  if (!map) map = initMap();
  updateMap(map, weather.coord.lat, weather.coord.lon, weather.name, coords.accuracy)
  main();
  document.querySelector('.footer-text').style.display = 'block'
} catch(error) {
  console.log(error)
}
}



getWeatherDataUsingLatAndLon();



async function getWeatherUsingLocationName() {
  document.querySelector('.footer-text').style.display = 'none'
  const mapContainer = document.getElementById('map');
  mapContainer.style.display = 'none'
  const weatherContainer = document.querySelector('.js-overall-weather-container');
  weatherContainer.innerHTML = `
  <!-- From Uiverse.io by adamgiebl --> 
  <div class="center-wrapper">
<div class="loader">
  <span></span>
</div>
</div>
  `
  let weatherDesc = '';
  let weatherId = 0;

  try{
    
  const input = document.querySelector('.input');
    const searchQuery = input.value.trim();
    if (!searchQuery) {
      weatherContainer.innerHTML = `
      <div class="error-box">
      <span class="error-icon"><i class="fas fa-keyboard"></i></span>
      <p class="error-text">Please enter a city name </p>
      </div>
      `
      return;
    }
    const weather = await fetchWeatherObjectUsingLocationName(searchQuery);
    if (weather.error === 'network-error') {
      weatherContainer.innerHTML = `
      <div class="error-box">
      <span class="error-icon"><i class="fas fa-circle-exclamation"></i></span>
      <h2 class="error-heading">Something went wrong </h2>
      <p class="error-text">Please check internet connection or try another city</p>
      </div>
      `

      return;
    }
     if (!weather) {
    weatherContainer.innerHTML = `
    <div class="error-box">
      <span class="error-icon"><i class="fas fa-search-location"></i></span>
      <h2 class="error-heading">City not found </h2>
      <p class="error-text">Check spelling and try again </p>
      </div>
      
    `
  }
  weather.weather.forEach(weatherDetails => {
      weatherId  = weatherDetails.id
      weatherDesc = weatherDetails.description 
  })

  const match = getWeatherIconAndColor(weatherId);
  const weatherInfo = {
    weatherId,
    weatherDesc,
    name: weather.name,
    feelsLike: weather.main.feels_like,
    grndLvl: weather.main.grnd_level,
    humidity: weather.main.humidity,
    pressure: weather.main.pressure,
    seaLvl: weather.main.sea_level,
    temp: weather.main.temp,
    tempMax: weather.main.temp_max,
    tempMin: weather.main.temp_min,
    lat: weather.coord.lat,
    lon: weather.coord.lon,
    windSpeed: weather.wind.speed,
    icon: match.icon,
    color: match.color
  }
  
  const weatherHTML = generateWeatherHTML(weatherInfo);
  weatherContainer.innerHTML = weatherHTML;
  document.querySelector('.weather-icon').style.color = `hsl(${match.color})`
  mapContainer.style.display = 'block'
  if (!map) map = initMap();
  updateMap(map, weather.coord.lat, weather.coord.lon, weather.name, 300)
  main();
  document.querySelector('.footer-text').style.display = 'block'
} catch(error) {

}
}


const input = document.querySelector('.input');
input.addEventListener('keydown', (e)=> {
  
  if (e.key === 'Enter') getWeatherUsingLocationName();
})
const searchBtn = document.querySelector('button')

searchBtn.addEventListener('click', getWeatherUsingLocationName)
toggleBtn.addEventListener('click', ()=> {
  let isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    toggleBtn.querySelector('i').className = 'fas fa-moon'
  } 
  else {
    document.documentElement.classList.add('dark');
    toggleBtn.querySelector('i').className = 'fas fa-sun'
  }
})

function main() {

/*
*/
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

mediaQuery.addEventListener('change', e=> {
  if (e.matches) {
    document.documentElement.classList.add('dark');
    toggleBtn.querySelector('i').className = 'fas fa-sun'
  }
  else {
    document.documentElement.classList.remove('dark');
    toggleBtn.querySelector('i').className = 'fas fa-moon';
  }
})


}