# Wish You Were Here

A simple app for finding out the weather by clicking on a map! Demonstrates how to hide a secret from the client by using a serverless function hosted by Netlify.

The purpose of this example is to show how to use a React app with a Netlify backend Function.

Styling uses [Tailwind](https://tailwindcss.com/).

If your browser allows it, the app will find your location when you load the page.

## Dependencies

This project was bootstrapped with [Create React App](https://create-react-app.dev/).

You'll need an api key from [OpenWeatherMap API](https://openweathermap.org/api) to retrieve weather data.

You'll also need a [Google Maps](https://developers.google.com/maps/) api key.

## Installation
```sh
  printf 'WEATHERAPI=<your-api-key>\nREACT_APP_GOOGLE_MAPS_API=<your-api-key>' > .env
  npm install
```

## Running the application

Open a terminal window and run the app using the Netlify cli:

```sh
npm run dev
```

By default, the app will run at ```http://localhost:8888/```

## Running the tests

```sh
npm test
```

## Deploy to Netlify

```sh
npm install netlify-cli -g
netlify deploy
```

You will need to add these Build Environment Variables to Netlify:

* REACT_APP_GOOGLE_MAPS_API=your-api-key
* WEATHER_API=your-api-key
