const path = require('path');
const express = require('express');

const getWeatherData = require('./weatherAPI/weather');

const app = express();

const publicPath = path.join(process.cwd() + '/server/public');

app.use(express.static(publicPath));

app.get('/weather', async (req, res) => {
  if (!req.query.address) {
    return res.send({ message: 'No address found.' });
  }

  try {
    const result = await getWeatherData(req.query.address);
    res.status(200).send({ message: result });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

app.get('/*', (req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(process.env.PORT || 3000, () =>
  console.log('Listening at port 3000...')
);
