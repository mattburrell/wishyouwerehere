export const canGetUserLocation = () => document.location.protocol === "https" && global.navigator.geolocation;

export const getUserLocation = (cb) => global.navigator.geolocation.getCurrentPosition(cb);