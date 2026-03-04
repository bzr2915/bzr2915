---
layout: page
title: 教学
permalink: /courses_zh/
description: 课程资料与资源。
nav: false
nav_order: 5
display_categories: [本科]
horizontal: false
lang: zh
lang_alternate: /courses/
---

<!-- pages/courses_zh.md -->
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
