class LeafMap {
    constructor(containerId, defaultCoords, defaultZoom) {
        this.containerId = containerId;
        this.defaultCoords = defaultCoords;
        this.defaultZoom = defaultZoom;
        this.map = L.map(this.containerId, {
            zoomControl: false,
            center: this.defaultCoords,
            zoom: this.defaultZoom
        });
        this.markers = [];
    }

    initMap() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        L.control.zoom({
            position: 'topright'
        }).addTo(this.map);
    }

    bindEvents() {
        this.map.on('click', (e) => {
            this.addMarker(e.latlng);
        });
    }

    addMarker(latlng, replace = false) {
        if (replace) {
            this.marker.forEach(m => this.map.removeLayer(m));
            this.markers = [];
        }

        const coords = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
        const marker = L.marker(latlng, {
            draggable: true,
            autoPan: true
        }).addTo(this.map);
        this.map.flyTo(latlng, 16);
        marker.bindPopup("You clicked the map at " + coords).openPopup();
        this.markers.push(marker);

        marker.on('dragend', () => {
            marker.setPopupContent("Marker position: " + marker.getLatLng().toString()).openPopup();
            this.map.panTo(marker.getLatLng());
        });
    }

    addUserMarker(latlng) {
        const userMarker = L.circleMarker(latlng, {
            radius: 10,
        }).addTo(this.map);
        userMarker.bindPopup("Your location").openPopup();
        this.markers.push(userMarker);
    }
    locateUser() {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const userCoords = [pos.coords.latitude, pos.coords.longitude];
                this.addUserMarker(userCoords);
            },
            (err) => {
                alert("unable to retrieve your location: " + err.message);
            }
        );
    }

}

const app = new LeafMap("map", [48.2258, 31.1056], 6);
app.initMap();
app.bindEvents();
app.locateUser();