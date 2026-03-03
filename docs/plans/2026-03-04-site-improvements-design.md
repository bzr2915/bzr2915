# Design: Site Improvements — Research Directions, About Rewrite, Social Links, Abstracts

**Date**: 2026-03-04
**Status**: Approved

## Goal

Improve the academic promotional effectiveness of the website by: converting projects into research directions, rewriting the about page with narrative style, adding Google Scholar/ORCID links, and completing all paper abstracts.

## 1. Research Directions Page

**Approach**: Reuse existing `_projects` collection (no new collections/templates).

**Changes to `_pages/projects.md`**:
- `title: projects` → `title: research`
- `nav: false` → `nav: true`
- Remove `display_categories` (only 2 directions, no need for categories)
- Simplify Liquid template to show all items without category grouping

**Replace `_projects/` contents**:
- Delete all 6 placeholder files (1_project.md through 6_project.md)
- Create `_projects/1_ai_eda.md`: AI for EDA direction
  - 2-3 paragraphs: AI-native EDA vision, black-box optimization, circuit modeling, automated synthesis
  - List of representative papers (manual markdown links)
- Create `_projects/2_ai_medical.md`: AI for Medical direction
  - 2-3 paragraphs: ML-based diagnostic/prediction models
  - List of representative papers

Each direction file uses `layout: page` with title, description, img, importance fields.

## 2. About Page Rewrite

**Narrative style**: Research-motivation driven, highlighting AI-native EDA vision.

**English version** (`_pages/about.md`):
- Opening: Name, title, affiliation (College of Integrated Circuits & Micro Nano Electronics, Fudan University), State Key Lab
- Research motivation: Chip complexity growing exponentially → traditional EDA insufficient → AI-native approach where AI drives design process, EDA tools as modular services
- Methods: Black-box optimization (Bayesian, RL, MCTS), circuit behavior modeling, automated analog synthesis
- Impact: Publications at DAC/ICCAD/DATE/TCAD/TODAES, Associate Editor of Integration, EDA² Youth Technology Award, ISEDA Best Paper
- Medical AI: Cross-domain collaboration
- Education: One sentence, UT Dallas PhD/MS

**Chinese version** (`_pages/about_zh.md`): Corresponding translation, same narrative style.

**Also change**: `social: false` → `social: true` in both files.

## 3. Social Links Configuration

**File**: `_config.yml`

Uncomment and set:
```yaml
scholar_userid: Q76A4KsAAAAJ
orcid_id: 0000-0002-7315-3150
```

## 4. Paper Abstracts

**File**: `_bibliography/papers.bib`

All 51 papers currently lack `abstract` fields. Add abstracts to all papers by searching for each paper's title online and extracting the published abstract.

## Files Changed

| Action | File | Description |
|--------|------|-------------|
| Modify | `_pages/projects.md` | title→research, nav→true, simplify template |
| Delete | `_projects/1-6_project.md` | Remove all 6 placeholder files |
| Create | `_projects/1_ai_eda.md` | AI for EDA research direction |
| Create | `_projects/2_ai_medical.md` | AI for Medical research direction |
| Modify | `_pages/about.md` | Narrative rewrite + social: true |
| Modify | `_pages/about_zh.md` | Chinese narrative rewrite + social: true |
| Modify | `_config.yml` | Add scholar_userid and orcid_id |
| Modify | `_bibliography/papers.bib` | Add abstracts to all 51 papers |

## Not Changed

- Blog (explicitly excluded by user)
- Courses section (already implemented)
- Language toggle (already implemented)
- CSS/styles
- No new gem dependencies
