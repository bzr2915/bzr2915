---
layout: post
title: "Liquid Chips"
date: 2026-03-08
description: "On design, causality, and uncertainty"
tags: [causal analysis, chip design]
lang: en
lang_alternate: /opinions/2026/liquid-chips-zh/
author: Zhaori Bi
toc:
  sidebar: left
---

## I

Getting a chip from conception to tape-out involves something that most engineers are reluctant to admit: it resembles gambling.

Not the kind with known odds — roll a die, one in six, take the loss. Rather, the kind where you do not even know how many possible outcomes exist at the table. A RISC-V processor design[^riscv] involves dozens of configurable parameters — pipeline depth, issue width, cache hierarchy, branch prediction strategy — whose combinations exceed $$10^{15}$$. Checking each at a million per second would take over thirty years.

[^riscv]: RISC-V is an open-source instruction set architecture born at UC Berkeley in 2010, now among the most active processor ecosystems in both academia and industry.

This is not an arithmetic problem. It is a condition.

In the era of closed architectures, this condition did not exist. SoC integrators working with commercial IP cores made adjustments within predetermined frameworks; the ceiling was set by someone else. RISC-V returned the freedom of architectural design to everyone — and with it, the anxiety of choice. When no one prescribes boundaries for you, you must face the entire possibility space yourself: every choice is reasonable, none can be proven optimal.

Each simulation takes hours to days. Within a single project cycle, you can run a few hundred at most. Using a few hundred attempts to cover $$10^{15}$$ possibilities is not exploration — it is groping in the dark.

So we invented clever ways to cope with the darkness — surrogate models, Bayesian optimization, multi-fidelity approximation, transfer learning, and in the last two years, large language models: they can generate RTL code, predict design metrics, even produce processor configurations from natural language descriptions. But all these tools — including the most exciting LLMs — share one fatal blind spot.

## II

The blind spot is almost embarrassing to state: what our models learn is not knowledge about how the world works, but a record of what happens to co-occur with what in the data.

You analyze a thousand historical simulation runs and find that processors with large L1 caches generally perform better. The surrogate model faithfully learns this pattern and recommends large-cache configurations in subsequent optimization. Everything seems fine — until you examine where those thousand runs came from: three years of design iterations by experienced architects who share a common habit. When choosing deeper pipelines, pursuing instruction-level parallelism, they tend to pair them with larger caches to compensate for branch penalties. Cache size does have a causal effect on performance, but this effect has been systematically inflated by designer preferences. It is confounding that manufactured the exaggerated statistical co-occurrence between large caches and high performance.

This contamination exists, in subtler forms, in every optimization pipeline that uses historical data. The optimizer recommends a configuration, the simulation result disappoints, you assume the model needs more accuracy, feed it more data, keep training — but the problem was never accuracy. From the very beginning, the model mistook spurious statistical associations for causal relationships. Training a model that learns contamination on more contaminated data only makes things worse.

This is the first meaning of design space "liquidity": we thought we had stepped onto solid ground — statistical regularities, correlation patterns, goodness of fit — but beneath our feet is quicksand. The $$P(Y\vert X)$$ estimated from observational data is contaminated by the data collection process itself: who chose which configurations to simulate, in what order, driven by what motivations — these confounders seep into the data and are then treated by the model as truths about the world. Change the design team and the patterns shift. Switch target architectures and they shift again. Alter the benchmark suite and they shift once more. Those seemingly solid statistical regularities dissipate like words written on water — they were liquid from the start, contingent on the particular historical context that produced them.

No matter how elaborate a superstructure you build atop $$P(Y\vert X)$$ — more sophisticated kernels, cleverer acquisition strategies, deeper neural networks, larger language models — the foundation remains liquid. When an LLM delivers design advice in the voice of a senior engineer, the fluidity of $$P(Y\vert X)$$ is masked by unprecedented scale and fluency: liquid knowledge draped in solid clothing.

What is needed is not a better superstructure but a replacement of the foundation.

## III

What does replacing the foundation mean?

We face three fundamentally different kinds of knowledge. *Experiential* knowledge: I observe $$X$$ and $$Y$$ co-occurring, I memorize the pattern. *Interventional* knowledge: if I actively change $$X$$, how does $$Y$$ respond? *Counterfactual* knowledge: if a different choice had been made, what would have happened? The first is the knowledge of a bystander — liquid, invalidated the moment history changes. The second points toward causal mechanisms, invariant to the observer's position. The third transcends action, entering reasoning about possibility itself. From observation to intervention to counterfactual — the causal ladder of cognition. With each rung, knowledge approaches solidity, and the cost of acquiring it grows steeper.

The mathematical expressions of the first two kinds differ by a single symbol: $$P(Y\vert X)$$ versus $$P(Y\vert do(X))$$[^do]. But the chasm this symbol marks is far deeper than its typographic size suggests. $$do(\cdot)$$ means intervention — forcibly severing a variable from all upstream factors, pinning it to a value you specify, observing the downstream response. It refuses to accept the world's "natural" mode of operation, deliberately breaking one link in the causal chain.

[^do]: The $$do(\cdot)$$ operator is the central concept introduced by Judea Pearl in his causal inference framework, distinguishing "observing" from "intervening." See Pearl, *Causality*, Cambridge University Press, 2009.

Observing that large caches co-occur with high performance does not mean that actively setting a large cache will yield high performance. The former is liquid; the latter is closer to solid — it describes a causal mechanism that, under valid causal model assumptions, exhibits stronger cross-context stability. But solid knowledge costs far more to acquire than liquid knowledge. To systematically compute $$P(Y\vert do(X))$$ from observational data, you need a causal graph. And constructing a causal graph for chip design is like trying to draw a precise map on a flowing river.

The root of the difficulty is philosophical: you are attempting to use finite observational data — colored by a specific historical context — to infer causal structure that transcends any particular context. A leap from "what patterns exist in this dataset" to "what is the causal structure of the world."

The first difficulty is mixed variable types. Clock frequency is continuous, L1 cache capacity is ordered-discrete, branch predictor type is unordered-categorical. When you need to test "whether continuous clock frequency is independent of categorical branch predictor type conditional on ordered cache capacity," the reliability of existing causal discovery tools drops sharply. The second is sample size. Two to three hundred simulation samples, thirty to forty variables, thousands of potential causal edges — the sample count falls one to two orders of magnitude below algorithmic requirements. The third is verification. Causal graphs learned from observational data can only be determined up to a Markov equivalence class[^mec]; pinning down causal directions requires interventional experiments, each costing hours of compute time.

[^mec]: A Markov equivalence class is a set of directed acyclic graphs sharing identical conditional independence relations, indistinguishable from purely observational data.

These difficulties mean that your causal graph will almost certainly contain errors. And an erroneous causal graph may be more dangerous than having no causal graph at all — it gives you a false sense of certainty. If your "solid" is built on incorrect causal assumptions, it is more harmful than honest liquidity. The real question is not "can we construct a causal graph" but how to benefit from a causal graph that inevitably contains errors — how to let solid knowledge retain a trace of liquid humility.

## IV

Replacing $$P(Y\vert X)$$ with $$P(Y\vert do(X))$$ is not merely a technical operation; it changes the relationship between designer and design space. Making decisions with $$P(Y\vert X)$$, you are a reader of history — poring over simulation records, identifying patterns, betting that patterns will persist, looking essentially backward. Making decisions with $$P(Y\vert do(X))$$, you are someone attempting to shape the future — asking not "how did this region perform historically" but "if I actively choose this configuration, what is the expected payoff."

But this shift carries a hidden cost. Backdoor adjustment requires finding a set of variables to "wash out" confounding bias; the more variables in the adjustment set, the greater the estimation variance; in the high-dimensional space of chip design, the variance inflation from debiasing may swallow the confounding bias it eliminates. *Every correction mechanism introduces new sources of error* — this is not a flaw unique to causal methods but a fundamental condition of epistemic activity. More unsettling still: you often do not know how strong the confounding effect is, yet this is precisely what determines whether causal debiasing is worthwhile. You do not merely lack knowledge of where the optimum lies — you lack knowledge of whether your chosen cognitive tool is even appropriate for the current context.

A pragmatic strategy is to run causal and traditional methods in parallel. When both agree, confounding is likely weak. When they diverge, the divergence itself is a signal — it suggests significant confounding bias in the data. Using divergence to diagnose confounding is far more robust than blindly trusting either method alone. Rather than choosing between liquid and solid, let the tension between them become itself a cognitive instrument.

The same logic applies to collaboration between optimizers. The traditional approach exchanges raw sample points — liquid information that may become invalid in a different simulation environment. A more valuable currency of exchange is causal effect estimates — "what is the average causal effect of this parameter on performance" — knowledge that has undergone solidification, theoretically independent of any particular data collection process. Of course, if the causal graph itself is wrong, "solidification" is disguise. Everything hinges on the quality of the causal graph.

## V

The first two rungs of the causal ladder — association and intervention — deal with "here." The third — counterfactual — deals with "what here could have been": if a different choice had been made, what would have resulted?

This question touches a fundamental property of knowledge: what kind of knowledge is transferable? The RISC-V ecosystem contains numerous architectural variants, and independently optimizing each consumes substantial simulation budget. But the question extends far beyond the practical.

Statistical correlation cannot transfer. "On BOOM, large caches correlate with high performance" — this knowledge is locked to BOOM's specific context. BOOM is a wide-issue out-of-order core whose high-IPC design creates strong performance dependence on cache hit rates; Rocket is a simple in-order core with entirely different pipeline stall patterns upon cache misses. Statistical transfer sees the surface-level liquid fact — "large caches correlate with high performance" — and naively assumes it holds in another environment.

Causal mechanisms may transfer. "Cache capacity affects memory access latency through its impact on miss rate" — certain links in this causal chain reflect fundamental physical processes of the memory hierarchy, likely shared across most architectures. But other links — how miss penalties propagate through pipeline stalls into IPC loss — are highly dependent on specific pipeline implementations and may differ completely across architectures. The precise formulation of the question: along a causal chain, which links are "solid" — stable across architectural boundaries? Which are "liquid" — varying with architecture? Distinguish the two, and you can transfer only the solid parts while relearning the liquid parts on the target architecture.

But here lies an honest circular dilemma: verifying causal invariance requires sufficient data on both architectures, yet data scarcity is precisely the problem you hoped transfer would alleviate. You need data to verify whether transfer is feasible, but transfer's purpose is to reduce data requirements. Only imperfect approximations can break this circle — using topological similarity of causal graphs as a proxy for mechanism stability, or continuously monitoring prediction error during transfer to detect mechanism drift.

There is a more fundamental dilemma still. Counterfactual reasoning — "if performance $$y$$ was observed on BOOM, what would it be on Rocket?" — depends on structural causal models. The general form allows arbitrary functional relationships $$V_i = f_i(\text{PA}_i, U_i)$$, but counterfactual queries require noise terms $$U_i$$ to be identifiable. The most common implementation — the additive noise assumption — requires each variable to equal a deterministic function of its causal parents plus independent noise. Yet microarchitectural design is rife with interaction effects and heteroscedasticity: the joint impact of instruction cache and data cache capacities is not a simple sum of individual effects; power variance at high clock frequencies far exceeds that at low frequencies. When the assumption fails, counterfactual queries become unreliable — and you can rarely tell from the results alone whether they are reliable.

This is the most liquid link in the entire scheme: you believe you stand on solid causal structure, but the structural equations beneath your feet may themselves be an insufficiently validated assumption. Beneath the solid, there is still liquid.

## VI

A method that does not know under what conditions it will fail is not a mature method — it is merely an optimism that has not yet been adequately tested.

Causal methods have at least three failure modes.

The first: an incorrect causal graph. Suppose the algorithm erroneously posits a direct causal edge from issue width to power consumption, when in reality issue width affects power indirectly by increasing functional unit area. Based on this wrong edge, causal Bayesian optimization skips the area variable when computing the interventional distribution, producing systematic bias in power estimates. In this scenario, traditional $$P(Y\vert X)$$ methods may actually perform better — they make no pretense of understanding causal structure, honestly fitting statistical relationships, at least avoiding the additional distortion of an incorrect causal assumption. *Wrong solidity is more harmful than honest liquidity.*

The second: over-correction. Backdoor adjustment eliminates confounding bias by marginalizing over adjustment sets, but if the adjustment set is chosen poorly — including descendants of $$X$$, or omitting key confounders — the corrected result may be more biased than the original estimate[^cinelli]. You attempted to solidify liquid into solid; instead you manufactured a more stubborn bias — harder to detect because it wears the mantle of "causal debiasing."

[^cinelli]: See Cinelli, Forney & Pearl, *A Crash Course in Good and Bad Controls*, *Sociological Methods & Research*, 2022, for a systematic discussion of how improper adjustment amplifies bias.

The third appears in the transfer setting: failure of the causal invariance assumption. You assumed that the causal mechanism from cache capacity to miss rate is identical on BOOM and Rocket, and directly transferred the corresponding structural equation. But if Rocket's cache subsystem employs a different replacement policy, this "identical" causal edge actually corresponds to different underlying physical processes. You thought you were transferring solid knowledge; in reality, you transferred a liquid assumption that does not hold on the target architecture.

An asymmetry exists among these failure modes: traditional methods fail silently — when misled by confounding bias, you cannot detect it from prediction error, because the bias is masked by the same bias in the training data. Causal methods fail visibly — the uncertainty of causal graphs can in principle be quantified, the applicability conditions of backdoor adjustment can be verified, the consistency of predictions before and after transfer can be monitored. Transforming silent failure into visible failure is itself a step from liquid toward solid — not making knowledge infallible, but making error visible.

## VII

Causal graphs claim to provide knowledge more "solid" than statistical correlation. But what does their "solidity" actually mean?

A causal graph is a model. When we draw a causal edge from "cache size" to "memory access latency," we have made countless implicit choices: why model cache size rather than cache line size, associativity, and replacement policy separately? Why treat "memory access latency" as a single variable instead of distinguishing L1 hit latency from L2 hit latency? The granularity of variables, the drawing of boundaries, which factors enter the model and which are consigned to "exogenous noise" — these choices embed the designer's particular way of understanding the world. A causal graph is not an objective truth "discovered" from data but a construct "built" through the interaction of data, algorithms, and human judgment. It has more structure than pure statistical correlation, resists distributional shift more effectively, sits closer to physical mechanism — yet it remains a construct, bearing the perspective and limitations of its constructor.

Is the causal graph itself liquid? In a sense, yes. It is not a once-and-for-all ultimate truth; variable definitions may change, causal edges may be corrected, the entire graph may be redrawn. But it differs from statistical correlation's "liquidity" in one crucial respect: statistical correlation flows without direction — it drifts as the data distribution drifts, and you cannot tell whether it is approaching truth or receding from it. The causal graph flows with direction — each verification, each interventional experiment, each deletion of an erroneous edge has the potential to converge toward a more accurate causal structure.

Perhaps this is the true nature of causal knowledge: not solid, not liquid, but *solidifying*. It has more shape than statistical patterns, more uncertainty than physical laws, situated in a phase transition of knowledge — from the disordered flow of data, through the structuring of causal inference, gradually solidifying into a reliable understanding of the design space. This process never completes, but every step has direction.

Since the causal graph is a construct, it inevitably enters into dialogue with other modes of cognition. A senior architect's "intuition" is often more reliable than an optimization algorithm that has run for three days; large language models can sometimes offer impressively apt parameter suggestions. But a fundamental distinction separates these two forms of "intuition."

When an architect says "increasing L1 cache from 32KB to 64KB won't help much at this pipeline depth," there is an implicit causal chain behind the judgment: at this pipeline depth, the L1 hit rate is already high; the marginal return of a larger cache is suppressed by saturation effects. This is a causal judgment that can be tested by interventional experiment. When an LLM gives similar advice, its "reasoning" derives from statistical generalization over similar scenarios in its training corpus. Press it on whether the judgment holds under a novel pipeline structure it has never seen — the architect can reason along the causal chain and produce a grounded prediction, while the LLM can only extrapolate statistical regularities from the training distribution. Once outside that distribution, its confidence persists, but its reliability has collapsed.

LLM training corpora do contain vast amounts of causal narrative — textbooks, papers, design manuals. But remembering causal narratives and possessing causal reasoning ability are two different things, just as memorizing chess records and understanding chess principles are two different things. LLMs compress human causal knowledge, but they compress it through statistical memorization rather than structural understanding — confronted with novel situations beyond the training distribution, the record book runs out, and the principles were never truly grasped. This makes LLMs a unique epistemological phenomenon: *pseudo-solid* — their outputs exhibit every surface characteristic of solid knowledge: coherent, confident, well-reasoned — but their internal structure is liquid. Scale can refine the statistical approximation but cannot bridge the logical chasm from correlation to causation. This is not an LLM "deficiency," just as liquidity is not a "deficiency" of water — it is the nature of $$P(Y\vert X)$$ as a form of knowledge, regardless of how large the model that carries it.

What causal inference methods attempt is to make explicit the architect's "solidifying" causal intuition. Formalization entails simplification and loss, but what it gains cannot be dismissed: testability, transferability, cumulativity. An architect's causal intuition vanishes upon retirement, but a causal graph built from data and knowledge can be passed on to those who follow — and can be used to calibrate the LLM's liquid recommendations, making them more reliable under the constraints of causal structure.

The relationship among the three is not replacement but triangular dialogue. The causal graph provides guidance in high-dimensional spaces beyond the reach of intuition; it provides correction in confounded scenarios where intuition may err. The LLM provides rapid statistical approximation in corners the causal graph cannot cover; it offers priors from larger corpora when data is scarce. The architect's intuition provides what both lack most: the critical scrutiny of "is this graph right" and "does this recommendation make sense."

This triangular dialogue may never produce a perfect causal graph. But it will keep knowledge solidifying — not freezing into rigid dogma, but crystallizing into ever more reliable structure.

We are still gambling. The $$10^{15}$$ possibilities have not decreased, the cost of simulation has not fallen, the liquid nature of the design space has not changed. But the way we gamble has changed. No longer blind bets in the dark, but directed moves on a map that is solidifying.
