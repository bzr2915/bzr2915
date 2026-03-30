---
layout: post
title: "The Last General-Purpose Chip"
date: 2026-03-30
description: "The GPU is the pinnacle of general-purpose computing — and its endpoint. When models solidify into silicon, the entire supply chain inverts."
tags: [AI, chip design]
lang: en
lang_alternate: /opinions/2026/last-general-purpose-chip-zh/
author: Zhaori Bi
toc:
  sidebar: left
---

## I

On a Tuesday morning in late 2025, in a nondescript office park in Santa Clara, an engineer named David did something that would have seemed absurd to any chip designer born before 1990. He opened a browser window, dragged a file — the weight checkpoint of Meta's Llama 3.1 8B model, several gigabytes of floating-point numbers — and dropped it into a compiler interface. Then he went to lunch.

The compiler did not produce software. It produced a chip layout.

Two months later, a PCIe card arrived at the same office. No GPU sat on it. No HBM memory towers flanked a processor die. There was just one piece of silicon — roughly the size of a postage stamp, fabricated on TSMC's 6nm process — and that silicon was not a computer in any sense that Alan Turing or John von Neumann would have recognized. It did not execute instructions. It did not fetch data from memory. It did not run a program.

It *was* the program.

The weight values of Llama 3.1 8B — every one of the eight billion parameters that encode the model's knowledge of language, reasoning, and pattern — had been etched directly into the chip's metal interconnect layers. When electrical signals entered one side of the die, they passed through a physical topology that *was* the neural network. Inference was not computation in the traditional sense. It was physics: current flowing through a structure whose geometry embodied the mathematics of intelligence.

The company behind this was Taalas, a startup that had been operating in semi-stealth mode. Their chip, the HC1, could process 17,000 tokens per second for a single user — roughly 100 times faster per user than an NVIDIA H100 running the same model. And it consumed a fraction of the power.

But the speed was not the point. The point was the *category*. This was not a faster chip for running AI models. This was a chip that *was* an AI model. The distinction sounds semantic. It is not. It is the most consequential architectural shift in computing since the microprocessor.

Here is the thesis of this essay, stated plainly: **The GPU is the last general-purpose computing chip humanity will mass-produce for the AI era.** Not because GPUs will disappear — they will remain essential for training, for research, for the unpredictable workloads of discovery. But for the vast and growing majority of AI computation — inference, the act of running a trained model — the future belongs to chips that are not general-purpose at all. Chips where the model's mathematics have become the chip's physical structure. Chips where software has, quite literally, turned to stone.

## II

To understand why, you need to understand the GPU's original sin — which is also its greatest virtue.

A modern NVIDIA GPU is a marvel of engineering. The H100, the chip that launched a thousand data centers, contains 80 billion transistors arranged into 132 streaming multiprocessors, each capable of executing thousands of threads simultaneously. It can perform matrix multiplications at rates that would have been classified as supercomputing a decade ago. It connects to 80 gigabytes of HBM3 memory through a bus that moves 3.35 terabytes per second. It is, by any measure, one of the most sophisticated artifacts ever manufactured by human beings.

It is also, fundamentally, a Swiss Army knife.

{% include figure.html loading="eager" path="assets/img/posts/last-chip-gpu-swiss-knife.png" class="img-fluid rounded z-depth-1" alt="The GPU as Swiss Army knife — 90% of its blades are idle" %}

The GPU was designed to do *anything* — render video games, train neural networks, simulate protein folding, mine cryptocurrency, run inference on any model architecture that might be invented next year. This generality is what made NVIDIA the most valuable semiconductor company on Earth. Jensen Huang's genius was recognizing, earlier than anyone, that a programmable parallel processor could be repurposed from pixels to tensors, from graphics to gradients. CUDA, NVIDIA's programming framework, became the lingua franca of scientific computing precisely because it imposed so few constraints on what the hardware could do.

But generality has a price. And in inference — the workload that now consumes roughly two-thirds of all AI compute spending — that price has become ruinous.

Here is the dirty secret of GPU-based inference: during a typical large language model inference pass, somewhere between 80 and 90 percent of the chip's energy is spent not on arithmetic, but on *moving data*. Weights must be loaded from HBM memory into the compute cores. Activations must be shuttled between layers. Intermediate results must be written back and read again. The actual multiply-accumulate operations — the mathematical heart of neural network inference — occupy a sliver of the energy budget and an even smaller fraction of the time.

This is not a bug in NVIDIA's design. It is a consequence of the most fundamental architectural decision in the history of computing: the separation of memory and processing, proposed by John von Neumann in his 1945 *First Draft of a Report on the EDVAC*. In the von Neumann architecture, data lives in one place and computation happens in another. Everything — every instruction, every operand, every result — must travel between them. For eighty years, this separation has been the bedrock of computer design. And for eighty years, engineers have been fighting its consequences: the "memory wall," the "bandwidth bottleneck," the ever-widening gap between how fast processors can compute and how fast memory can feed them.

GPUs mitigate the wall. They do not eliminate it.

The analogy that clarifies this is the history of web portals. In the early 2000s, Yahoo!, AOL, and MSN tried to be everything to everyone — email, news, shopping, search, chat, horoscopes, all on one page. They were the general-purpose chips of the internet. Then demand patterns became legible. People did not want one site that did everything poorly; they wanted many sites that each did one thing superbly. Google for search. Amazon for shopping. Facebook for social. The portal model collapsed not because it was technically flawed, but because it was *economically* wasteful — it allocated resources to capabilities that most users, most of the time, did not need.

The GPU is the portal of silicon. And inference is the workload whose demand pattern has now become legible enough to specialize against.

Consider the numbers. In 2025, the global AI inference market surpassed $50 billion, growing at roughly 40 percent per year. Training — the workload that *requires* generality, because researchers need to experiment with novel architectures, loss functions, and data pipelines — accounts for the remaining third of AI compute spending and is growing more slowly. The crossover happened in 2024, and every projection shows the gap widening. By 2028, inference is expected to account for 75 to 80 percent of all AI chip demand.

When you know what the model looks like — when Llama 3.1 8B has been downloaded forty million times, when GPT-4's architecture is well-characterized, when the Transformer has dominated for eight years running — the question stops being *what can this chip compute?* and becomes *why are we building a chip that can compute anything?*

## III

Three companies, working independently, arrived at the same answer from three different directions. Each story begins with a bet that most semiconductor veterans would have called reckless.

**Taalas — Etching Weights into Metal**

The founding insight at Taalas came not from a chip designer but from a compiler engineer. The realization was deceptively simple: in a trained neural network, the weights do not change during inference. They are constants. And in chip design, constants do not need to be *stored* — they can be *manufactured*.

Every modern chip is built from two categories of structure: transistors at the bottom (which switch signals) and metal interconnect layers on top (which route signals between transistors). The metal layers are the chip's wiring — copper traces etched into insulating dielectric, stacked six to fifteen layers high. Traditionally, these wires simply connect one transistor to another. But Taalas asked: what if the wires *are* the computation?

Their approach: take a standard TSMC 6nm process. Keep the transistor layers fixed — these handle the mechanical business of signal amplification, clock distribution, input/output. But repurpose the top two metal layers as a physical encoding of the model's weights. The specific pattern of copper traces, their widths, their spacing, their connections — all of it is generated automatically from the model's weight file by a custom compiler. Different models produce different metal patterns. Same transistor base, different wiring. Same factory, different product.

The result is the HC1 chip. When Taalas loaded Llama 3.1 8B's weights onto it — or rather, *into* it — the chip achieved 17,000 tokens per second for a single user stream. For context, an NVIDIA H100 running the same model delivers roughly 150 to 200 tokens per second per user when serving many users simultaneously. The HC1's advantage is not just speed; it is *efficiency*. Because the weights are physically present in the chip's metal, there is no memory access. No HBM. No bandwidth bottleneck. The data does not move because the data is the circuit.

The turnaround time is the second revolution. Traditional ASIC design — the process of creating a custom chip — takes eighteen months to two years from specification to silicon. Taalas does it in two months. The fixed transistor layers are pre-fabricated in bulk; only the top metal layers are customized per model. This is analogous to printing a book: the printing press (transistors) stays the same; only the typeset (metal) changes. TSMC already offers "metal-only" mask changes as a standard service, so no new manufacturing process was required.

And the objection that immediately arises — *what about fine-tuning? What about updates?* — has an answer. The HC1 includes a small amount of conventional SRAM, reserved for LoRA (Low-Rank Adaptation) layers. LoRA is a technique that fine-tunes a model by adding small trainable matrices on top of frozen base weights. Because the base weights are in metal and the LoRA adapters are in SRAM, you can customize the model's behavior without re-fabricating the chip. The base knowledge is permanent; the personality is programmable.

**Mythic — Letting Current Do the Math**

While Taalas was encoding weights into copper traces, a company called Mythic was encoding them into something even more fundamental: the electrical properties of memory cells.

Mythic's founding bet was on analog computation — a concept that most of the semiconductor industry had abandoned decades ago in favor of digital precision. Their approach uses NOR flash memory, the same technology found in USB drives and SSDs, but repurposed in a way its inventors never intended.

Here is how it works. Each cell in a NOR flash array can be programmed to hold a specific charge level, which determines its electrical conductance — how easily current flows through it. Mythic programs each cell to a conductance value that represents a single model weight, using 256 discrete levels (8-bit precision). Now arrange millions of these cells into a crossbar array — rows and columns, like a spreadsheet in silicon.

To perform a matrix-vector multiplication — the core operation of neural network inference — you apply the input vector as voltages to the rows. Current flows through each cell, and by Ohm's Law (V = IR, or equivalently I = V/R = V × G, where G is conductance), the current through each cell is the product of the input voltage and the stored weight. The currents from each column sum together automatically — this is Kirchhoff's Current Law, basic circuit physics — giving you the dot product. The entire matrix multiplication happens in one step, in the time it takes current to traverse the array. No clock cycles. No instruction fetch. No data movement. Physics does the math.

The elegance is almost offensive to digital engineers. Where a GPU performs billions of individual multiply-accumulate operations sequentially (albeit in massive parallel streams), Mythic's analog array performs them simultaneously, as a single physical event. The energy efficiency follows naturally: Mythic's latest products achieve 120 TOPS per watt (trillion operations per second per watt), compared to roughly 1 to 3 TOPS per watt for a typical GPU in inference mode.

The catch, historically, has been precision. Analog computation is inherently noisy — thermal fluctuations, manufacturing variations, and signal degradation limit the accuracy of each operation. But inference, it turns out, is remarkably tolerant of imprecision. Neural networks are statistical machines; they deal in approximations. Research over the past five years has shown that most inference workloads lose negligible accuracy when run at 8-bit or even 4-bit precision, far below the 32-bit or 16-bit arithmetic that GPUs typically provide. Mythic's 8-bit analog precision sits in the sweet spot: good enough for the model, impossible to beat on power.

Their sub-1-watt Starlight product — a complete inference accelerator that consumes less energy than a night-light — has attracted Honda as a partner for automotive-grade AI. The application is obvious: autonomous driving requires real-time neural network inference at the edge, in a vehicle, with strict power and latency constraints. You cannot send camera feeds to the cloud and wait for a response at highway speed. You need a chip that can run the model locally, continuously, at milliwatt power levels and millisecond latencies. Mythic's analog approach delivers this naturally, because analog computation is fast (no clock overhead), efficient (no data movement), and compact (each flash cell is both memory and compute).

**Sohu — The First Transformer Chip**

If Taalas's approach is "make the model into the chip" and Mythic's is "let physics compute," then Sohu's is the most conceptually straightforward: build a chip that only runs Transformer models, and run them faster than anything else.

The Transformer architecture — the "T" in GPT — has dominated AI since 2017. Attention mechanisms, feedforward layers, layer normalization, positional encoding: these operations account for over 90 percent of all AI inference workloads today. And yet, GPUs execute them using general-purpose matrix units that are equally capable of running convolutional networks, recurrent networks, graph neural networks, or any other architecture. The Transformer-specific optimizations happen in software (kernels, compilers, frameworks), not in hardware.

Sohu's bet was that this generality is waste. If 90 percent of the workload is Transformer, build a chip where every transistor, every wire, every memory cell is optimized for and only for the Transformer computation graph. Hardcode the attention mechanism. Hardcode the layer normalization. Hardcode the data flow between layers so that intermediate activations never leave the chip.

The result: eight Sohu chips, working together, achieve over 500,000 tokens per second — more than 10 times the throughput of eight NVIDIA B200 GPUs running the same model. The power consumption is a fraction. The cost per token drops by an order of magnitude.

The risk, of course, is architectural lock-in. If a post-Transformer architecture emerges — state-space models, mixture-of-experts with radically different routing, something not yet invented — a Sohu chip becomes an expensive paperweight. The company is betting that the Transformer's dominance has at least five to ten more years of runway, and that the economics of 10x cost reduction will pay for the chip many times over within that window.

**The Common Thread**

Strip away the technical details and all three companies are doing the same thing: eliminating the "generality tax."

A GPU pays this tax on every operation. It maintains instruction decoders it does not need during inference. It reserves memory bandwidth for weight updates that will never come during deployment. It allocates silicon area to support architectures that the customer's model will never use. This overhead is the price of being a Swiss Army knife, and for training — where the model *is* changing, where the architecture *might* be novel, where flexibility is survival — the price is worth paying.

But for inference, the tax is pure waste. And all three approaches — weights in metal, weights in conductance, Transformer in logic — are methods of refusing to pay it. Different engineering, same economics. The model stops being a program that runs on a chip and becomes, in varying degrees, the chip itself.

## IV

At this point, the experienced chip architect raises a hand. "We've seen this before," she says. "ASICs. Application-Specific Integrated Circuits. Custom chips for custom workloads. They dominated in the mainframe era, and the microprocessor killed them. What makes you think this time is different?"

The objection deserves respect, because the history of computing is, in large part, a pendulum swinging between generality and specialization.

In the 1960s and 1970s, every serious computer was a custom design. IBM's System/360 mainframes, Cray's supercomputers, the specialized signal processors in military radar systems — each was a bespoke piece of silicon (or, earlier, a bespoke arrangement of discrete transistors). They were fast, expensive, and inflexible. When the workload changed, you needed a new chip.

Then came the microprocessor. Intel's 4004 in 1971, the 8080, the x86 line — these were general-purpose chips that could run any program. They were slower than custom designs for any specific task, but they were cheap, mass-produced, and endlessly reprogrammable. Software ate the world because hardware became a commodity. The ASIC retreated to niches: networking, signal processing, cryptocurrency mining.

The GPU represented a middle path — not fully general (it was optimized for parallel computation), but programmable enough to handle a wide range of workloads. CUDA made the GPU a platform, not just a chip. NVIDIA's moat was not silicon; it was ecosystem.

Now the pendulum swings again. But this time, the dynamics are fundamentally different from the mainframe-era ASIC, and the difference is *speed*.

A traditional ASIC takes eighteen months to two years from design to fabrication. It requires a team of dozens of engineers, millions of dollars in EDA (Electronic Design Automation) tools, and a painful process of verification, tape-out, and yield optimization. If the target application changes during those two years — if a new model architecture emerges, if the market shifts — the entire investment is stranded.

Taalas ships in two months. Two months from weight file to PCIe card. The transistor layers are pre-fabricated. The compiler generates the metal layers automatically. No human engineer designs the chip-specific layout; the model's weight file *is* the design specification, and the compiler translates it directly into manufacturing instructions.

This is not the ASIC of 1985. This is what you might call "programmable specialization" — a manufacturing process fast enough and cheap enough to produce a new custom chip for every major model release. When Meta publishes Llama 4, Taalas does not need to redesign their architecture. They run the new weight file through the same compiler, generate new metal masks, and ship new chips. The base silicon stays identical. The "programming" happens at the foundry, in copper and dielectric, at a cadence closer to software deployment than to traditional chip design.

LoRA adapters in SRAM add another layer of flexibility. The base model is in metal, permanent and fast. Task-specific adaptations — chatbot personality, domain expertise, language preference — live in SRAM and can be swapped in milliseconds. The chip is specialized at the macro level (it runs one model architecture) but programmable at the micro level (its behavior can be tuned without re-fabrication).

History does not repeat, the saying goes, but it rhymes. The mainframe ASIC rhymed with inflexibility and cost. The model-specific chip rhymes with speed and automation. Same meter, different poem.

Perhaps the better analogy is not the ASIC at all, but the printed book. Before Gutenberg, every book was a custom artifact — hand-copied by monks, expensive, slow, unique. The printing press made books a commodity: one press, many titles, fast turnaround. Taalas's pre-fabricated transistor base is the press. Each model's metal layers are the movable type. The output is not a general-purpose computer but a specific, mass-produced crystallization of a specific intelligence.

## V

If the chip becomes the model, what happens to everyone who sits between the model and the chip?

The traditional semiconductor supply chain is a well-oiled sequence: an application defines requirements; software architects translate those requirements into chip specifications; chip designers implement the specifications using EDA tools; a foundry fabricates the design in silicon; the chip goes into a system; the system runs the application. Each step employs thousands of engineers and generates billions of dollars in revenue.

The model-specific chip collapses this chain.

**The new sequence looks like this:** A model team trains a neural network. The trained weights go into a compiler — not a traditional EDA tool, but a new kind of software that translates weight matrices into physical layout. The compiler outputs manufacturing instructions. A foundry fabricates the chip. The chip goes into a PCIe card or an edge module. The system integrator plugs it in and starts serving inference.

Notice what vanished: the chip design team. The RTL engineers, the verification engineers, the physical design engineers, the timing closure specialists — the entire human-intensive middle of the supply chain — are replaced by a compiler. This is not a future prediction; Taalas is doing it today, with real chips, on real foundry processes.

The implications ripple outward in every direction.

**For EDA companies** — Synopsys, Cadence, Siemens EDA — the shift is existential. Their tools are built for human designers: schematic capture, logic synthesis, place-and-route, timing analysis, formal verification. If the design process becomes "model weights in, GDSII out" (GDSII being the file format foundries use for manufacturing), then the entire EDA workflow compresses into a single compiler pass. The EDA companies that survive will be the ones that build or acquire these compilers. The ones that do not will find their $15-billion-a-year industry hollowed out.

**For foundries** — TSMC, Samsung, Intel Foundry — the shift is a mixed blessing. On one hand, the demand for fabrication capacity increases: instead of one GPU design serving all customers, each major model could have its own chip, multiplying the number of tape-outs. On the other hand, the value shifts from manufacturing complexity (which foundries monetize through premium pricing on advanced nodes) to manufacturing *flexibility* (fast metal-layer changes, rapid mask turnarounds, small batch runs). TSMC becomes less like an artisanal workshop producing a few masterpiece designs and more like a high-speed printing press producing thousands of titles. The margins may compress even as volumes rise.

**For fabless chip companies** — the traditional model of Qualcomm, Broadcom, MediaTek, and yes, NVIDIA in its fabless capacity — the threat is direct. Their competitive advantage has always been design expertise: the ability to architect a chip that balances performance, power, area, and cost better than competitors. But if the design is generated by a compiler from a weight file, design expertise in the traditional sense becomes irrelevant. The moat moves upstream (to whoever trains the best model) or downstream (to whoever builds the best compiler and system integration).

**For NVIDIA specifically**, the picture is more nuanced. NVIDIA's training business — the H100, the B200, the GB300, the endless procession of ever-larger GPU architectures for ever-larger models — remains secure for the foreseeable future. Training is the workload where generality is essential, where researchers need the flexibility to experiment with novel architectures, where the next breakthrough might require hardware capabilities that no one anticipated. The GPU is irreplaceable for training.

But inference is where the money is going. And in inference, NVIDIA's value proposition — pay a premium for a general-purpose chip, then use only the fraction relevant to your specific model — becomes harder to justify when a model-specific chip delivers 10x the performance at a fraction of the cost. NVIDIA's software ecosystem (CUDA, TensorRT, Triton) is a powerful lock-in mechanism, but lock-in erodes when the alternative is not "a slightly better GPU" but "a fundamentally different category of chip that doesn't use CUDA at all."

The GPU maker that sold shovels to every miner in the gold rush may find, one morning, that the miners have learned to grow gold directly from the soil.

## VI

Prediction is cheap; scene-setting is harder. But the technologies described above are not theoretical. They are shipping, or will ship within months. Here is what the near future looks like — not as a bullet-point forecast, but as a series of moments.

**A car on a highway in Tochigi Prefecture, 2027.** The Honda engineer riding in the passenger seat watches a dashboard display that shows the feed from eight cameras, four LiDAR units, and twelve ultrasonic sensors. The vehicle's autonomous driving system processes all of this data locally — on the vehicle, with no cloud connection — using a chip the size of a thumbnail. Inside that chip, the weights of a perception neural network are stored as analog conductance values in 50 million flash cells. When a camera frame arrives, it becomes a pattern of voltages that flows through the flash array. In less than a millisecond — faster than the driver's reflex to blink — the array outputs a complete scene understanding: pedestrian at two o'clock, cyclist at ten o'clock, traffic light transitioning from yellow to red. The chip consumes 800 milliwatts. There is no fan, no heatsink. Mythic's analog approach makes the car's AI system simpler, smaller, and cooler than the water-cooled GPU racks that powered the previous generation of autonomous prototypes.

**A factory floor in Shenzhen, 2027.** A contract manufacturer is assembling a new line of smartphones. Each phone contains a small die — 4mm by 4mm — that runs a complete 3-billion-parameter language model. Not a cloud API call. Not a compressed, crippled version of a real model. A full model, baked into silicon, capable of understanding natural language queries, composing emails, translating between languages, and reasoning about the user's calendar — all locally, all privately, all at sub-watt power consumption. The phone's "AI chip" was generated from the model's weight file in six weeks and costs less than $3 per unit at volume. The user will never know or care that their phone's intelligence is not software running on a processor but a physical structure etched into metal. They will only notice that it works without an internet connection, that it responds instantly, and that it never sends their private conversations to a server.

**A data center in Council Bluffs, Iowa, 2027.** A hyperscaler is decommissioning an entire rack of NVIDIA GPUs. In their place, a technician is installing sixteen PCIe cards, each containing a Taalas HC1 chip customized for a different model. One card runs Llama. Another runs a proprietary code-generation model. A third runs a medical diagnosis model trained on clinical notes. Each card delivers throughput that previously required an entire eight-GPU server. The rack's power consumption drops from 40 kilowatts to 4 kilowatts. The cooling requirements drop proportionally. The facility's operations manager calculates the savings: at current electricity prices and utilization rates, the model-specific cards will pay for themselves in eleven weeks.

The data center's total inference throughput — the number of user queries it can serve per second — increases tenfold. But the power bill decreases by 90 percent. This is not an incremental improvement. This is what happens when you stop paying the generality tax on every single computation.

Across thousands of data centers, across millions of edge devices, across every application where a trained model must run repeatedly, reliably, and efficiently, the same economics apply. The general-purpose chip trades flexibility for waste. The model-specific chip trades flexibility for performance. And as inference becomes the dominant workload — as more users interact with more AI models more frequently — the economics tilt further and further toward specialization.

## VII

For fifty years, the trajectory of hardware has been toward softness. Programmable logic replaced fixed-function circuits. Virtual machines replaced physical servers. The cloud replaced the data center. At every step, hardware became more abstract, more flexible, more like software — configurable, updatable, deployable in minutes rather than months.

Now, for the first time, the arrow reverses.

Model weights — which are software, which are the product of gradient descent applied to data — are solidifying into transistor arrangements. Algorithms that were once Python scripts running on CUDA kernels are becoming physical structures: copper traces in Taalas's metal layers, charge distributions in Mythic's flash cells, hardwired data paths in Sohu's Transformer engine. The mathematics of intelligence is crystallizing into matter.

This raises a question that is more than philosophical. When a model's parameters *are* a chip's physical topology — when the weight matrix is not stored in memory but IS the circuit — do the words "software" and "hardware" still mean anything? The distinction has always been functional: hardware is the part that is fixed; software is the part that changes. But a LoRA adapter in SRAM changes. The base weights in metal do not. Is the metal "hardware"? It was generated by a compiler from a training run. Is the LoRA adapter "software"? It is electrically configuring the behavior of a physical circuit.

Perhaps von Neumann's 1945 line — the separation of storage and compute, of instructions and data — was never the essence of computation. Perhaps it was merely that era's engineering compromise: a pragmatic response to the limited manufacturing technology of vacuum tubes and mercury delay lines. For eighty years, we built every computer on that compromise, not because it was optimal, but because it was the only architecture we knew how to fabricate cheaply.

The model-specific chip suggests a different foundation. Not "storage here, compute there, bus between them," but "structure IS function." The chip does not process data about the model; the chip embodies the model. There is no instruction set because there are no instructions. There is no operating system because there is nothing to operate. Input enters; output emerges; in between, physics flows through a topology that is — in the most literal sense — a particular pattern of knowledge made solid.

Taalas's slogan is "The Model is The Computer." This sounds like marketing copy. It is not. It is a precise ontological claim. It does not say that the model *defines* the computer's design, the way an architect's blueprint defines a building. It says the model *is* the computer, the way a river *is* its bed. The shape of the channel determines the flow, but the flow also determines the shape of the channel. In Taalas's chip, the weight values determined the metal pattern (during fabrication), and the metal pattern determines the inference behavior (during operation). Model and chip are not two things connected by a relationship. They are one thing, described in two vocabularies.

We have spent half a century making hardware behave like software: reconfigurable, abstract, general. Now software is becoming hardware: fixed, physical, specific. The GPU — programmable, flexible, universal — stands at the apex of the first trend. It is the last and greatest monument of the general-purpose computing era.

After it, every intelligence gets its own silicon. Every chip becomes a complete mind. The general-purpose era does not end with a bang or a crash. It ends with an engineer dragging a file into a compiler, going to lunch, and coming back to find that the boundary between thought and matter has quietly dissolved.
