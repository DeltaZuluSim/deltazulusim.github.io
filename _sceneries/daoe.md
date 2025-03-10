---
title: "DAOE BOUSFER Air base"
excerpt: "Microsoft Flight Simulation Scenery for BOUSFER (DAOE) Military Airport for MSFS2020 & MSFS2024"
toc: true
date: 2025-02-23T00:00:00+01:00
last_modified_at: 2025-02-23T00:00:00+01:00
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/daoe/DAOE_BANNER.webp
  teaser: /content/images/sceneries/daoe/DAOE01.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "https://deltazulusim.short.gy/sceneries/daoe/v1.0.0"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Airport"
    image: /content/images/sceneries/daoe/DAOE01.webp
    image_alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
    text: "Bousfer"
  - title: "ICAO"
    text: "DAOE"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/daoe/DAOE01.webp
    image_path: /content/images/sceneries/daoe/DAOE01.webp
    alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daoe/DAOE02.webp
    image_path: /content/images/sceneries/daoe/DAOE02.webp
    alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daoe/DAOE03.webp
    image_path: /content/images/sceneries/daoe/DAOE03.webp
    alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
  - url: /content/images/sceneries/daoe/DAOE04.webp
    image_path: /content/images/sceneries/daoe/DAOE04.webp
    alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"

changelog:
  - version: "1.0.0"
    version_date: "2025-02-23"
    download_url: "https://deltazulusim.short.gy/sceneries/daoe/v1.0.0"
    changes:
      - "initial version"
---

Bousfer Military Airport (DAOE) is an Algerian military Air base, located near Oran, plays a strategic role in regional operations and now comes to life in MSFS 2020 and MSFS 2024 with stunning accuracy.

<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [35.73, -0.80];

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

## Features
- Highly detailed airport buildings and infrastructure
- Accurate runway, taxiway, and apron layout
- Custom ground textures and markings
- Realistic lighting and static objects for added immersion
- Optimized performance for smooth gameplay

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS and enjoy your flight over Bousfer and Oran area!

{% capture notice-text %}

This scenery references some optional models from the following third party sceneries: 
* DAAQ and DAAJ Airports sceneries by [Algerian WINGS Sceneries](https://www.facebook.com/AlgerianWingsSceneries)
* Aguenar (DAAT) scenery by [NetDesign](https://inibuilds.com/products/netdesign-aguenar-daat-msfs?srsltid=AfmBOorrtszEPqjNv4V4OrVqirz9LHv8eX9RURf_JEo9ws0G3j1eSnV0)
* [Ethnicfs Military Library](https://flightsim.to/file/44161/ethnicfs-military-library)
{% endcapture %}

<div class="notice--warning">
  <h2 class="no_toc">Important</h2>
  {{ notice-text | markdownify }}
</div>

## Download

This project is free to download and is part of an effort to bring more detailed Algerian airfields to Microsoft Flight Simulator.

[<i class='fas fa-download'></i> Download](https://deltazulusim.short.gy/sceneries/daoe/v1.0.0){: .btn .btn--success .btn--x-large}