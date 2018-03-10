export const canGetUserLocation = () => document.location.protocol === "https:" && global.navigator.geolocation;

export const getUserLocation = (cb, ecb) => global.navigator.geolocation.getCurrentPosition(cb, ecb);