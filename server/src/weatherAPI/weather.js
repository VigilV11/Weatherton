const helpers = require('./helpers/helpers');

async function getWeatherData(place) {
  try {
    const { currentTemp, feelslikeTemp, weatherForecast } =
      await helpers.fetchWeatherFromUrl(place);

    return `${weatherForecast}. The current temperature is ${currentTemp}°C, ${
      currentTemp === feelslikeTemp ? 'and' : 'but'
    } it feels like ${feelslikeTemp}°C.`;
  } catch (e) {
    throw new Error(e.message);
  }
}

// (async function () {
//   if (process.argv.length < 3) {
//     console.error('Please provide the name of the place.');
//   } else {
//     const result = await getWeatherData(process.argv[2]);
//     console.log(result);
//   }
// })();

module.exports = getWeatherData;
