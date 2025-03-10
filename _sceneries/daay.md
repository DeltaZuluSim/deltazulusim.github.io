---
title: "DAAY MECHERIA Airport"
excerpt: "Microsoft Flight Simulation Scenery for Mecheria (DAAY) Military Airport for MSFS2020 & MSFS2024"
toc: true
date: 2025-02-23T00:00:00+01:00
last_modified_at: 2025-02-23T00:00:00+01:00
# comments: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/daay/DAAY08.webp
  teaser: /content/images/sceneries/daay/DAAY08.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "https://deltazulusim.short.gy/sceneries/daay/v1.0.0"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Airport"
    image: /content/images/sceneries/daay/DAAY07.webp
    image_alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
    text: "Mecheria"
  - title: "ICAO"
    text: "DAAY"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/daay/DAAY01.webp
    image_path: /content/images/sceneries/daay/DAAY01.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY02.webp
    image_path: /content/images/sceneries/daay/DAAY02.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY03.webp
    image_path: /content/images/sceneries/daay/DAAY03.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY04.webp
    image_path: /content/images/sceneries/daay/DAAY04.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY05.webp
    image_path: /content/images/sceneries/daay/DAAY05.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY06.webp
    image_path: /content/images/sceneries/daay/DAAY06.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY07.webp
    image_path: /content/images/sceneries/daay/DAAY07.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daay/DAAY08.webp
    image_path: /content/images/sceneries/daay/DAAY08.webp
    alt: "DAAY AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"

changelog:
  - version: "1.0.0"
    version_date: "2025-02-23"
    download_url: "https://deltazulusim.short.gy/sceneries/daay/v1.0.0"
    changes:
      - "initial version"
---

Scenery for Mecheria Military Airport (DAAY), designed exclusively for Microsoft Flight Simulator 2020 and 2024. Situated in the arid expanses of Algeria, this airport is nestled amid rugged desert terrain and breathtaking mountains, providing a visually striking backdrop for your virtual flights.

Our scenery package captures every detail of Mecheria Military Airport, from the accurately modeled runways and taxiways to the comprehensive depiction of airport infrastructure. Whether you're piloting a military aircraft or exploring the region in a civilian plane, you'll appreciate the authenticity and attention to detail we've poured into this scenery.

<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [33.53, -0.24];

  // Initialize the map
  var map = L.map('map',{
  center: centerCoords,
  zoom: 7,
  minZoom: 5,
 
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

  // Add a marker
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

## Key Features

- Highly detailed airport environment
- Realistic depiction of surrounding desert landscape
- Enhanced textures and lighting effects for a true-to-life experience
- Compatible with MSFS 2020 and MSFS 2024

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS and enjoy your flight over Mecheria!

{% capture notice-text %}

This scenery references some optional models from the following third party sceneries: 
* DAAQ, DAAK, DAAJ, DAAP, DAAS & DAAN Airport sceneries by [Algerian WINGS Sceneries](https://www.facebook.com/AlgerianWingsSceneries)
* Aguenar (DAAT) scenery by [NetDesign](https://inibuilds.com/products/netdesign-aguenar-daat-msfs?srsltid=AfmBOorrtszEPqjNv4V4OrVqirz9LHv8eX9RURf_JEo9ws0G3j1eSnV0)

{% endcapture %}

<div class="notice--warning">
  <h4 class="no_toc">Important</h4>
  {{ notice-text | markdownify }}
</div>

## Download
This project is free to download and is part of an effort to bring more detailed Algerian airfields to Microsoft Flight Simulator.

[<i class='fas fa-download'></i> Download](https://deltazulusim.short.gy/sceneries/daay/v1.0.0){: .btn .btn--success .btn--x-large}
