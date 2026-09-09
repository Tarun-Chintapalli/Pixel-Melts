// Central site config + shared data for PIXEL Melts

export const WHATSAPP = "917090280497";

export const buildWhatsApp = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Materials", href: "#materials" },
  { label: "Work", href: "#work" },
  { label: "Quote", href: "#quote" },
];

export const SERVICES = [
  {
    id: "printing",
    title: "3D Printing",
    tag: "FDM precision",
    desc: "High-resolution FDM on a Bambu Lab P2S with layer heights down to 0.08mm for parts that look and feel manufactured, not printed.",
    metric: "0.08mm",
    metricLabel: "min layer",
  },
  {
    id: "prototyping",
    title: "Rapid Prototyping",
    tag: "Idea to hand in 24h",
    desc: "Iterate at the speed of thought. Functional prototypes shipped overnight so your team validates faster than the competition.",
    metric: "24h",
    metricLabel: "turnaround",
  },
  {
    id: "product",
    title: "Product Development",
    tag: "Concept to shelf",
    desc: "End-to-end engineering partnership — from napkin sketch through DFM, tooling strategy and market-ready product.",
    metric: "360°",
    metricLabel: "engineering",
  },
  {
    id: "cad",
    title: "CAD Design",
    tag: "Parametric mastery",
    desc: "Print-ready CAD built for manufacturability. Watertight models, clean topology, and revision-controlled every step.",
    metric: "±0.2",
    metricLabel: "mm typical",
  },
  {
    id: "industrial",
    title: "Low-Volume Production",
    tag: "Batches on demand",
    desc: "Consistent small-batch runs with flow-calibrated profiles, so part number fifty matches part number one.",
    metric: "1–100s",
    metricLabel: "parts/run",
  },
  {
    id: "reverse",
    title: "Reverse Engineering",
    tag: "Measure to model",
    desc: "We rebuild worn or discontinued parts into clean, editable CAD from your samples and measurements — then reprint them.",
    metric: "1:1",
    metricLabel: "refit",
  },
  {
    id: "architecture",
    title: "Architecture Models",
    tag: "Vision made tangible",
    desc: "Presentation-grade scale models with lighting-ready detail that win the pitch before a word is spoken.",
    metric: "1:1000",
    metricLabel: "to 1:1",
  },
  {
    id: "custom",
    title: "Custom Production",
    tag: "Anything you imagine",
    desc: "Bespoke runs, personalized editions and one-off masterpieces finished by hand to a standard you can display.",
    metric: "∞",
    metricLabel: "possibilities",
  },
];

export const MATERIALS = [
  {
    id: "pla",
    name: "PLA",
    family: "Everyday",
    accent: "#6ee7ff",
    blurb: "Crisp detail and vivid colour with easy printing. The go-to for display models, concepts and props.",
    props: { Strength: 62, Detail: 92, Heat: 40, Cost: 22 },
    tags: ["Display", "Concept", "Matte & Silk"],
  },
  {
    id: "petg",
    name: "PETG HF",
    family: "Functional",
    accent: "#8b7cff",
    blurb: "Tough, chemical-resistant and slightly flexible with good layer bonding. Reliable for functional enclosures.",
    props: { Strength: 78, Detail: 70, Heat: 68, Cost: 40 },
    tags: ["Functional", "Outdoor", "Enclosure"],
  },
  {
    id: "abs",
    name: "ABS",
    family: "Engineering",
    accent: "#f5c66b",
    blurb: "Impact-resistant and heat-tolerant, printed in an enclosed chamber. The workhorse for mechanical parts.",
    props: { Strength: 82, Detail: 66, Heat: 88, Cost: 45 },
    tags: ["Mechanical", "Automotive"],
  },
  {
    id: "asa",
    name: "ASA",
    family: "Engineering",
    accent: "#ff9d4d",
    blurb: "ABS-grade toughness with true UV stability. Built for parts that live outdoors without fading or cracking.",
    props: { Strength: 80, Detail: 66, Heat: 86, Cost: 52 },
    tags: ["Outdoor", "UV-stable", "Automotive"],
  },
  {
    id: "tpu",
    name: "TPU 95A",
    family: "Flexible",
    accent: "#ff5e3a",
    blurb: "Rubber-like elasticity that bends, grips and absorbs shock. Perfect for gaskets, bumpers and living hinges.",
    props: { Strength: 58, Detail: 68, Heat: 62, Cost: 55 },
    tags: ["Flexible", "Grips", "Gaskets"],
  },
  {
    id: "pccf",
    name: "PC / PA-CF",
    family: "High-performance",
    accent: "#f47b20",
    blurb: "Polycarbonate and carbon-fibre nylon composites — metal-adjacent stiffness, high heat and serious load-bearing strength.",
    props: { Strength: 96, Detail: 72, Heat: 96, Cost: 88 },
    tags: ["Load-bearing", "Jigs", "Hardware-grade"],
  },
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discovery & Brief",
    desc: "We map your intent, constraints and success metrics. Every project starts with understanding the why.",
    detail: "NDA on request · Free consultation · Feasibility review within 12 hours.",
  },
  {
    n: "02",
    title: "CAD & Slice Prep",
    desc: "Parametric modeling paired with print-orientation and support strategy to de-risk before a single gram is printed.",
    detail: "DFM feedback · Orientation study · Live model review sessions.",
  },
  {
    n: "03",
    title: "Material & Nozzle",
    desc: "We match the right Bambu filament and nozzle — 0.2 to 0.8mm — to your part's detail, strength and speed needs.",
    detail: "PLA · PETG · ABS · ASA · TPU · PC/PA-CF · 0.2–0.8mm nozzles.",
  },
  {
    n: "04",
    title: "Precision Production",
    desc: "Printed on a calibrated Bambu Lab P2S with flow-calibrated profiles and layer-by-layer monitoring.",
    detail: "Auto-calibration · Enclosed chamber · Print-progress monitoring.",
  },
  {
    n: "05",
    title: "Finish & Inspect",
    desc: "Support removal, hand-finishing and dimensional checks against your spec before anything ships.",
    detail: "Caliper checks · Cosmetic grading · Photographic QA report.",
  },
  {
    n: "06",
    title: "Deliver & Iterate",
    desc: "Fast, insured delivery with a feedback loop built in — so revision two is even better than one.",
    detail: "Insured shipping · Revision credits · Lifetime file storage.",
  },
];

// Portfolio items.
//  - `compare` items reveal a second image on hover/tap (before → after,
//    lights-off → lights-on). `image` is the default (resting) state,
//    `altImage` is the revealed state.
//  - `mode: "light"` labels the toggle Off/On; "before" labels it Before/After.
//  - `featured: true` spans two columns for extra emphasis.
export const PORTFOLIO = [
  {
    id: "funko",
    title: "Custom Couple Funko Pops",
    category: "Personalized Gift",
    image: "/photos/couple_original.jpeg",
    altImage: "/photos/couple_fukopop.jpeg",
    compare: true,
    mode: "before",
    featured: true,
    stat: "From their photo → to their shelf",
    accent: "#f47b20",
  },
  {
    id: "vader",
    title: "Darth Vader Lamp",
    category: "Lithophane Lamp",
    image: "/photos/Darth_vader_normal.jpeg",
    altImage: "/photos/Darth_vader_light.jpeg",
    compare: true,
    mode: "light",
    stat: "Backlit lithophane · glows on",
    accent: "#ff5e3a",
  },
  {
    id: "obiwan",
    title: "Obi-Wan Kenobi Lamp",
    category: "Lithophane Lamp",
    image: "/photos/OBIWAN_normal.jpeg",
    altImage: "/photos/OBIWAN_light.jpeg",
    compare: true,
    mode: "light",
    stat: "Backlit lithophane · glows on",
    accent: "#6ee7ff",
  },
  {
    id: "clickname",
    title: "Clicking Name Keychain",
    category: "Custom Edition",
    image: "/photos/clicking_name.jpeg",
    stat: "Personalized · satisfying click",
    accent: "#f5c66b",
  },
  {
    id: "keychain",
    title: "R.E.P.O Keychain",
    category: "Custom Edition",
    image: "/keychain.gif",
    stat: "Clicky switch · personalized",
    accent: "#8b7cff",
  },
  {
    id: "coolie",
    title: "Border Coolie",
    category: "Multicolor Print",
    image: "/dog.jpeg",
    stat: "4-color · 0.1mm layers",
    accent: "#ff9d4d",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "PIXEL Melts turned our rough sketch into a shelf-ready product in eleven days. The surface finish genuinely fooled our investors into thinking it was injection molded.",
    name: "Aarav Mehta",
    role: "Founder, NovaGear Robotics",
    rating: 5,
  },
  {
    quote:
      "We reverse-engineered a discontinued gearbox housing that no one else would touch. Tolerances were dead-on. This is our manufacturing partner now, full stop.",
    name: "Dr. Lena Fischer",
    role: "Head of R&D, Klaren Automotive",
    rating: 5,
  },
  {
    quote:
      "The instant quote plus the AI assistant meant I had costed my entire prototype run before lunch. Fastest procurement experience I've had in fifteen years.",
    name: "Marcus Bell",
    role: "Procurement Lead, Helix Medical",
    rating: 5,
  },
  {
    quote:
      "Their architecture models won us the civic center bid. The detail under presentation lighting was unreal. Clients gasped. We signed.",
    name: "Priya Nair",
    role: "Principal, Studio Meridian",
    rating: 5,
  },
];

export const CERTIFICATIONS = [
  { code: "Bambu Lab P2S", label: "Enclosed CoreXY" },
  { code: "Genuine Filament", label: "Bambu & partner spools" },
  { code: "0.2–0.8mm", label: "Nozzle range" },
  { code: "RoHS", label: "Compliant materials" },
  { code: "Flow Calibrated", label: "Per-material profiles" },
  { code: "Design Support", label: "Included on every job" },
];

export const STATS = [
  { value: 4200, suffix: "+", label: "Parts printed" },
  { value: 99, suffix: "%", label: "On-spec rate" },
  { value: 24, suffix: "h", label: "Avg. prototype turnaround" },
  { value: 12, suffix: "+", label: "Filaments in stock" },
];

// Quote calculator model — FDM on Bambu Lab P2S
export const QUOTE_MATERIALS = [
  { id: "pla", name: "PLA", rate: 6, mult: 1 },
  { id: "petg", name: "PETG HF", rate: 8, mult: 1.25 },
  { id: "abs", name: "ABS", rate: 9, mult: 1.35 },
  { id: "asa", name: "ASA", rate: 10, mult: 1.45 },
  { id: "tpu", name: "TPU 95A", rate: 12, mult: 1.6 },
  { id: "pccf", name: "PC / PA-CF", rate: 22, mult: 2.4 },
];

// Nozzle diameter drives detail vs. speed. 0.4mm is the default all-rounder.
export const QUOTE_NOZZLES = [
  { id: "n02", name: "0.2mm · fine detail", mult: 1.4 },
  { id: "n04", name: "0.4mm · balanced", mult: 1 },
  { id: "n06", name: "0.6mm · faster", mult: 0.85 },
  { id: "n08", name: "0.8mm · strong & fast", mult: 0.75 },
];

export const QUOTE_FINISH = [
  { id: "raw", name: "As printed", add: 0 },
  { id: "sanded", name: "Sanded & smoothed", add: 350 },
  { id: "painted", name: "Painted & primed", add: 900 },
  { id: "premium", name: "Show-finish", add: 1800 },
];
