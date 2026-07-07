import type { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  type?: "info" | "tip" | "warning";
}

/**
 * Styled callout box for MDX content.
 *
 * Usage in MDX:
 *   <Callout type="tip">
 *     This is a helpful tip for readers.
 *   </Callout>
 */
export default function Callout({ children, type = "info" }: CalloutProps) {
  const styles = {
    info: "bg-sky-50 border-sky-200 text-sky-900",
    tip: "bg-brand-teal/10 border-brand-teal/30 text-brand-dark",
    warning: "bg-amber-50 border-amber-200 text-amber-900",
  };

  const labels = {
    info: "Info",
    tip: "Tip",
    warning: "Note",
  };

  return (
    <div
      className={`not-prose my-6 p-5 md:p-6 rounded-xl border ${styles[type]}`}
      role="note"
    >
      <p className="text-sm font-semibold uppercase tracking-wide mb-2">
        {labels[type]}
      </p>
      <div className="text-sm md:text-base leading-relaxed">{children}</div>
    </div>
  );
}
