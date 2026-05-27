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
      "Sorry we missed your call! What do you need help with?\n\n1️⃣ Leak\n2️⃣ Drain\n3️⃣ Clog\n4️⃣ No Hot Water\n5️⃣ Toilet Issue\n6️⃣ Emergency\n7️⃣ Other\n\nReply with a number.",
    options: [
      { label: "Leak", next: "leak.q1", saveValue: "Leak" },
      { label: "Drain", next: "drain.q1", saveValue: "Drain / Clog" },
      { label: "Clog", next: "drain.q1", saveValue: "Drain / Clog" },
      { label: "No Hot Water", next: "hotwater.q1", saveValue: "No Hot Water" },
      { label: "Toilet", next: "toilet.q1", saveValue: "Toilet Issue" },
      { label: "Emergency", next: "emergency.q1", saveValue: "Emergency" },
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
    message: "Where's the leak coming from?\n\n1️⃣ Under Sink\n2️⃣ Ceiling\n3️⃣ Toilet\n4️⃣ Basement\n5️⃣ Pipe\n6️⃣ Wall\n7️⃣ Outside\n\nReply with a number.",
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
    message: "How bad is the leak right now?\n\n1️⃣ Dripping\n2️⃣ Steady Leak\n3️⃣ Actively Flooding\n\nReply with a number.",
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
    message: "How long has this been going on?\n\n1️⃣ Just Started\n2️⃣ Few Hours\n3️⃣ More Than a Day\n\nReply with a number.",
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
    message: "Have you been able to shut off the water?\n\n1️⃣ Yes\n2️⃣ No\n3️⃣ Not Sure How\n\nReply with a number.",
    options: [
      { label: "Yes", next: "leak.q5", saveValue: "Yes — shut off" },
      { label: "No", next: "leak.q5", saveValue: "No" },
      {
        label: "Not Sure How",
        next: "leak.q5",
        urgencyScore: 20,
        saveValue: "Not Sure How",
        immediateReply:
          "No problem — a technician will call you shortly and walk you through it. 📞",
      },
    ],
    next: "leak.q5",
    saveField: "attemptedFix",
    fallbackAllowed: false,
  },

  "leak.q5": {
    id: "leak.q5",
    message: "What address should the technician go to? 📍",
    options: [],

    next: "leak.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "leak.q6": {
    id: "leak.q6",
    message: "What name should we put on the work order? 📝",
    options: [],

    next: "leak.q7",
    saveField: "customerName",
    fallbackAllowed: true,
  },

  "leak.q7": {
    id: "leak.q7",
    message:
      "If you can, snap a quick photo — it helps the tech know what to bring. 📸",
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
    message: "Which drain is backing up?\n\n1️⃣ Kitchen Sink\n2️⃣ Bathroom Sink\n3️⃣ Shower\n4️⃣ Tub\n5️⃣ Toilet\n6️⃣ Main Drain\n\nReply with a number.",
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
    message: "Is it draining slowly or completely blocked?\n\n1️⃣ Slow Drain\n2️⃣ Fully Blocked\n3️⃣ Overflowing\n\nReply with a number.",
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
    message: "Have you tried anything to clear it?\n\n1️⃣ Plunger\n2️⃣ Drain Cleaner\n3️⃣ Snake\n4️⃣ Nothing Yet\n\nReply with a number.",
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
    message: "Is this affecting multiple drains?\n\n1️⃣ Yes\n2️⃣ No\n\nReply with a number.",
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
    message: "What address should the technician go to? 📍",
    options: [],
    next: "drain.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "drain.q6": {
    id: "drain.q6",
    message: "What name should we put on the work order? 📝",
    options: [],
    next: "drain.q7",
    saveField: "customerName",
    fallbackAllowed: true,
  },

  "drain.q7": {
    id: "drain.q7",
    message:
      "If you can, send a photo of the drain or backup. 📸",
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
    message: "What kind of water heater do you have?\n\n1️⃣ Tank\n2️⃣ Tankless\n3️⃣ Not Sure\n\nReply with a number.",
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
    message: "What's going on with it?\n\n1️⃣ No Hot Water\n2️⃣ Water Too Hot\n3️⃣ Fluctuating Temperature\n4️⃣ Strange Noises\n\nReply with a number.",
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
    message: "Did it stop working suddenly?\n\n1️⃣ Yes\n2️⃣ Gradually got worse\n\nReply with a number.",
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
    message: "Do you see any water pooling around the unit?\n\n1️⃣ Yes\n2️⃣ No\n3️⃣ Not Sure\n\nReply with a number.",
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
    message: "What address should the technician go to? 📍",
    options: [],
    next: "hotwater.q6",
    saveField: "area",
    fallbackAllowed: true,
  },

  "hotwater.q6": {
    id: "hotwater.q6",
    message: "What name should we put on the work order? 📝",
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
    message: "What's the toilet doing?\n\n1️⃣ Overflowing\n2️⃣ Won't Flush\n3️⃣ Constant Running\n4️⃣ Leak Around Base\n\nReply with a number.",
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
    message: "Is this the only toilet in the house?\n\n1️⃣ Yes\n2️⃣ No\n\nReply with a number.",
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
    message: "What address should the technician go to? 📍",
    options: [],
    next: "toilet.q4",
    saveField: "area",
    fallbackAllowed: true,
  },

  "toilet.q4": {
    id: "toilet.q4",
    message: "What name should we put on the work order? 📝",
    options: [],
    next: COMPLETE_NODE,
    saveField: "customerName",
    fallbackAllowed: true,
  },

  // ============================================================
  // FLOW 5 — EMERGENCY
  // ============================================================
  "emergency.q1": {
    id: "emergency.q1",
    message: "Is water actively flooding right now?\n\n1️⃣ Yes\n2️⃣ No\n\nReply with a number.",
    options: [
      {
        label: "Yes",
        next: "emergency.q2",
        urgencyScore: 60,
        saveValue: "Active flooding",
        immediateReply:
          "Please shut off your main water valve if you can. A technician is being notified now. 🚨",
      },
      { label: "No", next: "emergency.q2", saveValue: "No active flooding" },
    ],
    next: "emergency.q2",
    saveField: "symptoms",
    fallbackAllowed: false,
  },

  "emergency.q2": {
    id: "emergency.q2",
    message: "Is the water anywhere near outlets or appliances?\n\n1️⃣ Yes\n2️⃣ No\n\nReply with a number.",
    options: [
      { label: "Yes", next: "emergency.q3", urgencyScore: 40, saveValue: "Water near electricity" },
      { label: "No", next: "emergency.q3", saveValue: "No electrical hazard" },
    ],
    next: "emergency.q3",
    saveField: "urgency",
    fallbackAllowed: false,
  },

  "emergency.q3": {
    id: "emergency.q3",
    message: "What address should the technician go to? 📍",
    options: [],
    next: "emergency.q4",
    saveField: "area",
    fallbackAllowed: true,
  },

  "emergency.q4": {
    id: "emergency.q4",
    message: "What name should we put on the work order? 📝",
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
      "No worries — just tell us what's going on in a few words. 💬",
    options: [],
    next: "other.q2",
    saveField: "symptoms",
    fallbackAllowed: true,
  },

  "other.q2": {
    id: "other.q2",
    message: "What address should the technician go to? 📍",
    options: [],
    next: "other.q3",
    saveField: "area",
    fallbackAllowed: true,
  },

  "other.q3": {
    id: "other.q3",
    message: "What name should we put on the work order? 📝",
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
    message: "Thanks — we've received your request. A plumber will contact you shortly. 🔧",
    options: [],
    next: null,
    fallbackAllowed: true,
  },
};

// ============================================================
// FINAL MESSAGES BY ISSUE TYPE
// ============================================================
export const FINAL_MESSAGES: Record<string, string> = {
  Leak: "Thanks — we've received your request. A plumber will contact you shortly. 🔧",
  "Drain / Clog": "Thanks — a technician is reviewing your issue now. 🔧",
  "No Hot Water": "Thanks — a technician will contact you shortly. 🔧",
  "Toilet Issue": "Thanks — a technician will contact you shortly. 🚽",
  Emergency: "We've flagged this as urgent. A technician will contact you immediately. 🚨",
  Other: "Thanks — a technician will contact you shortly. 🔧",
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
