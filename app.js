const config = require('./config');
const axios = require('axios');

// USING CALLBACK FUNCTION

// async function getWeatherData(location, callback) {
//   const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${
//     config.WEATHER_STACK_API_KEY
//   }&query=${encodeURIComponent(location)}`;

//   try {
//     const response = await axios.get(urlWeatherStack);

//     const currentTemp = response.data.current.temperature;
//     const feelslikeTemp = response.data.current.feelslike;
//     const weatherForecast = response.data.current.weather_descriptions[0];

//     callback(currentTemp, feelslikeTemp, weatherForecast);
//   } catch (e) {
//     console.error('Something went wrong: ', e.message);
//   }
// }

// function callback(currentTemp, feelslikeTemp, weatherForecast) {
//   console.log(
//     `${weatherForecast}. The current temperature is ${currentTemp}°C, ${
//       currentTemp === feelslikeTemp ? 'and' : 'but'
//     } it feels like ${feelslikeTemp}°C.`
//   );
// }

// getWeatherData('London', callback);

// USING PROMISES

async function fetchWeatherFromUrl(place) {
  const urlWeatherStack = `http://api.weatherstack.com/current?access_key=${
    config.WEATHER_STACK_API_KEY
  }&query=${encodeURIComponent(place)}`;

  try {
    const response = await axios.get(urlWeatherStack);

    if (!response.data.success) {
      throw new Error('Could not fetch data.');
    }

    const currentTemp = response.data.current.temperature;
    const feelslikeTemp = response.data.current.feelslike;
    const weatherForecast = response.data.current.weather_descriptions[0];

    return Promise.resolve({ currentTemp, feelslikeTemp, weatherForecast });
  } catch (e) {
    return Promise.reject(e);
  }
}

async function getWeatherData(place) {
  try {
    const { currentTemp, feelslikeTemp, weatherForecast } =
      await fetchWeatherFromUrl(place);

    console.log(
      `${weatherForecast}. The current temperature is ${currentTemp}°C, ${
        currentTemp === feelslikeTemp ? 'and' : 'but'
      } it feels like ${feelslikeTemp}°C.`
    );
  } catch (e) {
    console.log(e.message);
  }
}

if (process.argv.length < 3) {
  console.error('Please provide the name of the place.');
} else {
  getWeatherData(process.argv[2]);
}
