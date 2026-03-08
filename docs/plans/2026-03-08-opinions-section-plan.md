# Opinions (观点) Section — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a bilingual "Opinions" (观点) section by rebranding al-folio's existing blog infrastructure.

**Architecture:** Reuse `_posts/` collection, `post.html` layout, and `jekyll-archives` plugin. Create bilingual index pages that filter posts by `lang` front matter. Add JS-based tag filtering on the index page.

**Tech Stack:** Jekyll, Liquid templates, HTML/CSS/JS, Bootstrap 4.6

**Design doc:** `docs/plans/2026-03-08-opinions-section-design.md`

---

### Task 1: Update `_config.yml` blog settings

**Files:**
- Modify: `_config.yml:122-125` (blog section)
- Modify: `_config.yml:260-264` (jekyll-archives + display_tags)

**Step 1: Update blog name, title, description, permalink**

In `_config.yml`, change lines 122-125 from:

```yaml
blog_name: al-folio # blog_name will be displayed in your blog page
blog_nav_title: blog # your blog must have a title for it to be displayed in the nav bar
blog_description: a simple whitespace theme for academics
permalink: /blog/:year/:title/
```

to:

```yaml
blog_name: Opinions # blog_name will be displayed in your blog page
blog_nav_title: Opinions # your blog must have a title for it to be displayed in the nav bar
blog_description: Signed opinions on AI, chip design, and academia
permalink: /opinions/:year/:title/
```

**Step 2: Update jekyll-archives permalinks and display_tags**

In `_config.yml`, change lines 260-264 from:

```yaml
    year: '/blog/:year/'
    tag: '/blog/tag/:name/'
    category: '/blog/category/:name/'

display_tags: ['formatting', 'images', 'links', 'math', 'code'] # these tags will be displayed on the front page of your blog
```

to:

```yaml
    year: '/opinions/:year/'
    tag: '/opinions/tag/:name/'
    category: '/opinions/category/:name/'

display_tags: ['AI', 'EDA', 'academia'] # these tags will be displayed on the opinions index page
```

**Step 3: Commit**

```bash
git add _config.yml
git commit -m "feat: rebrand blog to Opinions in config"
```

---

### Task 2: Update `_layouts/post.html` — change `/blog/` to `/opinions/`

**Files:**
- Modify: `_layouts/post.html:22,26,34`

**Step 1: Update year link**

Change line 22 from:

```html
      <a href="{{ year | prepend: '/blog/' | prepend: site.baseurl}}"> <i class="fas fa-calendar fa-sm"></i> {{ year }} </a>
```

to:

```html
      <a href="{{ year | prepend: '/opinions/' | prepend: site.baseurl}}"> <i class="fas fa-calendar fa-sm"></i> {{ year }} </a>
```

**Step 2: Update tag links**

Change line 26 from:

```html
        <a href="{{ tag | slugify | prepend: '/blog/tag/' | prepend: site.baseurl}}">
```

to:

```html
        <a href="{{ tag | slugify | prepend: '/opinions/tag/' | prepend: site.baseurl}}">
```

**Step 3: Update category links**

Change line 34 from:

```html
        <a href="{{ category | slugify | prepend: '/blog/category/' | prepend: site.baseurl}}">
```

to:

```html
        <a href="{{ category | slugify | prepend: '/opinions/category/' | prepend: site.baseurl}}">
```

**Step 4: Add language toggle to post header**

After the closing `</p>` of `post-tags` (after line 39), add:

```html
    {% if page.lang_alternate %}
    <p class="post-lang-toggle">
      {%- if page.lang == 'zh' -%}
      <a href="{{ page.lang_alternate | relative_url }}">EN</a>
      {%- else -%}
      <a href="{{ page.lang_alternate | relative_url }}">中文</a>
      {%- endif -%}
    </p>
    {% endif %}
```

**Step 5: Commit**

```bash
git add _layouts/post.html
git commit -m "feat: update post layout paths from /blog/ to /opinions/"
```

---

### Task 3: Delete legacy DAC post

**Files:**
- Delete: `_posts/2023-07-12-DAC-paper.md`

**Step 1: Remove old post**

```bash
git rm _posts/2023-07-12-DAC-paper.md
```

**Step 2: Commit**

```bash
git commit -m "chore: remove legacy DAC blog post"
```

---

### Task 4: Create EN index page `_pages/opinions.md`

**Files:**
- Create: `_pages/opinions.md`

**Step 1: Write the EN opinions index page**

Create `_pages/opinions.md` with this exact content:

```markdown
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
```

**Step 2: Commit**

```bash
git add _pages/opinions.md
git commit -m "feat: add EN opinions index page with tag filtering"
```

---

### Task 5: Create ZH index page `_pages/opinions_zh.md`

**Files:**
- Create: `_pages/opinions_zh.md`

**Step 1: Write the ZH opinions index page**

Create `_pages/opinions_zh.md` with this exact content:

```markdown
---
layout: page
title: 观点
permalink: /opinions_zh/
description: 关于人工智能、芯片设计与学术的署名观点。
nav: false
lang: zh
lang_alternate: /opinions/
---

<div class="tag-filters mb-3">
  <button class="btn btn-sm btn-outline-primary tag-btn active" data-tag="all">全部</button>
  {%- for tag in site.display_tags -%}
  <button class="btn btn-sm btn-outline-primary tag-btn" data-tag="{{ tag }}">{{ tag }}</button>
  {%- endfor -%}
</div>

<div class="table-responsive">
  <table class="table table-sm table-borderless">
    {%- assign sorted_posts = site.posts | sort: "date" | reverse -%}
    {%- for post in sorted_posts -%}
      {%- if post.lang == 'zh' -%}
    <tr class="post-row" data-tags="{{ post.tags | join: ',' }}">
      <th scope="row" style="width: 120px;">{{ post.date | date: "%Y-%m-%d" }}</th>
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
```

**Step 2: Commit**

```bash
git add _pages/opinions_zh.md
git commit -m "feat: add ZH opinions index page with tag filtering"
```

---

### Task 6: Update nav_order on repositories page

**Files:**
- Modify: `_pages/repositories.md:7`

**Step 1: Change nav_order from 3 to 4**

In `_pages/repositories.md`, change:

```yaml
nav_order: 3
```

to:

```yaml
nav_order: 4
```

**Step 2: Commit**

```bash
git add _pages/repositories.md
git commit -m "fix: shift repositories nav_order to 4 for opinions slot"
```

---

### Task 7: Create sample EN opinion post

**Files:**
- Create: `_posts/2026-03-08-sample-opinion.md`

**Step 1: Write sample EN post**

Create `_posts/2026-03-08-sample-opinion.md`:

```markdown
---
layout: post
title: "Why AI-Native Chip Design Changes Everything"
date: 2026-03-08
description: "The shift from AI-assisted to AI-native design is not incremental — it is architectural."
tags: [AI, EDA]
lang: en
lang_alternate: /opinions/2026/sample-opinion-zh/
author: Zhaori Bi
---

This is a sample opinion post to verify the Opinions section works correctly. Replace or delete this post with your actual content.

The transition from AI-assisted to AI-native chip design represents more than a tooling upgrade. It is a fundamental rearrangement of agency: the AI ceases to optimize within human-defined boundaries and begins to define the boundaries themselves.
```

**Step 2: Commit**

```bash
git add _posts/2026-03-08-sample-opinion.md
git commit -m "feat: add sample EN opinion post"
```

---

### Task 8: Create sample ZH opinion post

**Files:**
- Create: `_posts/2026-03-08-sample-opinion-zh.md`

**Step 1: Write sample ZH post**

Create `_posts/2026-03-08-sample-opinion-zh.md`:

```markdown
---
layout: post
title: "为什么AI原生芯片设计将改变一切"
date: 2026-03-08
description: "从AI辅助到AI原生设计的转变不是渐进的——而是架构性的。"
tags: [AI, EDA]
lang: zh
lang_alternate: /opinions/2026/sample-opinion/
author: Zhaori Bi
---

这是一篇用于验证"观点"栏目是否正常运行的示例文章，请用您的实际内容替换或删除。

从AI辅助到AI原生芯片设计的转变，不仅仅是工具层面的升级，而是一次主体性的根本重组：AI不再在人类划定的边界内优化，而是开始定义边界本身。
```

**Step 2: Commit**

```bash
git add _posts/2026-03-08-sample-opinion-zh.md
git commit -m "feat: add sample ZH opinion post"
```

---

### Task 9: Docker verification

**Step 1: Start dev server**

```bash
docker compose up
```

Wait for "Server running..." message (~30 seconds).

**Step 2: Verify EN opinions index**

Open browser: `http://localhost:8080/bzr2915/opinions/`

Expected:
- Page title "Opinions"
- Tag filter buttons: All, AI, EDA, academia
- One post listed: "Why AI-Native Chip Design Changes Everything" with date and tags
- Clicking "AI" tag filters to show the post; clicking "academia" hides it

**Step 3: Verify ZH opinions index**

Open browser: `http://localhost:8080/bzr2915/opinions_zh/`

Expected:
- Page title "观点"
- One post listed in Chinese

**Step 4: Verify EN opinion post**

Click the post link. Expected:
- Post renders with title, date, author, tag badges
- Year link goes to `/opinions/2026/`
- Tag links go to `/opinions/tag/ai/`, `/opinions/tag/eda/`
- Language toggle link to Chinese version appears

**Step 5: Verify navigation**

- Nav bar shows: About | CV | Research | **Opinions** | Repositories | Courses
- Clicking "Opinions" from any page goes to `/opinions/`
- When on a ZH page, nav shows "观点" and links to `/opinions_zh/`

**Step 6: Verify tag archive pages**

Open: `http://localhost:8080/bzr2915/opinions/tag/ai/`

Expected: Archive page listing posts tagged "AI"

**Step 7: Stop dev server if all checks pass**

```bash
docker compose down
```
