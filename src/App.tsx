import { useCallback, useState } from 'react';
import MapComponent from './components/MapComponent';
import WeatherComponent from './components/WeatherComponent';
import { countries } from './data/countries';
import { Weather } from './types/Weather';
import axios from 'axios';
import { useGeoLocation } from './hooks/useGeoLocation';
import { GeoCoordinates } from './types/GeoCoordinates';

interface AppProps {
  defaultPosition: GeoCoordinates;
}

function App({ defaultPosition }: AppProps) {
  const { isComplete, latitude, longitude, locatorError } = useGeoLocation();
  const [weather, setWeather] = useState<Weather>();
  const [isFetchingWeather, setIsFetchingWeather] = useState<boolean>(false);

  const unknownCountry = 'Unknown';

  const lookupCountry = (code: string): string => {
    if (typeof code === 'undefined') return unknownCountry;
    return countries.find((c) => c.code === code)?.name ?? unknownCountry;
  };

  const memoizedGetWeather = useCallback(async (lat: number, lng: number) => {
    try {
      setIsFetchingWeather(true);

      const response = await axios.get(
        `/.netlify/functions/weather-service?lat=${lat}&lng=${lng}`,
      );
      const weather = response.data;

      setWeather({
        temperature: Math.round(weather.main.temp),
        humidity: Math.round(weather.main.humidity),
        icon: weather.weather[0].icon,
        lng: weather.coord.lon,
        lat: weather.coord.lat,
        name: weather.name?.length ? weather.name : unknownCountry,
        desc: weather.weather[0].main,
        country: lookupCountry(weather.sys.country),
      });
    } catch (err) {
      console.dir(err);
    } finally {
      setIsFetchingWeather(false);
    }
  }, []);

  return (
    <div className="py-12 bg-white">
      <div className="text-center">
        <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Wish you were here
        </h1>
      </div>
      <div className="text-center">
        <h3 className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
          Where would you like to go?
        </h3>
      </div>
      <div className="flex flex-col md:flex-row mx-20 mt-8 mb-8 gap-2 h-96">
        <div className="basis-1/2 min-h-full">
          {!isComplete ? (
            <div className="text-lg">Finding your location...</div>
          ) : (
            <MapComponent
              location={{
                lat: latitude || defaultPosition.lat,
                lng: longitude || defaultPosition.lng,
              }}
              onClick={memoizedGetWeather}
            />
          )}
          {locatorError && <div className="text-lg">An error occurred whilst finding your location...</div>}
        </div>
        <div className="basis-1/2 border-solid border-2 border-black-500 p-8">
          {isFetchingWeather && (
            <div className="text-lg">Fetching weather...</div>
          )}
          {!isFetchingWeather && weather && <WeatherComponent {...weather} />}
        </div>
      </div>
    </div>
  );
}

export default App;
