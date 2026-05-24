import SmsDemo from "../components/SmsDemo";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-brand-dark pt-[72px] pb-12 md:pb-16"
      style={{
        background:
          "radial-gradient(circle at 85% 15%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
          {/* SMS Demo — order-1 on mobile (appears first), order-2 on desktop */}
          <div className="order-1 md:order-2 flex justify-center md:justify-end">
            <SmsDemo />
          </div>

          {/* Text content — order-2 on mobile, order-1 on desktop */}
          <div className="order-2 md:order-1 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
              <span className="text-[0.7rem] font-medium tracking-wide text-white/60 uppercase">
                Built for Okanagan Trades
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white text-[2.1rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.05] tracking-[-0.025em] mb-4">
              Never Lose a Lead to a{" "}
              <span className="text-brand-teal-300">Missed Call</span> Again
            </h1>

            {/* Subhead */}
            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0 mb-6">
              When you miss a call on the job, your customer instantly gets a
              text asking what they need — so you can recover the lead instead
              of losing it to voicemail.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center md:justify-start mb-6">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-white font-semibold text-[0.9rem] transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm"
              >
                Book My Demo
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-medium text-[0.9rem] transition-all duration-200 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-px"
              >
                See How It Works
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
              <TrustItem>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Works With Your Existing Number
              </TrustItem>
              <TrustItem>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                No App Required
              </TrustItem>
              <TrustItem>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Built For Okanagan Trades
              </TrustItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[0.8rem] font-medium text-white/45">
      {children}
    </div>
  );
}
