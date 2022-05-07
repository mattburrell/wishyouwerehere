import { useEffect, useState } from 'react';

export interface GeoLocationResult {
  latitude?: number;
  longitude?: number;
  isComplete: boolean;
  locatorError?: GeolocationPositionError;
}

export const useGeoLocation = (): GeoLocationResult => {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>();
  const [locatorError, setLocatorError] = useState<GeolocationPositionError>();
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;

    const onLocationFound = (position: GeolocationPosition) => {
      if (!didCancel) {
        setCoordinates(position.coords);
        setIsComplete(true);
      }
    };

    const onLocationError = (err: GeolocationPositionError) => {
      if (!didCancel) {
        setLocatorError(err);
        setIsComplete(true);
      }
    };

    if (didCancel) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onLocationFound,
        onLocationError,
      );
    } else {
      setIsComplete(true);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return {
    latitude: coordinates?.latitude,
    longitude: coordinates?.longitude,
    isComplete,
    locatorError,
  };
};
