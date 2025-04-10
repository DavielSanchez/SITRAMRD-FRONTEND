const drawMetroLine = async (map, nombreRuta, idFuente, idCapa, color) => {
    try {
      const response = await fetch(`/metro/${nombreRuta}`);
      const data = await response.json();
  
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: data.map(p => [p.lng, p.lat])
        }
      };
  
      if (map.getSource(idFuente)) {
        map.getSource(idFuente).setData(geojson);
      } else {
        map.addSource(idFuente, {
          type: 'geojson',
          data: geojson
        });
  
        map.addLayer({
          id: idCapa,
          type: 'line',
          source: idFuente,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': color,
            'line-width': 3
          }
        });
      }
    } catch (err) {
      console.error(`Error dibujando ${nombreRuta}:`, err);
    }
  };
  
  export default drawMetroLine;
  