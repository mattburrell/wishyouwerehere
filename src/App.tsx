import { useCallback, useState } from "react";
import MapComponent from "./components/MapComponent";
import WeatherComponent from "./components/WeatherComponent";
import { countries } from "./data/countries";
import { Weather } from "./types/Weather";
import axios from "axios";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { GeoCoordinates } from "./types/GeoCoordinates";
import WeatherLoader from "./components/WeatherLoader";
import MapLoader from "./components/MapLoader";

const unknownCountry = "Unknown";

interface AppProps {
  defaultPosition: GeoCoordinates;
}

function App({ defaultPosition }: AppProps) {
  const { isComplete, latitude, longitude } = useGeoLocation();
  const [weather, setWeather] = useState<Weather>();
  const [isFetchingWeather, setIsFetchingWeather] = useState<boolean>(false);

  const lookupCountry = (code: string): string => {
    if (typeof code === "undefined") {
      return unknownCountry;
    }
    return countries.find((c) => c.code === code)?.name ?? unknownCountry;
  };

  const memoizedGetWeather = useCallback(async (lat: number, lng: number) => {
    try {
      setIsFetchingWeather(true);
      const response = await axios.get(
        `/.netlify/functions/weather-service/${lat}/${lng}`
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
    <div className="mt-12 m-8 md:max-w-[1000px] md:mx-auto grid grid-cols-1 grid-rows-[auto_auto_minmax(24rem,1fr)_minmax(24rem,1fr)_auto] md:grid-cols-2 md:grid-rows-[auto_auto_minmax(24rem,1fr)_auto] gap-x-4 gap-y-6">
      <div className="col-span-1 md:col-span-2">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-blue-900 text-center">
          Wish You Were Here?
        </h1>
      </div>
      <div className="col-span-1 md:col-span-2">
        <h3 className="text-xl text-gray-500 text-center">
          Click a location on the map
        </h3>
      </div>
      <div className="col-span-1 border-solid border-2 border-grey-500 flex justify-center align-middle flex-row bg-slate-100">
        {!isComplete ? (
          <MapLoader />
        ) : (
          <MapComponent
            location={{
              lat: latitude || defaultPosition.lat,
              lng: longitude || defaultPosition.lng,
            }}
            onClick={memoizedGetWeather}
          />
        )}
      </div>
      <div className="col-span-1 border-solid border-2 border-grey-500 p-4 flex justify-start">
        {isFetchingWeather && <WeatherLoader />}
        {!isFetchingWeather && weather && <WeatherComponent {...weather} />}
      </div>
      <footer className="col-span-1 md:col-span-2 text-xs text-center">
        Built by Matt
      </footer>
    </div>
  );
}

export default App;
