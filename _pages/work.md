---
layout: page
title: Projects
permalink: /work/
description:
nav: true
nav_order: 3
nav_title_zh: 项目
permalink_zh: /work_zh/
lang: en
lang_alternate: /work_zh/
---

<div class="row row-cols-1 row-cols-md-3">
  {% assign sorted_projects = site.projects | where: "lang", "en" | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="col">
    {% include projects.html %}
  </div>
  {% endfor %}
</div>
