function WeatherComponent({
  name,
  icon,
  temperature,
  humidity,
  desc,
  country,
  lat,
  lng,
}: Weather) {
  return (
    <div className="grid grid-cols-2 grid-flow-row">
      <h3 className="text-lg mb-3 uppercase col-span-2 font-bold">
        {name} ({lat}&deg;N, {lng}&deg;W)
      </h3>
      <div className="font-bold">Temperature:</div> {temperature}&#8451;
      <div className="font-bold">Humidity:</div> {humidity}%
      <div className="font-bold">Country:</div> {country}
      <div className="font-bold">Description:</div> {desc}{" "}
      <div className="col-start-2">
        <img
          src={icon && `https://openweathermap.org/img/w/${icon}.png`}
          alt="weather"
        />
      </div>
    </div>
  );
}

export default WeatherComponent;
