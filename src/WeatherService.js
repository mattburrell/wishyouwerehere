export const getWeather = ( lat, lng, callback ) => {
    fetch( `${process.env.REACT_APP_WEATHER_ENDPOINT}?lat=${lat}&lng=${lng}`)
      .then( ( response ) => {
        return response.json()
      } ).then( ( json ) => {
        callback(json)
      } ).catch( ( ex ) => {
        console.log( 'parsing failed', ex )
      } )
  }