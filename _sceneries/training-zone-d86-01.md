---
title: "SOP Naval Recon – Algerian Navy & Submarines (D86)"
excerpt: "Military reconnaissance scenario for MSFS simmers: locate and identify Algerian Navy assets, including submarines and warships, in the D86 special area north of Annaba, Algeria."
toc: true
date: 2025-03-06T00:00:00+01:00
last_modified_at: 2025-03-06T00:00:00+01:00
# comments: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/d86-01/D86-0101.webp
  teaser: /content/images/sceneries/d86-01/D86-0101.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "/sceneries/training-zone-d86-01/#download"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Area"
    image: /content/images/sceneries/d86-01/D86-0103.webp
    image_alt: "SOP Search and Rescue – Burning Cargo Ship (Jijel, Algeria)"
    text: "DA-D86"
    gps: "037° 17' 3,97\" N<br /> 007° 09' 4,26\" E"
  - title: "ICAO"
    text: "None"
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"

gallery:
  - url: /content/images/sceneries/d86-01/D86-0101.webp
    image_path: /content/images/sceneries/d86-01/D86-0101.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d86-01/D86-0102.webp
    image_path: /content/images/sceneries/d86-01/D86-0102.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d86-01/D86-0103.webp
    image_path: /content/images/sceneries/d86-01/D86-0103.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d86-01/D86-0104.webp
    image_path: /content/images/sceneries/d86-01/D86-0104.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d86-01/D86-0105.webp
    image_path: /content/images/sceneries/d86-01/D86-0105.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"
  - url: /content/images/sceneries/d86-01/D86-0106.webp
    image_path: /content/images/sceneries/d86-01/D86-0106.webp
    alt: "Custom SOP Search and Rescue Scenery for Microsoft Flight Simulator 2020 & 2024"

changelog:
  - version: "<code>MSFS 2020</code> 1.0.0"
    version_date: "2025-03-06"
    download_url: "https://deltazulusim.short.gy/sceneries/d86-01/v1.0.0/MSFS2020"
    changes:
      - "initial version"
  - version: "<code>MSFS 2024</code> 1.0.0"
    version_date: "2025-03-06"
    download_url: "https://deltazulusim.short.gy/sceneries/d86-01/v1.0.0/MSFS2024"
    changes:
      - "initial version"
---

Custom SOP Scenery for Microsoft Flight Simulator 2020 & 2024
{:.notice}

## Mission Overview

Prepare for a high-stakes military reconnaissance mission in Microsoft Flight Simulator 2020 & 2024! This custom scenery places a fleet of Algerian Navy warships, patrol boats, and submarines in the restricted military zone D86, north of Annaba, Algeria. Pilots must conduct an aerial search, identify all naval assets, and accurately report their locations.

Designed for special operations training, this mission challenges your navigation, observation, and reconnaissance skills in a realistic maritime environment.


<div id="map" style="height: 500px;"></div>

<script>
  // Define coordinates once
  const centerCoords = [37.28, 7.15];

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
  var marker = L.marker(centerCoords).addTo(map)
    //.bindPopup('<a href="/sceneries/training-zone-d86-01/">sar-01</a>')
    .openPopup();
</script>


## Scenario Details

The D86 military area is an exclusive maritime sector designated for military operations. Your task is to fly a reconnaissance mission over this zone, detect naval movements, and relay precise data.

Key elements of this mission include:
- Realistic naval formations, including submarines and patrol boats.
- Dynamic search patterns – adapt based on cloud cover and visibility.
- Custom military scenario for flight sim enthusiasts and virtual military pilots.
- Ideal for multiplayer coordination, simulating real-world aerial reconnaissance.

## Mission Objectives
- Locate the Algerian Navy fleet, including submarines and surface vessels.
- Identify and classify the equipment present in the area.
- Report the exact GPS coordinates of key assets to the airbase.
- Conduct the operation while maintaining situational awareness and avoiding restricted zones.

This scenario is designed to test your observational skills, navigation, and SAR reporting capabilities in a realistic environment.

## Gallery 
{% include gallery caption="Some screenshots for the scenery from the sky!" %}

## Recommended Aircraft
- Military Reconnaissance Planes (e.g., Beechcraft King Air, C-130 mods).
- Helicopters for low-altitude patrols (H135, H145 recommended).
- Fast Jets for high-speed tactical overflights (F/A-18, Mirage, etc.).

## Installation Instructions
- Download the scenery package.
- Extract the contents to your Community folder.
- Launch MSFS, select your departure airport, and navigate to the D86 sector north of Annaba, Algeria!
- Begin your mission and enjoy the challenge!

## Download
Get ready to test your aerial reconnaissance skills in this unique military scenario!

[<i class='fas fa-download'></i> Download for <code>MSFS 2020</code>](https://deltazulusim.short.gy/sceneries/d86-01/v1.0.0/MSFS2020){: .btn .btn--success .btn--x-large}
[<i class='fas fa-download'></i> Download for <code>MSFS 2024</code>](https://deltazulusim.short.gy/sceneries/d86-01/v1.0.0/MSFS2024){: .btn .btn--success .btn--x-large}
