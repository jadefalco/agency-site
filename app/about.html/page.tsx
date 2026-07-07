import Header from "@/app/sections/Header";
import Footer from "@/app/sections/Footer";

/**
 * About page.
 *
 * Migrated from the standalone public/about.html static file so it renders
 * the same shared Header/Footer and global typography (globals.css already
 * styles h1/h2 with the site's serif font) as every other route, at the
 * same URL search engines already have indexed. Content below is preserved
 * verbatim from the original file, minus the old inline nav/footer markup
 * which the shared components now provide.
 */

export default function AboutPage() {
  return (
    <>
      <Header />
      <div dangerouslySetInnerHTML={{ __html: ABOUT_BODY_HTML }} />
      <Footer />
      <style dangerouslySetInnerHTML={{ __html: ABOUT_STYLE }} />
    </>
  );
}

const ABOUT_STYLE = `
  .aurora-bg {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      position: relative;
      overflow: hidden;
  }

  .aurora-bg::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(ellipse at 30% 20%, rgba(56, 189, 248, 0.15) 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 60%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
                  radial-gradient(ellipse at 40% 80%, rgba(20, 184, 166, 0.12) 0%, transparent 50%);
      animation: about-aurora 20s ease-in-out infinite;
  }

  @keyframes about-aurora {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(2%, 2%) rotate(1deg); }
      66% { transform: translate(-1%, 1%) rotate(-1deg); }
  }

  .aurora-content {
      position: relative;
      z-index: 10;
  }

  .glass-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 1.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }

  .gradient-text {
      background: linear-gradient(135deg, #38bdf8 0%, #22d3ee 50%, #14b8a6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
  }

  .compact-section {
      padding-top: 3rem;
      padding-bottom: 3rem;
  }
`;

const ABOUT_BODY_HTML = `
    <section class="aurora-bg pt-32 pb-16">
        <div class="aurora-content max-w-5xl mx-auto px-6">
            <div class="text-center mb-12">
                <p class="uppercase tracking-widest text-sm text-cyan-400 mb-3">About Us</p>
                <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                    The Story Behind <span class="gradient-text">True North</span>
                </h1>
                <p class="text-xl text-slate-300 max-w-2xl mx-auto">
                    Helping local businesses stand out, build trust, and turn visitors into customers.
                </p>
            </div>
        </div>
    </section>

    <section class="aurora-bg compact-section -mt-8 pb-20">
        <div class="aurora-content max-w-4xl mx-auto px-6">
            <div class="glass-card p-8 md:p-12">
                <div class="flex flex-col md:flex-row gap-8 items-start">
                    <div class="flex-shrink-0 mx-auto md:mx-0">
                        <img src="/Justin photo.JPEG" alt="Justin - TrueNorth Websites" class="w-32 h-32 rounded-2xl shadow-xl object-cover ring-4 ring-cyan-500/20">
                    </div>
                    <div class="space-y-4 text-slate-700 leading-relaxed">
                        <p class="text-lg text-slate-900 font-semibold border-l-4 border-cyan-500 pl-4">
                            Most businesses don't fail because they have a bad service.
                            They fail because people simply don't notice them.
                        </p>
                        <p>
                            I learned that lesson early. Growing up, I watched my dad start a
                            business with less than $1,000 and grow it into a million-dollar
                            company. The secret wasn't complicated — he understood the power
                            of marketing and the importance of standing out.
                        </p>
                        <p>
                            Later, I married into another entrepreneurial family whose products
                            are sold across Canada. Being surrounded by successful business
                            owners showed me how much the right message, presentation,
                            and customer experience matter.
                        </p>
                        <p>
                            Today, I'm pursuing my <strong>Master's of Data Analytics</strong>,
                            which has sharpened my natural tendency to analyze and optimize.
                            I've applied that analytical mindset to hundreds of websites,
                            identifying exactly what captures attention and causes visitors
                            to click away. The patterns are clear — and often surprisingly simple
                            to fix.
                        </p>
                        <p>
                            Over time I realized something important: your website is often the
                            <strong>first impression</strong> people get of your business.
                            If it looks outdated, confusing, or generic, customers move on.
                        </p>
                        <p class="text-slate-900 font-medium">
                            That's why I started <span class="text-cyan-600 font-bold">TrueNorth Websites</span> —
                            to help businesses build modern websites that actually attract
                            customers and make them stand out.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-slate-900 compact-section">
        <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-10">
                <p class="uppercase tracking-widest text-sm text-cyan-400 mb-3">My Approach</p>
                <h2 class="text-4xl font-bold text-white">What I Focus On</h2>
            </div>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="glass-card p-6 text-center">
                    <div class="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/></svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2 text-slate-900">Modern Design</h3>
                    <p class="text-slate-600 text-sm">
                        Clean, professional websites that immediately build trust
                        and make a strong first impression.
                    </p>
                </div>
                <div class="glass-card p-6 text-center">
                    <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2 text-slate-900">Lead Generation</h3>
                    <p class="text-slate-600 text-sm">
                        Every page is structured to guide visitors toward
                        contacting you or requesting a quote.
                    </p>
                </div>
                <div class="glass-card p-6 text-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <h3 class="text-lg font-semibold mb-2 text-slate-900">Local SEO</h3>
                    <p class="text-slate-600 text-sm">
                        Optimized so customers in your area can find
                        your business when they search online.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="compact-section bg-gradient-to-br from-cyan-600 to-teal-700">
        <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Stand Out?</h2>
            <p class="text-cyan-100 text-lg mb-8">Let's build a website that actually brings you customers.</p>
            <a href="/#contact" class="inline-block px-8 py-4 rounded-full bg-white text-cyan-700 font-bold text-lg hover:bg-cyan-50 transition-all shadow-xl hover:shadow-2xl">Get a Free Review</a>
        </div>
    </section>
`;
