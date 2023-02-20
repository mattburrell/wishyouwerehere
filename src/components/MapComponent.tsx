import { memo, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { GeoCoordinates } from "../types/GeoCoordinates";

interface MapComponentProps {
  location: GeoCoordinates;
  onClick: Function;
}

function MapComponent({ location, onClick }: MapComponentProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API || "",
  });
  const [center, setCenter] = useState<GeoCoordinates>();

  useEffect(() => {
    onClick(location.lat, location.lng);
  }, [location.lat, location.lng, onClick]);

  const handleClick = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenter({ lat, lng });
    onClick(lat, lng);
  };

  if (loadError) {
    return (
      <div className="text-lg">Map cannot be loaded right now, sorry.</div>
    );
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", minHeight: "24rem" }}
      center={center || location}
      zoom={10}
      options={{ disableDefaultUI: true, zoomControl: true }}
      onClick={handleClick}
    >
      <Marker position={center || location} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default memo(MapComponent);
