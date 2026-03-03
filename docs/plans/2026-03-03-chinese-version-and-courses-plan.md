# Chinese Version + Courses Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Chinese About page with navbar language toggle, and replace Teaching with a card-based Courses section.

**Architecture:** Manual file-based bilingual (no plugin dependencies). Courses as a Jekyll collection mirroring the existing `_projects` pattern. Language toggle via front matter `lang`/`lang_alternate` fields read by `header.html`.

**Tech Stack:** Jekyll, Liquid templates, Bootstrap 4, SASS

**Design doc:** `docs/plans/2026-03-03-chinese-version-and-courses-design.md`

---

### Task 1: Add courses collection to _config.yml

**Files:**
- Modify: `_config.yml:166-174` (collections section)

**Step 1: Add courses collection**

In `_config.yml`, find the `collections:` block (line 166) and add `courses` after `projects`:

```yaml
collections:
  news:
    defaults:
      layout: post
    output: true
    permalink: /news/:path/
  projects:
    output: false
    permalink: /projects/:path/
  courses:
    output: true
    permalink: /courses/:path/
```

**Step 2: Commit**

```bash
git add _config.yml
git commit -m "feat: add courses collection to config"
```

---

### Task 2: Create course card template

**Files:**
- Reference: `_includes/projects.html` (copy and adapt)
- Create: `_includes/courses.html`

**Step 1: Create `_includes/courses.html`**

Based on `_includes/projects.html`, replace `project` with `course` and remove the GitHub stars section (not relevant for courses):

```html
<!-- _includes/courses.html -->
<div class="grid-sizer"></div>
<div class="grid-item">
  <a href="{{ course.url | relative_url }}">
    <div class="card hoverable">
      {%- if course.img %}
      {%- include figure.html
        path=course.img
        alt="course thumbnail" -%}
      {%- endif %}
      <div class="card-body">
        <h2 class="card-title">{{ course.title }}</h2>
        <p class="card-text">{{ course.description }}</p>
      </div>
    </div>
  </a>
</div>
```

**Step 2: Commit**

```bash
git add _includes/courses.html
git commit -m "feat: add course card template"
```

---

### Task 3: Create courses list page

**Files:**
- Reference: `_pages/projects.md` (adapt pattern)
- Create: `_pages/courses.md`

**Step 1: Create `_pages/courses.md`**

```markdown
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
```

Note: We reuse the `projects` CSS class on the wrapper div so the existing masonry/grid styles apply without any CSS changes.

**Step 2: Commit**

```bash
git add _pages/courses.md
git commit -m "feat: add courses list page"
```

---

### Task 4: Create a sample course

**Files:**
- Create: `_courses/` directory
- Create: `_courses/example_course.md`

**Step 1: Create `_courses/example_course.md`**

This is a placeholder so we can verify the courses page renders. The user will replace it with real content later.

```markdown
---
layout: page
title: 集成电路设计基础
description: 本课程介绍VLSI设计的基本原理与方法，包括数字电路设计流程、标准单元库、时序分析等内容。
img: assets/img/12.jpg
category: 本科
importance: 1
---

## 课程简介

本课程面向本科生，系统介绍集成电路设计的基础知识与实践方法。

## 课件下载

- [第1讲：绪论 (PDF)](#)
- [第2讲：CMOS工艺基础 (PDF)](#)

## 参考资料

- Neil Weste, David Harris. *CMOS VLSI Design: A Circuits and Systems Perspective*
- Jan Rabaey. *Digital Integrated Circuits: A Design Perspective*
```

**Step 2: Commit**

```bash
git add _courses/example_course.md
git commit -m "feat: add sample course for verification"
```

---

### Task 5: Add language toggle to navbar

**Files:**
- Modify: `_includes/header.html:97-106` (after darkmode toggle section)

**Step 1: Add language toggle**

In `_includes/header.html`, find the darkmode toggle block (line 97-106). Add the language toggle right after it, before the closing `</ul>` (line 107):

```html
              {%- if site.enable_darkmode %}

              <!-- Toogle theme mode -->
              <li class="toggle-container">
                <button id="light-toggle" title="Change theme">
                  <i class="fas fa-moon"></i>
                  <i class="fas fa-sun"></i>
                </button>
              </li>
              {%- endif %}

              <!-- Language toggle -->
              <li class="nav-item">
                {%- if page.lang == 'zh' -%}
                <a class="nav-link" href="{{ page.lang_alternate | default: '/' | relative_url }}">EN</a>
                {%- else -%}
                <a class="nav-link" href="{{ page.lang_alternate | default: '/zh/' | relative_url }}">中</a>
                {%- endif -%}
              </li>
```

**Step 2: Commit**

```bash
git add _includes/header.html
git commit -m "feat: add language toggle to navbar"
```

---

### Task 6: Add lang fields to English about page

**Files:**
- Modify: `_pages/about.md:1-16` (front matter)

**Step 1: Add lang and lang_alternate**

Add two lines to the front matter of `_pages/about.md`:

```yaml
---
layout: about
title: About
permalink: /
subtitle: <a href='#'>Assistant Professor</a>. Fudan University, Shanghai, zhaori_bi AT fudan.edu.cn
lang: en
lang_alternate: /zh/

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

news: true
latest_posts: true
selected_papers: true
social: false
---
```

**Step 2: Commit**

```bash
git add _pages/about.md
git commit -m "feat: add lang fields to English about page"
```

---

### Task 7: Create Chinese about page

**Files:**
- Create: `_pages/about_zh.md`

**Step 1: Create `_pages/about_zh.md`**

```markdown
---
layout: about
title: 简介
permalink: /zh/
subtitle: <a href='#'>助理教授</a>，复旦大学，上海，zhaori_bi AT fudan.edu.cn
lang: zh
lang_alternate: /

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

news: true
latest_posts: true
selected_papers: true
social: false
---
毕朝日，博士，复旦大学助理教授。他于2013年5月和2017年12月分别在美国德克萨斯大学达拉斯分校获得电气工程与计算机工程硕士和博士学位。2017年，他在奥地利微电子（Austria Mikro Systeme）美国普莱诺研发部门担任实习CAD工程师。2018年加入复旦大学。他的研究方向包括融合电路设计、电路性能优化和医学人工智能应用。他是Integration, The VLSI Journal的副编辑。
```

**Step 2: Commit**

```bash
git add _pages/about_zh.md
git commit -m "feat: add Chinese about page"
```

---

### Task 8: Verify with Jekyll build

**Step 1: Run Jekyll build to check for errors**

```bash
cd C:/Users/Administrator/code/al-folio
docker compose up --build
```

Or if not using Docker:

```bash
bundle exec jekyll build
```

Expected: Build succeeds with no errors. Check the `_site/` output for:
- `/zh/index.html` exists (Chinese about page)
- `/courses/index.html` exists (courses list page)
- `/courses/example_course/index.html` exists (sample course detail page)
- Language toggle appears in navbar HTML

**Step 2: If build fails, fix any issues and commit fixes**
