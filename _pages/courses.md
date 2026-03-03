---
layout: page
title: courses
permalink: /courses/
description: Course materials and resources.
nav: true
nav_order: 5
display_categories: [本科, 研究生]
horizontal: false
---

<!-- pages/courses.md -->
<div class="projects">
{%- if page.display_categories %}
  <!-- Display categorized courses -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_courses = site.courses | where: "category", category -%}
  {%- assign sorted_courses = categorized_courses | sort: "importance" %}
  <!-- Generate cards for each course -->
  <div class="grid">
    {%- for course in sorted_courses -%}
      {% include courses.html %}
    {%- endfor %}
  </div>
  {% endfor %}

{%- else -%}
<!-- Display courses without categories -->
  {%- assign sorted_courses = site.courses | sort: "importance" -%}
  <div class="grid">
    {%- for course in sorted_courses -%}
      {% include courses.html %}
    {%- endfor %}
  </div>
{%- endif -%}
</div>
