import { memo, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { GeoCoordinates } from '../types/GeoCoordinates';

interface MapComponentProps {
  location: GeoCoordinates;
  onClick: Function;
}

function MapComponent({ location, onClick }: MapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API || '',
  });

  useEffect(() => {
    onClick(location.lat, location.lng);
  }, [location, onClick]);

  const handleClick = (e) => {
    onClick(e.latLng.lat(), e.latLng.lng());
  };

  if (loadError) {
    return (
      <div className="text-lg">Map cannot be loaded right now, sorry.</div>
    );
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: '100%', minHeight: '24rem' }}
      center={location}
      zoom={10}
      onClick={handleClick}
    >
      <Marker position={location} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MapComponent);
