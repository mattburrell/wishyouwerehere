type GeoCoordinates = {
  lat: number;
  lng: number;
};

type GeoLocationResult = {
  latitude?: number;
  longitude?: number;
  isComplete: boolean;
  locatorError?: GeolocationPositionError;
};
