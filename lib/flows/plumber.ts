export type FlowOption = {
  label: string;
  next?: string | null;
  urgencyScore?: number;
  saveValue?: string;
  note?: string;
  immediateReply?: string;
};

export type FlowNode = {
  id: string;
  message: string;
  options: FlowOption[];
  next: string | null;
  saveField?: keyof LeadUpdateFields;
  fallbackAllowed: boolean;
  acceptsPhoto?: boolean;
};

export type LeadUpdateFields = {
  issueType?: string;
  symptoms?: string;
  urgency?: string;
  area?: string;
  areaRaw?: string;
  areaMatched?: string;
  timeframe?: string;
  attemptedFix?: string;
  photoUrl?: string;
  customerName?: string;
  urgencyScore?: number;
};

export const START_NODE = "greeting";
export const COMPLETE_NODE = "complete";

export const FLOW_NODES: Record<string, FlowNode> = {
  // ============================================================
  // GREETING
  // ============================================================
  greeting: {
    id: "greeting",
    message:
      "We missed your call! What do you need help with?\n\n1 - EMERGENCY\n2 - Leak\n3 - Drain\n4 - No Hot Water\n5 - Toilet\n6 - Other\n\nReply with a number.",
    options: [
      { label: "EMERGENCY", next: "emergency.area", saveValue: "Emergency", urgencyScore: 100 },
      { label: "Leak", next: "leak.q1", saveValue: "Leak" },
      { label: "Drain", next: "drain.q1", saveValue: "Drain / Clog" },
      { label: "No Hot Water", next: "hotwater.q1", saveValue: "No Hot Water" },
      { label: "Toilet", next: "toilet.q1", saveValue: "Toilet Issue" },
      { label: "Other", next: "other.q1", saveValue: "Other" },
    ],
    next: null,
    saveField: "issueType",
    fallbackAllowed: true,
  },

  // ============================================================
  // FLOW 1 — LEAK
  // ============================================================
  "leak.q1": {
    id: "leak.q1",
    message: "Where's the leak?\n\n1 - Under Sink\n2 - Ceiling\n3 - Toilet\n4 - Basement\n5 - Pipe\n6 - Wall\n7 - Outside",
    options: [
      { label: "Under Sink", next: "leak.q2", saveValue: "Under Sink" },
      { label: "Ceiling", next: "leak.q2", saveValue: "Ceiling" },
      { label: "Toilet", next: "leak.q2", saveValue: "Toilet" },
      { label: "Basement", next: "leak.q2", saveValue: "Basement" },
      { label: "Pipe", next: "leak.q2", saveValue: "Pipe / Wall" },
      { label: "Wall", next: "leak.q2", saveValue: "Pipe / Wall" },
      { label: "Outside", next: "leak.q2", saveValue: "Outside" },
    ],
    next: "leak.q2",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "leak.q2": {
    id: "leak.q2",
    message: "How bad is the leak?\n\n1 - Dripping\n2 - Steady\n3 - Flooding",
    options: [
      { label: "Dripping", next: "leak.q3", saveValue: "Dripping" },
      { label: "Steady", next: "leak.q3", saveValue: "Steady Leak" },
      { label: "Flooding", next: "leak.q3", urgencyScore: 50, saveValue: "Actively Flooding" },
    ],
    next: "leak.q3",
    saveField: "urgency",
    fallbackAllowed: false,
  },

  "leak.q3": {
    id: "leak.q3",
    message: "How long has it been leaking?\n\n1 - Just Started\n2 - Few Hours\n3 - More Than a Day",
    options: [
      { label: "Just Started", next: "leak.q4", saveValue: "Just Started" },
      { label: "Few Hours", next: "leak.q4", saveValue: "Few Hours" },
      { label: "More Than a Day", next: "leak.q4", saveValue: "More Than a Day" },
    ],
    next: "leak.q4",
    saveField: "timeframe",
    fallbackAllowed: false,
  },

  "leak.q4": {
    id: "leak.q4",
    message: "Can you shut off the water?\n\n1 - Yes\n2 - No\n3 - Not Sure How",
    options: [
      { label: "Yes", next: "leak.q5", saveValue: "Yes — shut off" },
      { label: "No", next: "leak.q5", saveValue: "No" },
      {
        label: "Not Sure How",
        next: "leak.q5",
        urgencyScore: 20,
        saveValue: "Not Sure How",
        immediateReply:
          "A technician will call and walk you through it. 📞",
      },
    ],
    next: "leak.q5",
    saveField: "attemptedFix",
    fallbackAllowed: false,
  },

  "leak.q5": {
    id: "leak.q5",
    message: "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "leak.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "leak.q6": {
    id: "leak.q6",
    message: "What's your name? 📝",
    options: [],
    next: "leak.q7",
    saveField: "customerName",
    fallbackAllowed: true,
  },

  "leak.q7": {
    id: "leak.q7",
    message:
      "Send a photo if you can, or reply SKIP. 📸",
    options: [],
    next: COMPLETE_NODE,
    saveField: "photoUrl",
    fallbackAllowed: true,
    acceptsPhoto: true,
  },

  // ============================================================
  // FLOW 2 — DRAIN / CLOG
  // ============================================================
  "drain.q1": {
    id: "drain.q1",
    message: "Which drain is backed up?\n\n1 - Kitchen Sink\n2 - Bathroom Sink\n3 - Shower\n4 - Tub\n5 - Toilet\n6 - Main Drain",
    options: [
      { label: "Kitchen Sink", next: "drain.q2", saveValue: "Kitchen Sink" },
      { label: "Bathroom Sink", next: "drain.q2", saveValue: "Bathroom Sink" },
      { label: "Shower", next: "drain.q2", saveValue: "Shower / Tub" },
      { label: "Tub", next: "drain.q2", saveValue: "Shower / Tub" },
      { label: "Toilet", next: "drain.q2", saveValue: "Toilet" },
      { label: "Main Drain", next: "drain.q2", saveValue: "Main Drain" },
    ],
    next: "drain.q2",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "drain.q2": {
    id: "drain.q2",
    message: "How bad is the blockage?\n\n1 - Slow Drain\n2 - Fully Blocked\n3 - Overflowing",
    options: [
      { label: "Slow", next: "drain.q3", saveValue: "Slow Drain" },
      { label: "Blocked", next: "drain.q3", saveValue: "Fully Blocked" },
      { label: "Overflowing", next: "drain.q3", urgencyScore: 30, saveValue: "Overflowing" },
    ],
    next: "drain.q3",
    saveField: "urgency",
    fallbackAllowed: false,
  },

  "drain.q3": {
    id: "drain.q3",
    message: "What have you tried?\n\n1 - Plunger\n2 - Drain Cleaner\n3 - Snake\n4 - Nothing Yet",
    options: [
      { label: "Plunger", next: "drain.q4", saveValue: "Plunger" },
      { label: "Drain Cleaner", next: "drain.q4", saveValue: "Drain Cleaner" },
      { label: "Snake", next: "drain.q4", saveValue: "Snake" },
      { label: "Nothing Yet", next: "drain.q4", saveValue: "Nothing Yet" },
    ],
    next: "drain.q4",
    saveField: "attemptedFix",
    fallbackAllowed: false,
  },

  "drain.q4": {
    id: "drain.q4",
    message: "Is more than one drain affected?\n\n1 - Yes\n2 - No",
    options: [
      {
        label: "Yes",
        next: "drain.q5",
        urgencyScore: 35,
        saveValue: "Yes — multiple drains",
        note: "Possible main line issue",
      },
      { label: "No", next: "drain.q5", saveValue: "No — single drain" },
    ],
    next: "drain.q5",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "drain.q5": {
    id: "drain.q5",
    message: "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "drain.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "drain.q6": {
    id: "drain.q6",
    message: "What's your name? 📝",
    options: [],
    next: "drain.q7",
    saveField: "customerName",
    fallbackAllowed: true,
  },

  "drain.q7": {
    id: "drain.q7",
    message:
      "Send a photo if you can, or reply SKIP. 📸",
    options: [],
    next: COMPLETE_NODE,
    saveField: "photoUrl",
    fallbackAllowed: true,
    acceptsPhoto: true,
  },

  // ============================================================
  // FLOW 3 — NO HOT WATER
  // ============================================================
  "hotwater.q1": {
    id: "hotwater.q1",
    message: "What type of water heater?\n\n1 - Tank\n2 - Tankless\n3 - Not Sure",
    options: [
      { label: "Tank", next: "hotwater.q2", saveValue: "Tank" },
      { label: "Tankless", next: "hotwater.q2", saveValue: "Tankless" },
      { label: "Not Sure", next: "hotwater.q2", saveValue: "Not Sure" },
    ],
    next: "hotwater.q2",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "hotwater.q2": {
    id: "hotwater.q2",
    message: "What's the problem?\n\n1 - No Hot Water\n2 - Too Hot\n3 - Fluctuating\n4 - Noises",
    options: [
      { label: "No Hot Water", next: "hotwater.q3", saveValue: "No Hot Water" },
      { label: "Too Hot", next: "hotwater.q3", saveValue: "Water Too Hot" },
      { label: "Fluctuating", next: "hotwater.q3", saveValue: "Fluctuating Temperature" },
      { label: "Noises", next: "hotwater.q3", saveValue: "Strange Noises" },
    ],
    next: "hotwater.q3",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "hotwater.q3": {
    id: "hotwater.q3",
    message: "Did it stop suddenly?\n\n1 - Yes\n2 - Gradually",
    options: [
      { label: "Yes", next: "hotwater.q4", saveValue: "Sudden failure" },
      { label: "Gradually", next: "hotwater.q4", saveValue: "Gradual decline" },
    ],
    next: "hotwater.q4",
    saveField: "timeframe",
    fallbackAllowed: false,
  },

  "hotwater.q4": {
    id: "hotwater.q4",
    message: "Any water around the unit?\n\n1 - Yes\n2 - No\n3 - Not Sure",
    options: [
      { label: "Yes", next: "hotwater.q5", urgencyScore: 25, saveValue: "Leak around tank" },
      { label: "No", next: "hotwater.q5", saveValue: "No leak" },
      { label: "Not Sure", next: "hotwater.q5", saveValue: "Not Sure" },
    ],
    next: "hotwater.q5",
    saveField: "attemptedFix",
    fallbackAllowed: false,
  },

  "hotwater.q5": {
    id: "hotwater.q5",
    message: "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "hotwater.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "hotwater.q6": {
    id: "hotwater.q6",
    message: "What's your name? 📝",
    options: [],
    next: COMPLETE_NODE,
    saveField: "customerName",
    fallbackAllowed: true,
  },

  // ============================================================
  // FLOW 4 — TOILET ISSUE
  // ============================================================
  "toilet.q1": {
    id: "toilet.q1",
    message: "What's the toilet doing?\n\n1 - Overflowing\n2 - Won't Flush\n3 - Running\n4 - Leaking at Base",
    options: [
      { label: "Overflowing", next: "toilet.q2", urgencyScore: 35, saveValue: "Overflowing" },
      { label: "Won't Flush", next: "toilet.q2", saveValue: "Won't Flush" },
      { label: "Running", next: "toilet.q2", saveValue: "Constant Running" },
      { label: "Leak", next: "toilet.q2", saveValue: "Leak Around Base" },
    ],
    next: "toilet.q2",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "toilet.q2": {
    id: "toilet.q2",
    message: "Is this the only toilet?\n\n1 - Yes\n2 - No",
    options: [
      { label: "Yes", next: "toilet.q3", urgencyScore: 25, saveValue: "Only toilet" },
      { label: "No", next: "toilet.q3", saveValue: "Has other toilets" },
    ],
    next: "toilet.q3",
    saveField: "attemptedFix",
    fallbackAllowed: false,
  },

  "toilet.q3": {
    id: "toilet.q3",
    message: "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "toilet.q4",
    saveField: "area",
    fallbackAllowed: true,
  },

  "toilet.q4": {
    id: "toilet.q4",
    message: "What's your name? 📝",
    options: [],
    next: COMPLETE_NODE,
    saveField: "customerName",
    fallbackAllowed: true,
  },

  // ============================================================
  // FLOW 5 — EMERGENCY
  // ============================================================
  "emergency.area": {
    id: "emergency.area",
    message:
      "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "emergency.name",
    saveField: "area",
    fallbackAllowed: true,
  },

  "emergency.name": {
    id: "emergency.name",
    message: "What's your name?",
    options: [],
    next: COMPLETE_NODE,
    saveField: "customerName",
    fallbackAllowed: true,
  },

  // ============================================================
  // FLOW 6 — OTHER
  // ============================================================
  "other.q1": {
    id: "other.q1",
    message:
      "What's going on? 💬",
    options: [],
    next: "other.q2",
    saveField: "symptoms",
    fallbackAllowed: true,
  },

  "other.q2": {
    id: "other.q2",
    message: "What area are you in?\n\nExamples: Mission, Glenmore, Rutland, Downtown",
    options: [],
    next: "other.q3",
    saveField: "area",
    fallbackAllowed: true,
  },

  "other.q3": {
    id: "other.q3",
    message: "What's your name? 📝",
    options: [],
    next: COMPLETE_NODE,
    saveField: "customerName",
    fallbackAllowed: true,
  },

  // ============================================================
  // COMPLETE
  // ============================================================
  [COMPLETE_NODE]: {
    id: COMPLETE_NODE,
    message: "Thanks. A plumber will call shortly. 🔧",
    options: [],
    next: null,
    fallbackAllowed: true,
  },
};

// ============================================================
// FINAL MESSAGES BY ISSUE TYPE
// ============================================================
export const FINAL_MESSAGES: Record<string, string> = {
  Leak: "Thanks. A plumber will call shortly. 🔧",
  "Drain / Clog": "Thanks. A technician will call shortly. 🔧",
  "No Hot Water": "Thanks. A technician will call shortly. 🔧",
  "Toilet Issue": "Thanks. A technician will call shortly. 🚽",
  Emergency:
    "Emergency received. A technician will call shortly.",
  Other: "Thanks. A technician will call shortly. 🔧",
};

// ============================================================
// HELPERS
// ============================================================

export function getNode(nodeId: string): FlowNode | undefined {
  return FLOW_NODES[nodeId];
}

export function matchOption(
  node: FlowNode,
  userText: string
): FlowOption | undefined {
  const lower = userText.toLowerCase().trim();

  // 1. Exact match
  for (const opt of node.options) {
    const optLower = opt.label.toLowerCase();
    if (lower === optLower) {
      return opt;
    }
  }

  // 2. Number-based selection (e.g. "1", "1.")
  const numMatch = lower.match(/^(\d+)[.\s)]?/);
  if (numMatch) {
    const idx = parseInt(numMatch[1], 10) - 1;
    if (idx >= 0 && idx < node.options.length) {
      return node.options[idx];
    }
  }

  // 3. Substring match — prefer longer labels first to avoid false positives
  const sortedByLength = [...node.options].sort(
    (a, b) => b.label.length - a.label.length
  );
  for (const opt of sortedByLength) {
    const optLower = opt.label.toLowerCase();
    if (lower.includes(optLower)) {
      return opt;
    }
  }

  return undefined;
}

export function getUrgencyLevel(score: number): "low" | "medium" | "emergency" {
  if (score >= 50) return "emergency";
  if (score >= 25) return "medium";
  return "low";
}

// ============================================================
// SERVICE AREA MATCHING
// ============================================================

export const SERVICE_AREAS = [
  "Lower Mission",
  "Upper Mission",
  "Kettle Valley",
  "Glenmore",
  "North Glenmore",
  "Wilden",
  "Dilworth",
  "Downtown",
  "Pandosy",
  "Rutland",
  "Black Mountain",
  "Crawford",
  "Southeast Kelowna",
  "McKinley Landing",
  "University",
] as const;

const AREA_ALIASES: Record<string, string> = {
  // Lower Mission
  "lower mission": "Lower Mission",
  "lwr mission": "Lower Mission",
  "l mission": "Lower Mission",
  "lm": "Lower Mission",
  "mission": "Lower Mission",
  // Upper Mission
  "upper mission": "Upper Mission",
  "upr mission": "Upper Mission",
  "u mission": "Upper Mission",
  "um": "Upper Mission",
  // Kettle Valley
  "kettle valley": "Kettle Valley",
  "kettle": "Kettle Valley",
  "kv": "Kettle Valley",
  // Glenmore
  "glenmore": "Glenmore",
  "glen": "Glenmore",
  // North Glenmore
  "north glenmore": "North Glenmore",
  "n glenmore": "North Glenmore",
  "north glen": "North Glenmore",
  "ng": "North Glenmore",
  // Wilden
  "wilden": "Wilden",
  // Dilworth
  "dilworth": "Dilworth",
  // Downtown
  "downtown": "Downtown",
  "dt": "Downtown",
  "dtn": "Downtown",
  // Pandosy
  "pandosy": "Pandosy",
  // Rutland
  "rutland": "Rutland",
  "rut": "Rutland",
  // Black Mountain
  "black mountain": "Black Mountain",
  "blk mountain": "Black Mountain",
  // Crawford
  "crawford": "Crawford",
  // Southeast Kelowna
  "southeast kelowna": "Southeast Kelowna",
  "se kelowna": "Southeast Kelowna",
  "se kel": "Southeast Kelowna",
  "southeast": "Southeast Kelowna",
  "se": "Southeast Kelowna",
  // McKinley Landing
  "mckinley landing": "McKinley Landing",
  "mckinley": "McKinley Landing",
  "mckinley landng": "McKinley Landing",
  // University
  "university": "University",
  "ubc": "University",
  "ubc okanagan": "University",
  "university of british columbia": "University",
};

function normalizeAreaInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export function matchServiceArea(input: string): {
  matched: string | null;
  raw: string;
} {
  const raw = input.trim();
  const normalized = normalizeAreaInput(raw);

  if (!normalized) return { matched: null, raw };

  // 1. Exact alias match
  if (AREA_ALIASES[normalized]) {
    return { matched: AREA_ALIASES[normalized], raw };
  }

  // 2. Alias contains input or input contains alias (partial match)
  const aliasKeys = Object.keys(AREA_ALIASES);
  for (const key of aliasKeys) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return { matched: AREA_ALIASES[key], raw };
    }
  }

  // 3. Fuzzy match against canonical area names and aliases
  const candidates = new Set<string>();
  for (const area of SERVICE_AREAS) {
    candidates.add(normalizeAreaInput(area));
  }
  for (const key of aliasKeys) {
    candidates.add(key);
  }

  let bestMatch: string | null = null;
  let bestDistance = Infinity;
  for (const candidate of Array.from(candidates)) {
    const distance = levenshtein(normalized, candidate);
    // Allow up to 2 edits, or a small ratio for longer words
    const threshold = candidate.length <= 5 ? 1 : 2;
    if (distance <= threshold && distance < bestDistance) {
      bestDistance = distance;
      bestMatch = candidate;
    }
  }

  if (bestMatch) {
    const canonical = AREA_ALIASES[bestMatch] ||
      SERVICE_AREAS.find(
        (a) => normalizeAreaInput(a) === bestMatch
      );
    if (canonical) {
      return { matched: canonical, raw };
    }
  }

  return { matched: null, raw };
}
