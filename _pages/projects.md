---
layout: page
title: Research
permalink: /projects/
description:
nav: true
nav_order: 2
nav_title_zh: 研究方向
permalink_zh: /projects_zh/
lang: en
lang_alternate: /projects_zh/
---

Sixty years of chip design is a story of the relationship between humans and tools flipping several times over. First humans drew circuits. Then software drew for them. Then AI started making decisions. Each flip pushed the human role one level higher. Today, the next flip is underway.

{% include figure.html path="assets/img/research/research_overview.png" class="img-fluid rounded z-depth-1" alt="From artisan to AI-native — four eras of chip design" %}

## The Artisan

In the summer of 1958, Jack Kilby had been at Texas Instruments for two months. Every July, ninety percent of the company went on mass vacation. Kilby was new — he had no vacation days. He was alone in the Dallas lab.

No meetings, no interruptions. He zeroed in on the industry's central problem, known then as the "tyranny of numbers": circuits were growing more complex, components were multiplying, and wiring them together by hand was hitting a wall. On July 24, he wrote an idea in his lab notebook: if transistors, resistors, and capacitors could all be made from the same material, they could all fit on a single piece of semiconductor. People would later call this the "Monolithic Idea."

Two months later, on September 12, Kilby gathered a handful of TI executives at his bench. On it sat a sliver of germanium smaller than a paper clip — 11 millimeters long, 1.6 millimeters wide. A few hand-soldered gold wires arched crookedly above its surface. He connected it to an oscilloscope and flipped the switch. A clean sine wave appeared on the screen. The first integrated circuit was born in an empty lab. Kilby later said: "If I'd known I was going to be showing it for the rest of my life, I would have prettied it up a little."

Hand-drafting circuits worked fine — for a while. Then, in 1965, Gordon Moore wrote an article that changed everything. The occasion was ordinary: *Electronics* magazine was preparing its 35th anniversary issue and asked Moore to write a forecast. Moore was 36, director of R&D at Fairchild Semiconductor. He plotted the number of components per chip from 1959 to 1964 on graph paper — five data points that fell on a straight line. He extended the line with a ruler and predicted 65,000 components by 1975.

A decade later, the actual count on the latest memory chips was 65,536. A magazine assignment, five data points, a ruler — and a prediction accurate to within one percent. Caltech's Carver Mead gave it a name: Moore's Law. Moore himself later admitted the law partly fulfilled itself — the entire industry used it as a target. But the real meaning of Moore's Law was not "chips will get stronger." It was "human brains won't keep up." Component counts doubled every two years. Brains did not. By the early 1970s, a single chip held thousands of components, and no engineer could walk through an entire design in his head. The only way out was to build new tools.

## The Tool Age

In 1969, Professor Ronald Rohrer at UC Berkeley assigned his students a project: write a program that could simulate integrated circuit behavior. They did, and named it CANCER — "Computer Analysis of Nonlinear Circuits, Excluding Radiation." The name was deliberate: most simulators of that era were funded by the military and required nuclear radiation modeling. CANCER declared itself civilian.

The name was too provocative for industry. Graduate student Larry Nagel, under Professor Donald Pederson's guidance, rewrote the program and renamed it SPICE in 1973. Before SPICE, the most reliable way to test a circuit was to build it and measure. SPICE let engineers verify designs mathematically before fabrication. Simulate first, manufacture second — obvious today, liberating then.

Pederson made a decision that shaped the industry for decades: SPICE would be fully public, available to anyone for the cost of a magnetic tape. Students learned SPICE in college. When they graduated and joined companies, they wrote back to Berkeley requesting copies. Within a few years, "to SPICE a circuit" became synonymous with simulation. This was decades before the term "open source" existed.

Tools kept advancing. In 1986, Aart de Geus, a Dutchman working at General Electric, had built a system that could automatically convert logic descriptions into gate-level circuits in twenty minutes — work that previously took engineers days. When GE exited semiconductors, de Geus convinced the vice chairman to invest $400,000 in a spinoff. The company was eventually renamed Synopsys. When it went public in 1992, that $400,000 had become $23 million. Around the same time, Carl Sechen at Berkeley applied a physics algorithm called simulated annealing to chip layout. His program, TimberWolf, produced a layout for an Intel circuit that was 10% smaller than what human engineers achieved by hand. For the first time, a machine beat humans at spatial planning.

A new discipline took shape: Electronic Design Automation, or EDA. By the 1990s, Synopsys, Cadence, and Mentor Graphics dominated the field. The industry's most dramatic story came in 1995. A Cadence engineer noticed a bug in competitor Avanti's software — identical to a bug he had accidentally written in Cadence's own code years earlier. No two programmers would independently create the same mistake. Investigation revealed that Avanti had copied Cadence's source code line by line. Criminal charges, executives jailed, $460 million in restitution — the largest trade secret theft in EDA history.

This arrangement held steady for thirty years. Tools grew ever more powerful, but every decision — which architecture, what constraints, whether the result was good enough — was made by humans. This division of labor produced processors with billions of transistors. But pressure was building: chip complexity climbed from millions to tens of billions, and design rule manuals swelled from slim booklets into crushing tomes. Tools never proposed, never questioned. When even human judgment started buckling under the complexity, the question became: what next?

## AI-Assisted

In the 2010s, machine learning entered chip design. But to understand why AI matters here, you first need to understand one term: analog circuits.

Analog circuits are chip design's last craft workshop. Digital circuits were automated long ago. Analog circuits resisted. The reason is simple: every analog circuit is a custom piece. Components interact with each other — tuning one parameter can throw off three others. It is a craft that takes years to learn.

This craft produced legendary figures. Bob Widlar was Silicon Valley's most famous analog designer by age 33. When National Semiconductor cut its lawn maintenance budget, Widlar bought a sheep, drove it to the office in his convertible Mercedes, chained it to the front lawn, and called a newspaper reporter. When a component wasted his day, he would take it to an anvil and hammer it to dust. Colleagues called this "Widlarizing." He published papers arguing that monolithic voltage regulators were impossible — then built one himself. Jim Williams, another analog master, never used a computer in his life — not even for email. He preferred talking to people directly. His home lab was "at least as good as the one at work." When he died in 2011, he had published over 350 technical articles.

This was the world AI was entering — the craft that Widlar and Williams spent lifetimes mastering. The core challenge: propose a set of parameters, run a simulation that might take minutes or hours, check whether the result meets spec, and try again if it doesn't. The parameter space is enormous. Every attempt is expensive. Our first question was simple: can AI find good parameters with fewer simulations?

We started with probabilistic surrogate models — building a "stand-in" for the simulator, using it to guide the search instead of wandering blindly. It worked well at first. But real circuits have fifty to two hundred tunable parameters, and the surrogate struggled in high dimensions. We found a path: identify which parameters matter most, focus the search on the critical dimensions, and set the rest aside. That worked. Then the next problem arrived: power, speed, area, and noise all need to be optimized simultaneously — improving one often worsens another. We developed multi-objective search methods. A separate line of research went further: instead of treating tuning as a one-shot task, we let AI work like a master designer — adjust, observe, decide the next move. Complex circuits were split into sub-modules, each managed by a dedicated AI, like a design team dividing labor.

These methods, invented for analog circuits, turned out to work elsewhere too — microprocessor architecture exploration, chip thermal analysis acceleration, power network prediction. The underlying problem was the same: expensive black boxes that need smart searching. Over a decade, a simple question grew into a systematic methodology.

The results were solid, but one thing never changed: however smart the AI, humans still decided when to use it, where to apply it, and what counted as good enough. The human was still in charge.

## AI-Native

In June 2021, Google published a paper in *Nature* claiming that reinforcement learning could complete chip layout in six hours — matching or beating weeks of work by human experts. The paper made headlines. But the story that followed was more interesting than the paper itself.

A Google engineer raised objections: he found that simulated annealing — a forty-year-old algorithm — significantly outperformed Google's AI method when properly implemented. Google refused to let him publish his critique, then fired him. A UC San Diego professor who had initially written a companion commentary tried to reproduce the results and found that human experts typically beat Google's AI. In September 2023, *Nature* added an editorial warning. No independent team has successfully replicated the original claims.

Controversy aside, the direction was clear: AI should not just be an accelerator — it should be the designer.

We started with **MARIO**. The idea was straightforward: there are many optimization algorithms — evolutionary, probabilistic, gradient-free. Previously, humans chose which one to use. MARIO lets AI choose for itself. It runs multiple algorithms simultaneously, monitors which ones are making progress, shifts resources toward the winners, and pulls back from those that stall. AI optimizing the optimization process itself.

Then came **ATOM**. MARIO addressed "how to best tune parameters." ATOM asked a more fundamental question: what should the circuit look like in the first place? Transistors, capacitors, and resistors can be connected in countless ways. ATOM explores this vast combinatorial space, proposing designs that human engineers would not easily conceive. Shape first, then dimensions.

Our latest work is **Atelier** — an AI design team. Multiple AI agents, each with a role: one analyzes requirements, one searches for architectures, one tunes parameters, and one serves as the judge — making trade-off decisions and directing the next iteration. The human provides specs and constraints. The rest is worked out among the AI agents.

In 2023, Hammond Pearce at NYU exchanged 124 messages with GPT-4 to have it write all the code for an 8-bit microprocessor from scratch. The chip was fabricated, and he used it to power a Christmas light show. It is believed to be the world's first chip with entirely AI-written code. In 2026, Cadence released the ChipStack AI Super Agent — the industry's first autonomous AI agent product for front-end design and verification.

From MARIO to ATOM to Atelier, AI's role has expanded step by step: first choosing its own strategy, then conceiving architecture, then managing the entire flow. The human role has not disappeared — it has changed. From executor to the one who asks the questions. This story is not over. What the next flip will look like, we are working to find out.
