---
layout: page
title: research
permalink: /projects/
description: Our research directions.
nav: true
nav_order: 2
horizontal: false
---

<div class="projects">
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
</div>
