---
title: "DAAG Alger Approach – Endless ATC Custom location"
excerpt: "Realistic Endless ATC configuration for DAAG (Alger), featuring dual runway operations, custom traffic, and optimized approach flows without SIDs."
toc: true
header:
  teaser: /content/images/blog/endless-atc-daag.webp
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/blog/endless-atc-daag.webp
  actions:
    - label: "<i class='fas fa-download'></i> Download"
      url: "#download"

categories:
  - Addons
tags:
  - DAAG
  - Algeria
  - ATC
  - Endless ATC
  - Approach

---
A custom location brings **Alger Approach (DAAG – Houari Boumediene)** to Endless ATC with a focus on realism, stability, and smooth traffic flow.

The configuration is designed to reproduce real-world traffic patterns around Algiers while remaining fully compatible with the limitations of Endless ATC.

![DAAG Approach Radar on Endless ATC](/content/images/blog/endless-atc-daag.webp)

Two operational configurations are included:

- **Config 1**  
  - Arrivals: RWY 23 (ILS)  
  - Departures: RWY 27  

- **Config 2**  
  - Arrivals: RWY 09 (ILS)  
  - Departures: RWY 05  

---

## Key Features

### Realistic Airspace Design
- Custom **approach sector** centered on DAAG  
- Carefully defined **airspace boundary** matching the operational area  
- Transition altitude aligned with local procedures (3940 ft) 

### Optimized Traffic Flow (No SID Dependency)
Unlike many configurations, this custom location avoids using SIDs as primary entry logic.

This prevents:
- Immediate aircraft diversion
- Unrealistic long-distance routing
- Conflicts outside the approach sector

Instead, traffic is managed using:
- **Custom entry points (ALR, ZEM, LIMON, CHE)**
- Controlled inbound headings and altitudes

### Balanced Altitude Management
- Arrival sequencing starts at **13000–14000 ft**
- Controlled descent via:
  - `descendaltitude = 5000`
- Departure climb limited to:
  - `climbaltitude = 7000`

This ensures:
- Stable approach flows
- Reduced vertical conflicts
- Better spacing for vectoring

---

## Traffic Model

Traffic distribution is based on real-world operations at DAAG:

### Primary Operator
- **Air Algérie** (dominant traffic)

### Regional & Domestic
- Tassili Airlines  
- Domestic flights (ATR / B738 mix)

### European Traffic
- Air France  
- Transavia  
- Vueling  
- Volotea  
- ASL Airlines  

### International Traffic
- Turkish Airlines  
- Qatar Airways  
- Saudia  
- EgyptAir  
- Royal Air Maroc  

Traffic directions are aligned geographically (north, east, west flows) to improve realism and spacing.

---

## Approach Procedures

### ILS RWY 09
- Initial vector via MAR beacon  
- Intercept heading: 079°  
- Final:
  - 10.5 NM
  - 2240 ft
  - 180 kt  

### ILS RWY 23
- Initial vector via ZEM beacon  
- Intercept heading: 248°  
- Final:
  - 10 NM
  - 2300 ft
  - 180 kt  

These procedures are designed for:
- Smooth sequencing
- Minimal last-minute corrections
- Stable final approach paths

---

## Special Airspace

Two restricted zones are included south-west of the airport:

- **R84A (2500 ft)**
- **R84B (5000 ft)**

These areas simulate military airspace near Boufarik and require:
- Early vectoring decisions
- Proper lateral planning

---

## Coastline & Visual References

A detailed **Algerian coastline** has been implemented to improve spatial awareness and realism during radar operations.

This helps:
- Visual positioning of aircraft
- Better anticipation of inbound flows from the Mediterranean

---

## Gameplay Tips

- Start with **Config 1 (RWY 23 arrivals)** for easier sequencing  
- Use early descent clearances to avoid compression near final  
- Keep aircraft at or below **13000 ft before vectoring**  
- Anticipate traffic from **north-east (Europe)** and **west (Morocco/Spain)**  

---

## Installation

1. Copy the configuration file DAAG.txt into your Endless ATC locations folder  
2. Load the custom airport  
3. Select your preferred configuration  

---

## Download

Available here:  
<a href="https://github.com/DeltaZuluSim/data/releases/download/EndlessATC.DAAG/DAAG.txt" class="btn btn--success">
  <i class="fas fa-download"></i> Download
</a>

---

## Final Notes

This configuration was built with a focus on:
- Stability over complexity  
- Realistic flows adapted to Endless ATC behavior  
- Efficient traffic management without relying on SIDs  

Future updates may include:
- Refined traffic balancing  
- Additional entry points  
- Enhanced military traffic integration  