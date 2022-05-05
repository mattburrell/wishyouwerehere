require('dotenv').config();
const axios = require('axios');

exports.handler = async function (event, context) {
  const lat = event.queryStringParameters.lat;
  const lng = event.queryStringParameters.lng;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.WEATHERAPI}`,
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'An error occurred.' }),
    };
  }
};
