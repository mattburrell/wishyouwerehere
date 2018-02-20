import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { getMap, removeEventListeners } from './GoogleMapsAdapter';
import getWeather from './WeatherService';

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      temperature: 0,
      humidity: 0,
      icon: '',
      lng: 0,
      lat: 0,
      name: '',
      desc: ''
    };
    this.updateMap = this.updateMap.bind(this);
  }

  componentDidMount() {
    const position = { lat: this.props.lat, lng: this.props.lng };
    const map = getMap(this.refs, position);
    getWeather(this.props.lat, this.props.lng, this.updateMap);
    this.MapListener = map.addListener('click', e => {
      getWeather(e.latLng.lat(), e.latLng.lng(), this.updateMap);
    });
  }

  componentWillUnmount() {
    removeEventListeners(this.MapListener);
  }

  updateMap(json) {
    this.setState({
      temperature: Math.round(json.main.temp),
      humidity: Math.round(json.main.humidity),
      icon: json.weather[0].icon,
      lng: json.coord.lon,
      lat: json.coord.lat,
      name: json.name,
      desc: json.weather[0].main
    })
  }

  render() {
    const mapStyle = {
      height: 300,
      border: '1px solid black'
    };

    return (
      <Grid>
        <h3>Find your location</h3>
        <Row>
          <Col xs={12} md={4}>
            <div ref="map" style={mapStyle}>I should be a map!</div>
          </Col>
          <Col xs={12} md={8}>
            {this.state.name &&
              <div>
                <p>The weather in {this.state.name} (lon: {this.state.lng} lat: {this.state.lat}):</p>
                <img src={this.state.icon && `http://openweathermap.org/img/w/${this.state.icon}.png`} alt="weather" />
                <p>{this.state.temperature}&#8451;</p>
                <p>Humidity: {this.state.humidity}%</p>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}