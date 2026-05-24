export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative bg-brand-slate py-16 md:py-20"
    >
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            Simple Pricing for Busy Trades Businesses
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            One recovered job can easily pay for the system.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6 items-stretch">
          <PricingCard
            name="Solo"
            price="$79"
            period="per month"
            description="For owner-operators and small crews."
            features={[
              "Instant missed-call text back",
              "Collect job type + area",
              "Customer photo replies",
              "Simple lead summaries",
              "Works with your existing number",
            ]}
            cta="Get Started"
            emphasized={false}
          />
          <PricingCard
            name="Crew"
            price="$149"
            period="per month"
            description="For growing teams with multiple vans or techs."
            features={[
              "Everything in Solo",
              "Multiple team notifications",
              "Priority emergency alerts",
              "Custom question flows",
              "Shared lead visibility",
              "Faster response workflows",
            ]}
            cta="Get Started"
            emphasized={true}
          />
        </div>

        {/* Reassurance + custom link */}
        <div className="text-center mt-8 md:mt-10 space-y-3">
          <p className="text-slate-500 text-sm">
            No contracts. Cancel anytime.
          </p>
          <p className="text-slate-500 text-sm">
            Need something custom for multiple crews or office staff?{" "}
            <a
              href="#contact"
              className="text-brand-teal font-medium hover:underline underline-offset-2 transition-colors"
            >
              Let&apos;s talk
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  emphasized,
}: {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  emphasized: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col bg-white rounded-2xl p-6 md:p-7 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md h-full ${
        emphasized
          ? "border-brand-teal/40 shadow-md"
          : "border-slate-200/80 hover:border-slate-300/80"
      }`}
    >
      {emphasized && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-teal text-white text-xs font-semibold">
            Recommended
          </span>
        </div>
      )}

      <h3 className="text-brand-dark text-lg font-bold mb-1">{name}</h3>
      <p className="text-slate-500 text-sm mb-4">{description}</p>

      <div className="flex items-baseline gap-1 mb-5">
        <span className="text-brand-dark text-3xl md:text-4xl font-bold tracking-tight">
          {price}
        </span>
        <span className="text-slate-500 text-sm">{period}</span>
      </div>

      <ul className="space-y-2.5 mb-6 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-brand-teal shrink-0 mt-0.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`block text-center w-full px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-px ${
          emphasized
            ? "bg-brand-teal text-white hover:bg-teal-500 shadow-sm"
            : "bg-brand-dark text-white hover:bg-slate-800"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}
