# Opinions (观点) Section — Design Document

**Date:** 2026-03-08
**Status:** Approved

## Goal

Add a bilingual "Opinions" (观点) section to the site — a blog-like collection of signed opinion posts organized by date, with tag-based filtering. Rebrands the existing al-folio blog infrastructure rather than creating a new collection.

## Approach

**Rebrand the existing `_posts` blog system.** Al-folio already has a complete blog infrastructure: `_posts/` collection, `post.html` layout, tag/year/category archive pages via `jekyll-archives`. The blog is currently unused (one legacy post to be removed). Rebranding minimizes code changes and leverages battle-tested theme features.

## URL Structure

| Page | URL |
|------|-----|
| EN index | `/opinions/` |
| ZH index | `/opinions_zh/` |
| EN post | `/opinions/:year/:title/` |
| ZH post | `/opinions/:year/:title/` (with `-zh` suffix in title) |
| Tag archive | `/opinions/tag/:name/` |
| Year archive | `/opinions/:year/` |
| Category archive | `/opinions/category/:name/` |

## Changes Required

### 1. `_config.yml`

- `blog_name`: → `"Opinions"`
- `blog_nav_title`: → `"Opinions"` (not used in nav directly, but referenced by theme)
- `blog_description`: → updated description
- `permalink`: → `/opinions/:year/:title/`
- `jekyll-archives.permalinks`: all `/blog/` → `/opinions/`
- `display_tags`: → relevant topic tags (e.g., `AI`, `EDA`, `education`)

### 2. New Index Pages

**`_pages/opinions.md`** (English):
- `layout: page`, `title: Opinions`, `permalink: /opinions/`
- `nav: true`, `nav_order: 3`
- `nav_title_zh: 观点`, `permalink_zh: /opinions_zh/`
- `lang: en`, `lang_alternate: /opinions_zh/`
- Content: tag filter buttons + chronological post list (filtered by `lang: en`)

**`_pages/opinions_zh.md`** (Chinese):
- `layout: page`, `title: 观点`, `permalink: /opinions_zh/`
- `nav: false` (ZH pages don't appear in nav separately)
- `lang: zh`, `lang_alternate: /opinions/`
- Content: mirrors EN page, filtered by `lang: zh`

### 3. Nav Order Update

| Page | Old nav_order | New nav_order |
|------|--------------|---------------|
| CV | 1 | 1 |
| Research | 2 | 2 |
| **Opinions** | — | **3** |
| Repositories | 3 | 4 |
| Courses | 5 | 5 |

### 4. `_layouts/post.html`

- Update hardcoded `/blog/` paths to `/opinions/` (year link and tag links)
- Add language toggle link using `page.lang_alternate` front matter

### 5. Archive Layouts

- `_layouts/archive-year.html`, `archive-tag.html`, `archive-category.html`: update any hardcoded `/blog/` references to `/opinions/`

### 6. Delete Legacy Post

- Remove `_posts/2023-07-12-DAC-paper.md`

### 7. Sample Posts

- Create one EN and one ZH example opinion post to verify the full flow
- Front matter template:

```yaml
---
layout: post
title: "Opinion Title"
date: 2026-03-08
description: "Short description for listings"
tags: [AI, EDA]
lang: en
lang_alternate: /opinions/2026/opinion-title-zh/
author: Zhaori Bi
---
```

## Bilingual Mechanism

- Each opinion is two separate files: `YYYY-MM-DD-topic.md` (EN) and `YYYY-MM-DD-topic-zh.md` (ZH)
- Posts declare `lang: en` or `lang: zh` in front matter
- Index pages filter posts by language using Liquid
- Posts cross-link via `lang_alternate` front matter

## Tag Filtering (Index Page)

- Tag buttons rendered at top of index page from `site.display_tags` or from post tags
- JavaScript click handler shows/hides posts based on selected tag
- All posts shown by default
- Active tag highlighted

## Out of Scope

- Pagination (add later if post count grows)
- Comments (Giscus config exists but not wired to this repo)
- Related posts suggestions
- RSS feed customization
