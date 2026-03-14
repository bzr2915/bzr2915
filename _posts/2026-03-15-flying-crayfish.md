---
layout: post
title: "Flying Crayfish Everywhere"
date: 2026-03-15
description: "When AI agents invade chip design"
tags: [AI, EDA, chip design]
lang: en
lang_alternate: /opinions/2026/flying-crayfish-zh/
author: Zhaori Bi
toc:
  sidebar: left
---

## I

Late one night in November 2025, in Graz, Austria, Peter Steinberger pushed some code to GitHub and closed his laptop. He called the project Clawdbot — an AI agent that could plug into large language models and autonomously execute tasks through messaging platforms. It was two in the morning in Graz. He didn't tweet about it, didn't write a blog post. He turned off the lights and went to sleep.

No one anticipated what would happen next.

That same month, in an office building in Shanghai's Zhangjiang district, a twelve-person chip design team was grinding through final timing closure on a RISC-V SoC for the AIoT market. The team lead, a veteran backend engineer everyone called Old Chen, had been doing this for twenty years. His workstation stood apart from the others — taped to the side of his monitor was a yellowed, handwritten checklist: synthesis constraints, clock tree strategies, routing congestion thresholds. The ink had faded, but every item had been paid for with real silicon across more than a dozen tapeouts. A fresh graduate named Xiao Wang followed Old Chen around each day, watching him read timing reports, learning to tell the difference between a genuine setup violation and a pessimistic estimate from the tools. At lunch, Old Chen brewed strong tea in an enamel mug, the leaves piling into a small hill at the bottom. Xiao Wang sat across from him, listening to the story of a tapeout ten years ago where insufficient hold margin scrapped an entire batch.

This mode of knowledge transfer was clumsy, inefficient — no management consultancy would recommend it. But it had an advantage no one noticed: knowledge was repeatedly tested in the process of transmission. Old Chen said "the hold margin on this path is too thin." Xiao Wang asked "why." Old Chen explained the physics. Next time Xiao Wang encountered a similar situation, he made his own judgment. When he got it wrong, Old Chen corrected him. Knowledge gradually solidified through these back-and-forth exchanges into reliable engineering intuition — what Michael Polanyi called "tacit knowledge"[^polanyi]: Old Chen could "see" which routes on a layout would cause problems, the way an experienced physician can spot shadows on an X-ray that others cannot. This knowledge resisted codification into rule books, because even Old Chen himself could not fully articulate what he was "seeing."

[^polanyi]: Michael Polanyi introduced the concept of "tacit knowledge" in *Personal Knowledge* (1958): we know far more than we can tell. A cyclist knows how to balance but cannot fully express this knowledge in rules — the "intuition" of senior chip designers shares this nature.

Two worlds, each running on its own axis, unaware of the other's existence.

## II

On February 2, 2026, Anthropic's legal department made a strategic error. They sent Steinberger a trademark infringement warning — Clawdbot sounded too much like Claude. Steinberger renamed the project OpenClaw and published the cease-and-desist letter for the world to see.

The internet's memory is short, but its outrage is explosive. The Streisand effect delivered ninety-one thousand new GitHub stars in seventy-two hours. By the end of February, the count had passed two hundred and forty-seven thousand — breaking the record React had built over ten years[^react]. More than five thousand four hundred skill plugins sprouted across the community, covering everything from automated customer service to code review, from investment analysis to academic paper retrieval.

[^react]: React, Meta's frontend JavaScript framework, had long held the top spot for GitHub stars. OpenClaw surpassed its decade-long record in roughly sixty days.

These numbers need a metaphor to be truly understood. The red swamp crayfish — *Procambarus clarkii* — entered Chinese waterways in the early twentieth century as an invasive species. They breed prodigiously, adapt to almost anything, and have virtually no natural predators. Most importantly, they have no spine — no internal rigid structure, supported only by an exoskeleton. OpenClaw and its derivative agent ecosystem are the tech world's crayfish: astonishingly prolific, everywhere at once, but boneless. The crayfish had taken flight.

Old Chen in Zhangjiang noticed the storm too — not from browsing GitHub, but because the company's VP of Technology mentioned it at the weekly meeting: "Some teams in the industry are using AI agents to chain EDA tools together. Reportedly three-to-five-x efficiency gains. Should we look into it?"

The assignment fell to Xiao Wang. Three weeks later, he delivered a prototype: an OpenClaw-like agent framework wired to Synopsys's Design Compiler, IC Compiler II, and PrimeTime. The agent read synthesis reports, automatically adjusted constraints, re-ran place-and-route, performed timing analysis, and looped until convergence.

The results were immediate. A module-level synthesis-placement-timing loop that used to take engineers two days of manual iteration — the agent ran fourteen rounds in eight hours. Timing closure sped up nearly fourfold. When Xiao Wang demonstrated it to the team, everyone went quiet for a few seconds, then began to applaud.

Old Chen applauded too. But after the meeting, he asked one more question: "When the agent inserted three levels of buffers on a critical path to fix setup, did it know that doing so increases the fanout loading on the upstream logic and might trigger a new violation at a different corner?"

Xiao Wang paused. "It doesn't need to know why. It just needs to know what to change to make timing clean."

Old Chen picked up his enamel mug, took a sip of tea, and said nothing.

## III

The crayfish bred faster than anyone imagined.

On February 14, 2026, Steinberger joined OpenAI, and OpenClaw was handed over to an open-source foundation[^openai]. Two weeks later, Nvidia announced NemoClaw — an enterprise AI agent platform built on the OpenClaw architecture, aimed squarely at engineering design automation. In early March, Meta acquired Moltbook at an undisclosed price — an AI agent social network built with OpenClaw, despite the fact that most of its "users" were AI-generated virtual personas[^moltbook].

[^openai]: Steinberger announced his move to OpenAI on February 14, 2026, and pledged that OpenClaw would remain open source under an independent foundation. Industry skepticism about the sustainability of this pledge was widespread.

[^moltbook]: Before its acquisition by Meta, Moltbook had drawn controversy over massive volumes of AI-generated fake posts. A platform built by AI agents, filled with AI-generated content, purchased by a social media giant — the fact itself was a stress test on the concept of "authenticity."

A founder of a Shanghai EDA startup later recalled that after adding "AI Agent-driven chip design automation" to his pitch deck, the valuation for the same technical proposal doubled. "It wasn't because we'd figured out how to use agents," he said. "It was because you couldn't raise the next round without those four words." Within three months, the phrase "AI Agent" appeared seven times more frequently in EDA funding materials.

The story in Zhangjiang accelerated too. Xiao Wang's prototype was promoted to a formal project; the company assigned three people to it full-time. The agent's capabilities kept expanding — from timing closure to power optimization, from single-module iteration to full-chip flows. Young engineers settled into a new way of working: describe the objective, launch the agent, review the results. Decisions that once required understanding the underlying principles at each step were now made by the agent — faster, more consistent, tireless.

Old Chen noticed a trend that unsettled him. New engineers asked "why" less and less. They asked "how to make the agent run faster," "how to write better prompts," "how to reduce the agent's false violations." The black box of the EDA tools had extended upward into the agent layer — one black box stacked on top of another.

Three months earlier, any engineer on the team could explain why a given path had negative setup slack. Now, when the agent automatically fixed a timing violation, most people's reaction was "fixed" — not "I understand why it fixed that and whether the fix has side effects." What passed for "reviewing results" had in practice degenerated into "checking whether all the reports say pass." That isn't review. That is rubber-stamping.

In 1983, British cognitive scientist Lisanne Bainbridge published a paper called "Ironies of Automation"[^bainbridge], identifying a paradox that remains underdigested to this day: the purpose of designing automated systems is to eliminate human operator errors, but automation transforms the human's role from active executor to passive monitor — and humans are precisely bad at prolonged passive monitoring. More ironically still, the tasks hardest to automate — responding to rare, unforeseen anomalies — are exactly the tasks that require human takeover when automation fails. The more reliable the agent becomes, the less engineers practice independent judgment; the less they practice, the more catastrophic the consequences when the agent does fail.

[^bainbridge]: Lisanne Bainbridge, "Ironies of Automation," *Automatica*, 1983. Widely regarded as one of the most influential papers in human factors engineering; its core insight remains as sharp four decades later.

Knowledge had not vanished. It had migrated — from human minds into the agent's decision chain. But the agent's decision chain is liquid: it makes choices based on statistical patterns, without understanding physical causality, without knowing the conditions under which it will fail. This migration is one-way — once engineers lose the capacity for independent judgment, they can no longer verify whether the agent's output is reliable.

## IV

Autumn 2026 — if we extrapolate the current trajectory — some team will encounter this scenario.

A chip comes back from the fab. Functional verification passes across the board, but measured performance falls eighteen percent below simulation expectations. Not a single-module problem, but a diffuse performance degradation — every critical path a little slower than predicted, accumulating to eighteen percent.

The team begins to investigate. The agent's decision log shows that during place-and-route, it made a series of placement adjustments to relieve congestion in a particular region. Each adjustment was "reasonable" — congestion went down, DRC came out clean, timing reports showed met. But the cumulative effect of these adjustments altered the global interconnect topology, causing the final physical implementation to diverge systematically from the architecture team's original floorplan intent. Every step's signoff extraction was accurate — the tools did not lie — yet the chip that came back was no longer the chip the design team had meant to build.

The agent did not know this. Each of its decisions was based on current tool feedback, and at every step that feedback said "pass." The problem lay in the coupling effects between steps — something the agent's statistical decision framework is constitutionally blind to. Charles Perrow, studying accidents at nuclear plants and chemical factories, coined a concept: "normal accidents"[^perrow] — in tightly coupled complex systems, every component operates correctly, but interactions between components produce unforeseen failures. Agent-assisted chip design flows are becoming fertile ground for exactly this kind of normal accident.

[^perrow]: Charles Perrow, *Normal Accidents: Living with High-Risk Technologies*, Basic Books, 1984. Perrow argued that in tightly coupled, interactively complex systems, accidents are not aberrations but inevitable consequences of the system's architecture.

What was more disturbing was the debugging process itself. Two years earlier, Old Chen could have localized this problem in half a day. His judgment came not from any rule but from twenty years of the cycle "make a decision by hand, observe the consequences, revise understanding" — tacit knowledge that can only be accumulated through practice. He could "see" on a layout which signal routes had been inadvertently stretched, the way a veteran traditional doctor can feel things while taking a pulse that a younger physician cannot. But Old Chen had retired the previous year. The current team could see in the agent's log what was done at each step, but could not understand why these individually "correct" steps, combined, produced an "incorrect" result.

They could see the trees but not the forest. And the shape of the forest was defined by the kind of engineering intuition they had stopped transmitting.

Someone suggested calling Old Chen. He came in, studied the layout for half a day, and pointed at several routes: "Here, here, and here — the agent pushed these modules north to save on congestion, but that shifted the relative positions of the clock mesh and the data paths. The distribution of interconnect delay is off across the board." He completed in four hours a diagnosis the younger engineers could not have managed in a week.

But Old Chen cannot come every time. What happens next time, when he doesn't?

The day the crayfish succeed is the day the safety net disappears.

## V

The root of the problem is not OpenClaw, not AI agents, not any specific technology. The problem is attitude — the attitude with which the entire industry approaches the proposition "AI + chip design."

On June 1, 2009, in the early hours of the morning, Air France Flight 447 from Rio de Janeiro to Paris encountered high-altitude icing over the Atlantic. Ice crystals blocked the pitot tubes; the autopilot disconnected. Three pilots faced a scenario they had rarely handled manually — a stall. Over the next three minutes and twenty seconds, they made a series of contradictory inputs. The aircraft plunged into the Atlantic. Two hundred and twenty-eight people died[^af447].

[^af447]: The Air France Flight 447 disaster (2009) is a canonical case of automation dependency leading to catastrophe. The accident investigation report (BEA, 2012) found that the pilots' failure to recognize the stall and execute proper nose-down recovery was fundamentally attributable to degraded manual flying skills caused by prolonged reliance on the autopilot.

After the investigation, the aviation industry did not rip out the autopilot. They did something else: they spent decades systematically designing the methodology for human-machine collaboration — under what circumstances should pilots trust the automated system? Under what circumstances must they take over? How do you ensure that pilots retain manual flying skills after years of automation dependency? Jens Rasmussen's "skills-rules-knowledge" framework[^rasmussen] provided the theoretical foundation: automation can take over decisions at the skill-based and rule-based levels, but knowledge-based reasoning — the capacity to judge in unforeseen situations — must remain in human hands.

[^rasmussen]: Jens Rasmussen, "Skills, Rules, and Knowledge; Signals, Signs, and Symbols, and Other Distinctions in Human Performance Models," *IEEE Transactions on Systems, Man, and Cybernetics*, 1983. Rasmussen's framework remains a cornerstone of human factors engineering and safety-critical system design.

The chip design industry is skipping this step. Browse the past year's conference papers, technical blogs, and fundraising press releases and you find a dispiriting pattern: almost all the work stops at "we used an Agent/LLM to do X and achieved Y-times speedup." Hardly anyone pursues the next layer: where are the boundaries of the agent's decision competence? Under what conditions will it systematically err? When improvements in agent capability cause human knowledge to atrophy, is the overall system becoming more reliable or less?

These are not academic quibbles. They are the core of engineering methodology. And they are especially lethal at advanced process nodes — below 7nm, the nonlinearity of physical effects and the cross-step coupling are far more severe than at mature nodes. The gap between the agent's locally optimal decisions and globally optimal results grows wider. For simple designs on mature processes, the agent may well be "good enough." But the frontier of the industry — where both value and risk concentrate — is precisely the zone where agents are most likely to err and humans least able to verify.

Current work is almost entirely superficial. Hook an agent into the tool chain, run a few test cases, report the speedup factor, publish a paper or draft a funding pitch. No one is discussing the methodological foundations, because those questions are not glamorous, not easily reduced to numbers, and cannot go on the first slide of a deck.

This is the nature of the superficiality: not a superficiality of technology, but a superficiality of attitude. Chasing the spectacle of the crayfish, avoiding the dullness of methodology.

## VI

But if we conclude from all this that "crayfish are bad," we are being as shallow as those who embrace them blindly.

OpenClaw accumulated two hundred and forty-seven thousand GitHub stars in sixty days. That number cannot be explained by hype alone. Five thousand four hundred skill plugins did not materialize from nothing. Nvidia, Meta, OpenAI — these are not players easily taken in — are all betting on the agent ecosystem. The crayfish's power is real; denying it is just another form of superficiality.

The knowledge of chip design is equally real. The causal chains involved in taking a chip from concept to tapeout run deeper and more rigidly than those of any software system. Timing constraints are backed by the speed of electromagnetic wave propagation. Power models are grounded in the physical switching characteristics of transistors. Reliability requirements rest on the fatigue limits of materials. These are not statistical patterns but physical laws — truly solid knowledge that does not disappear when you swap a dataset or retrain a model.

The real question is not "crayfish or chips" but "how does the liquid crayfish coexist with solid physics."

In *Liquid Chips*, I discussed three forms of knowledge: liquid statistical correlation, solidifying causal reasoning, and solid physical laws. AI agents — OpenClaw and all its successors — are fundamentally amplifiers of liquid knowledge. They invoke $$P(Y\vert X)$$ at unprecedented scale and speed, surfing efficiently through oceans of statistical patterns. But they cannot on their own accomplish the phase transition from liquid to solid. $$P(Y\vert X)$$ — "the probability of Y given that X is observed" — multiplied by a million times the compute is still $$P(Y\vert X)$$. It will not spontaneously become $$P(Y\vert do(X))$$ — "the probability of Y after actively intervening on X."

One might object: the agent and the engineer together form a coupled cognitive system — knowledge is not "transferred" from human to machine but "distributed" across the pair. Perhaps the overall system's cognitive capacity has improved; why worry about individual engineers' knowledge atrophy? This objection has philosophical merit[^clark], but it overlooks a critical fact: chip design is a safety-critical domain. An airliner's autopilot also forms a coupled cognitive system with its pilots, but no one uses that as grounds to eliminate manual flight training. In coupled systems, when the automated component behaves in ways beyond design expectations — and in tightly coupled complex systems this is inevitable — the human component must possess the capacity for independent diagnosis and intervention. This capacity does not "emerge" from the system. It must be deliberately cultivated and maintained in the human.

[^clark]: Andy Clark and David Chalmers proposed the "Extended Mind Thesis" in 1998, arguing that cognitive processes need not be confined to the skull but can extend to external tools and environments. The framework is illuminating for understanding human-machine collaboration, but its applicability in safety-critical domains requires careful evaluation.

This means the correct role for agents in chip design is not "replacing engineers in making decisions" but "exploring efficiently under the causal constraints set by engineers." Agents handle speed; engineers handle direction. But even this formulation is too clean. Honestly, speed itself changes direction — when the agent runs fourteen rounds of iteration in eight hours, its intermediate results redefine the design space as perceived by the engineer. The engineer's "sense of direction" does not exist in a vacuum; it depends on his understanding of the design space's terrain, and that terrain is being reshaped by the agent's rapid exploration. Speed and direction cannot be neatly separated — between them lies an irreducible epistemological entanglement.

Perhaps this is the situation we truly face: not an engineering problem that methodology can perfectly solve, but a cognitive condition that requires working continuously within tension. Between the agent's liquid power and the human's solid knowledge, there is no boundary that can be drawn once and for all. The boundary itself is dynamic — shifting as process nodes advance, design complexity grows, and agent capabilities improve. The knowledge needed to maintain this dynamic boundary is precisely the knowledge we are worried about losing.

## VII

Let us return to Zhangjiang.

Suppose Old Chen had not retired. Suppose that when he saw Xiao Wang's agent prototype, instead of asking one question and falling silent, he sat down and did something far harder together with Xiao Wang: drawing causal boundaries for the agent's decisions.

Not a once-and-for-all checklist — they both knew no such checklist exists. Rather, a discipline of continuous calibration. For example: in clock tree synthesis, buffer sizing can be handed to the agent, since it is essentially a convex optimization problem under given constraints; but the choice of clock topology — mesh versus tree versus hybrid — must be made by a human, because the impact of topology changes on full-chip timing is nonlinear, cross-module, and invisible to the agent's local feedback signals. Similarly: standard cell placement refinement can be delegated to the agent within a given window; but floorplan-level decisions about the relative positions of critical modules must be reviewed by a human with causal understanding of the data path and clock domain relationships.

This is not an afternoon's work. It demands a systematic audit of the causal structure at every decision node in the chip design flow. This work is not glamorous. It does not lend itself to publications. It cannot go on the first slide of a pitch deck. And it contains an internal paradox — it requires people like Old Chen to carry it out, yet one of its purposes is to ensure that future engineers need not become Old Chen. This paradox cannot be resolved. It can only be acknowledged, and then worked within.

The crayfish are indeed flying everywhere. Their numbers will keep growing, their capabilities will keep strengthening, their ecosystem will keep flourishing. This is an irreversible trend, and it should not be reversed. But crayfish have no spine — they swim freely in the currents of statistical patterns, with no endoskeleton, no solid support structure. What chip design needs is a skeleton.

The real work is not catching crayfish, nor refusing them. It is building a skeleton for the crayfish — a rigorous methodology that lets the agent's liquid power solidify within the solid framework of causal reasoning and physical constraints into reliable engineering capability. This skeleton will not be perfect. It will not be eternal. It will itself evolve as technology advances. But a crayfish without a skeleton can only swim; with a skeleton, it might just stand on land.

This work has barely begun.

Xiao Wang has recently developed a habit. Before leaving the office each day, he spends twenty minutes manually re-running one of the key decisions the agent made that day — without the agent, using only himself. Sometimes his result matches the agent's. Sometimes it doesn't. When it doesn't, he goes to find out why. He has never mentioned this to anyone. After Old Chen left, no one in the office brews strong tea in an enamel mug anymore. But a new mug has appeared on Xiao Wang's desk. Printed on it is a cartoon crayfish.
