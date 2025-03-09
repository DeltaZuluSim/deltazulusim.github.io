---
title: "All sceneries map"
permalink: /sceneries-map/
layout: single
classes: wide
author_profile: false
---

{% assign sceneries = site.data.sceneries | concat: site.data.community-sceneries %}

{% include map.html dz_asp="true" sceneries=sceneries %}