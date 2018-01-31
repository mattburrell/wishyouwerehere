import React from 'react';

const google = window.google;

const LONDON_POSITION = {
  lat: 51.5074,
  lng: 0.1278
};

export default class Map extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      temperature: 0,
      humidity: 0,
      icon: '',
      lon: 0,
      lat: 0,
      name: '',
      desc: ''
    };
    this.getWeather = this.getWeather.bind( this );
  }

  getWeather( lat, lon ) {
    fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=e1189fa38433116a66ad24e38b8cdc68` )
      .then( ( response ) => {
        return response.json()
      } ).then( ( json ) => {
        this.setState( {
          temperature: Math.round( json.main.temp ),
          humidity: Math.round( json.main.humidity ),
          icon: json.weather[0].icon,
          lon: json.coord.lon,
          lat: json.coord.lat,
          name: json.name,
          desc: json.weather[0].main
        } )
      } ).catch( ( ex ) => {
        console.log( 'parsing failed', ex )
      } )
  }

  componentDidMount() {
    this.map = new google.maps.Map( this.refs.map, {
      center: LONDON_POSITION,
      zoom: 10
    } );

    this.MapListener = this.map.addListener( 'click', e => {
      this.getWeather( e.latLng.lat(), e.latLng.lng() );
    } );
  }

  componentWillUnmount() {
    google.maps.event.removeListener( this.MapListener );
  }

  render() {
    const mapStyle = {
      height: 300,
      border: '1px solid black'
    };

    return (
      <div className="main">
        <h2>Click somewhere...</h2>
        <div ref="map" style={mapStyle}>I should be a map!</div>
        {this.state.name &&
          <div className="App-info">
            <h2>The weather in {this.state.name} (lon: {this.state.lon} lat: {this.state.lat}):</h2>
            <img src={this.state.icon && `http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather" />
            <p>{this.state.temperature}&#8451;</p>
            <p>Humidity: {this.state.humidity}%</p>
          </div>
        }
      </div>
    );
  }
}