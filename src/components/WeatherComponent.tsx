import { Weather } from "../types/Weather";

function WeatherComponent({
  name,
  icon,
  temperature,
  humidity,
  desc,
  country,
}: Weather) {
  return (
    <div>
      <h3 className='text-lg mb-3 uppercase'>Weather in {name}</h3>
      <p className='leading-relaxed'>
        <span className='font-bold'>Description:</span> {desc}{" "}
        <img
          className='inline'
          src={icon && `https://openweathermap.org/img/w/${icon}.png`}
          alt='weather'
        />
      </p>
      <p className='leading-relaxed'>
        <span className='font-bold'>Temperature:</span> {temperature}&#8451;
      </p>
      <p className='leading-relaxed'>
        <span className='font-bold'>Humidity:</span> {humidity}%
      </p>
      <p className='leading-relaxed'>
        <span className='font-bold'>Country:</span> {country}
      </p>
    </div>
  );
}

export default WeatherComponent;
