---
title: "SOP Training area D82-01"
excerpt: "Virtual Spercial operations Training zone for MSFS simmers in the special area D82 HASSI BAHBAH"
toc: true
date: 2025-02-24T00:00:00+01:00
last_modified_at: 2025-02-24T00:00:00+01:00
# comments: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/d82-01/D82-0101.webp
  teaser: /content/images/sceneries/d82-01/D82-0101.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "https://deltazulusim.short.gy/sceneries/d82-01/v1.0.0"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Area"
    image: /content/images/sceneries/d82-01/D82-0103.webp
    image_alt: "MSFS Algerian Training zone"
    text: "DA – D82 HASSI BAHBAH"
  - title: "ICAO"
    text: "None"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/d82-01/D82-0101.webp
    image_path: /content/images/sceneries/d82-01/D82-0101.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d82-01/D82-0102.webp
    image_path: /content/images/sceneries/d82-01/D82-0102.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d82-01/D82-0103.webp
    image_path: /content/images/sceneries/d82-01/D82-0103.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d82-01/D82-0104.webp
    image_path: /content/images/sceneries/d82-01/D82-0104.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"

changelog:
  - version: "1.0.0"
    version_date: "2025-02-23"
    download_url: "https://deltazulusim.short.gy/sceneries/d82-01/v1.0.0"
    changes:
      - "initial version"
---

Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024
{:.notice}

This scenery brings to life an unpaved runway located within Military Area D82, in the Hassi Bahbah region, near Aïn Oussera Air base (DAQQ). Developed for SOP Simmers, it provides a realistic and challenging training environment for military and tactical flight operations.

Pilots can navigate to the area by departing Aïn Oussera Air base (DAQQ) and heading southbound.

<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [34.93, 2.55];

  // Initialize the map
  var map = L.map('map', {
    center: centerCoords,
    zoom: 7,
    minZoom: 5
  });

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 16
}).addTo(map); 

fetch('/assets/geojson/dz_asp.geojson') // Algeria's GeoJSON
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: '#03240f',      // Border color
        weight: 2,         // Border thickness
        fillColor: 'white', // Inside color
        fillOpacity: 0.1   // Transparency
      }
    }).addTo(map);
  });

  // Add a marker using the same coordinates
  // Define a green marker icon
  var milMarker = L.icon({
    iconUrl: '/assets/images/mil-marker.png', // Replace with your green marker image
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
    popupAnchor: [0, -32] // Position of the popup relative to the icon
  });

  // Add a marker using the custom green icon
  var marker = L.marker(centerCoords, { icon: milMarker }).addTo(map)
    // .bindPopup('<a href="/sceneries/training-zone-d82-01/">D82-01</a>')
    .openPopup();
</script>


## Key features:
- Upgraded unpaved runway with improved ground surface.
- Added lighting for enhanced visibility during night operations.
- Strategic location, making it ideal for approach and landing practice in rugged conditions.

## Gallery 
{% include gallery caption="Some screenshots for the scenery from the sky!" %}

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS and enjoy your flight over D82 areea

## Download
This scenery is designed to enhance realism, immersion, and operational training in Microsoft Flight Simulator 2020 & 2024.

[<i class='fas fa-download'></i> Download](https://deltazulusim.short.gy/sceneries/d82-01/v1.0.0){: .btn .btn--success .btn--x-large}
