const getWeather = ( lat, lon, callback ) => {
    fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e1189fa38433116a66ad24e38b8cdc68` )
      .then( ( response ) => {
        return response.json()
      } ).then( ( json ) => {
        callback(json)
      } ).catch( ( ex ) => {
        console.log( 'parsing failed', ex )
      } )
  }

  export default getWeather;