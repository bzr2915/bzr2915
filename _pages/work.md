---
layout: page
title: Projects
permalink: /work/
description:
nav: true
nav_order: 3
lang: en
---

<div class="row row-cols-1 row-cols-md-3">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="col">
    {% include projects.html %}
  </div>
  {% endfor %}
</div>
