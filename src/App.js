import React from 'react';
import './App.css';
import locating from './locating.gif';
import { Grid, Row, Col, Label } from 'react-bootstrap';
import Footer from './Footer';
import WeatherComponent from './WeatherComponent';
import MapComponent from './MapComponent';

const App = (props) => {
  const { isLocating } = props;
  if (isLocating) {
    return <img src={locating} alt="Finding your location..." style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '250px' }} />
  }
  return (
    <Grid>
      <Row>
        <Col xs={12}>
          <header className="App-header">
            <h1 className="App-title">Wish you were here?</h1>
          </header>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h3><Label bsStyle="info">Where would you like to go?</Label></h3>
        </Col>
      </Row>
      <Row>
        <Col md={8} data-test="map-component">
          <MapComponent
            zoom={2}
            position={{ lat: props.lat, lng: props.lng }}
            onMapClick={props.updateWeather}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDlwmWAojJSRz9O-Kpcf4IJRXBs2XqMMGo"
            loadingElement={<div style={{ height: '100%' }} />}
            containerElement={<div style={{ border: '1px solid black', height: '300px', marginBottom: '20px', id: 'sdgsdg' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </Col>
        <Col md={4}>
          <WeatherComponent {...props} />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Footer />
        </Col>
      </Row>
    </Grid>
  )
}

export default App;