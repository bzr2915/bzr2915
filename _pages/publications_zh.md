---
layout: page
permalink: /publications_zh/
title: 论文
label: [AI for EDA, AI for Medical]
nav: false
nav_order: 2
lang: zh
lang_alternate: /publications/
---
<!-- _pages/publications_zh.md -->
<div class="publications">

{%- for l in page.label %}
  <h2 class="label">{{l}}</h2>
      {% bibliography -f {{ site.scholar.bibliography }} -q @*[label={{l}}]* %}
{% endfor %}

</div>
