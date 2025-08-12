var map = L.map("map", {
    zoomControl: false,
    center: [49.84189, 24.03148],
    zoom: 13
});

new L.Control.Zoom({
    position: 'topright'}).addTo(map);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


map.on('click', function(e) {
    // Remove existing markers if any
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    var marker = L.marker(e.latlng, {
        draggable: true,
        autoPan: true
    }).addTo(map);

    map.flyTo(e.latlng, 18);
    marker.bindPopup("You clicked the map at " + e.latlng.toString()).openPopup();
    marker.on('dragend', function(event) {
        marker.setPopupContent("Marker position: " + marker.getLatLng().toString()).openPopup();
        map.panTo(marker.getLatLng());
    });

});

    
