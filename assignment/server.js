// server.js (Node.js Backend)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = 'your_openweathermap_api_key';

app.get('/weather', async (req, res) => {
    const { location } = req.query;
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch weather data' });
    }
});

app.get('/forecast', async (req, res) => {
    const { location } = req.query;
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch forecast data' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
