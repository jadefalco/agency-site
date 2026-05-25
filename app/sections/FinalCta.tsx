export default function FinalCta() {
  return (
    <section
      id="contact"
      className="relative bg-brand-dark py-16 md:py-24"
      style={{
        background:
          "radial-gradient(circle at 15% 50%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="max-w-xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-3">
            See If It Fits Your Business
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            Tell us a bit about your trade and we&apos;ll set up a quick 15-minute
            demo. No pressure, no pitch.
          </p>
        </div>

        {/* Form */}
        <form
          action="https://formsubmit.co/websitestruenorth@gmail.com"
          method="POST"
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
          aria-label="Book a demo"
        >
          <input
            type="hidden"
            name="_subject"
            value="New Missed Call Recovery Demo Request"
          />
          <input
            type="hidden"
            name="_next"
            value="https://truenorthwebsites.com/thank-you.html"
          />

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white/70 text-sm font-medium mb-1.5"
                >
                  Your Name<span className="text-brand-teal ml-0.5">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Mike Smith"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="business"
                  className="block text-white/70 text-sm font-medium mb-1.5"
                >
                  Business Name<span className="text-brand-teal ml-0.5">*</span>
                </label>
                <input
                  id="business"
                  type="text"
                  name="business"
                  placeholder="Smith Plumbing"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-white/70 text-sm font-medium mb-1.5"
              >
                Phone Number<span className="text-brand-teal ml-0.5">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(250) 555-0199"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="best_time"
                className="block text-white/70 text-sm font-medium mb-1.5"
              >
                Best Time To Call
              </label>
              <select
                id="best_time"
                name="best_time"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value="" className="bg-brand-dark text-white/50">
                  Select a time...
                </option>
                <option value="morning" className="bg-brand-dark text-white">
                  Morning (8am – 12pm)
                </option>
                <option value="afternoon" className="bg-brand-dark text-white">
                  Afternoon (12pm – 5pm)
                </option>
                <option value="evening" className="bg-brand-dark text-white">
                  Evening (5pm – 8pm)
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3.5 rounded-full bg-brand-teal text-white font-semibold text-[0.95rem] transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm flex items-center justify-center gap-2"
          >
            Book My Demo
          </button>

          <p className="text-center text-white/40 text-xs mt-4">
            No pressure. Just a quick demo to see if it fits your business.
          </p>
        </form>
      </div>
    </section>
  );
}
