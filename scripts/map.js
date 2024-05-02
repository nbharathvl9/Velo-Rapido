var map = L.map('map').setView([51.505, -0.09], 13);

        // Custom dark tile layer
        var darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            //attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        });

        // Add dark tile layer to the map
        darkLayer.addTo(map);

        var fromInput = document.getElementById('from');
        var toInput = document.getElementById('to');

        var fromMarker;
        var toMarker;

        map.on('click', function(e) {
            var latitude = e.latlng.lat;
            var longitude = e.latlng.lng;

            // Use Leaflet's reverse geocoding to get the place name
            var geocodeUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude;
            
            fetch(geocodeUrl)
                .then(response => response.json())
                .then(data => {
                    var placeName = data.display_name;
                    if (!fromMarker) {
                        fromMarker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
                        fromInput.value = placeName;
                    } else if (!toMarker) {
                        toMarker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
                        toInput.value = placeName;
                    } else {
                        // Clear existing markers and set new "from" marker
                        map.removeLayer(fromMarker);
                        map.removeLayer(toMarker);
                        fromMarker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
                        fromInput.value = placeName;
                        toMarker = null;
                        toInput.value = '';
                    }
                });
        });

        // Update input fields when dragging markers
        map.on('dragend', function(event) {
            var latitude = event.target._latlng.lat;
            var longitude = event.target._latlng.lng;

            // Use Leaflet's reverse geocoding to get the place name
            var geocodeUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + latitude + '&lon=' + longitude;
            
            fetch(geocodeUrl)
                .then(response => response.json())
                .then(data => {
                    var placeName = data.display_name;
                    if (event.target === fromMarker) {
                        fromInput.value = placeName;
                    } else if (event.target === toMarker) {
                        toInput.value = placeName;
                    }
                });
        });