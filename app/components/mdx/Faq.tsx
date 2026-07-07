interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items: FaqItem[];
}

/**
 * FAQ accordion for MDX content using native <details>/<summary>.
 *
 * Usage in MDX:
 *   <Faq
 *     items={[
 *       { question: "Question one?", answer: "Answer one." },
 *       { question: "Question two?", answer: "Answer two." }
 *     ]}
 *   />
 */
export default function Faq({ items }: FaqProps) {
  return (
    <div className="not-prose my-6 md:my-8 space-y-3">
      {items.map((item, index) => (
        <details
          key={index}
          className="group rounded-xl border border-slate-200/80 bg-white overflow-hidden transition-colors duration-200 hover:border-slate-300/80"
        >
          <summary className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none">
            <span className="text-brand-dark text-sm md:text-base font-semibold">
              {item.question}
            </span>
            <span
              className="shrink-0 w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center text-sm font-bold transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <div className="overflow-hidden transition-all">
            <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
