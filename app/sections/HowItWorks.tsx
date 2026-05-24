export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-white py-16 md:py-20 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em]">
            Three Steps. No Training Required.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          <Step
            number="1"
            title="You miss a call"
            text="A customer calls while you're on a job. The system detects the missed call instantly and triggers the text-back."
          />
          <Step
            number="2"
            title="They text back"
            text="Your customer receives a friendly text asking what they need and where they are — just like the demo above."
          />
          <Step
            number="3"
            title="You callback informed"
            text="You get a clean summary: who called, what they need, and where they are. No more blind callbacks."
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="group relative flex gap-4 md:block">
      {/* Number circle */}
      <div className="shrink-0">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-brand-dark text-white flex items-center justify-center text-base md:text-lg font-bold transition-all duration-200 group-hover:bg-brand-teal group-hover:scale-[1.03]">
          {number}
        </div>
      </div>

      {/* Text */}
      <div className="md:mt-4">
        <h3 className="text-brand-dark text-lg font-bold mb-1 transition-colors duration-200 group-hover:text-brand-teal">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
