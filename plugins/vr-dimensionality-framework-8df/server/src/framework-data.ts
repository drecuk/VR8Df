export type Dimension = {
  code: string;
  slug: string;
  name: string;
  summary: string;
  prompts: string[];
  dials: Array<{ id: string; name: string; modulation: string; effects: string }>;
};

export const dimensions: Dimension[] = [
  {
    code: "DM-0", slug: "spatial", name: "Spatial",
    summary: "The sensorimotor foundation: fidelity, movement, interaction, and embodiment.",
    prompts: ["What movement mapping best fits the goal?", "How should users travel through the space?", "How physical should object interaction feel?", "What level of body representation is useful?"],
    dials: [
      { id: "SPA1", name: "High vs low perceptual fidelity", modulation: "Adjust resolution, field of view, IPD calibration, and spatial audio.", effects: "Envelopment and realism versus awareness of the display and possible breaks in presence." },
      { id: "SPA2", name: "Direct 1:1 vs altered mapping", modulation: "Choose room-scale 6-DoF or redirected, scaled, or 3-DoF mapping.", effects: "Intuitive stable space versus access to larger worlds with possible disorientation." },
      { id: "SPA3", name: "Natural vs artificial locomotion", modulation: "Use walking or controller methods such as teleportation and joystick travel.", effects: "Embodiment and comfort versus efficient travel with increased cybersickness risk." },
      { id: "SPA4", name: "Embodied vs abstract interaction", modulation: "Use hand tracking and physics or ray-casting, buttons, and menus.", effects: "Tangibility and intuitive manipulation versus speed and efficiency." },
      { id: "SPA5", name: "Full-body vs disembodied presence", modulation: "Use a tracked avatar or a camera/controller representation.", effects: "Body ownership versus lower cognitive load and no uncanny-avatar risk." }
    ]
  },
  {
    code: "DM-1", slug: "sensory", name: "Sensory",
    summary: "Meaningful layers of sound, touch, scent, taste, and temperature.",
    prompts: ["Which sensory channel should carry the most meaning?", "Should audio guide explicitly or remain in-world?", "What haptics are feasible and accessible?", "Are scent, taste, thermal, or impact cues justified?"],
    dials: [
      { id: "SEN1", name: "Diegetic vs non-diegetic sound", modulation: "Balance environmental spatial audio with score, interface sounds, and narration.", effects: "Environmental awareness versus explicit guidance and mood control." },
      { id: "SEN2", name: "Contextual scent vs scentless", modulation: "Synchronize congruent scents or omit scent hardware.", effects: "Memory and realism versus simpler, allergy-conscious delivery." },
      { id: "SEN3", name: "Contextual taste vs tasteless", modulation: "Use congruent flavor cues or omit gustatory simulation.", effects: "Novel engagement versus avoiding hygiene and technical challenges." },
      { id: "SEN4", name: "Rich vs simple/no haptics", modulation: "Use force, texture, detailed vibration, simple rumble, or none.", effects: "Tangibility and embodiment versus accessibility and lower complexity." },
      { id: "SEN5", name: "Thermal cues vs neutral", modulation: "Match warmth or cold to context or keep temperature neutral.", effects: "Realism versus simpler implementation." },
      { id: "SEN6", name: "Damage feedback vs none", modulation: "Combine localized haptics with audiovisual impact cues or omit them.", effects: "Consequence and tension versus reduced stress and discomfort." }
    ]
  },
  {
    code: "DM-2", slug: "placeness", name: "Placeness",
    summary: "The transformation of a virtual location into a place of meaning and belonging.",
    prompts: ["Should the setting feel familiar or strange?", "What emotional atmosphere should it create?", "Which symbols carry meaning?", "What routines or activities make it feel lived in?"],
    dials: [
      { id: "PLA1", name: "Setting fidelity vs distortion", modulation: "Use coherent or fragmented layouts, routes, materials, and ecology.", effects: "Recognition and familiarity versus displacement and curiosity." },
      { id: "PLA2", name: "Inviting vs alienating atmosphere", modulation: "Shape lighting, sound, and ambience toward warmth or estrangement.", effects: "Attachment and comfort versus unease and detachment." },
      { id: "PLA3", name: "Authenticity vs artificiality", modulation: "Choose realism or deliberate stylization.", effects: "Verisimilitude versus acknowledged constructedness." },
      { id: "PLA4", name: "Symbolism vs ambiguity", modulation: "Embed icons, metaphors, and cultural references or leave meaning open.", effects: "Resonance versus interpretation and possible conflict." },
      { id: "PLA5", name: "Activities vs stasis", modulation: "Include routines, rituals, events, and social opportunities or stillness.", effects: "Place identity and bonding versus dislocation and fragmentation." }
    ]
  },
  {
    code: "DM-3", slug: "temporal", name: "Temporal",
    summary: "The pacing, sequence, rhythm, and manipulation of experienced time.",
    prompts: ["Should time feel real, compressed, or expanded?", "Is the journey linear, branching, or looping?", "How should scenes transition?", "Where should pacing intensify or rest?"],
    dials: [
      { id: "TEM1", name: "Real-time vs compressed/expanded", modulation: "Align with physical time or use fast-forward and slow-motion.", effects: "Believability versus efficiency and dramatic emphasis." },
      { id: "TEM2", name: "Linearity vs non-linearity", modulation: "Use one chronology or flashbacks, branches, and multiple outcomes.", effects: "Clear authorship versus agency and replay with possible confusion." },
      { id: "TEM3", name: "Seamless vs abrupt transitions", modulation: "Use continuous flow and fades or hard cuts and teleportation.", effects: "Continuity versus deliberate jarring emphasis." },
      { id: "TEM4", name: "Implicit vs explicit progression", modulation: "Let users infer gaps or show each moment.", effects: "Cognitive participation versus clarity and possible spoon-feeding." },
      { id: "TEM5", name: "Varied vs monotonic pacing", modulation: "Alternate tension and calm or maintain a single rhythm.", effects: "Emotional arc versus boredom or exhaustion." }
    ]
  },
  {
    code: "DM-4", slug: "cultural", name: "Cultural",
    summary: "Symbols, language, ethics, rituals, and narratives situated in culture.",
    prompts: ["Whose cultural lens is centered?", "Should users encounter familiarity or novelty?", "Which social norms need explanation?", "How will cultural meaning be localized and reviewed?"],
    dials: [
      { id: "CUL1", name: "Culturally specific vs neutral", modulation: "Use specific or universal symbols, architecture, clothing, and language.", effects: "Deep identification versus broader access with possible genericness." },
      { id: "CUL2", name: "Familiarity vs novelty", modulation: "Align with expectations or introduce foreign elements.", effects: "Belonging versus curiosity and learning with alienation risk." },
      { id: "CUL3", name: "Embedded vs open social norms", modulation: "Enforce contextual etiquette or allow emergent rules.", effects: "Authenticity and guidance versus freedom and possible clashes." },
      { id: "CUL4", name: "Explicit vs implicit narrative", modulation: "Explain stories and rituals or embed them for discovery.", effects: "Grounded learning versus rewarding exploration and misinterpretation risk." }
    ]
  },
  {
    code: "DM-5", slug: "social", name: "Social",
    summary: "Representation, agents, group norms, and the social effects of avatars.",
    prompts: ["Who shares the world: people, agents, or both?", "How realistic should avatars be?", "Which norms emerge and which are prescribed?", "What behavior might the Proteus Effect encourage?"],
    dials: [
      { id: "SOC1", name: "Realistic vs stylized avatars", modulation: "Use realistic reconstruction or iconic, non-human, and stylized forms.", effects: "Self-identification with uncanny risk versus expression and lower pressure." },
      { id: "SOC2", name: "Humans/complex agents vs scripted agents", modulation: "Populate with people and believable agents or predictable scripts.", effects: "Nuance and trust versus safety and predictability." },
      { id: "SOC3", name: "Emergent vs prescribed norms", modulation: "Let communities form rules or enforce interaction boundaries.", effects: "Ownership versus newcomer comfort and safety." },
      { id: "SOC4", name: "Simulated vs abstract context", modulation: "Model authentic social problems or use stylized play.", effects: "Real-world transfer versus creativity and lower cognitive load." }
    ]
  },
  {
    code: "DM-6", slug: "cognitive", name: "Cognitive",
    summary: "Attention, cognitive load, learning, scaffolding, and knowledge transfer.",
    prompts: ["What must users understand or remember?", "How much challenge produces productive flow?", "Should learning be discovered or instructed?", "Who controls goals and pacing?"],
    dials: [
      { id: "COG1", name: "Overload vs underload", modulation: "Tune information volume, complexity, and speed toward a productive middle.", effects: "Fatigue and anxiety at one end, boredom and disengagement at the other." },
      { id: "COG2", name: "Directed attention vs ambient awareness", modulation: "Use explicit tasks or open exploration with contextual detail.", effects: "Flow and skill development versus mindfulness and relaxed awareness." },
      { id: "COG3", name: "Experiential learning vs explicit instruction", modulation: "Use discovery cycles or structured tutorials.", effects: "Retention through experience versus efficient guided learning." },
      { id: "COG4", name: "Rote vs contextual learning", modulation: "Use repetition or embed knowledge in narrative and spatial cues.", effects: "Fact encoding versus deeper understanding and transfer." },
      { id: "COG5", name: "User- vs system-directed agency", modulation: "Let users choose goals and pace or guide them through a curated path.", effects: "Ownership versus clarity and reduced decision fatigue." }
    ]
  },
  {
    code: "DM-7", slug: "psychological", name: "Psychological",
    summary: "Emotion, motivation, agency, tension, safety, and transformation.",
    prompts: ["Which emotional state serves the goal?", "Is the user protagonist or observer?", "What motivates continued engagement?", "How predictable and intense should events feel?"],
    dials: [
      { id: "PSY1", name: "Positive vs negative valence", modulation: "Use joyful rewards or suspense, urgency, and dissonance.", effects: "Comfort and safety versus fear, anxiety, and urgency." },
      { id: "PSY2", name: "Active protagonist vs passive observer", modulation: "Offer consequential choices or a predetermined story.", effects: "Agency and responsibility versus curated relaxation." },
      { id: "PSY3", name: "Intrinsic vs extrinsic motivation", modulation: "Use curiosity and discovery or points and explicit rewards.", effects: "Sustained curiosity versus clear reward-driven focus." },
      { id: "PSY4", name: "Predictable vs unpredictable events", modulation: "Use consistent progression or surprise and novelty.", effects: "Safety versus attention and excitement with anxiety risk." }
    ]
  }
];

export const dimensionAliases = new Map(
  dimensions.flatMap((dimension) => [
    [dimension.slug, dimension],
    [dimension.code.toLowerCase(), dimension],
    [dimension.name.toLowerCase(), dimension]
  ])
);

export const citation =
  "Eugene Ch'ng (2026), What's beyond Presence? Dimensionality, Control and Information Spaces, Presence: Virtual and Augmented Reality.";
