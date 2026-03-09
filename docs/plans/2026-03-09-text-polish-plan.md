# 文字润色实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 以吴晓波《大败局》风格润色研究方向页全文和个人简介第二段，并用一张镖人风格插图替代现有四张。

**Architecture:** 纯内容替换任务。修改两个 Markdown 文件的文字内容，替换四张插图为一张，用 figmaster 生成新插图。

**Tech Stack:** Jekyll Markdown, figmaster (Gemini MCP)

---

### Task 1: 改写个人简介第二段

**Files:**
- Modify: `_pages/about_zh.md:21`

**Step 1: 替换第二段文字**

将第21行现有文字替换为：

```markdown
我在找学生和合作者。不要求简历完美，但要求好奇心还没熄。这个时代算法给答案越来越快，很少有人停下来想一想：问题本身问对了没有。我想找的人，对技术有热情，但不止步于技术——关心芯片怎么设计得更好，也关心"更好"到底是什么意思。如果你觉得技术应当让人能做更多的事，而不是让人变得多余，欢迎联系我。
```

**Step 2: 本地预览确认**

浏览器打开 http://localhost:8080/bzr2915/zh/ 确认第二段显示正确。

**Step 3: Commit**

```bash
git add _pages/about_zh.md
git commit -m "feat: rewrite about_zh recruitment paragraph in concise style"
```

---

### Task 2: 改写研究方向页全文

**Files:**
- Modify: `_pages/projects_zh.md:11-72`

**Step 1: 替换正文内容**

保留 front matter（第1-10行），将第11行起的全部正文替换为以下内容：

```markdown

芯片设计六十年，人和工具的关系翻了好几次。最初人画电路，后来软件替人画，再后来AI帮人做决策。每一次翻转，人的角色都往上挪一层。今天，新一轮翻转正在发生。

## 手工作坊

1958年秋天，杰克·基尔比在德州仪器的实验室里焊出了人类第一块集成电路。一小片锗，几根金线，连着晶体管、电阻和电容。他手边的工具和一百年前的制图匠人没什么两样：铅笔、直尺、坐标纸。电路走线全靠脑子想，画错了全靠记忆找。设计者的大脑，就是唯一的设计工具。

这套办法起初够用。但1965年，戈登·摩尔发现芯片上的元件数每两年翻一番。1965年一块芯片上几十个元件，到1970年代初已是几千个。硅片上能塞的东西越来越多，人脑能同时想清楚的东西却不会变多。出路只有一条：造新工具。

## 工具时代

1973年，伯克利的拉里·内格尔写出了SPICE——第一个能在计算机里模拟电路行为的程序。此前想知道电路能不能用，最靠谱的办法是造出来量一量。SPICE让工程师第一次能在制造之前验证设计。先仿真，后制造——今天听来理所当然，当时是一次解放。

接下来是一连串自动化的胜利。软件能把逻辑描述自动转成电路网表，算法能自动完成布局布线，质量有时超过最好的人工。一个新学科诞生了：电子设计自动化，简称EDA。

这套格局稳稳用了三十年。工具越来越强，但所有决策——用什么架构、设什么约束、结果行不行——全由人拍板。工具听话、迅捷，但不会提议，不会质疑。九成九的体力劳作交给了软件，最后那一点需要经验和判断力的活儿，还在人手里。靠着这套分工，行业造出了数十亿晶体管的微处理器。但问题也在积累：芯片规模从百万涨到百亿，设计规则从薄薄一本变成大部头。当连人的判断力都快被复杂度压垮时，下一步怎么办？

## AI辅助

2010年代，机器学习进入芯片设计。神经网络能预判设计结果，贝叶斯优化能用很少的仿真次数找到好参数，强化学习能自行探索布局方案。看起来像革命，但仔细看格局没变——AI是人塞进现有流程里的加速器，流程本身还是人定义的。

我们的研究从这里开始。切入点是模拟电路——芯片设计中最后的手工作坊。数字电路早已高度自动化，模拟电路到2010年代还靠老师傅的经验：调晶体管宽度、设偏置电流、配补偿网络，每一步都是手艺活。核心难题是：拟一组参数，跑一次仿真要几分钟甚至几小时，看结果达不达标，不达标再试。参数空间巨大，每试一次都很贵。我们问的第一个问题很朴素：能不能少跑仿真，就把好参数找到？

最初用概率模型给仿真器建"替身"，用替身指路，不再漫无目的地遍历，效果不错。但实际电路有五十到两百个可调参数，替身在高维空间里很快力不从心。怎么办？我们找到一条路：先辨认出哪些参数最关键，集中精力在关键维度上搜索，其余的暂时搁置。这条路走通了。然后新问题来了：功耗、速度、面积、噪声要同时兼顾——调好了这个，那个又变差。于是又发展出能同时照顾多个目标的搜索方法。另一条路线走得更远：不把调参当一次性任务，让AI像老师傅一样，调一下、看一下、再决定怎么动。复杂电路拆成子模块，每个子模块交给一个AI管，像设计团队分工协作。

这些为模拟电路发明的方法，后来发现别的领域也能用——微处理器的架构探索、芯片热分析的加速、电源网络的预测。底层问题是同一类：昂贵的黑盒，需要聪明地搜索。十年间，从一个朴素的问题出发，长成了一套方法体系。

成果扎实，但有一件事没变：AI再聪明，还是人决定什么时候用它、用在哪里、什么算够好。流程的主人还是人。

## AI原生

下一步的问题自然就来了：能不能让AI自己当主人？

{% include figure.html path="assets/img/research/research_overview.png" class="img-fluid rounded z-depth-1" alt="从手工作坊到AI原生——芯片设计六十年的四次翻转" %}

我们先做了**MARIO**。想法很直接：优化算法有很多种，过去是人选用哪个，现在让AI自己选。MARIO同时跑一组算法，实时看哪个进展快就多给算力，哪个停滞就收回来。AI在优化"怎么优化"这件事本身。

然后是**ATOM**。MARIO解决的是"参数怎么调最好"，ATOM问了一个更靠前的问题：电路该长什么样？晶体管、电容、电阻有无数种连法，ATOM在这个巨大的组合空间里探索，提出人不容易想到的方案。先定形状，再定尺寸。

最新的工作是**Atelier**——一个AI设计团队。几个AI智能体各司其职：有的分析需求，有的搜索架构，有的调参数，还有一个当裁判，拍板取舍、决定下一轮怎么改。人给出规格和约束，剩下的事AI自己商量着办。

从MARIO到ATOM到Atelier，AI的角色一步步扩大：先是自己选策略，再是自己想架构，最后统管全流程。人的角色没有消失，而是变了——从执行者变成了出题人。这个故事还没讲完，下一次翻转会是什么样，我们正在找答案。
```

**Step 2: 本地预览确认**

浏览器打开 http://localhost:8080/bzr2915/projects_zh/ 确认页面显示正确。

**Step 3: Commit**

```bash
git add _pages/projects_zh.md
git commit -m "feat: rewrite research page in narrative style, minimize jargon"
```

---

### Task 3: 用 figmaster 生成镖人风格插图

**Files:**
- Create: `assets/img/research/research_overview.png`

**Step 1: 调用 figmaster 生成插图**

使用 figmaster Gemini MCP 生成一张镖人漫画风格的插图，描述芯片设计六十年从手工作坊到AI原生的四次翻转。给 Gemini 充分创作自由。

提示词要点：
- 风格：镖人（Biao Ren）漫画风格——水墨笔触、高对比、武侠气质
- 内容：一幅画面展现芯片设计的四个时代演进
- 给予 Gemini 创作自由，不要过度约束构图

**Step 2: 确认图片生成成功，放置到正确路径**

**Step 3: Commit**

```bash
git add assets/img/research/research_overview.png
git commit -m "feat: add single research overview illustration in Biao Ren style"
```

---

### Task 4: 清理旧插图引用

**Files:**
- Verify: `_pages/projects_zh.md` 不再引用旧的四张图片
- Check: `_pages/projects.md`（英文版）是否引用同一组图片——如果是，保留旧图片文件；如果不是，可删除

**Step 1: 检查英文版是否使用旧图片**

读取 `_pages/projects.md`，确认是否引用 `act1_artisan.png` 等图片。

**Step 2: 根据检查结果决定是否删除旧图片**

如果英文版仍在使用旧图片，保留不动。如果没有任何页面引用，删除：
```bash
git rm assets/img/research/act1_artisan.png
git rm assets/img/research/act2_tools.png
git rm assets/img/research/act3_ai_assisted.png
git rm assets/img/research/act4_ai_native.png
git commit -m "chore: remove unused research section illustrations"
```

---

### Task 5: 最终验证

**Step 1: 本地构建验证**

```bash
docker compose up
```

浏览器确认：
- http://localhost:8080/bzr2915/zh/ — 第二段显示正确
- http://localhost:8080/bzr2915/projects_zh/ — 全文显示正确，插图加载正常
