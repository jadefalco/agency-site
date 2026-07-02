export const faqs = [
  {
    q: "Do I need a new phone number?",
    a: "No. The system works with your existing business number. When you miss a call, the text comes from your number so customers recognize it.",
  },
  {
    q: "Can customers still leave voicemails?",
    a: "Yes. The text goes out automatically, but voicemail still works normally. Most customers prefer texting back anyway.",
  },
  {
    q: "What trades does this work for?",
    a: "Plumbers, electricians, HVAC, roofers, landscapers, painters, cleaners, and any local service business that gets phone calls.",
  },
  {
    q: "Can customers send photos?",
    a: "Yes. After they reply with their issue, they can text back photos, their address, or any extra details that help you prepare.",
  },
  {
    q: "How quickly can I get set up?",
    a: "Usually within 24–48 hours. We configure the questions, connect your number, and test everything before it goes live.",
  },
  {
    q: "Does this work outside Kelowna?",
    a: "Yes. While we're based in the Okanagan, the system works anywhere in Canada. The location questions can be customized for your service area.",
  },
  {
    q: "What happens after hours?",
    a: "The text-back works 24/7. If you miss a call at 10 PM, your customer still gets a professional response letting them know when to expect a callback.",
  },
  {
    q: "Can I customize the questions?",
    a: "Yes. We set up the questions based on your trade. Plumbers get leak/tank/drain options. Electricians get panel/wiring/outage options. You can adjust them anytime.",
  },
  {
    q: "Do customers need an app?",
    a: "No. They just reply to a regular text message. Nothing to download, install, or sign up for.",
  },
  {
    q: "What if I already have a receptionist?",
    a: "This catches the calls they miss too — during lunch, busy periods, or after hours. It acts as a safety net, not a replacement.",
  },
];

/**
 * Server Component FAQ accordion for the missed-call recovery page.
 *
 * Uses native <details>/<summary> elements instead of React state so the
 * section can be server-rendered with zero client-side JavaScript.
 */
export default function Faq() {
  return (
    <section id="faq" className="relative bg-white py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">
            Common Questions
          </p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em]">
            Quick Answers
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-slate-200/80 overflow-hidden transition-colors duration-200 hover:border-slate-300/80"
              open={index === 0}
            >
              <summary className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none">
                <span className="text-brand-dark text-sm md:text-base font-semibold">
                  {faq.q}
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
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
