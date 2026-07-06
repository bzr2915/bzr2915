---
layout: page
permalink: /publications_zh/
title: 论文
venues: [DAC, TCAD, ICCAD, DATE, ESWEEK, TODAES, TVLSI, ASP-DAC, ISCAS, ISEDA, ICICM, MWSCAS, TMTT, TED, TCPMT, ACS AMI, Electronics, JBHI, JTEHM, JMV, KBPR, Renal Failure, BMC nephrology, BMC geriatrics, ASCION, Thesis]
nav: false
nav_order: 2
lang: zh
lang_alternate: /publications/
---
<!-- _pages/publications_zh.md -->
<div class="publications">

{%- for v in page.venues %}
  <h2 class="label">{{ v }}</h2>
      {% bibliography -f {{ site.scholar.bibliography }} -q @*[abbr={{ v }}]* %}
{% endfor %}

</div>
