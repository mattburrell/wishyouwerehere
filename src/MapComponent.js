import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = withScriptjs(withGoogleMap(({ zoom, position, onMapClick }) =>
  <GoogleMap defaultZoom={zoom} center={position} onClick={onMapClick}>
    <Marker position={position} />
  </GoogleMap>
))

export default MapComponent;