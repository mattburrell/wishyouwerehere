import React, { Component } from 'react';
import PropTypes from 'prop-types';
import App from './App';
import withLocator from './Locator';
import { getWeather } from './WeatherService';
import { countries } from './Countries';

class AppContainer extends Component {
  static propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
    isLocating: PropTypes.bool.isRequired
  }

  static defaultProps = {
    longitude: 0,
    latitude: 0,
    isLocating: false
  }

  constructor(props) {
    super(props);
    this.state = {
      lng: props.longitude,
      lat: props.latitude,
      temperature: 0,
      humidity: 0,
      icon: '',
      name: '',
      desc: '',
      country: ''
    };

    this.updateMap = this.updateMap.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
    this.lookupCountry = this.lookupCountry.bind(this);
  }

  componentDidMount() {
    getWeather(this.props.latitude, this.props.longitude, this.updateMap);
  }

  componentDidUpdate(prevProps) {
    if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude) {
      getWeather(this.props.latitude, this.props.longitude, this.updateMap);
    }
  }

  lookupCountry(code) {
    if (typeof code === "undefined") return "Unknown";
    try {
      const name = countries.filter(c => c.code === code)[0].name;
      return name;
    }
    catch (e) {
      return "Unknown";
    }
  }

  updateWeather(e) {
    getWeather(e.latLng.lat(), e.latLng.lng(), this.updateMap);
  }

  updateMap(json) {
    this.setState({
      temperature: Math.round(json.main.temp),
      humidity: Math.round(json.main.humidity),
      icon: json.weather[0].icon,
      lng: json.coord.lon,
      lat: json.coord.lat,
      name: json.name.length ? json.name : `Lat: ${json.coord.lat}, Lng: ${json.coord.lon}`,
      desc: json.weather[0].main,
      country: this.lookupCountry(json.sys.country)
    })
  }

  render() {
    const { isLocating } = this.props;
    return <App {...this.state} isLocating={isLocating} updateWeather={this.updateWeather} />;
  }
}

export default withLocator(AppContainer);
