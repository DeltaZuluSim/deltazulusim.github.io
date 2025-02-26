---
title: "SOP Training area D50E-01"
excerpt: "Virtual Spercial operations Training zone for MSFS simmers in the special area D50E on the south of Bousfer Air base (DAOE)"
toc: true
date: 2025-02-24T00:00:00+01:00
last_modified_at: 2025-02-24T00:00:00+01:00
# comments: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/d50e-01/D50E-0101.webp
  teaser: /content/images/sceneries/d50e-01/D50E-0101.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "https://deltazulusim.short.gy/sceneries/d50e-01/v1.0.0"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Area"
    image: /content/images/sceneries/d50e-01/D50E-0103.webp
    image_alt: "MSFS Algerian Training zone"
    text: "D50E"
  - title: "ICAO"
    text: "None"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/d50e-01/D50E-0101.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0101.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d50e-01/D50E-0102.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0102.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d50e-01/D50E-0103.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0103.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d50e-01/D50E-0104.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0104.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d50e-01/D50E-0105.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0105.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d50e-01/D50E-0106.webp
    image_path: /content/images/sceneries/d50e-01/D50E-0106.webp
    alt: "Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024"

changelog:
  - version: "1.0.0"
    version_date: "2025-02-23"
    download_url: "https://deltazulusim.short.gy/sceneries/d50e-01/v1.0.0"
    changes:
      - "initial version"
---

Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024
{:.notice}

This scenery has been developed for SOP Simmers to enhance their training exercises and enjoy realistic military operations. It is located within Military Area D50E, south of Oran and north of Mécheria, making it an ideal training ground for military and tactical flight operations.

Pilots can reach the area by:

- Departing Bousfer Air base (DAOE) or Tafraoui Air base (DAOL) and flying southbound.
- Taking off from Mécheria Airport (DAAY) and flying northbound.
- Navigating via Oran VOR (ORA 114.0) using radial 360° or 180°, depending on the departure point.

Designed with realism and immersion in mind, this scenery provides a challenging and strategic training environment for Microsoft Flight Simulator 2020 & 2024.

<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [34.38, -0.42];

  // Initialize the map
  var map = L.map('map',{
  center: centerCoords,
  zoom: 7,
  minZoom: 5,
 
});

  // Add OpenStreetMap tile layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CartoDB</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

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




## Gallery 
{% include gallery caption="Some screenshots for the scenery from the sky!" %}

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS and enjoy your flight over D50E areea

{% capture notice-text %}

This scenery references some optional models from the following third party sceneries: 
* [Military Camp Library](https://flightsim.to/file/56383/military-camp-library) 
* [Animated Human 3D Models Library](https://flightsim.to/file/33166/animated-humans-library)
{% endcapture %}

<div class="notice--warning">
  <h4 class="no_toc">Important</h4>
  {{ notice-text | markdownify }}
</div>

## Download
This project is free to download and is part of an effort to bring more detailed Algerian airfields to Microsoft Flight Simulator.

[<i class='fas fa-download'></i> Download](https://deltazulusim.short.gy/sceneries/d50e-01/v1.0.0){: .btn .btn--success .btn--x-large}
