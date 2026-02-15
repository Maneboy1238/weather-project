const apiKey = 'c5ce93267dddf0eaaf60e63091426adb';
export async function fetchWeatherObjectUsingLatAndLon(lat, lon) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    return {
        api: 'error'
    }
    }
    const data = await response.json();
    return data;
    } catch (error) {
        return {
            error: 'network-error'
        }
    }
}

export async function fetchWeatherObjectUsingLocationName(location) {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
         ;
    }
    const data = await response.json();
    return data;
} catch(error) {
    return {
        error: 'network-error'
    }
}
    
}
export const weatherIconRanges = [
    {
        min: 200,
        max: 232,
        color: '45 90% 55%',
        icon: 'fa-bolt'
    },
    {
        min: 300,
        max: 321,
        color: '217 85% 60%',
        icon: 'fa-cloud-rain'
    },
    {
        min: 500,
        max: 531,
        color: '217 90% 55%',
        icon: 'fa-cloud-heavy'
    },
    {
        min: 600,
        max: 622,
        color: '200 80% 70%',
        icon: 'fa-snowflake'
    },
    {
        min: 701,
        max: 781,
        color: '210 10% 55%',
        icon: 'fa-smog'
    },
    {
        min: 800,
        max: 800,
        color: '43 95% 55%',
        icon: 'fa-sun'
    },
    {
        min: 801,
        max: 804,
        color: '215 25% 60%',
        icon: 'fa-cloud'
    }
]
export function getWeatherIconAndColor (weatherId) {
    const match = weatherIconRanges.find(weatherIcon=> weatherId >= weatherIcon.min && weatherId <= weatherIcon.max);
    return {
        color: match.color,
        icon: match.icon
    };
}