# Last General-Purpose Chip Article Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Write and publish a bilingual opinion article on model-specific chips replacing GPUs.

**Architecture:** Two parallel markdown posts following existing al-folio conventions, with one shared image asset.

**Tech Stack:** Jekyll, Markdown, Docker for local testing.

---

### Task 1: Write Chinese article

**Files:**
- Create: `_posts/2026-03-30-last-general-purpose-chip-zh.md`

- [ ] **Step 1: Create the Chinese article file**

Write the full Chinese article following the spec in `docs/superpowers/specs/2026-03-30-last-general-purpose-chip-design.md`. Front matter pattern from `_posts/2026-03-15-flying-crayfish-zh.md`. Seven sections (I-VII), ~4000-5000 chars. Include the GPU Swiss Army knife image in Section II. Use Chinese curly quotes throughout.

- [ ] **Step 2: Commit the Chinese article**

### Task 2: Write English article

**Files:**
- Create: `_posts/2026-03-30-last-general-purpose-chip.md`

- [ ] **Step 1: Create the English article file**

Write the full English article following the same spec. Not a direct translation but a parallel piece with the same structure and arguments adapted for English readers. Front matter pattern from `_posts/2026-03-15-flying-crayfish.md`. Seven sections (I-VII), ~4000-5000 words.

- [ ] **Step 2: Commit the English article**

### Task 3: Test and publish

- [ ] **Step 1: Verify both articles render correctly in Docker dev server**
- [ ] **Step 2: Push to remote**
