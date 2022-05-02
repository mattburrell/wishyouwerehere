import { memo, useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GeoCoordinates } from "../types/GeoCoordinates";

interface MapComponentProps {
  onClick: Function;
}

function MapComponent({ onClick }: MapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API || "",
  });

  const DEFAULT_POSITION: GeoCoordinates = {
    lat: 51.5,
    lng: -0.12,
  };

  const [isLocating, setIsLocating] = useState<boolean>(true);
  const [location, setLocation] = useState<GeoCoordinates>(DEFAULT_POSITION);

  useEffect(() => {
    try {
      if (global.navigator.geolocation) {
        global.navigator.geolocation.getCurrentPosition(
          (position: { coords: { latitude: number; longitude: number } }) => {
            setIsLocating(false);
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            setIsLocating(false);
            console.dir(err);
          }
        );
      }
    } catch (err) {
      setIsLocating(false);
      console.dir(err);
    }
  }, []);

  useEffect(() => {
    if (!location) return;
    onClick(location.lat, location.lng);
  }, [location, onClick]);

  const handleClick = (e) => {
    onClick(e.latLng.lat(), e.latLng.lng());
  };

  if (loadError) {
    return (
      <div className='text-lg'>Map cannot be loaded right now, sorry.</div>
    );
  }

  if (isLocating) {
    return <div className='text-lg'>Locating...</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", minHeight: "24rem" }}
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
