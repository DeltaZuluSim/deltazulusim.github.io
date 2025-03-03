---
title: "SOP Search and Rescue – Burning Cargo Ship (Jijel)"
excerpt: "Search and Rescue scenario for MSFS simmers: locate and report a burning container ship adrift north of Jijel, Algeria."
toc: true
date: 2025-03-03T00:00:00+01:00
last_modified_at: 2025-03-03T00:00:00+01:00
# comments: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/sar-01/sar-0101.webp
  teaser: /content/images/sceneries/sar-01/sar-0101.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "https://deltazulusim.short.gy/sceneries/sar-01/v1.0.0"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Area"
    image: /content/images/sceneries/sar-01/sar-0103.webp
    image_alt: "SOP Search and Rescue – Burning Cargo Ship (Jijel, Algeria)"
    text: "SAR-01"
  - title: "ICAO"
    text: "None"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/sar-01/sar-0101.webp
    image_path: /content/images/sceneries/sar-01/sar-0101.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0102.webp
    image_path: /content/images/sceneries/sar-01/sar-0102.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0103.webp
    image_path: /content/images/sceneries/sar-01/sar-0103.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0104.webp
    image_path: /content/images/sceneries/sar-01/sar-0104.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0105.webp
    image_path: /content/images/sceneries/sar-01/sar-0105.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0106.webp
    image_path: /content/images/sceneries/sar-01/sar-0106.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/sar-01/sar-0107.webp
    image_path: /content/images/sceneries/sar-01/sar-0107.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"

changelog:
  - version: "1.0.0"
    version_date: "2025-03-03"
    download_url: "https://deltazulusim.short.gy/sceneries/sar-01/v1.0.0"
    changes:
      - "initial version"
---

Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024
{:.notice}

## Mission Overview

A container ship has caught fire in the Mediterranean Sea, north of Jijel, Algeria. Your role as a search and rescue (SAR) pilot is to locate the vessel, assess the situation, and report its exact coordinates and status.


<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [37.10, 5.77];

  // Initialize the map
  var map = L.map('map', {
    center: centerCoords,
    zoom: 7,
    minZoom: 5
  });

  // Add OpenStreetMap tile layer
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16
  }).addTo(map);

  // Add a marker using the same coordinates
  var marker = L.marker(centerCoords).addTo(map)
    //.bindPopup('<a href="/sceneries/training-zone-sar-01/">sar-01</a>')
    .openPopup();
</script>


## Scenario Details

- The cargo ship is drifting in the open sea with visible fire and smoke.
- The mission begins from Jijel Ferhat Abbas Airport (DAAV) or another designated airbase.
- Weather conditions may include low visibility, wind, or cloud cover, making the search challenging.
- Pilots must rely on visual spotting, onboard avionics, and SAR techniques to pinpoint the ship's location.
- Report fire intensity, structural damage, and potential hazards for ground-based rescue teams.

## Mission Objectives
✅ Locate the burning vessel.
✅ Provide accurate coordinates for rescue operations.
✅ Assess and describe the fire, damage, and crew status (if visible).
✅ Return to base after completing the reconnaissance.

This scenario is designed to test your observational skills, navigation, and SAR reporting capabilities in a realistic environment.

## Gallery 
{% include gallery caption="Some screenshots for the scenery from the sky!" %}

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS, select your departure airport, and begin your SAR mission over Jijel!

## Download
This scenery is designed to enhance realism, immersion, and operational training in Microsoft Flight Simulator 2020 & 2024.

[<i class='fas fa-download'></i> Download](https://deltazulusim.short.gy/sceneries/sar-01/v1.0.0){: .btn .btn--success .btn--x-large}
