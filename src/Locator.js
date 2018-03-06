import React, { Component } from 'react'
import { canGetUserLocation, getUserLocation } from './LocationService'

const DEFAULT_POSITION = {
  lat: 51.5,
  lng: -0.12
}

// HOC injects latitude and longitude into WrappedComponent. Also injects prop to designate when locating.

export default function withLocator(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        latitude: DEFAULT_POSITION.lat,
        longitude: DEFAULT_POSITION.lng,
        isLocating: false
      };
    }

    componentDidCatch() {
      this.setState({ isLocating: false })
    }

    componentDidMount() {
      if (canGetUserLocation()) {
        this.setState({ isLocating: true })
        getUserLocation(position => {
          this.setState((prevState, props) => ({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            isLocating: false
          }));
        });
      }
    }

    render() {
      return <WrappedComponent {...this.state} />
    }
  }
}