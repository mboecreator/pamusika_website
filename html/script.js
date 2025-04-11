// Fetch real-time sensor data from the backend
async function fetchSensorData() {
    const response = await fetch('/api/sensor-data');
    const data = await response.json();
    return data;
}

// Update the dashboard with sensor data
function updateDashboard(data) {
    document.getElementById('soil-moisture').textContent = data.soilMoisture;
    document.getElementById('temperature').textContent = data.temperature;
    document.getElementById('humidity').textContent = data.humidity;
    document.getElementById('light-intensity').textContent = data.lightIntensity;
}

// Fetch weather data from an API
async function fetchWeather() {
    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your API key
    const city = 'Farm Location'; // Replace with the farm's location
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
}

// Update the weather section
function updateWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

// Render a chart for historical sensor data
function renderChart(data) {
    const ctx = document.getElementById('sensorChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Soil Moisture (%)',
                data: data.soilMoisture,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Main function to initialize the app
async function init() {
    const sensorData = await fetchSensorData();
    updateDashboard(sensorData);

    const weatherData = await fetchWeather();
    updateWeather(weatherData);

    // Example historical data (replace with real data from the backend)
    const historicalData = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
        soilMoisture: [30, 35, 40, 38, 42],
    };
    renderChart(historicalData);
}

// Initialize the app
init();