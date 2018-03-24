# Wish You Were Here

A simple app for finding out the weather by clicking on a map!

The purpose of this example is to show how to keep api keys secret. (Hint: use a lambda!)

If your browser allows it, the app will find your location when you load the page.

Demo: [www.wishyouwerehere.online](https://www.wishyouwerehere.online).

## Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You'll need an api key from [OpenWeatherMap API](https://openweathermap.org/api) to retrieve weather data.

You'll also need a [Google Maps](https://developers.google.com/maps/) api key.

## Installation
```sh
  printf 'WEATHERAPI=<your-api-key>\nREACT_APP_WEATHER_ENDPOINT=/weatherHandler\nREACT_APP_GOOGLE_MAPS_API=<your-api-key>' > .env
  npm install
```

## Running the application

Open a terminal window and run the netlify server:

```sh
npm run start:lambda
```

In another terminal run the app:

```sh
npm start
```

## Running the tests

```sh
npm test
```

## Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify/netlify-statuskit)


```sh
npm install netlify-cli -g
netlify deploy
```

You will need to add two Build Environment Variables to Netlify:

* REACT_APP_WEATHER_ENDPOINT=your-domain/.netlify/functions/weatherHandler
* REACT_APP_GOOGLE_MAPS_API=your-api-key
* WEATHER_API=your-api-key
