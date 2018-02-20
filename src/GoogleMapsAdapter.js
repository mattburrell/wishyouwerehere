export const getMap = (refs, location) => {
  return new window.google.maps.Map(refs.map, {
    center: location,
    zoom: 10
  });
}

export const removeEventListeners = () => {
  window.google.maps.event.removeListener(this.MapListener);
}