---
layout: page
title: 项目
permalink: /work_zh/
description:
nav: false
lang: zh
lang_alternate: /work/
---

<div class="row row-cols-1 row-cols-md-3">
  {% assign sorted_projects = site.projects | where: "lang", "zh" | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="col">
    {% include projects.html %}
  </div>
  {% endfor %}
</div>
