---
layout: page
title: Opinions
permalink: /opinions/
description: Signed opinions on AI, chip design, and academia.
nav: true
nav_order: 3
nav_title_zh: 观点
permalink_zh: /opinions_zh/
lang: en
lang_alternate: /opinions_zh/
---

<div class="tag-filters mb-3">
  <button class="btn btn-sm btn-outline-primary tag-btn active" data-tag="all">All</button>
  {%- for tag in site.display_tags -%}
  <button class="btn btn-sm btn-outline-primary tag-btn" data-tag="{{ tag }}">{{ tag }}</button>
  {%- endfor -%}
</div>

<div class="table-responsive">
  <table class="table table-sm table-borderless">
    {%- assign sorted_posts = site.posts | sort: "date" | reverse -%}
    {%- for post in sorted_posts -%}
      {%- if post.lang == 'en' or post.lang == nil -%}
    <tr class="post-row" data-tags="{{ post.tags | join: ',' }}">
      <th scope="row" style="width: 120px;">{{ post.date | date: "%b %-d, %Y" }}</th>
      <td>
        <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        {%- if post.description -%}
        <br><span class="text-muted small">{{ post.description }}</span>
        {%- endif -%}
        {%- for tag in post.tags -%}
        <span class="badge badge-light">{{ tag }}</span>
        {%- endfor -%}
      </td>
    </tr>
      {%- endif -%}
    {%- endfor -%}
  </table>
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".tag-btn");
  var rows = document.querySelectorAll(".post-row");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var tag = btn.getAttribute("data-tag");
      rows.forEach(function (row) {
        if (tag === "all") {
          row.style.display = "";
        } else {
          var tags = row.getAttribute("data-tags").split(",");
          row.style.display = tags.indexOf(tag) >= 0 ? "" : "none";
        }
      });
    });
  });
});
</script>
