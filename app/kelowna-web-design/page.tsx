import Footer from "../sections/Footer";

/**
 * Server Component for the Kelowna web design guide.
 *
 * Metadata (title, description, canonical, OG, Twitter) is provided by
 * app/kelowna-web-design/layout.tsx via the Next.js Metadata API.
 * JSON-LD structured data is also rendered server-side in the layout.
 *
 * The inline NAV_HTML and NAV_SCRIPT are preserved so the existing
 * navigation behaviour and mobile menu continue to work unchanged.
 */

export default function KelownaWebDesignPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: NAV_HTML }} />

      <main id="main-content">
        <Hero />
        <Checklist />
        <Comparison />
        <PricingGuide />
        <QuestionsToAsk />
        <HowToChoose />
        <CommonMistakes />
        <WhyLocal />
        <CaseStudy />
        <Faq />
        <FinalCta />
      </main>
      <Footer />

      <script dangerouslySetInnerHTML={{ __html: NAV_SCRIPT }} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  NAVBAR  —  exact copy from homepage                          */
/* ────────────────────────────────────────────────────────────── */

const NAV_HTML = `
<nav>
    <div class="nav-container">
        <div class="logo" onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <img src="/images/compass-icon.png" alt="TrueNorth Logo">
            <div style="display:flex; flex-direction:column; justify-content:center;">
                <span style="font-family: 'Playfair Display', serif; font-size:1.6rem; line-height:1.05;">
                    TrueNorth
                </span>
                <span style="font-size:0.75rem; font-weight:600; letter-spacing:1.2px; margin-top:4px; opacity:0.75;">
                    WEBSITES
                </span>
            </div>
        </div>
        <div class="nav-links">
            <a href="/#work">Work</a>
            <a href="/kelowna-web-design/">Web Design</a>
            <a href="/missed-call-recovery/">Lead Recovery</a>
            <a href="/#why-fail">Why Most Fail</a>
            <a href="/#process">Process</a>
            <a href="/about.html">About</a>
            <a href="/#contact">Contact</a>
        </div>
        <div style="display:flex; align-items:center; gap:0.75rem;">
            <a href="/#contact" class="nav-cta desktop-only">Get Free Mockup</a>
            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu" style="position:relative; width:32px; height:32px; display:flex; align-items:center; justify-content:center; padding:0; overflow:hidden;">
                <svg class="icon-hamburger" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; inset:0; margin:auto; transition:all 0.35s cubic-bezier(0.4,0,0.2,1);"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                <svg class="icon-compass" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; inset:0; margin:auto; opacity:0; transform:rotate(-90deg) scale(0.6); transition:all 0.35s cubic-bezier(0.4,0,0.2,1);"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </button>
        </div>
    </div>
    <div id="mobile-menu">
        <a href="/#work">Work</a>
        <a href="/kelowna-web-design/">Web Design</a>
        <a href="/missed-call-recovery/">Lead Recovery</a>
        <a href="/#why-fail">Why Most Fail</a>
        <a href="/#process">Process</a>
        <a href="/about.html">About</a>
        <a href="/#contact">Contact</a>
        <a href="/#contact" class="nav-cta" style="text-align:center; margin-top:1rem;">Get Free Mockup</a>
    </div>
</nav>
<style>
  nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: background 0.35s ease, box-shadow 0.35s ease; background: transparent; }
  nav .nav-container { max-width: 1300px; margin: 0 auto; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between; }
  nav .logo { cursor: pointer; display: flex; align-items: center; gap: 0.75rem; }
  nav .nav-links { display: flex; align-items: center; gap: 2rem; }
  nav .nav-links a { color: rgba(255,255,255,0.9) !important; text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: color 0.3s ease; }
  nav .nav-links a:hover { color: #67e8f9; }
  nav .nav-cta { display: inline-flex; align-items: center; padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.25); color: #ffffff; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 0.9rem; transition: all 0.3s ease; }
  nav .nav-cta:hover { background: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.4); }
  nav .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; color: #ffffff !important; position: relative; padding: 0.5rem; z-index: 101; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
  nav .mobile-menu-btn svg { display: block; pointer-events: none; }
  nav #mobile-menu { display: none; position: absolute; top: 100%; left: 0; right: 0; background: rgba(15,23,42,0.98); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); flex-direction: column; padding: 1.5rem; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.1); z-index: 999; min-width: 200px; }
  nav #mobile-menu a { display: block; padding: 0.5rem 0; color: rgba(255,255,255,0.9); text-decoration: none; font-weight: 500; font-size: 1.1rem; }
  nav.scrolled { background: rgba(255,255,255,0.95) !important; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
  nav.scrolled .nav-links a, nav.scrolled .logo span, nav.scrolled .logo div, nav.scrolled .mobile-menu-btn { color: #0f172a !important; }
  nav.scrolled .nav-links a:hover { color: #0ea5e9 !important; }
  nav.scrolled .nav-cta { background: linear-gradient(135deg, #0ea5e9, #14b8a6) !important; border-color: transparent !important; color: #ffffff !important; }
  nav.scrolled #mobile-menu { background: rgba(255,255,255,0.98) !important; border-top: 1px solid rgba(0,0,0,0.05) !important; }
  nav.scrolled #mobile-menu a { color: #0f172a !important; }
  nav.scrolled .mobile-menu-btn svg { stroke: #0f172a !important; }
  @media (max-width: 768px) { nav .nav-links { display: none; } nav .mobile-menu-btn { display: block; } nav .nav-cta.desktop-only { display: none; } nav .nav-container { padding: 1rem 1.5rem; } }
</style>
`;
const NAV_SCRIPT = `
const nav = document.querySelector('nav');
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

mobileBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileMenu.style.display = 'flex';
        animateToX();
    } else {
        mobileMenu.style.display = 'none';
        animateToHamburger();
    }
});

function animateToX() {
    const hamburger = mobileBtn.querySelector('.icon-hamburger');
    const compass = mobileBtn.querySelector('.icon-compass');
    if (hamburger) { hamburger.style.opacity = '0'; hamburger.style.transform = 'rotate(90deg) scale(0.6)'; }
    if (compass) { compass.style.opacity = '1'; compass.style.transform = 'rotate(0deg) scale(1)'; }
}

function animateToHamburger() {
    const hamburger = mobileBtn.querySelector('.icon-hamburger');
    const compass = mobileBtn.querySelector('.icon-compass');
    if (hamburger) { hamburger.style.opacity = '1'; hamburger.style.transform = 'rotate(0deg) scale(1)'; }
    if (compass) { compass.style.opacity = '0'; compass.style.transform = 'rotate(-90deg) scale(0.6)'; }
}

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        isMenuOpen = false;
        animateToHamburger();
    });
});

document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
        isMenuOpen = false;
        animateToHamburger();
    }
});
`;

/* ────────────────────────────────────────────────────────────── */
/*  HERO                                                         */
/* ────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-brand-dark pt-[72px] pb-12 md:pb-16"
      style={{
        background:
          "radial-gradient(circle at 85% 15%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
            <span className="text-[0.7rem] font-medium tracking-wide text-white/60 uppercase">
              Kelowna Small Business Guide
            </span>
          </div>

          <h1 className="text-white text-[2.1rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.05] tracking-[-0.025em] mb-5">
            How Much Does a Website Cost{" "}
            <span className="text-brand-teal-300">in Kelowna?</span>
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            Typical pricing, what you should expect to get, and how to avoid common pitfalls —
            whether you are hiring locally or figuring it out yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href="#pricing-guide"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-teal text-white font-semibold text-[0.9rem] transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm"
            >
              See Typical Pricing
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/20 text-white font-medium text-[0.9rem] transition-all duration-200 hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-px"
            >
              Get a Free Mockup
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <TrustItem>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              No Unverified Claims
            </TrustItem>
            <TrustItem>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Based on Real Local Work
            </TrustItem>
            <TrustItem>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-brand-teal">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Written for Kelowna Owners
            </TrustItem>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1.5 text-[0.8rem] font-medium text-white/45">{children}</div>;
}

/* ────────────────────────────────────────────────────────────── */
/*  CHECKLIST                                                    */
/* ────────────────────────────────────────────────────────────── */

function Checklist() {
  const items = [
    { title: "Mobile-first design", text: "Over 60% of local searches happen on phones. Your site needs to look and work perfectly on every screen size." },
    { title: "Clear contact info + map", text: "Customers should find your phone number, address, and a map within seconds of landing on your site." },
    { title: "Service pages for SEO", text: "A single homepage is not enough. Dedicated pages for each service help you show up in more searches." },
    { title: "Fast load time", text: "If your site takes longer than 3 seconds to load, visitors leave. Speed is also a ranking factor on Google." },
    { title: "SSL + reliable hosting", text: "The padlock icon matters. Visitors trust secure sites, and Google ranks them higher." },
    { title: "Google Business Profile link", text: "Your website and Google listing should work together. Linking them builds credibility and helps local rankings." },
    { title: "Call-to-action on every page", text: "Every page should tell the visitor exactly what to do next: call, book, or request a quote." },
    { title: "Easy-to-update content", text: "You should be able to change your hours, photos, or services without calling a developer every time." },
  ];

  return (
    <section id="checklist" className="relative bg-brand-slate py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">The Essentials</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            What Should a Small Business Website Include?
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Whether you build it yourself or hire someone, every local business site needs these basics to actually bring in customers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300/80">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal mb-3 transition-colors duration-200 group-hover:bg-brand-teal/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-brand-dark text-base font-bold mb-1.5">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  COMPARISON                                                   */
/* ────────────────────────────────────────────────────────────── */

function Comparison() {
  return (
    <section id="comparison" className="relative bg-white py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">The Options</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            DIY Website Builder vs Hiring a Local Designer
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            There is no single right answer. Here is how the three most common paths compare for a Kelowna small business.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-brand-dark">
                <th className="py-4 pr-4 text-brand-dark font-bold text-sm md:text-base min-w-[140px]">Factor</th>
                <th className="py-4 px-4 text-brand-dark font-bold text-sm md:text-base min-w-[160px]">DIY Builder</th>
                <th className="py-4 px-4 text-brand-dark font-bold text-sm md:text-base min-w-[160px]">Freelance Marketplace</th>
                <th className="py-4 pl-4 text-brand-teal font-bold text-sm md:text-base min-w-[160px]">Local Designer</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { factor: "Upfront cost", diy: "$0–200", freelance: "$1,500–5,000", local: "$3,000–12,000+" },
                { factor: "Ongoing cost", diy: "$15–50/mo", freelance: "$0–100/mo", local: "$0–250/mo" },
                { factor: "Time to launch", diy: "1–4 weeks", freelance: "2–8 weeks", local: "2–6 weeks" },
                { factor: "Customization", diy: "Limited to templates", freelance: "Varies widely", local: "Fully custom" },
                { factor: "Local SEO setup", diy: "You do it yourself", freelance: "Often extra", local: "Usually included" },
                { factor: "Support", diy: "Chat/email only", freelance: "Email, variable", local: "Direct phone/text" },
                { factor: "Content ownership", diy: "Platform-dependent", freelance: "Clarify in contract", local: "Typically full ownership" },
              ].map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-4 text-slate-700 font-medium">{row.factor}</td>
                  <td className="py-3.5 px-4 text-slate-600">{row.diy}</td>
                  <td className="py-3.5 px-4 text-slate-600">{row.freelance}</td>
                  <td className="py-3.5 pl-4 text-brand-dark font-medium">{row.local}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-slate-500 text-sm mt-6 text-center">
          These are typical scenarios, not market-wide data. Your actual quotes will vary based on scope, features, and the designer&apos;s experience.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  PRICING GUIDE                                                */
/* ────────────────────────────────────────────────────────────── */

function PricingGuide() {
  return (
    <section
      id="pricing-guide"
      className="relative bg-brand-dark py-16 md:py-20"
      style={{
        background:
          "radial-gradient(circle at 15% 50%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Typical Pricing</p>
          <h2 className="text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            What You Might Expect to Pay in Kelowna
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            These are common price points we see from quotes around the Okanagan. Your actual cost depends on scope, features, and who you hire.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          <PriceCard
            label="DIY Route"
            range="$15 – $50/mo"
            description="Wix, Squarespace, or GoDaddy. You build and manage it yourself."
            pros={["Low monthly cost", "No upfront build fee", "Quick to start"]}
            cons={["Limited customization", "You do all the SEO", "Support is chat-only", "Can look generic"]}
          />
          <PriceCard
            label="One-Time Build"
            range="$1,000 – $8,000"
            description="Hire a freelancer or small agency for a custom build. Paid upfront or in milestones."
            pros={["Custom design", "Professional look", "You own the site"]}
            cons={["Large upfront cost", "Updates often cost extra", "May not include SEO", "No ongoing support"]}
          />
          <PriceCard
            label="Subscription Model"
            range="$75 – $750/mo"
            description="A local designer builds and maintains your site for a flat monthly fee."
            pros={["No large upfront payment", "Updates included", "Ongoing support", "SEO typically built-in"]}
            cons={["Higher total cost over 2+ years", "May require a minimum term"]}
            highlight
          />
        </div>

        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-white text-lg font-bold mb-4">What Drives the Cost?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Number of pages", text: "More pages = more design and content work." },
              { label: "Custom features", text: "Booking systems, quote forms, or e-commerce add complexity." },
              { label: "SEO & content", text: "Writing optimized copy and setting up local SEO takes time." },
              { label: "Branding & assets", text: "Custom logos, photography, or video increase the scope." },
            ].map((item) => (
              <div key={item.label} className="bg-white/5 rounded-xl p-4 border border-white/8">
                <p className="text-white font-semibold text-sm mb-1">{item.label}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PriceCard({
  label,
  range,
  description,
  pros,
  cons,
  highlight,
}: {
  label: string;
  range: string;
  description: string;
  pros: string[];
  cons: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col rounded-2xl p-6 md:p-7 border transition-all duration-200 h-full ${
        highlight
          ? "bg-brand-teal/10 border-brand-teal/30"
          : "bg-white/5 border-white/10"
      }`}
    >
      <p className={`text-sm font-semibold uppercase tracking-wider mb-2 ${highlight ? "text-brand-teal" : "text-white/50"}`}>
        {label}
      </p>
      <p className="text-white text-2xl md:text-3xl font-bold tracking-tight mb-2">{range}</p>
      <p className="text-white/60 text-sm leading-relaxed mb-5">{description}</p>

      <div className="space-y-2 mb-4 flex-1">
        {pros.map((p) => (
          <div key={p} className="flex items-start gap-2 text-sm text-white/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand-teal shrink-0 mt-0.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            {p}
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-5">
        {cons.map((c) => (
          <div key={c} className="flex items-start gap-2 text-sm text-white/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-400 shrink-0 mt-0.5">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  QUESTIONS TO ASK                                             */
/* ────────────────────────────────────────────────────────────── */

function QuestionsToAsk() {
  const questions = [
    {
      q: "Who owns the website?",
      a: "Make sure you own your domain name and all content. Some agencies retain ownership, which means you cannot leave without rebuilding from scratch.",
    },
    {
      q: "Can I move my website later?",
      a: "Ask what platform the site is built on and whether you can export or transfer it. Proprietary systems can lock you in.",
    },
    {
      q: "What happens if I stop paying?",
      a: "Clarify what happens to your site, domain, and content if the relationship ends. There should be a clear offboarding process.",
    },
    {
      q: "How are updates handled?",
      a: "Find out if updates are included, how quickly they are turned around, and whether there are limits on the number of requests.",
    },
    {
      q: "Do you help with Google Business Profile?",
      a: "A website alone is not enough for local SEO. Ask if they optimize or at least connect your Google Business Profile.",
    },
    {
      q: "Will I talk to the person building my site?",
      a: "Some agencies pass you through account managers. If direct communication matters to you, confirm who you will actually be working with.",
    },
  ];

  return (
    <section id="questions" className="relative bg-brand-slate py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Before You Sign</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            What Questions Should You Ask a Web Designer?
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            These six questions protect you from surprises, lock-ins, and hidden costs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {questions.map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300/80">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark text-white text-sm font-bold mb-3">
                {i + 1}
              </div>
              <h3 className="text-brand-dark text-base font-bold mb-2">{item.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  HOW TO CHOOSE                                                */
/* ────────────────────────────────────────────────────────────── */

function HowToChoose() {
  return (
    <section id="choose" className="relative bg-white py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Vetting Guide</p>
            <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
              How to Choose a Web Designer in Kelowna
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-6">
              Price is only one factor. Here is what actually separates a good local designer from a risky one.
            </p>
            <ul className="space-y-4">
              {[
                { title: "Look at live sites, not mockups", text: "Anyone can make a pretty picture. Ask for live websites they have built for real businesses. Check them on your phone." },
                { title: "Check Google rankings", text: "Search for the businesses they built sites for. If those sites do not show up locally, the designer may not understand SEO." },
                { title: "Ask about ongoing support", text: "Websites are not one-and-done. You will need updates, security patches, and content changes. Clarify what is included." },
                { title: "Get it in writing", text: "A clear contract should cover scope, timeline, ownership, revision limits, and what happens if either party ends the agreement." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-brand-teal shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <div>
                    <p className="text-brand-dark font-semibold text-sm">{item.title}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-slate rounded-2xl p-6 md:p-8 border border-slate-200/80">
            <h3 className="text-brand-dark text-lg font-bold mb-4">Red Flags to Watch For</h3>
            <div className="space-y-3">
              {[
                "They cannot show you live local sites they have built.",
                "They quote a price without asking about your goals.",
                "They own your domain name or hosting account.",
                "There is no contract or scope document.",
                "They guarantee first-page Google rankings.",
                "They build on a platform you cannot access or export.",
              ].map((flag) => (
                <div key={flag} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-red-500 shrink-0 mt-0.5">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {flag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  COMMON MISTAKES                                              */
/* ────────────────────────────────────────────────────────────── */

function CommonMistakes() {
  return (
    <section id="mistakes" className="relative bg-brand-slate py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Pitfalls</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            Common Mistakes Kelowna Businesses Make
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            These are the patterns we see most often when local businesses come to us after a bad experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Setting it and forgetting it",
              text: "A website is not a billboard. If your hours, services, or team have changed and your site has not, customers notice. Outdated information erodes trust.",
              fix: "Plan for at least quarterly reviews, or choose a plan that includes updates.",
            },
            {
              title: "Hiring out-of-town agencies for local SEO",
              text: "A designer in Toronto or Vancouver may build a beautiful site that never ranks in Kelowna because they do not understand local search behaviour.",
              fix: "Ask how they handle local SEO and whether they have ranked businesses in the Okanagan.",
            },
            {
              title: "Choosing price over performance",
              text: "The cheapest option often means a template site with no SEO, slow hosting, and no support. You save money upfront and lose customers long-term.",
              fix: "Evaluate total cost of ownership: upfront + hosting + updates + lost leads from a poor site.",
            },
            {
              title: "Ignoring Google Business Profile",
              text: "Your website and Google listing should work together. Many businesses invest in a site but never claim or optimize their profile.",
              fix: "Claim your profile, keep hours updated, add photos, and link it prominently on your site.",
            },
            {
              title: "No clear call-to-action",
              text: "Visitors land on your site, read about your services, and then leave because they do not know what to do next.",
              fix: "Every page should have one clear action: call, book, or request a quote.",
            },
          ].map((item) => (
            <div key={item.title} className="group bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300/80">
              <h3 className="text-brand-dark text-base font-bold mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{item.text}</p>
              <p className="text-brand-teal text-sm font-medium">{item.fix}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  WHY LOCAL                                                    */
/* ────────────────────────────────────────────────────────────── */

function WhyLocal() {
  return (
    <section
      id="local"
      className="relative bg-brand-dark py-16 md:py-20"
      style={{
        background:
          "radial-gradient(circle at 85% 15%, rgba(20,184,166,0.06), transparent 50%), #0f172a",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Local Advantage</p>
          <h2 className="text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            Why Local Support Matters
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            Working with someone in your own timezone who understands your market has practical advantages that remote agencies struggle to match.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              ),
              title: "They know the market",
              text: "A local designer understands Okanagan seasonality, neighbourhood names, and what your competitors are doing. That knowledge shapes better content and SEO.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              ),
              title: "Direct communication",
              text: "No account managers, no ticket queues. You text or call the person actually building your site. Revisions happen in hours, not days.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              title: "Same timezone urgency",
              text: "When something breaks or you need a change before a busy weekend, a local designer is awake and available. Timezone gaps cost real business.",
            },
          ].map((item) => (
            <div key={item.title} className="group bg-white/5 border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.07] hover:border-white/15">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/15 text-brand-teal mb-4 transition-colors duration-200 group-hover:bg-brand-teal/20">
                {item.icon}
              </div>
              <h3 className="text-white text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  CASE STUDY                                                   */
/* ────────────────────────────────────────────────────────────── */

function CaseStudy() {
  return (
    <section id="case-study" className="relative bg-white py-16 md:py-20 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-5 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Example Project</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-4">
            What a Well-Built Local Site Looks Like
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            A real Kelowna project showing the difference between a generic template and a site built for local conversion.
          </p>
        </div>

        <div className="bg-brand-slate rounded-2xl border border-slate-200/80 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-slate-100">
          <img
  src="/images/ok-const-screenshot.png"
  alt="Okanagan Inspired Construction website example"
  className="w-full h-full object-cover"
  loading="lazy"
/>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <p className="text-brand-teal text-xs font-semibold uppercase tracking-wider mb-2">Luxury Construction • Kelowna</p>
              <h3 className="text-brand-dark text-xl font-bold mb-3">Okanagan Inspired Construction</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Built to showcase large-scale projects, generate quote requests, and rank for construction-related searches across the Okanagan.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-brand-dark text-lg font-bold">&lt;2s</p>
                  <p className="text-slate-500 text-xs">Load time</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-dark text-lg font-bold">100%</p>
                  <p className="text-slate-500 text-xs">Mobile score</p>
                </div>
                <div className="text-center">
                  <p className="text-brand-dark text-lg font-bold">10+</p>
                  <p className="text-slate-500 text-xs">Service pages</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://okanaganconstruction.ca"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-dark text-white font-semibold text-sm transition-all duration-200 hover:bg-slate-800 hover:-translate-y-px"
                >
                  View Live Site
                </a>
                <a
                  href="/#work"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-slate-300 text-brand-dark font-medium text-sm transition-all duration-200 hover:bg-white hover:border-slate-400 hover:-translate-y-px"
                >
                  See More Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  FAQ                                                          */
/* ────────────────────────────────────────────────────────────── */

function Faq() {
  const faqs = [
    {
      q: "How long does a website take to build in Kelowna?",
      a: "A simple brochure site typically takes 2–4 weeks. A more complex site with custom features, multiple service pages, and content writing can take 4–8 weeks. The biggest variable is usually how quickly you can provide feedback, photos, and content.",
    },
    {
      q: "Do I need to hire a local designer or can I use someone remote?",
      a: "You can use either. Remote designers are often cheaper, but local designers understand Kelowna search behaviour, seasonal business cycles, and neighbourhood-specific terms. If local SEO matters to you, a local designer has an advantage.",
    },
    {
      q: "What is the difference between web design and web development?",
      a: "Web design is how the site looks and feels — layout, colours, typography, user experience. Web development is how it works under the hood — coding, databases, integrations, speed optimization. Some people do both; many specialize in one.",
    },
    {
      q: "Will a new website help me rank on Google Maps?",
      a: "A website alone will not get you on Google Maps. Your Google Business Profile does that. However, a well-optimized website strengthens your profile by providing consistent name, address, and phone information, plus service pages that Google can cross-reference.",
    },
    {
      q: "Can I update the website myself after it is built?",
      a: "It depends on the platform. Sites built on WordPress, Webflow, or similar CMS platforms let you edit text and images without coding. Static or custom-coded sites usually require a developer for changes. Ask this before you sign.",
    },
   
    {
      q: "Do I need a separate mobile site?",
      a: "No. Modern websites use responsive design, which means the same site automatically adjusts to fit phones, tablets, and desktops. A separate mobile site is outdated and can hurt your SEO.",
    },
    {
      q: "Is a one-page website enough for a local business?",
      a: "Sometimes, but rarely for businesses that want to rank on Google. Search engines rank individual pages. If you only have one page, you can only rank for a handful of keywords. Multiple service pages give you more opportunities to be found.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section id="faq" className="relative bg-brand-slate py-16 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-3xl mx-auto px-5 md:px-6">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-brand-teal text-sm font-semibold tracking-wider uppercase mb-3">Common Questions</p>
          <h2 className="text-brand-dark text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em]">
            Quick Answers
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-xl border border-slate-200/80 bg-white overflow-hidden transition-colors duration-200 hover:border-slate-300/80"
            >
              <summary className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer list-none">
                <span className="text-brand-dark text-sm md:text-base font-semibold">{faq.q}</span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center text-sm font-bold transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="overflow-hidden transition-all">
                <p className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────── */
/*  FINAL CTA                                                    */
/* ────────────────────────────────────────────────────────────── */

function FinalCta() {
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
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-white text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] tracking-[-0.02em] mb-3">
            Not Sure What Your Business Needs?
          </h2>
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            Send us your current website — or just tell us about your business — and we will send you a short video review with three specific recommendations. No cost, no pitch.
          </p>
        </div>

        <form
          action="https://formsubmit.co/websitestruenorth@gmail.com"
          method="POST"
          className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8"
          aria-label="Request free website review"
        >
          <input type="hidden" name="_subject" value="New Website Review Request - Kelowna Guide" />
          <input type="hidden" name="_next" value="https://truenorthwebsites.com/thank-you.html" />

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-white/70 text-sm font-medium mb-1.5">
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
                <label htmlFor="business" className="block text-white/70 text-sm font-medium mb-1.5">
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
              <label htmlFor="website" className="block text-white/70 text-sm font-medium mb-1.5">
                Current Website (if you have one)
              </label>
              <input
                id="website"
                type="url"
                name="website"
                placeholder="https://yoursite.com"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors"
              />
            </div>

            <div>
              <label htmlFor="challenge" className="block text-white/70 text-sm font-medium mb-1.5">
                What is your biggest challenge right now?
              </label>
              <textarea
                id="challenge"
                name="challenge"
                rows={3}
                placeholder="E.g., we get traffic but no calls, our site is outdated, we are not showing up on Google..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-teal/50 focus:ring-1 focus:ring-brand-teal/30 transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 px-6 py-3.5 rounded-full bg-brand-teal text-white font-semibold text-[0.95rem] transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm flex items-center justify-center gap-2"
          >
            Request Free Website Review
          </button>

          <p className="text-center text-white/40 text-xs mt-4">
            We will get back to you within one business day. No spam, ever.
          </p>
        </form>

        <div className="text-center mt-8">
          <p className="text-white/50 text-sm mb-2">Already know what you want?</p>
          <a
            href="/#contact"
            className="inline-flex items-center gap-1.5 text-brand-teal text-sm font-semibold hover:text-teal-400 transition-colors"
          >
            Book a free mockup instead
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
