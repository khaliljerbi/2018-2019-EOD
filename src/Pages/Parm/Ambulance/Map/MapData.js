export const addData = async (query) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=10&q=${query}`);
  const data = await response.json();
  const features = data.map(elem => ({
    type: 'Feature',
    place_name: elem.display_name,
    center: [elem.lon, elem.lat],
    propreties: {
      title: elem.display_name,
    },
    geometry: {
      coordinates: [elem.lon, elem.lat],
      type: 'Point',
    },
  }));
  return features;
};
