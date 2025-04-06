---
title: "DAOE BOUSFER Air base"
excerpt: "Microsoft Flight Simulation Scenery for BOUSFER (DAOE) Military Airport for MSFS2020 & MSFS2024"
toc: true
classes: wide
date: 2025-02-23T00:00:00+01:00
modified: 2025-03-17T00:00:00+01:00

header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/sceneries/daoe/DAOE_BANNER.webp
  teaser: /content/images/sceneries/daoe/DAOE01.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "#download"
  #caption: "Photo credit: [**DZS**](https://deltazulusim.com)"
sidebar:
  - title: "Airport"
    image: /content/images/sceneries/daoe/DAOE01.webp
    image_alt: "DAOE AIRPORT MSFS FLIGHT SIMULATOR 2020/2024"
    text: "Bousfer"
  - title: "ICAO"
    text: "DAOE"
  - title: "Version"
    text: "1.1.0"
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
changelog:
  - version: "1.1.0"
    version_date: "2025-03-17"
    download_url: "https://deltazulusim.short.gy/sceneries/daoe/v1.1.0"
    changes:
      - "Fixed compatibility MSFS2020"
  - version: "1.0.0"
    version_date: "2025-02-23"
    download_url: "https://deltazulusim.short.gy/sceneries/daoe/v1.0.0"
    changes:
      - "initial version"
---

Bousfer Military Airport (DAOE) is an Algerian military Air base, located near Oran, plays a strategic role in regional operations and now comes to life in MSFS 2020 and MSFS 2024 with stunning accuracy.

{% include map-single.html icao="DAOE" %}


## Gallery 
{% include gallery caption="Some screenshots for the scenery from the sky!" %}

## Features
- Highly detailed airport buildings and infrastructure
- Accurate runway, taxiway, and apron layout
- Custom ground textures and markings
- Realistic lighting and static objects for added immersion
- Optimized performance for smooth gameplay

{% include navigation-aids.html icao="DAOE" %}

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

[<i class='fas fa-download'></i> Download <code>v-{{ page.changelog | first | map: "version" }}</code>]({{ page.changelog | first | map: "download_url" }}){: .btn .btn--success .btn--x-large}