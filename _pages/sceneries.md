---
title: MSFS Sceneries by DZS
layout: dzs-collection
permalink: /sceneries/
collection: sceneries
entries_layout: grid
classes: wide
related_items:
  title: "Other sceneries by community"
  collection: community
  flags:
    - scenery
    - military-scenery
header:
  overlay_color: "#000"
  overlay_filter: "0.5"
  overlay_image: /content/images/charts/sceneries-banner.webp
---

{% assign sceneries = site.data.sceneries | concat: site.data.community-sceneries.civilian | concat: site.data.community-sceneries.military %}

{% include map.html dz_asp="true" sceneries=sceneries height="60vh"  %}

<br />