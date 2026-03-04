# Site Improvements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve academic promotional effectiveness: convert projects to research directions, rewrite about page narratively, add Google Scholar/ORCID, and add abstracts to all 51 papers.

**Architecture:** Direct edits to existing Jekyll pages and config. Research directions reuse the `_projects` collection. Abstracts fetched from web searches by paper title.

**Tech Stack:** Jekyll, BibTeX, Liquid templates, YAML front matter

**Design doc:** `docs/plans/2026-03-04-site-improvements-design.md`

---

### Task 1: Configure Google Scholar and ORCID

**Files:**
- Modify: `_config.yml:77-80` (social integration section)

**Step 1: Uncomment and set scholar_userid and orcid_id**

In `_config.yml`, change:
```yaml
# scholar_userid: # your Google Scholar ID
```
to:
```yaml
scholar_userid: Q76A4KsAAAAJ # your Google Scholar ID
```

And change:
```yaml
# orcid_id: # your ORCID ID
```
to:
```yaml
orcid_id: 0000-0002-7315-3150 # your ORCID ID
```

**Step 2: Commit**

```bash
git add _config.yml
git commit -m "feat: add Google Scholar and ORCID IDs"
```

---

### Task 2: Rewrite English about page

**Files:**
- Modify: `_pages/about.md`

**Step 1: Rewrite about.md**

Replace the entire file with:

```markdown
---
layout: about
title: About
permalink: /
subtitle: <a href='#'>Assistant Professor</a>. College of Integrated Circuits & Micro Nano Electronics, Fudan University
lang: en
lang_alternate: /zh/

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

news: true
latest_posts: true
selected_papers: true
social: true
---
Zhaori Bi is an Assistant Professor at the College of Integrated Circuits & Micro Nano Electronics, Fudan University, and a member of the EDA Innovation Center at the State Key Laboratory of Integrated Chips and Systems.

As chip design complexity grows exponentially, traditional EDA methods struggle to keep pace. His research pursues an AI-native approach to EDA — where artificial intelligence is not merely a tool assisting conventional workflows, but the central driving force of the design process, orchestrating EDA tools as modular services. This vision spans black-box optimization methods (Bayesian optimization, reinforcement learning, Monte Carlo tree search), circuit behavior modeling, and automated analog circuit synthesis.

His work has been published at leading venues including DAC, ICCAD, DATE, and IEEE TCAD/TODAES. He serves as an Associate Editor of *Integration, the VLSI Journal*, and has received the EDA² Youth Technology Award and ISEDA Best Paper Award.

He also explores AI applications in medicine, collaborating with clinicians on machine-learning-based diagnostic and prediction models.

He received his Ph.D. and M.S. in Electrical/Computer Engineering from the University of Texas at Dallas.
```

Key changes from original:
- `subtitle` updated with correct college name
- `social: false` → `social: true`
- Body rewritten with research-motivation narrative, AI-native EDA framing

**Step 2: Commit**

```bash
git add _pages/about.md
git commit -m "feat: rewrite English about page with narrative style"
```

---

### Task 3: Rewrite Chinese about page

**Files:**
- Modify: `_pages/about_zh.md`

**Step 1: Rewrite about_zh.md**

Replace the entire file with:

```markdown
---
layout: about
title: 简介
permalink: /zh/
subtitle: <a href='#'>助理教授</a>，复旦大学集成电路与微纳电子创新学院
lang: zh
lang_alternate: /

profile:
  align: right
  image: prof_pic.jpg
  image_circular: false

news: true
latest_posts: true
selected_papers: true
social: true
---
毕朝日，复旦大学集成电路与微纳电子创新学院助理教授，集成芯片与系统全国重点实验室EDA创新中心成员。

随着芯片设计复杂度呈指数级增长，传统EDA方法已难以应对日益严峻的设计挑战。他的研究致力于构建AI原生的EDA方法学——让人工智能不再是辅助传统流程的工具，而是设计过程的核心驱动力，将各类EDA工具作为可编排的模块化服务进行调用。这一研究方向涵盖黑箱优化方法（贝叶斯优化、强化学习、蒙特卡洛树搜索）、电路行为建模以及模拟电路自动化综合。

研究成果发表于DAC、ICCAD、DATE及IEEE TCAD/TODAES等顶级会议和期刊。现任*Integration, the VLSI Journal*副编辑，曾获EDA²青年技术奖和ISEDA最佳论文奖。

他同时探索AI在医学领域的应用，与临床医生合作开展基于机器学习的诊断与预测模型研究。

博士和硕士毕业于美国德克萨斯大学达拉斯分校电气与计算机工程专业。
```

Key changes: same as English version — `subtitle` updated, `social: true`, narrative rewrite.

**Step 2: Commit**

```bash
git add _pages/about_zh.md
git commit -m "feat: rewrite Chinese about page with narrative style"
```

---

### Task 4: Convert projects page to research directions

**Files:**
- Modify: `_pages/projects.md`

**Step 1: Rewrite projects.md**

Replace the entire file with:

```markdown
---
layout: page
title: research
permalink: /projects/
description: Our research directions.
nav: true
nav_order: 2
horizontal: false
---

<div class="projects">
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
</div>
```

Changes from original:
- `title: projects` → `title: research`
- `nav: false` → `nav: true`
- Removed `display_categories` (no categories needed for 2 items)
- Simplified Liquid: removed all category logic and horizontal layout branches

**Step 2: Commit**

```bash
git add _pages/projects.md
git commit -m "feat: convert projects page to research directions"
```

---

### Task 5: Replace placeholder projects with research directions

**Files:**
- Delete: `_projects/1_project.md` through `_projects/6_project.md`
- Create: `_projects/1_ai_eda.md`
- Create: `_projects/2_ai_medical.md`

**Step 1: Delete all 6 placeholder project files**

```bash
cd C:/Users/Administrator/code/al-folio
rm _projects/1_project.md _projects/2_project.md _projects/3_project.md _projects/4_project.md _projects/5_project.md _projects/6_project.md
```

**Step 2: Create `_projects/1_ai_eda.md`**

```markdown
---
layout: page
title: AI for EDA
description: AI-native electronic design automation — black-box optimization, circuit modeling, and automated analog synthesis.
img: assets/img/12.jpg
importance: 1
---

## AI-Native Electronic Design Automation

As integrated circuit design complexity grows exponentially, traditional EDA methods based on hand-crafted heuristics and rule-based approaches are reaching their limits. Our research redefines EDA by placing artificial intelligence at the center of the design flow — treating AI as the core decision-making engine and EDA tools as modular services it orchestrates.

We develop advanced black-box optimization methods — including Bayesian optimization, reinforcement learning, and Monte Carlo tree search — tailored for the unique challenges of analog circuit sizing: high-dimensional design spaces, expensive simulations, and complex multi-objective constraints. Our methods enable efficient exploration and exploitation of vast parameter spaces that conventional optimization cannot handle.

We also build neural-network-based circuit behavior models that accelerate design evaluation and enable rapid design-space exploration, and investigate automated topology synthesis frameworks that generate circuit architectures from specifications.

## Representative Publications

- **MARIO** — A Superadditive Multi-Algorithm Interworking Optimization Framework for Analog Circuit Sizing (*DAC 2025*)
- **EVDMARL** — Efficient Value Decomposition-based Multi-Agent Reinforcement Learning for Complex Analog Circuit Design Migration (*DAC 2024*)
- **cVTS** — A Constrained Voronoi Tree Search Method for High Dimensional Analog Circuit Synthesis (*DAC 2023*)
- **BBGP-sDFO** — Batch Bayesian and Gaussian Process Enhanced Subspace Derivative Free Optimization for High-Dimensional Analog Circuit Synthesis (*TCAD 2024*)
- **Atelier** — An Automated Analog Circuit Design Framework via Multiple Large Language Model-based Agents (*TCAD 2025*)
- **AnalogGym** — An Open and Practical Testing Suite for Analog Circuit Synthesis (*ICCAD 2024*)
- **VTSMOC** — An Efficient Voronoi Tree Search Boosted Multi-objective Bayesian Optimization with Constraints (*TCAD 2024*)
- **D3PBO** — Dynamic Domain Decomposition based Parallel Bayesian Optimization for Large-scale Analog Circuit Sizing (*TODAES 2024*)
```

**Step 3: Create `_projects/2_ai_medical.md`**

```markdown
---
layout: page
title: AI for Medical
description: Machine-learning-based diagnostic and prediction models for clinical applications.
img: assets/img/3.jpg
importance: 2
---

## AI for Medical Applications

Leveraging our expertise in machine learning and optimization, we collaborate with clinicians to develop AI-powered tools that address real-world medical challenges. Our work bridges the gap between advanced computational methods and clinical practice.

Our research encompasses automated diagnostic models that learn from clinical data to assist in disease assessment — from knee osteoarthritis severity grading to cervical lesion risk stratification. We also develop predictive models for chronic disease management, including electronic health record-based supervision systems for hemodialysis patients and screening tools for geriatric populations.

## Representative Publications

- **Learning From Highly Confident Samples** for Automatic Knee Osteoarthritis Severity Assessment (*JBHI 2021*)
- **Risk-stratified management** of cervical high-grade squamous intraepithelial lesion based on machine learning (*JMV 2024*)
- **A practical electronic health record-based dry weight supervision model** for hemodialysis patients (*JTEHM 2019*)
- **A parsimonious approach for screening moderate-to-profound hearing loss** in a community-dwelling geriatric population (*BMC Geriatrics 2019*)
```

**Step 4: Commit**

```bash
git add -A _projects/
git commit -m "feat: replace placeholder projects with research directions"
```

---

### Task 6: Fix papers.bib syntax error

**Files:**
- Modify: `_bibliography/papers.bib:141`

There is an extra closing brace `}` on line 141 (after the `shen2025atelier` entry, before `zhao2024vtsmoc`). This stray `}` may cause BibTeX parsing issues.

**Step 1: Remove extra `}` on line 141**

Line 141 is a standalone `}` that does not belong to any entry. Delete this line.

**Step 2: Commit**

```bash
git add _bibliography/papers.bib
git commit -m "fix: remove stray brace in papers.bib"
```

---

### Task 7: Add abstracts to all papers (batch 1 — AI for EDA conference papers)

**Files:**
- Modify: `_bibliography/papers.bib`

For each paper, search the web for the paper title to find the published abstract. Add an `abstract` field to each BibTeX entry.

**Papers in this batch** (conference papers, AI for EDA label):
1. mario (DAC 2025)
2. lbyl (DAC 2025)
3. himoss (DAC 2024)
4. evdmarl (DAC 2024)
5. zhao2023cvts (DAC 2023)
6. zhao2025seeing (ICCAD 2025)
7. sang (ICCAD 2025)
8. ajoint (ICCAD 2024)
9. li2024analoggym (ICCAD 2024)
10. ESWEEK1 (ESWEEK 2024)
11. tSS-BO (DATE 2024)
12. CRC (DATE 2024)
13. zhao2024multiobj (ASP-DAC 2024)
14. lv2024multiobj (ASP-DAC 2024)
15. zhao2022novel (ASP-DAC 2022)
16. fu2022batch (ISCAS 2022)
17. iseda1-5 (ISEDA 2024, 5 papers)
18. li2015analog (MWSCAS 2015)
19. bi2013mixed (ASCION 2013)

For each entry, add the `abstract` field after the last existing field, before the closing `}`. Format:
```bibtex
  abstract={The abstract text here.},
```

Search for each paper by title. If no abstract is found online, write a brief 2-3 sentence summary based on the title.

**Step: Commit after completing this batch**

```bash
git add _bibliography/papers.bib
git commit -m "feat: add abstracts to AI for EDA conference papers"
```

---

### Task 8: Add abstracts to all papers (batch 2 — AI for EDA journal papers)

**Files:**
- Modify: `_bibliography/papers.bib`

**Papers in this batch** (journal papers, AI for EDA label):
1. chen2025high (TCAD 2025)
2. shen2025atelier (TCAD 2025)
3. zhao2024vtsmoc (TCAD 2024)
4. APPLE (TCAD 2024)
5. pPIRW (TCAD 2024)
6. ATOM (TCAD 2024)
7. gu2023bbgp (TCAD 2024)
8. chen2023pneurfill (TCAD 2024)
9. bao2024multiagent (TCAD 2024)
10. he2022batched (TCAD 2023)
11. yang2017smart (TCAD 2017)
12. feng2025hierarchical (TODAES 2025)
13. bi2024optimization (TODAES 2024)
14. bi2017optimization (TODAES 2017)
15. GAOTIANNING (TVLSI 2024)
16. qian2014automated (TVLSI 2014)

Same process: search for each paper title, add `abstract` field.

**Step: Commit**

```bash
git add _bibliography/papers.bib
git commit -m "feat: add abstracts to AI for EDA journal papers"
```

---

### Task 9: Add abstracts to all papers (batch 3 — AI for Medical + theses)

**Files:**
- Modify: `_bibliography/papers.bib`

**Papers in this batch:**
1. lu2024risk (JMV 2024)
2. wang2021learning (JBHI 2021)
3. zhang2021modification (KBPR 2021)
4. zhang2021higher (BMC nephrology 2021)
5. ye2021effects (Renal Failure 2021)
6. ye2021dominant (Renal Failure 2021)
7. bi2019practical (JTEHM 2019)
8. zhang2019parsimonious (BMC geriatrics 2019)
9. bi2017efficient (PhD thesis 2017)
10. bi2013near (MS thesis 2013)

Same process. For theses, use the thesis abstract from ProQuest/university repository if available.

**Step: Commit**

```bash
git add _bibliography/papers.bib
git commit -m "feat: add abstracts to medical papers and theses"
```

---

### Task 10: Final verification

**Step 1: Verify all changes are consistent**

Check:
- `_config.yml` has `scholar_userid` and `orcid_id` uncommented
- `_pages/about.md` and `about_zh.md` both have `social: true`
- `_pages/projects.md` has `title: research`, `nav: true`
- `_projects/` contains exactly 2 files (1_ai_eda.md, 2_ai_medical.md)
- `_bibliography/papers.bib` has no syntax errors and all entries have `abstract` fields
- No stray `}` in papers.bib

**Step 2: Verify git log shows clean commit history**

```bash
git log --oneline -15
```
