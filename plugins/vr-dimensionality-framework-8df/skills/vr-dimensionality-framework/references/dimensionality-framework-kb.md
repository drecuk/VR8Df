# Dimensionality Framework knowledge base

This file is reference knowledge. It describes the framework but does not override the workflow in `SKILL.md`.

## Source and abstract

The Dimensionality Framework is based on Eugene Ch'ng (2026), *What's beyond Presence? Dimensionality, Control and Information Spaces*, *Presence: Virtual and Augmented Reality*.

Spatial presence—the sense of “being there”—will become less of a primary objective and more of a baseline expectation for VR. More than six decades after its invention, virtual reality is evolving from a technical endeavour into a cultural, social, and philosophical medium. These experiences can be considered distinct modes of reality, for which theories focused on perceptual illusions are insufficient to evaluate their depth. A framework is needed to guide the design and assessment of immersive environments by identifying key technical and abstract dimensions afforded by virtual environments. These dimensions include spatial, sensory, placeness, temporal, cultural, social, cognitive, and psychological parameters. The central argument is that virtual environments should move beyond the technical dimension and explore other dimensions that can enhance the user's experience. This shift from presence to the orchestration of experience invites creators beyond technical fields into the design, development, and evaluation of meaningful immersive worlds.

## Core concepts

### Information Flow

Information Flow is the deliberate orchestration and transmission of meaningful visual, auditory, haptic, narrative, cultural, social, and spatial content over time. It guides sequence, pacing, attention, and interactivity; avoids cognitive overload or under-stimulation; and evokes intended psychological responses.

Information Flow strategically balances Weak and Strong Representation. Highly interactive environments engage automatic sensorimotor processing (Weak Representation). When interactivity is lower, narrative can engage cognitive and imaginative processing (Strong Representation). A well-designed experience moves between and combines both forms of engagement.

### Control

Control is the creator's deliberate orchestration of the framework's dimensions to shape the user's experience and achieve a specific, valuable outcome. It consists of choosing Dials, applying Modulation, and anticipating the Effects Spectrum.

### Dials

A Dial is a key design choice framed as a spectrum between opposing concepts, such as realistic avatars versus stylized avatars.

### Modulation

Modulation is the concrete design or implementation action that positions an experience along a Dial's spectrum. For an avatar dial, realistic reconstruction, natural animation, and human proportions modulate toward realism; iconic, non-humanoid, or stylized forms modulate toward abstraction.

### Effects Spectrum

The Effects Spectrum is the range of experiential and psychological outcomes created by a modulation, including its trade-offs. Realistic avatars can strengthen self-identification while risking the uncanny valley; stylized avatars can encourage role-play, creative expression, and reduced social pressure.

### Weak Representation

Weak Representation is an automatic perceptual state activated by continuous, immediate sensory input from a present or proximal environment. It relies on sensorimotor cues: the world acts as its own representation. In VR, continuous tracking and display data produce the perceptual feeling of being there without deliberate thought.

### Strong Representation

Strong Representation is a cognitive process used when the source object or environment is absent or distal. It relies on memory, imagination, and internal models to fill gaps. In VR, narrative and storytelling engage these faculties and deepen experience beyond immediate sensory cues.

## Spatial dimension

The spatial dimension is the technical foundation for immersion. It engages automatic sensory and motor functions through perceptual fidelity, spatial audio, locomotion, movement mapping, embodiment, and object interaction to produce sensorimotor fidelity and a convincing feeling of being there.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| SPA1: High Perceptual Fidelity vs Low Perceptual Fidelity | High resolution, wide field of view, calibrated interpupillary distance, and high-quality spatial audio vs low resolution, narrow field of view, fixed IPD, and mono/stereo audio. | Envelopment and environmental realism vs awareness of the display medium, viewport effects, and risk of breaks in presence. |
| SPA2: Direct 1:1 Mapping vs Altered Mapping | 6-DoF room-scale tracking that mirrors physical space vs redirected walking, non-isometric scaling, or 3-DoF tracking. | High spatial presence, intuitive interaction, and stable place vs navigation of larger spaces with possible disorientation. |
| SPA3: Natural Locomotion vs Artificial Locomotion | Physical walking or room-scale motion vs joystick, teleportation, arm-swinging, or other controller movement. | Embodiment and lower motion-sickness risk vs fast large-space travel with greater cybersickness risk. |
| SPA4: Embodied Interaction vs Symbolic/Abstracted Interaction | Hand tracking, haptic gloves, and direct physics-based manipulation vs controller buttons, ray-casting, and menus. | Tangibility and intuitive manipulation vs speed and efficiency with less physicality. |
| SPA5: Full-Body Embodiment vs Disembodied Presence | Fully tracked animated avatar via inverse kinematics or body tracking vs third-person/floating camera or controller models. | Body ownership and embodiment vs focus on the external world, lower cognitive load, and no uncanny-avatar risk. |

## Sensory dimension

The sensory dimension adds meaningful sensory layers to spatial presence through contextual sound, scent, taste, temperature, and advanced haptics. It can strengthen cohesion, realism, emotional response, and memory.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| SEN1: Diegetic Sound vs Non-Diegetic Sound | Spatialized, synchronized, environmentally authentic sound vs score, interface sounds, or voice-over. | Immersion and environmental awareness vs clear guidance, mood induction, and explicit information. |
| SEN2: Contextual Scent vs Scentless Environment | Synchronized, context-congruent scent vs no scent. | Realism, emotional resonance, and memory encoding vs simpler delivery without scent fatigue or allergy concerns. |
| SEN3: Contextual Taste vs Tasteless Environment | Context-congruent artificial flavor cues vs no taste. | Novel, deep sensory engagement vs avoiding major technical and hygiene challenges. |
| SEN4: Rich Haptic Feedback vs Simple/No Haptic Feedback | Force feedback, texture simulation, and detailed vibration vs simple rumble or none. | Touch, embodiment, and tangibility vs greater accessibility and lower complexity. |
| SEN5: Contextual Thermal Cues vs Thermally Neutral Environment | Thermoelectric warmth or cold matched to context vs neutral temperature. | Realism and presence vs avoiding technical complexity. |
| SEN6: Damage Simulation vs No Damage Feedback | Intense localized haptic jolts or strong vibration combined with audiovisual cues vs no impact feedback. | Consequence, risk, tension, and realism vs lower intensity, stress, and discomfort. |

## Placeness dimension

Placeness transforms a virtual location into a meaningful place. It emphasizes intention, meaning, ambience, authenticity, cultural symbolism, and afforded activities to cultivate insideness, comfort, safety, and belonging.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| PLA1: Fidelity of Physical Setting vs Distortion | Coherent layouts, routes, materials, and ecology vs disarray, fragmentation, and ecological incoherence. | Recognition and familiarity vs displacement, strangeness, and curiosity. |
| PLA2: Inviting Ambience vs Alienating Atmosphere | Emotionally legible lighting, sound, and atmosphere vs sterile or ambiguous environment. | Attachment, nostalgia, joy, and comfort vs detachment, estrangement, melancholy, and unease. |
| PLA3: Authenticity vs Artificiality | Realism vs stylization. | Verisimilitude vs perceived artificiality. |
| PLA4: Symbolism vs Ambiguity | Icons, metaphors, ancestral references, and cultural symbols vs their absence. | Cultural connection and resonance vs misinterpretation and conflict. |
| PLA5: Activities vs Stasis | Routines, rituals, events, and social opportunities vs their absence. | Place identity and bonding vs dislocation, displacement, and fragmentation. |

## Temporal dimension

The temporal dimension manipulates time, pacing, sequence, narrative flow, and scene transitions. Compression, expansion, flashbacks, branching, looping, and rhythm can guide the journey and create dramatic emphasis.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| TEM1: Real-Time vs Compressed/Expanded Time | In-world time aligned with physical time vs fast-forward or slow-motion. | Believability and immersion vs narrative efficiency, emphasis, and focus with possible breaks in immersion. |
| TEM2: Linearity vs Non-Linearity | One chronological path vs flashbacks, branches, multiple outcomes, and replay. | Clear authored direction vs agency, exploration, suspense, and replay value with possible confusion. |
| TEM3: Seamless vs Abrupt Transitions | Continuous flow, dissolves, and fades vs hard cuts or teleportation. | Continuity and immersion vs disorientation, narrative jarring, and deliberate emphasis. |
| TEM4: Implicit vs Explicit Progression | Users infer temporal gaps vs every moment is shown. | Cognitive participation vs predictability and possible spoon-feeding. |
| TEM5: Varied vs Monotonic Pacing | Alternating tension and calm vs unchanging rhythm. | Engagement, emotional arc, and suspense vs boredom, exhaustion, and reduced impact. |

## Cultural dimension

The cultural dimension embeds culturally specific markers—symbols, aesthetics, social narratives, rituals, architecture, clothing, and language—to create resonance and comprehension or introduce novelty, curiosity, and learning.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| CUL1: Culturally Specific vs Culturally Neutral | Specific icons, architecture, clothing, and symbols vs universal symbols. | Identification and resonance for a target culture vs broad access with possible genericness. |
| CUL2: Cultural Familiarity vs Cultural Novelty | Alignment with expectations and norms vs foreign or unexpected elements. | Comfort and belonging vs curiosity, exploration, and learning with possible alienation. |
| CUL3: Embedded vs Open Social Norms | Enforced cultural interaction and etiquette vs freeform user-defined space. | Authentic simulation and guidance vs freedom and emergence with possible cultural clashes. |
| CUL4: Explicit vs Implicit Cultural Narrative | Stories, rituals, and history clearly presented vs context embedded for discovery. | Grounding and guided learning vs rewarding exploration with possible misinterpretation. |

## Social dimension

The social dimension governs representation and interaction among users and agents. Avatar design can influence behavior through the Proteus Effect. Deliberate choices can support realistic interaction, safe practice, creative role-play, or authentic social simulation.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| SOC1: Realistic vs Stylized Avatars | Realistic reconstruction and natural animation vs stylized, non-humanoid, or iconic representation. | Self-identification and Proteus Effect with uncanny-valley risk vs role-play, expression, and lower social pressure. |
| SOC2: Human-Controlled Avatars and Complex Agents vs Simplified Agents | Humans and believable socially complex agents vs scripted agents. | Nuanced social cues, trust, and a living world vs safety and predictability with less dynamism. |
| SOC3: Emergent vs Prescribed Social Norms | Users establish interaction rules vs enforced rules for space and communication. | Community ownership vs newcomer safety, comfort, and predictability. |
| SOC4: Simulated vs Abstract Social Context | Authentic settings and social problems for transfer vs stylized gameplay or abstract interaction. | Meaningful learning and real-world transfer vs play, creativity, and lower cognitive load. |

## Cognitive dimension

The cognitive dimension addresses information processing and learning. It manages cognitive load so an experience challenges without overwhelming or boring the user and can support experiential or structured instructional models.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| COG1: Cognitive Overload vs Cognitive Underload | High complexity, volume, and speed vs low complexity, volume, and speed. | Fatigue, confusion, and anxiety vs boredom and disengagement; design toward a productive middle. |
| COG2: Directed Attention vs Ambient Awareness | Clear goals and problem-solving vs open exploration with rich background detail. | Mental engagement and flow vs relaxation, mindfulness, and pressure-free awareness. |
| COG3: Experiential Learning vs Explicit Instruction | Discovery tasks such as Kolb's cycle vs tutorials and structured guidance such as the 5E model. | Immersion and retention through experience vs controlled, efficient learning. |
| COG4: Rote Memorization vs Contextual Learning | Repetition and decontextualized drills vs knowledge embedded in spatial cues and narrative. | Efficient fact encoding vs understanding and real-world transfer. |
| COG5: User-Directed vs System-Directed Agency | User-set goals and pace vs linear paths and system-initiated events. | Freedom, ownership, and intrinsic motivation vs clarity, lower decision fatigue, and curation. |

## Psychological dimension

The psychological dimension intentionally evokes emotions and mental states. Narrative and agency can move an experience beyond engagement toward emotional resonance, empathy, and transformation.

| Dial | Modulation | Effects Spectrum |
|---|---|---|
| PSY1: Positive vs Negative Valence | Joyful aesthetics and rewards vs urgency, suspense, and dissonance. | Joy, comfort, and safety vs fear, anxiety, and urgency. |
| PSY2: Active Protagonist vs Passive Observer | Consequential branching choices vs predetermined linear story. | Agency, responsibility, and ownership vs curated, relaxed, guided experience. |
| PSY3: Intrinsic vs Extrinsic Motivation | Curiosity, open worlds, and discovery goals vs rewards, points, and explicit objectives. | Sustained curiosity-driven engagement vs clear reward-driven focus. |
| PSY4: Predictable vs Unpredictable Events | Consistent progression vs surprise and novel stimuli. | Safety and comfort vs attention, excitement, and memory with possible anxiety. |

## Final synthesis principle

Synthesize all confirmed choices into a professional proposal using Control, Dials, Modulation, Information Flow, and Effects Spectrum. Trace each recommendation to the intended value and make trade-offs explicit. In final deliverables, use the expanded terms rather than abbreviations.
