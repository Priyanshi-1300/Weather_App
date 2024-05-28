const apiKey = `e1d895252096f8f0c99f125422ed92f4`; // Replace with your OpenWeatherMap API key

document.addEventListener("DOMContentLoaded", function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function getWeatherByLocation(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherData(`lat=${lat}&lon=${lon}`);
}

function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(`q=${location}`);
}

function fetchWeatherData(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching the weather data:', error));
}

function displayWeather(data) {
    if (data.cod !== 200) {
        alert('Location not found');
        return;
    }
    document.getElementById('weatherSection').style.display = 'block';
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

function showError(error) {
    alert(`Geolocation error: ${error.message}`);
}
