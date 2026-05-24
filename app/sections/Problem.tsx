export default function Problem() {
  return (
    <section
      id="problem"
      className="relative bg-brand-slate py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">
            The Problem
          </p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            A Missed Call Is a Lost Customer
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            When you&apos;re on the tools and your phone rings, you have two bad
            choices: answer and stop working, or miss it and hope they leave a
            voicemail. Most people won&apos;t.
          </p>
        </div>

        {/* Three pain points */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <PainPoint
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            }
            title="Voicemail is a dead end"
            text="The majority of callers hang up instead of leaving a message. They just move on to the next company in their search results."
          />
          <PainPoint
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            title="Callbacks are blind"
            text="When you do call back, you have no idea if it&apos;s a $50 fix or a $5,000 emergency. You walk in unprepared every time."
          />
          <PainPoint
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            }
            title="Your competitor answers first"
            text="While you&apos;re finishing a job or driving between sites, someone else is picking up the phone and booking the work."
          />
        </div>
      </div>
    </section>
  );
}

function PainPoint({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group text-center md:text-left">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal mb-3 transition-colors duration-200 group-hover:bg-brand-teal/15">
        {icon}
      </div>
      <h3 className="text-brand-dark text-lg font-bold mb-1.5">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
  );
}
