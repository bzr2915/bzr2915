# Design: Chinese Version + Courses Section

**Date**: 2026-03-03
**Status**: Approved

## Goal

Add a Chinese version of the website (About page only) with a language toggle, and replace the existing Teaching page with a new Courses section using card-based layout.

## Approach

Manual file-based bilingual setup (no new plugin dependencies). Courses implemented as a Jekyll collection mirroring the existing projects pattern.

## 1. Language Toggle

**Location**: Navbar, right side, next to dark mode toggle.

**Behavior**:
- English pages show `中` button → links to Chinese counterpart (or `/zh/` fallback)
- Chinese pages show `EN` button → links to English counterpart

**Implementation**:
- Pages declare `lang` and `lang_alternate` in front matter
- `_includes/header.html` reads these fields to render the toggle
- Default: if `lang` is absent, treated as English; if `lang_alternate` is absent, `中` links to `/zh/`

## 2. Chinese About Page

**File**: `_pages/about_zh.md`

- `layout: about`, `permalink: /zh/`, `lang: zh`, `lang_alternate: /`
- Chinese subtitle (助理教授, 复旦大学)
- Chinese translation of the bio text
- Reuses same profile image, news, selected papers (not translated)

**Change to existing**: `_pages/about.md` gets `lang: en`, `lang_alternate: /zh/` added to front matter.

## 3. Courses Section

### Collection Config (`_config.yml`)

```yaml
collections:
  courses:
    output: true
    permalink: /courses/:path/
```

### Courses List Page (`_pages/courses.md`)

- `permalink: /courses/`, `nav: true`, `nav_order: 5`
- Replaces Teaching in the navbar
- Card grid layout (same pattern as projects page)
- Supports `display_categories` for grouping (e.g., 本科, 研究生)

### Course Card Template (`_includes/courses.html`)

Based on `_includes/projects.html`, using `course` variable instead of `project`. Displays:
- Course image thumbnail
- Course title
- Course description

### Individual Course Files (`_courses/*.md`)

Front matter:
```yaml
layout: page
title: 课程名称
description: 课程简介
img: assets/img/course_xxx.jpg
category: 本科
importance: 1
```

Body content:
- Course introduction paragraph
- 课件下载: markdown links to PDF/PPT files in `assets/pdf/`
- 参考资料: list of external links and local files

## Files Changed

| Action | File | Description |
|--------|------|-------------|
| Modify | `_config.yml` | Add `courses` collection |
| Modify | `_includes/header.html` | Add language toggle button |
| Modify | `_pages/about.md` | Add `lang`/`lang_alternate` fields |
| Create | `_pages/about_zh.md` | Chinese about page |
| Create | `_pages/courses.md` | Courses list page |
| Create | `_includes/courses.html` | Course card template |
| Create | `_courses/` | Directory for course markdown files |

## Not Changed

- Existing English pages (publications, projects, cv, etc.)
- `_pages/teaching.md` (kept with `nav: false`)
- CSS/styles (reuses existing card styles)
- No new gem dependencies
