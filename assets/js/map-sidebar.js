document.addEventListener('DOMContentLoaded', function () {
    var mapDiv = document.getElementById('map');
    if (!mapDiv) return;
  
    const centerCoords = JSON.parse(mapDiv.getAttribute('data-center-coords'));
    const isMilitary = mapDiv.getAttribute('data-is-military') === 'true';
  
    var map = L.map('map', {
      center: centerCoords,
      zoom: 5,
      minZoom: 5,
      maxZoom: 5,
      zoomControl: false,        // Disable the + / - buttons
      scrollWheelZoom: false,    // Disable mouse wheel zoom
      doubleClickZoom: false,    // Disable double-click zoom
      dragging: false,           // Disable dragging/panning
      touchZoom: false,          // Disable touch zoom
    });
  
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 16
    }).addTo(map);
  
    fetch('/assets/geojson/algeria.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#dddddd',
            weight: 1,
            fillColor: '#deffe7',
            fillOpacity: 0.5
          }
        }).addTo(map);
      });
  
    var markerIcon = L.icon({
      iconUrl: isMilitary ? '/assets/images/mil-marker.png' : '/assets/images/marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  
    var marker = L.marker(centerCoords, { icon: markerIcon }).addTo(map)
      .openPopup();
  });
  