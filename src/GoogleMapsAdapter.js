export const getMap = (refs, loc) => {
  return new window.google.maps.Map(refs.map, {
    center: loc,
    zoom: 10
  });
}

export const removeEventListeners = (listener) => {
  window.google.maps.event.removeListener(listener);
}