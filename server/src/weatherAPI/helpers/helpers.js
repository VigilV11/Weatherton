const config = require('../config');
const axios = require('axios');

async function fetchWeatherFromUrl(place) {
  const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${
    config.WEATHER_STACK_API_KEY
  }&query=${encodeURIComponent(place)}`;

  try {
    const response = await axios.get(urlWeatherStack);

    if (response.data?.success === false) {
      throw new Error('Could not fetch data.');
    }

    const currentTemp = response.data.current.temperature;
    const feelslikeTemp = response.data.current.feelslike;
    const weatherForecast = response.data.current.weather_descriptions[0];

    return Promise.resolve({ currentTemp, feelslikeTemp, weatherForecast });
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  fetchWeatherFromUrl,
};
