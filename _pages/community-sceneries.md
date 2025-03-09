---
title: Community Sceneries
layout: category
permalink: /categories/community-sceneries/
taxonomy: Community Sceneries
entries_layout: grid
classes: wide
---

{% assign sceneries = site.data.community-military-sceneries | concat: site.data.community-sceneries %}

{% include map.html dz_asp="false" sceneries=sceneries %}

<br />