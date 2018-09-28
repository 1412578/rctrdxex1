
export const getCurrentPos = ()=>{
  return new Promise((resolve, reject) =>{
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const toWorldCoords = (pixel, zoom) =>{
  const scale = Math.pow(2, zoom);
  return {x: pixel.x / scale, y: pixel.y /scale}; 
}
export const fromPixelToLatLng = (pixel, map, mapApi) => {
  console.log(map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest()));
  console.log(map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast()));
  console.log(toWorldCoords(pixel, map.getZoom()));
  return [pixel]
    .map(px => toWorldCoords(px, map.getZoom()))
    .map(coords => new mapApi.Point(
      coords.x + map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest()).x,
      coords.y + map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast()).y,
      ))
    .map(point => map.getProjection().fromPointToLatLng(point))
    .map(latLng => ({
      lat: latLng.lat(),
      lng: latLng.lng(),
    }))[0];
}
export function point2LatLng(point, map, mapApi) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = new mapApi.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
  return map.getProjection().fromPointToLatLng(worldPoint);
}