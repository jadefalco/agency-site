"use client";

import { useState } from "react";

export default function CopyPhone({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Ignore copy errors
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 text-white/30 hover:text-brand-teal-300 transition-colors text-[10px] align-middle"
      title="Copy phone number"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
