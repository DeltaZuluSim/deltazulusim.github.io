---
layout: single
title: "Algerian Military Navaids"
excerpt: "Reference list of Algerian military navaids (VOR, DME, ILS), including real and fictional stations for MSFS use."
description: "This page provides data on real and fictional Algerian military navigation aids used in Microsoft Flight Simulator, including coordinates, frequencies, and types."
date: 2025-03-30T00:00:00+01:00
modified: 2025-03-31T13:00:00+01:00
classes: wide
toc: true
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/mods/daaa-mil-navaids-banner.webp
  teaser: /content/images/mods/daaa-mil-navaids-thumbnail.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "#download"
sidebar:
  - title: ""
    image: /content/images/mods/daaa-mil-navaids-thumbnail.webp
  - title: "Version"
    text: "1.0.0"
  - title: "MSFS 2020"
    text: "Yes"
  - title: "MSFS 2024"
    text: "Yes"


changelog:
  - version: "1.0.0"
    version_date: "2025-03-31"
    download_url: "https://deltazulusim.short.gy/mods/daaa-mil-navaids/v1.0.0"
    changes:
      - "Added auto installation scripts and tested on MSFS 2024"
  - version: "0.1.0"
    version_date: "2025-03-30"
    download_url: "https://deltazulusim.short.gy/mods/daaa-mil-navaids/v0.1.0"
    changes:
      - "Initial release for MSFS2020 and MSFS2024"
---

## Description

This mod enhances Microsoft Flight Simulator with a growing collection of **military VOR and ILS navigation aids** across Algerian airbases. Designed to support more immersive operations in both solo and multiplayer missions, the navaids include a mix of **real-world references** and **fictional enhancements** to complement custom sceneries and flight procedures.

Whether you're planning tactical flights, practicing instrument approaches, or simply expanding your nav database, this package adds essential tools to your sim environment.

<div class="notice--warning">
<h4>Remark</h4>
📡 <strong>Real-world frequencies and locations are based on official Algerian AIP charts provided by SIA ENNA.</strong>
Data is extracted from the ENR 6.1 document:  
<a href="https://www.sia-enna.dz/PDF/AIP/ENR/ENR6/ENR6.1.pdf" target="_blank">
https://www.sia-enna.dz/PDF/AIP/ENR/ENR6/ENR6.1.pdf
</a>
</div>


---

## Features

- Military VOR stations with frequency, coordinates, and altitude
- Both [**real**](https://www.sia-enna.dz/PDF/AIP/ENR/ENR6/ENR6.1.pdf) and **fictional** navaids for greater mission flexibility
- Compatibility with MSFS 2020 & 2024

## Ongoing Development

This add-on is **actively maintained and regularly updated** with new Algerian military airfields and navigation aids. We're continuously expanding coverage to support more realistic missions and flight operations across the region.

<div class="notice--info">
💬 Have a specific VOR, DME, or ILS you'd like to see included? Contact us or leave a comment below — your input helps shape future updates!
</div>



## VOR Stations

<table class="large-table">
  <thead>
    <tr>
      <th>Ident</th>
      <th>Name</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Altitude (m)</th>
      <th>Frequency (MHz)</th>
      <th>Source</th>
    </tr>
  </thead>
  <tbody>
    {% for vor in site.data.navaids.vors %}
    <tr>
      <td>{{ vor.ident }}</td>
      <td>{{ vor.name }}</td>
      <td>{{ vor.lat }}</td>
      <td>{{ vor.lon }}</td>
      <td>{{ vor.alt_m }}</td>
      <td>{{ vor.frequency_mhz }}</td>
      <td>
        {% if vor.source == "real" %}
          <span style="color: green;">Real</span>
        {% else %}
          <span style="color: orange;">Fictional</span>
        {% endif %}
      </td>
    </tr>
    {% endfor %}
  </tbody>
</table>


## ILS Approaches

Development in progress, ILS Data Coming soon 
{: .notice}

---

## Installation

To install the **DZ Military Navaids** mod:

1. **Download** the ZIP archive.
2. **Extract** the contents of the archive. You will find:
   - `dzs-daaa-mil-navaids` (the mod folder)
   - `scripts/` (installer utilities)
   - `readme.txt` (detailed instructions)

3. **Move** the `dzs-daaa-mil-navaids` folder to your **MSFS Community** directory:
   - Typical paths:
     - Steam: `C:\Users\YourName\AppData\Roaming\Microsoft Flight Simulator\Community`
     - MS Store: `C:\Users\YourName\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community`

4. **Run the installer**:
   - Open the `scripts` folder
   - Double-click on `install.bat`
   - This will automatically register the mod in your `Content.xml` file, preserving backups and supporting both Steam and MS Store versions.

<div class="notice--success">
✔️ The installer is safe and portable, and will only modify your Content.xml file if required. It also creates a versioned backup before doing so.
</div>


## Download

This mod is **free to download** and part of an ongoing effort to expand **Algerian military airfields** in Microsoft Flight Simulator.

[<i class='fas fa-download'></i> Download <code>v-{{ page.changelog | first | map: "version" }}</code>]({{ page.changelog | first | map: "download_url" }}){: .btn .btn--success .btn--x-large}