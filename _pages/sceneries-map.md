---
title: "All sceneries map"
permalink: /sceneries-map/
layout: splash
classes: wide
author_profile: false
---

<br />

# Global sceneries map

<code><i>All Algerian sceneries, from DZ community, and from DeltaZulu Simulations!</i></code>

{% assign sceneries = site.data.sceneries | concat: site.data.community-sceneries | concat: site.data.community-military-sceneries %}

{% include map.html dz_asp="true" sceneries=sceneries height="60vh"  %}