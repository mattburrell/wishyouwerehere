const LONDON_POSITION = {
  lat: 51.5074,
  lng: 0.1278
};

export const getMap = (refs) => {
  return new window.google.maps.Map(refs.map, {
    center: LONDON_POSITION,
    zoom: 10
  });
}

export const removeEventListeners = () => {
  window.google.maps.event.removeListener(this.MapListener);
}