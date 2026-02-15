export function generateWeatherHTML(data) {
    const now = new Date();

// Get the day number
const day = now.getDate(); // 1, 2, 3 ...

// Get month in words
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const month = monthNames[now.getMonth()]; // getMonth() is 0-11

// Get time in 12-hour format with AM/PM
let hours = now.getHours();
const minutes = now.getMinutes().toString().padStart(2, "0");
const ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12 || 12; // convert 0-23 to 12-hour

const time = `${hours}:${minutes} ${ampm}`;
const formattedDate = `${day}, ${month}, ${time}`




    let weatherHTML = `
    
<section class="weather-section">
    <div class="weather">
        <div class="weather-heading">
            <p class="state">${data.name}</p>
            <p class="date">${formattedDate}</p>
        </div>
        <div class="weather-main-contents">
            <div class="degrees-description">
                <p class="degrees">${Math.round(data.temp)}°C</p>
                <p class="description">${data.weatherDesc}</p>
            </div>
            <div class="weather-icon-container">
                <span><i class="fa-solid ${data.icon} weather-icon"></i></span>
            </div>
        </div>
    </div>
</section>
<section class="feels-like-section">
    <div class="feels-like">
        <p>Feels like:</p>
        <p class="degrees">${Math.round(data.feelsLike)}°C</p>
    </div>
</section>
<section class="values">
    <div class="values-and-stats">
        <div class="stats">
            <span><i class="fa-solid fa-temperature-low"></i></span>
            <p class="stat">Temp-min:</p>
            <p class="value">${Math.round(data.tempMin)}°C</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-droplet"></i></span>
            <p class="stat">Humidity:</p>
            <p class="value">${data.humidity}%</p>
        </div>
        <div class="stats">
            <span>
                <i class="fa-solid fa-temperature-high"></i>
            </span>
            <p class="stat">Temp-max:</p>
            <p class="value">${data.tempMax}°C</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-gauge-high"></i></span>
            <p class="stat">Pressure:</p>
            <p class="value">${Math.round(data.pressure)}Pa</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-water"></i></span>
            <p class="stat">Sea lvl:</p>
            <p class="value">${Math.round(data.seaLvl)}Pa</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-mountain"></i></span>
            <p class="stat">Ground lvl:</p>
            <p class="value">${Math.round(data.grndLvl)}Pa</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-wind"></i></span>
            <p class="stat">Wind speed:</p>
            <p class="value">${data.windSpeed}m/s</p>
        </div>
        <div class="stats">
            <span><i class="fa-solid fa-location-dot"></i></span>
            <p class="stat">lon/lat"</p>
            <p class="value">${(data.lon).toFixed(2)}/${(data.lat).toFixed(2)}</p>
        </div>
    </div>
</section>
    `
    return weatherHTML
}