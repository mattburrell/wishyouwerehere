import React, { Component } from 'react';
import './App.css';
import Map from './Map';
import Footer from './Footer';

const LONDON_POSITION = {
  lat: 51.5074,
  lng: 0.1278
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = LONDON_POSITION;
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState((prevState, props) => ({
          lng: position.coords.longitude,
          lat: position.coords.latitude
        }));
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Wish you were here?</h1>
        </header>
        <Map lat={this.state.lat} lng={this.state.lng} />
        <Footer />
      </div>
    );
  }
}

export default App;
