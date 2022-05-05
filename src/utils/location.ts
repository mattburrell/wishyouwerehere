export const geoLocationEnabled = () => window.navigator.geolocation;

export const getUserLocation = (
  cb: PositionCallback,
  ecb: PositionErrorCallback | null | undefined,
) => window.navigator.geolocation.getCurrentPosition(cb, ecb);
