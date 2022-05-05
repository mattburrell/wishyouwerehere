export const geoLocationEnabled = () => global.navigator.geolocation;

export const getUserLocation = (
  cb: PositionCallback,
  ecb: PositionErrorCallback | null | undefined,
) => global.navigator.geolocation.getCurrentPosition(cb, ecb);
