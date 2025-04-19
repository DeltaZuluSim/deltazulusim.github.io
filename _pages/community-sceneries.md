---
title: Sceneries by Community
layout: dzs-collection
permalink: /community-sceneries/
taxonomy: Community Sceneries
entries_layout: grid
classes: wide
dzs-collection: 'sceneries'
dzs-collection-title: 'Other sceneries by DeltaZulu Simulations'

related_items:
  title: ""
  collection: community
  flags:
    - scenery
    - military-scenery

---

{% assign sceneries = site.data.community-sceneries.military | concat: site.data.community-sceneries.civilian %}

{% include map.html dz_asp="false" sceneries=sceneries height="60vh" %}

<br />

