export function gettingUserCurrentLocation () {
    return new Promise((resolve)=> {
        if (!navigator.geolocation) {
            resolve(null);
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=> {
            const {latitude, longitude, accuracy} = position.coords;
            resolve({ latitude, longitude, accuracy })
        }, (error)=> {
            console.error(error)
            resolve(null)
        })
    })
}
let marker;
let circle;
export function initMap() {
    const L = window.L;

// create map
    const map = L.map("map").setView([51.505, -0.09], 13);

// add tile layer (THIS WAS MISSING)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 22,
  maxNativeZoom: 19
})
.addTo(map);

return map;
}
export function updateMap(mapInstance, lat,lon,name,accuracy) {
    mapInstance.setView([lat, lon], 13);
    if (marker) mapInstance.removeLayer(marker);
    if (circle)  mapInstance.removeLayer(circle);
    marker =  L.marker([lat, lon]).addTo(mapInstance)
    .bindPopup(`${name}`)
    .openPopup();
    circle = L.circle([lat, lon], {
        radius: accuracy,
        color: 'yellow',
        fill: '#ffff00',
        fillOpacity: 0.2
    }).addTo(mapInstance)
}