interface ProsConsProps {
  pros: string[];
  cons: string[];
}

/**
 * Two-column pros and cons list for MDX content.
 *
 * Usage in MDX:
 *   <ProsCons
 *     pros={["Fast turnaround", "Local support"]}
 *     cons={["Higher cost than DIY", "Requires planning"]}
 *   />
 */
export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="not-prose my-6 md:my-8 grid md:grid-cols-2 gap-5">
      <div className="bg-brand-teal/5 border border-brand-teal/20 rounded-2xl p-5 md:p-6">
        <h3 className="text-brand-dark font-bold text-lg mb-4">Pros</h3>
        <ul className="space-y-3">
          {pros.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="text-brand-teal font-bold mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-6">
        <h3 className="text-brand-dark font-bold text-lg mb-4">Cons</h3>
        <ul className="space-y-3">
          {cons.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
              <span className="text-red-500 font-bold mt-0.5">✗</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
