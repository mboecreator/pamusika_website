const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock sensor data (replace with real data from IoT sensors)
let sensorData = {
    soilMoisture: 35,
    temperature: 25,
    humidity: 60,
    lightIntensity: 1200,
};

// API to get sensor data
app.get('/api/sensor-data', (req, res) => {
    res.json(sensorData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});