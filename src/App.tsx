import { useCallback, useState } from "react";
import MapComponent from "./components/MapComponent";
import WeatherComponent from "./components/WeatherComponent";
import axios from "axios";
import { countries } from "./data/countries";
import { Weather } from "./types/Weather";

function App() {
  const [weather, setWeather] = useState<Weather>();
  const unknownCountry = "Unknown";

  const lookupCountry = (code: string): string => {
    if (typeof code === "undefined") return unknownCountry;
    return countries.find((c) => c.code === code)?.name ?? unknownCountry;
  };

  const memoizedGetWeather = useCallback(async (lat: number, lng: number) => {
    try {
      const response = await axios.get(
        `/.netlify/functions/weather-service?lat=${lat}&lng=${lng}`
      );
      const weather = response.data;
      setWeather({
        temperature: Math.round(weather.main.temp),
        humidity: Math.round(weather.main.humidity),
        icon: weather.weather[0].icon,
        lng: weather.coord.lon,
        lat: weather.coord.lat,
        name: weather.name.length
          ? weather.name
          : `Lat: ${weather.coord.lat}, Lng: ${weather.coord.lon}`,
        desc: weather.weather[0].main,
        country: lookupCountry(weather.sys.country),
      });
    } catch (err) {
      console.dir(err);
    }
  }, []);

  return (
    <div className='py-12 bg-white'>
      <div className='text-center'>
        <h1 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
          Wish you were here
        </h1>
      </div>
      <div className='text-center'>
        <h3 className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
          Where would you like to go?
        </h3>
      </div>
      <div className='flex flex-col md:flex-row mx-20 mt-8 mb-8 gap-2 h-96'>
        <div className='basis-1/2 min-h-full'>
          <MapComponent onClick={memoizedGetWeather} />
        </div>
        <div className='basis-1/2 border-solid border-2 border-black-500 p-8'>
          {weather ? <WeatherComponent {...weather} /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
