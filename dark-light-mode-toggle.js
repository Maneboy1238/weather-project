const toggleBtn = document.querySelector('.mode-toggle');
export function darkMode(toggleBtn, setIsDark) {
    const weatherDiv = document.querySelector('.weather');
    const searchBar = document.querySelector('.search-bar');
    const locationIcon = document.querySelector('.fa-location-dot');
    const weatherHeading = document.querySelector('.weather-heading');
    const icon = document.querySelectorAll('.stats span i');
    const searchButton = document.querySelector('button');
    const searchInput = document.querySelector('.input');
    icon.forEach(icon=> icon.classList.add('dark'))
    document.body.classList.add('dark')
    weatherDiv.classList.add('dark')
    searchButton.classList.add('dark');
    searchInput.classList.add('dark')
    searchBar.classList.add('dark')
    locationIcon.classList.add('dark')
    weatherHeading.classList.add('dark');
    toggleBtn.querySelector('i').classList.add('dark');
    toggleBtn.classList.add('dark');
    
    setIsDark(true)
}

export function lightMode(toggleBtn, setIsDark) {
    const weatherDiv = document.querySelector('.weather');
    const searchBar = document.querySelector('.search-bar');
    const locationIcon = document.querySelector('.fa-location-dot');
    const weatherHeading = document.querySelector('.weather-heading');
    const icon = document.querySelectorAll('.stats span i');
    const searchButton = document.querySelector('button');
    const searchInput = document.querySelector('.input');
    
    icon.forEach(icon=> icon.classList.remove('dark'));
    searchButton.classList.remove('dark');
    searchInput.classList.remove('dark')
    document.body.classList.remove('dark')
    weatherDiv.classList.remove('dark')
    searchBar.classList.remove('dark')
    locationIcon.classList.remove('dark')
    weatherHeading.classList.remove('dark')
    toggleBtn.querySelector('i').classList.remove('dark');
    toggleBtn.classList.remove('dark');
    setIsDark(false)
}