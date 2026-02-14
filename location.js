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
export function updateMap(mapInstance, lat,lon,name,accuracy) {
    mapInstance.setView([lat, lon], 16);
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