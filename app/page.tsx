import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrueNorth Websites | Kelowna Web Design, SEO & Lead Recovery | Okanagan BC",
  description: "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan businesses. High-converting websites that generate more calls, bookings, and customers.",
  alternates: {
    canonical: "https://truenorthwebsites.com/",
  },
  openGraph: {
    title: "TrueNorth Websites | Kelowna Web Design, SEO & Lead Recovery",
    description: "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan businesses. High-converting websites that generate more calls, bookings, and customers.",
    type: "website",
    locale: "en_CA",
    url: "https://truenorthwebsites.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueNorth Websites | Kelowna Web Design, SEO & Lead Recovery",
    description: "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan businesses. High-converting websites that generate more calls, bookings, and customers.",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: `
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "LocalBusiness",
          "name": "TrueNorth Websites",
          "description": "Kelowna web design, local SEO, and AI-powered lead recovery for Okanagan local service businesses.",
          "url": "https://truenorthwebsites.com",
          "email": "websitestruenorth@gmail.com",
          "areaServed": [
            { "@type": "City", "name": "Kelowna" },
            { "@type": "City", "name": "West Kelowna" },
            { "@type": "City", "name": "Vernon" },
            { "@type": "City", "name": "Penticton" },
            { "@type": "City", "name": "Lake Country" },
            { "@type": "City", "name": "Peachland" }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kelowna",
            "addressRegion": "BC",
            "addressCountry": "CA"
          },
          "sameAs": ["https://truenorthwebsites.com"]
        },
        {
          "@type": "Organization",
          "name": "TrueNorth Websites",
          "url": "https://truenorthwebsites.com",
          "logo": "https://truenorthwebsites.com/images/compass-icon.png"
        },
        {
          "@type": "WebSite",
          "name": "TrueNorth Websites",
          "url": "https://truenorthwebsites.com"
        },
        {
          "@type": "Service",
          "name": "Web Design",
          "description": "Custom high-converting website design for local businesses in Kelowna and the Okanagan.",
          "provider": { "@type": "LocalBusiness", "name": "TrueNorth Websites" },
          "areaServed": { "@type": "Place", "name": "Okanagan Valley" }
        },
        {
          "@type": "Service",
          "name": "Local SEO",
          "description": "Local search optimization to help Okanagan businesses rank higher on Google and get found by nearby customers.",
          "provider": { "@type": "LocalBusiness", "name": "TrueNorth Websites" },
          "areaServed": { "@type": "Place", "name": "Okanagan Valley" }
        },
        {
          "@type": "Service",
          "name": "Missed Call Recovery",
          "description": "AI-powered text-back system that instantly recovers missed calls and turns them into booked appointments for local trades businesses.",
          "provider": { "@type": "LocalBusiness", "name": "TrueNorth Websites" },
          "areaServed": { "@type": "Place", "name": "Okanagan Valley" },
          "url": "https://truenorthwebsites.com/missed-call-recovery/"
        }
      ]
    }
    ` }}
      />
      <div dangerouslySetInnerHTML={{ __html: HOME_BODY_HTML }} />
      <script dangerouslySetInnerHTML={{ __html: HOME_SCRIPT }} />
      <a href="#contact" className="mobile-sticky-cta">Get Free Mockup</a>
    </>
  );
}

const HOME_BODY_HTML = `<!-- NAV -->
<nav>
    <div class="nav-container">

        <!-- LOGO -->
        <div class="logo" onclick="window.scrollTo({top:0,behavior:'smooth'})">
            <img src="/images/compass-icon.png" alt="TrueNorth Logo">
            <div style="display:flex; flex-direction:column; justify-content:center;">
                <span style="
                    font-family: 'Playfair Display', serif;
                    font-size:1.6rem;
                    line-height:1.05;
                ">
                    TrueNorth
                </span>

                <span style="
                    font-size:0.75rem;
                    font-weight:600;
                    letter-spacing:1.2px;
                    margin-top:4px;
                    opacity:0.75;
                ">
                    WEBSITES
                </span>
            </div>
        </div>

        <!-- DESKTOP LINKS -->
        <div class="nav-links">
            <a href="#work">Work</a>
            <a href="/missed-call-recovery/">Lead Recovery</a>
            <a href="#why-fail">Why Most Fail</a>
            <a href="#process">Process</a>
            <a href="about.html">About</a>
            <a href="#contact">Contact</a>
        </div>

        <!-- RIGHT SIDE -->
        <div style="display:flex; align-items:center; gap:0.75rem;">
            <a href="#contact" class="nav-cta desktop-only">Get Free Mockup</a>
            <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle menu">
                <svg class="icon-hamburger" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                <svg class="icon-compass" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position:absolute; opacity:0; transform:rotate(-45deg) scale(0.8);"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </button>
        </div>

    </div>

    <!-- MOBILE MENU -->
    <div id="mobile-menu">
        <a href="#work">Work</a>
        <a href="/missed-call-recovery/">Lead Recovery</a>
        <a href="#why-fail">Why Most Fail</a>
        <a href="#process">Process</a>
        <a href="about.html">About</a>
        <a href="#contact">Contact</a>

        <a href="#contact" class="nav-cta" style="text-align:center; margin-top:1rem;">
            Get Free Mockup
        </a>
    </div>
</nav>

<style>
  /* ─── Nav Styles (Dark Hero + Scrolled White) ─── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    transition: background 0.35s ease, box-shadow 0.35s ease;
    background: transparent;
  }
  nav .nav-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav .logo { cursor: pointer; display: flex; align-items: center; gap: 0.75rem; }
  nav .nav-links { display: flex; align-items: center; gap: 2rem; }
  nav .nav-links a {
    color: rgba(255,255,255,0.9) !important;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.3s ease;
  }
  nav .nav-links a:hover { color: #67e8f9; }
  nav .nav-cta {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1.25rem;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.25);
    color: #ffffff;
    border-radius: 9999px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }
  nav .nav-cta:hover {
    background: rgba(255,255,255,0.2);
    border-color: rgba(255,255,255,0.4);
  }
  nav .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff !important;
    position: relative;
    padding: 0.5rem;
    z-index: 101;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
  nav .mobile-menu-btn svg {
    display: block;
    pointer-events: none;
  }
  nav #mobile-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0; right: 0;
    background: rgba(15,23,42,0.98);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    flex-direction: column;
    padding: 1.5rem;
    gap: 1rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    z-index: 999;
    min-width: 200px;
  }
  nav #mobile-menu a {
    display: block;
    padding: 0.5rem 0;
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
  }
  nav #mobile-menu a {
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
  }
  /* Scrolled state */
  nav.scrolled {
    background: rgba(255,255,255,0.95) !important;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  }
  nav.scrolled .nav-links a,
  nav.scrolled .logo span,
  nav.scrolled .logo div,
  nav.scrolled .mobile-menu-btn {
    color: #0f172a !important;
  }
  nav.scrolled .nav-links a:hover { color: #0ea5e9 !important; }
  nav.scrolled .nav-cta {
    background: linear-gradient(135deg, #0ea5e9, #14b8a6) !important;
    border-color: transparent !important;
    color: #ffffff !important;
  }
  nav.scrolled #mobile-menu {
    background: rgba(255,255,255,0.98) !important;
    border-top: 1px solid rgba(0,0,0,0.05) !important;
  }
  nav.scrolled #mobile-menu a { color: #0f172a !important; }
  nav.scrolled .mobile-menu-btn svg {
    stroke: #0f172a !important;
  }
  @media (max-width: 768px) {
    nav .nav-links { display: none; }
    nav .mobile-menu-btn { display: block; }
    nav .nav-cta.desktop-only { display: none; }
    nav .nav-container { padding: 1rem 1.5rem; }
  }

  /* ─── Lazy Load Image Fix ─── */
  img[loading="lazy"] {
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  img.loaded,
  img[loading="lazy"]:not([src]) {
    opacity: 1;
  }
  #work img[loading="lazy"] {
    opacity: 1;
    transition: none;
  }

  .hero-origin {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #0f172a;
    color: #fff;
    padding: 10rem 0 6rem;
  }
  .hero-origin .bg-layer {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-origin .bg-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.6;
    animation: orbFloat 20s ease-in-out infinite;
  }
  .hero-origin .bg-orb-1 {
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, #0ea5e9 0%, transparent 70%);
    top: -15%;
    left: -10%;
    animation-delay: 0s;
  }
  .hero-origin .bg-orb-2 {
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #14b8a6 0%, transparent 70%);
    bottom: -15%;
    right: -10%;
    animation-delay: -7s;
    animation-duration: 25s;
  }
  .hero-origin .bg-orb-3 {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%);
    top: 35%;
    left: 45%;
    animation-delay: -12s;
    animation-duration: 22s;
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -40px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.95); }
  }
  .hero-origin .bg-grain {
    position: absolute;
    inset: 0;
    opacity: 0.035;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    z-index: 1;
    pointer-events: none;
  }
  .hero-origin .bg-fade {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120px;
    background: linear-gradient(to top, #f8fafc 0%, rgba(15,23,42,0.6) 60%, transparent 100%);
    z-index: 2;
    pointer-events: none;
  }
  .hero-origin .hero-container {
    position: relative;
    z-index: 3;
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
  .hero-origin .hero-text {
    max-width: 600px;
  }
  .hero-origin .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 1.25rem;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: rgba(255,255,255,0.9);
    margin-bottom: 2rem;
  }
  .hero-origin .hero-badge .pulse-dot {
    width: 8px;
    height: 8px;
    background: #14b8a6;
    border-radius: 50%;
    box-shadow: 0 0 0 0 rgba(20,184,166,0.7);
    animation: pulseBadge 2s infinite;
  }
  @keyframes pulseBadge {
    0% { box-shadow: 0 0 0 0 rgba(20,184,166,0.7); }
    70% { box-shadow: 0 0 0 10px rgba(20,184,166,0); }
    100% { box-shadow: 0 0 0 0 rgba(20,184,166,0); }
  }
  .hero-origin h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    line-height: 1.08;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1.5rem;
    letter-spacing: -0.02em;
  }
  .hero-origin h1 .accent {
    background: linear-gradient(135deg, #67e8f9 0%, #14b8a6 50%, #0ea5e9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-origin .hero-sub {
    font-size: 1.15rem;
    line-height: 1.65;
    color: rgba(255,255,255,0.75);
    margin-bottom: 2.5rem;
    max-width: 520px;
  }
  .hero-origin .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .hero-origin .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #0ea5e9, #14b8a6);
    color: #fff;
    font-weight: 700;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(14,165,233,0.25);
    border: none;
    font-size: 1rem;
  }
  .hero-origin .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(14,165,233,0.35);
  }
  .hero-origin .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-weight: 600;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  .hero-origin .btn-secondary:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.35);
  }
  .hero-origin .hero-visual {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero-origin .browser-glow {
    position: absolute;
    width: 120%;
    height: 120%;
    background: radial-gradient(circle, rgba(14,165,233,0.25) 0%, rgba(20,184,166,0.15) 40%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
    animation: glowPulse 8s ease-in-out infinite;
  }
  @keyframes glowPulse {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  .hero-origin .browser-mockup {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 640px;
    background: rgba(255,255,255,0.03);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05);
    transform: perspective(1000px) rotateY(-8deg) rotateX(4deg);
    animation: browserFloat 6s ease-in-out infinite;
  }
  @keyframes browserFloat {
    0%, 100% { transform: perspective(1000px) rotateY(-8deg) rotateX(4deg) translateY(0); }
    50% { transform: perspective(1000px) rotateY(-8deg) rotateX(4deg) translateY(-12px); }
  }
  .hero-origin .browser-toolbar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(255,255,255,0.04);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .hero-origin .browser-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  .hero-origin .browser-dot:nth-child(1) { background: #ff5f57; }
  .hero-origin .browser-dot:nth-child(2) { background: #febc2e; }
  .hero-origin .browser-dot:nth-child(3) { background: #28c840; }
  .hero-origin .browser-bar {
    flex: 1;
    height: 24px;
    background: rgba(255,255,255,0.06);
    border-radius: 6px;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0 0.75rem;
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    font-family: monospace;
  }
  .hero-origin .browser-screen {
    position: relative;
    width: 100%;
    aspect-ratio: 16/10;
    overflow: hidden;
    background: #0f172a;
  }
  .hero-origin .browser-screen img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    display: block;

    transform: scale(1.15); /* zoom amount */
    transform-origin: top center;
}
  .hero-origin .trust-bar {
    position: relative;
    z-index: 3;
    grid-column: 1 / -1;
    margin-top: 4rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    flex-wrap: wrap;
  }
  .hero-origin .trust-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255,255,255,0.06);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255,255,255,0.85);
    transition: all 0.3s ease;
  }
  .hero-origin .trust-item:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
  }
  .hero-origin .trust-item svg {
    width: 18px;
    height: 18px;
    color: #67e8f9;
    flex-shrink: 0;
  }
  @media (max-width: 1024px) {
    .hero-origin .hero-container {
      grid-template-columns: 1fr;
      gap: 3rem;
      text-align: center;
    }
    .hero-origin .hero-text {
      max-width: 100%;
      order: 0;
    }
    .hero-origin .hero-visual {
      order: 1;
    }
    .hero-origin .trust-bar {
      order: 2;
      margin-top: 2rem;
    }
    .hero-origin .hero-sub {
      margin-left: auto;
      margin-right: auto;
    }
    .hero-origin .hero-ctas {
      justify-content: center;
    }
    .hero-origin .browser-mockup {
      max-width: 90vw;
      transform: perspective(1000px) rotateY(-4deg) rotateX(2deg);
      animation: browserFloatMobile 6s ease-in-out infinite;
    }
    @keyframes browserFloatMobile {
      0%, 100% { transform: perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(0); }
      50% { transform: perspective(1000px) rotateY(-4deg) rotateX(2deg) translateY(-8px); }
    }
    .hero-origin h1 {
      font-size: clamp(2rem, 6vw, 3rem);
    }
  }
  @media (max-width: 640px) {
    .hero-origin {
      padding: 8rem 0 4rem;
    }
    .hero-origin .hero-container {
      padding: 0 1.5rem;
    }
    .hero-origin .trust-bar {
      gap: 1rem;
      margin-top: 3rem;
    }
    .hero-origin .trust-item {
      font-size: 0.8rem;
      padding: 0.6rem 1rem;
    }
    .hero-origin .btn-primary,
    .hero-origin .btn-secondary {
      width: 100%;
      padding: 1rem;
    }
    .hero-origin .hero-ctas {
      flex-direction: column;
      width: 100%;
    }
  }
</style>

<!-- HERO -->
<section class="hero-origin">

    <!-- Animated Background -->
    <div class="bg-layer">
        <div class="bg-orb bg-orb-1"></div>
        <div class="bg-orb bg-orb-2"></div>
        <div class="bg-orb bg-orb-3"></div>
    </div>
    <div class="bg-grain"></div>
    <div class="bg-fade"></div>

    <div class="hero-container">

        <!-- Left: Text -->
        <div class="hero-text">

            <div class="hero-badge">
                <span class="pulse-dot"></span>
                Kelowna, BC — Okanagan Web Specialist
            </div>

            <h1>
                Kelowna Web Design<br>
                <span class="accent">That Actually Books Customers</span>
            </h1>

            <p class="hero-sub">
                We build modern, high-converting websites for local businesses throughout the Okanagan. No templates. No fluff. Just more calls, bookings, and revenue.
            </p>

            <div class="hero-ctas">
                <a href="#contact" class="btn-primary">Get Free Mockup</a>
                <a href="#work" class="btn-secondary">See Our Work</a>
            </div>

        </div>

        <!-- Right: Browser Mockup -->
        <div class="hero-visual">
            <div class="browser-glow"></div>
            <div class="browser-mockup">
                <div class="browser-toolbar">
                    <div class="browser-dot"></div>
                    <div class="browser-dot"></div>
                    <div class="browser-dot"></div>
                    <div class="browser-bar">okanaganconstruction.ca</div>
                </div>
                <div class="browser-screen">
                    <img src="/images/ok-const-screenshot.png" alt="Website preview showing a modern local business website design" fetchpriority="high">
                </div>
            </div>
        </div>

        <!-- Trust Bar -->
        <div class="trust-bar">

            <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                5-Star Rated Service
            </div>

            <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clip-rule="evenodd"/></svg>
                48-Hour Response
            </div>

            <div class="trust-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497 4.49 4.49 0 01-1.549 3.397 4.49 4.49 0 01-1.307 3.498 4.491 4.491 0 01-3.497 1.307 4.49 4.49 0 01-3.397 1.549 4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.307 4.491 4.491 0 01-1.307-3.497 4.49 4.49 0 011.549-3.397 4.49 4.49 0 011.307-3.498 4.491 4.491 0 013.497-1.307zm5.178 5.602a.75.75 0 10-1.06-1.06l-4.483 4.482-1.941-1.94a.75.75 0 00-1.06 1.06l2.471 2.47a.75.75 0 001.061 0l5.003-5.002z" clip-rule="evenodd"/></svg>
                Trusted by 50+ Local Businesses
            </div>

        </div>

    </div>
</section>

    <!-- WHY MOST WEBSITES FAIL -->
    <section id="why-fail" style="background:#f8fafc; padding:6rem 0;">
        <div class="container">
            <div style="text-align:center; max-width:720px; margin:0 auto 4rem;">
                <p style="color:#0ea5e9; font-weight:700; letter-spacing:2px; text-transform:uppercase; font-size:0.95rem;">The Problem</p>
                <h2 style="font-size:2.75rem; margin-bottom:1rem;">Most local business websites are invisible to customers</h2>
                <p style="font-size:1.25rem; color:#64748b;">They load slowly, look outdated on phones, and give visitors no clear reason to call or book.</p>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px,1fr)); gap:2rem;">
                <div style="background:white; padding:2.5rem; border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.07);">
                    <div style="font-size:3rem; margin-bottom:1rem;">🐢</div>
                    <h3 style="font-size:1.5rem; margin-bottom:0.75rem;">Slow &amp; Frustrating</h3>
                    <p>Visitors leave in seconds if your site takes longer than 3 seconds to load.</p>
                </div>
                <div style="background:white; padding:2.5rem; border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.07);">
                    <div style="font-size:3rem; margin-bottom:1rem;">📱</div>
                    <h3 style="font-size:1.5rem; margin-bottom:0.75rem;">Broken on Mobile</h3>
                    <p>Over 60% of local searches happen on phones. If it doesn't look perfect, you lose the customer.</p>
                </div>
                <div style="background:white; padding:2.5rem; border-radius:24px; box-shadow:0 10px 30px rgba(0,0,0,0.07);">
                    <div style="font-size:3rem; margin-bottom:1rem;">❓</div>
                    <h3 style="font-size:1.5rem; margin-bottom:0.75rem;">No Clear Next Step</h3>
                    <p>No strong call-to-action means visitors don't know what to do next. Even worse, <a href="/missed-call-recovery/" style="color:#0ea5e9; font-weight:600; text-decoration:underline;">missed calls go unanswered</a> and potential customers move on.</p>
                </div>
            </div>
        </div>
    </section>

   <!-- DEMO WORK -->
<section id="work" style="padding:6rem 0; background:#fff;">
    <div class="container">
        <div style="text-align:center; margin-bottom:3.5rem;">
            <p style="color:#0ea5e9; font-weight:700; letter-spacing:2px; text-transform:uppercase;">Demo Projects</p>
            <h2 style="font-size:2.8rem;">See What Your Site Could Look Like</h2>
            <p style="max-width:560px; margin:1rem auto 0; color:#64748b;">Realistic concept designs tailored for Okanagan local service businesses.</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(360px,1fr)); gap:2rem;">
            
            <!-- OKANAGAN CONSTRUCTION -->
<div style="background:white; border-radius:24px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.1); transition:all 0.5s ease;">
    <img src="/images/ok-const-screenshot.png" alt="Okanagan Inspired Construction" style="width:100%; height:260px; object-fit:cover;" loading="lazy">
    <div style="padding:1.75rem;">
        <p style="color:#0ea5e9; font-size:0.9rem; font-weight:600;">LUXURY CONSTRUCTION • KELOWNA</p>
        <h3 style="margin:0.75rem 0 0.5rem; font-size:1.45rem;">Okanagan Inspired Construction</h3>
        <p style="color:#64748b; font-size:0.95rem;">Full custom build with before/after transformations, project galleries, and cinematic hero.</p>
        <a href="https://okanagan-construction-2.vercel.app/" target="_blank" style="color:#0ea5e9; font-weight:600; display:inline-flex; align-items:center; gap:8px; margin-top:1.25rem;">View Live Site →</a>
    </div>
</div>

            <!-- 🔥 NEW TERRA CUT DEMO (REPLACES ROOFING) -->
            <div style="background:white; border-radius:24px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.1); transition:all 0.5s ease;">
                <img src="/images/terra-demo.png" alt="Terra Cut Supply Demo" style="width:100%; height:260px; object-fit:cover; object-position: left center;" loading="lazy">
                <div style="padding:1.75rem;">
                    <p style="color:#0ea5e9; font-size:0.9rem; font-weight:600;">EQUIPMENT & SUPPLY • KELOWNA</p>
                    <h3 style="margin:0.75rem 0 0.5rem; font-size:1.45rem;">Terra Cut Supply Concept</h3>
                    <p style="color:#64748b; font-size:0.95rem;">Modern product-focused layout designed to showcase inventory and drive quote requests.</p>
                    <a href="portfolio/terra-cut-supply/index.html" target="_blank" style="color:#0ea5e9; font-weight:600; display:inline-flex; align-items:center; gap:8px; margin-top:1.25rem;">View Demo →</a>
                </div>
            </div>

            <!-- TUTOR DEMO -->
            <div style="background:white; border-radius:24px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.1); transition:all 0.5s ease;">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=800&amp;q=80" alt="Educator Website Demo" style="width:100%; height:260px; object-fit:cover;" loading="lazy">
                <div style="padding:1.75rem;">
                    <p style="color:#0ea5e9; font-size:0.9rem; font-weight:600;">TUTORING SERVICES</p>
                    <h3 style="margin:0.75rem 0 0.5rem; font-size:1.45rem;">Local Tutor / Educator</h3>
                    <p style="color:#64748b; font-size:0.95rem;">Clean, professional site that ranks locally and converts inquiries.</p>
                    <a href="https://justinenns.com" target="_blank" style="color:#0ea5e9; font-weight:600; display:inline-flex; align-items:center; gap:8px; margin-top:1.25rem;">Visit Live Site →</a>
                </div>
            </div>

        </div>
    </div>
</section>
    <!-- PROCESS -->
    <section id="process" style="background:#0f172a; color:white; padding:6rem 0;">
        <div class="container">
            <div style="text-align:center; margin-bottom:4rem;">
                <p style="color:#67e8f9; font-weight:700; letter-spacing:2px;">OUR PROCESS</p>
                <h2 style="font-size:2.75rem; color:white;">From First Conversation to Live Website in Weeks</h2>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); gap:2rem;">
                <div style="text-align:center; padding:2rem;">
                    <div style="width:72px;height:72px;background:linear-gradient(135deg,#0ea5e9,#14b8a6);color:white;border-radius:9999px;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;">1</div>
                    <h3 style="color:white;margin-bottom:1rem;">Free Mockup &amp; Strategy Call</h3>
                    <p style="color:#cbd5e1;">We review your current site and create a custom concept tailored to your business goals.</p>
                </div>
                <div style="text-align:center; padding:2rem;">
                    <div style="width:72px;height:72px;background:linear-gradient(135deg,#0ea5e9,#14b8a6);color:white;border-radius:9999px;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;">2</div>
                    <h3 style="color:white;margin-bottom:1rem;">Design &amp; Feedback</h3>
<p style="color:#cbd5e1;">You get to see and approve every page. Revisions until you're happy.</p>                </div>
                <div style="text-align:center; padding:2rem;">
                    <div style="width:72px;height:72px;background:linear-gradient(135deg,#0ea5e9,#14b8a6);color:white;border-radius:9999px;margin:0 auto 1.5rem;display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;">3</div>
                    <h3 style="color:white;margin-bottom:1rem;">Launch &amp; Grow</h3>
                    <p style="color:#cbd5e1;">We handle hosting, SEO basics, and training so you can start getting more calls immediately.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- LEAD RECOVERY PROMO -->
    <section class="lead-recovery-section" id="lead-recovery">
        <div class="container">
            <div class="lead-recovery-grid">
                <div>
                    <div class="lead-recovery-badge">
                        <span class="pulse-dot"></span>
                        New AI-Powered Service
                    </div>
                    <h2>
                        Stop Losing Leads to <span class="accent">Missed Calls</span>
                    </h2>
                    <p>
                        When a customer calls and you can't pick up, they rarely leave a voicemail. They just call the next business. Our automated text-back system instantly replies, asks what they need, and books the appointment — even while you're on the job.
                    </p>
                    <ul class="lead-recovery-features" style="list-style:none; padding:0;">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Instantly texts back every missed call
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Captures the customer's need and contact info
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Works with your existing business number
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            No app required — runs 24/7 automatically
                        </li>
                    </ul>
                    <a href="/missed-call-recovery/" class="btn-primary" style="display:inline-flex; align-items:center; gap:10px; background: linear-gradient(135deg, #14b8a6, #0ea5e9);">
                        See How It Works
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                    </a>
                    <p style="margin-top:1rem; font-size:0.85rem; color:rgba(255,255,255,0.45);">
                        Built specifically for Okanagan trades, contractors, and local service businesses.
                    </p>
                </div>
                <div class="lead-recovery-visual">
                    <div class="phone-mockup">
                        <div class="phone-frame">
                            <div class="phone-screen">
                                <div class="phone-status-bar">
                                    <span>9:41</span>
                                    <span style="display:flex; gap:4px; align-items:center;">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9 9 9 0 0 0-9-9zm0 16a7 7 0 0 1-7-7 7 7 0 0 1 7-7 7 7 0 0 1 7 7 7 7 0 0 1-7 7z"/></svg>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                                    </span>
                                </div>
                                <div class="phone-msg bot">
                                    You missed a call from <strong>(250) 555-0142</strong>. Reply to recover this lead.
                                </div>
                                <div class="phone-msg bot">
                                    What do you need help with?<br>1. Plumbing<br>2. Electrical<br>3. Other
                                </div>
                                <div class="phone-msg user">1</div>
                                <div class="phone-msg bot">
                                    Thanks! A plumber will call you back within 30 minutes. — Okanagan Plumbing
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- LOCAL ADVANTAGE -->
    <section class="local-advantage">
        <div class="container">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center;">
                <div>
                    <div style="display:inline-block; padding:8px 20px; background:#ccfbf1; color:#0f766e; border-radius:9999px; font-weight:700; font-size:0.9rem; margin-bottom:1rem;">THE LOCAL ADVANTAGE</div>
                    <h2 style="font-size:2.75rem; line-height:1.1; margin-bottom:1.5rem;">Big Agency Results.<br>Without the Big Agency Hassle.</h2>
                    <p style="color:#475569; font-size:1.1rem;">Most Okanagan businesses get quotes from Vancouver agencies and end up talking to three different project managers.</p>
                    
                    <div style="margin-top:2.5rem; display:flex; flex-direction:column; gap:1.5rem;">
                        <div style="background:white; padding:1.75rem; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.06);">You Get the Actual Designer</div>
                        <div style="background:white; padding:1.75rem; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.06);">I Know Your Competitors</div>
                        <div style="background:white; padding:1.75rem; border-radius:16px; box-shadow:0 10px 30px rgba(0,0,0,0.06);">You Own Everything</div>
                    </div>
                </div>

                <div>
                    <div style="background:white; padding:2rem; border-radius:20px; margin-bottom:2rem; box-shadow:0 15px 40px rgba(0,0,0,0.08);">
                        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                            <span style="font-weight:600; color:#64748b;">Vancouver Agency</span>
                            <span style="background:#fee2e2; color:#b91c1c; padding:2px 12px; border-radius:9999px; font-size:0.8rem;">THEM</span>
                        </div>
                        <ul style="list-style:none; color:#64748b;">
                            <li style="margin-bottom:0.75rem;">❌ \$8,000+ upfront</li>
                            <li style="margin-bottom:0.75rem;">❌ 3-month timeline</li>
                            <li style="margin-bottom:0.75rem;">❌ Account manager only</li>
                        </ul>
                    </div>

                    <div style="background:#0f172a; padding:2rem; border-radius:20px; color:white; box-shadow:0 15px 40px rgba(0,0,0,0.15);">
                        <div style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                            <span style="font-weight:600;">TrueNorth</span>
                            <span style="background:#14b8a6; color:white; padding:2px 12px; border-radius:9999px; font-size:0.8rem;">US</span>
                        </div>
                        <ul style="list-style:none;">
                            <li style="margin-bottom:0.75rem;">✅ \$125/month, no big upfront cost</li>
                            <li style="margin-bottom:0.75rem;">✅ Live in 2–3 weeks</li>
                            <li style="margin-bottom:0.75rem;">✅ You text the designer directly</li>
                            <li>✅ Updates included</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section style="background:#f8fafc; padding:5rem 0;">
    <div class="container" style="max-width:800px; text-align:center;">
        <p style="font-size:1.25rem; font-style:italic; color:#334155; margin-bottom:1.5rem;">
            “My original website had great information, but it didn’t look professional and wasn’t engaging for visitors. TrueNorth Websites completely transformed it — now it looks polished, modern, and actually makes people want to stay and explore. The difference is night and day.”
        </p>
        <p style="font-weight:600; color:#0f172a;">
            — Peter
        </p>
    </div>
</section>
    <!-- PRICING -->
<section style="background:white; padding:6rem 0;">
    <div class="container">
        <div style="text-align:center; margin-bottom:4rem;">
            <h2 style="font-size:2.8rem; margin-bottom:1rem;">Simple Pricing. Real Results.</h2>
            <p style="color:#64748b; max-width:600px; margin:0 auto 1rem;">
                No massive upfront costs. No surprises. Cancel anytime.
            </p>
            <p style="color:#0ea5e9; font-weight:600;">
                Proudly serving Kelowna & the Okanagan
            </p>
        </div>

        <div class="pricing-grid">

            <!-- LAUNCH -->
            <div class="pricing-card">
                <h3 style="font-size:1.5rem; margin-bottom:1.5rem;">Launch</h3>
                <div class="price">\$500</div>
                <p class="price-sub">one-time</p>

                <ul>
                    <li>✔ 1–3 Page Website</li>
                    <li>✔ Clean, Professional Design</li>
                    <li>✔ Mobile Optimized</li>
                    <li>✔ Delivered in 7–10 days</li>
                    <li>❌ No ongoing support</li>
                    <li>❌ No updates included</li>
                </ul>

                <p style="font-size:0.9rem; color:#64748b; margin-bottom:2rem;">
                    Best for businesses that just need a basic site and can manage it themselves.
                </p>

                <a href="#contact" class="btn-primary" style="display:block; background:#0f172a;">Get Started</a>
            </div>

            <!-- STARTER -->
            <div class="pricing-card">
                <h3 style="font-size:1.6rem; margin-bottom:1.5rem;">Starter</h3>
                <div class="price">\$75</div>
                <p class="price-sub">per month</p>
                <p style="font-size:0.9rem; color:#64748b; margin-bottom:2rem;">
    Ongoing monthly plan — ideal for simpler websites without growth-focused features.
</p>

                <ul>
                    <li>✔ 1–3 Page Website</li>
<li>✔ Hosting Included</li>
<li>✔ Ongoing Support</li>
<li>✔ No long-term contract</li>
<li>❌ No advanced SEO or growth strategy</li>
                </ul>

                <p style="font-size:0.9rem; color:#64748b; margin-bottom:2rem;">
                    We handle everything so you don’t have to.
                </p>

                <a href="#contact" class="btn-primary" style="display:block; background:#0f172a;">Get Started</a>
            </div>

            <!-- GROWTH -->
            <div class="pricing-card popular">
                <h3 style="font-size:1.6rem; margin-bottom:0.75rem;">Growth</h3>
                <p style="color:#14b8a6; font-weight:700; margin-bottom:1.5rem;">
                    🔥 Most popular for local businesses
                </p>

                <div class="price">\$125</div>
                <p class="price-sub">per month (12-month build, no large upfront cost)</p>

                <p style="font-size:0.9rem; color:#64748b; margin-bottom:2rem;">
                    Then \$20/month for hosting & support
                </p>
                <p style="font-size:0.9rem; color:#14b8a6; font-weight:600; margin-bottom:1.5rem;">
    Designed for businesses that want more leads — not just a website
</p>

                <ul>
                    <li>✔ Everything in Starter</li>
<li>✔ Up to 10 Pages</li>
<li>✔ Advanced SEO</li>
<li>✔ Strategy to increase calls</li>
<li>✔ Custom features (booking, forms, etc.)</li>
            
           
                </ul>

                <a href="#contact" class="btn-primary" style="display:block;">Get Started</a>
            </div>

        </div>
    </div>
</section>

    <!-- FINAL CTA -->
    <section style="background:linear-gradient(135deg,#0f172a,#1e2937); color:white; padding:7rem 0; text-align:center;">
        <div style="max-width:820px; margin:0 auto; padding:0 2rem;">
            <h2 style="font-size:3rem; margin-bottom:1.5rem;">Want to see what your website could actually look like?</h2>
            <p style="font-size:1.35rem; margin-bottom:2.5rem; opacity:0.9;">I'll create a free, custom mockup for your business — no strings attached.</p>
            <a href="#contact" class="btn-primary" style="font-size:1.25rem; padding:20px 48px;">Get Your Free Mockup Now</a>
        </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" style="background:#f8fafc; padding:6rem 0;">
        <div class="container">
            <div class="contact-form-box" style="max-width:620px; margin:0 auto; background:white; padding:3.25rem 2.25rem; border-radius:28px; box-shadow:0 25px 60px rgba(0,0,0,0.12);">
                <div style="text-align:center; margin-bottom:2.5rem;">
                    <h2 style="font-size:2.4rem;">Let's Build Your New Website</h2>
                    <p style="color:#64748b;">Tell me about your business and I'll reply with a custom concept within 48 hours.</p>
                </div>
                
                <p style="text-align:center; margin-bottom:1.5rem; font-weight:500; color:#475569;">
    No commitment. No pressure. Just a free custom design.
</p>
                <form action="https://formsubmit.co/websitestruenorth@gmail.com" method="POST">
                    <input type="hidden" name="_subject" value="New Free Mockup Request - TrueNorth Websites">
                    <input type="hidden" name="_next" value="https://truenorthwebsites.com/thank-you.html">

                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
                        <div>
                            <label style="display:block; margin-bottom:8px; font-weight:500;">Your Name</label>
                            <input type="text" name="name" required>
                        </div>
                        <div>
                            <label style="display:block; margin-bottom:8px; font-weight:500;">Business Name</label>
                            <input type="text" name="business" required>
                        </div>
                    </div>

                    <div style="margin-bottom:1.25rem;">
                        <label style="display:block; margin-bottom:8px; font-weight:500;">Email Address</label>
                        <input type="email" name="email" required>
                    </div>

                    <div style="margin-bottom:1.25rem;">
                        <label style="display:block; margin-bottom:8px; font-weight:500;">Current Website (if any)</label>
                        <input type="text" name="website">
                    </div>

                    <div style="margin-bottom:2rem;">
                        <label style="display:block; margin-bottom:8px; font-weight:500;">Tell me about your business &amp; goals</label>
                        <textarea name="message" rows="6" placeholder="E.g., We install pools in West Kelowna and want more bookings..."></textarea>
                    </div>

                    <button type="submit" class="btn-primary" style="width:100%; border:none; padding:18px;">Send My Free Mockup Request →</button>

                    <p style="font-size:0.85rem; color:#64748b; margin-top:10px; text-align:center;">
    Takes less than 60 seconds. I personally respond within 48 hours.
</p>
                </form>

                <p style="text-align:center; margin-top:1.75rem; color:#64748b; font-size:0.95rem;">Zero pressure. Zero cost. Just a custom vision for your business.</p>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer style="background:#0f172a; color:#cbd5e1; padding:4rem 0 2rem;">
        <div class="container">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px,1fr)); gap:3rem;">
                <div>
                    <div style="color:white; margin-bottom:1rem; display:flex; align-items:center; gap:12px;">
                        <img src="/images/compass-icon.png" 
                             alt="TrueNorth Logo" 
                             style="height:42px; width:auto;">
                        <span style="font-family:'Playfair Display',serif; font-size:1.8rem;">TrueNorth</span>
                    </div>
                    <p style="max-width:280px; color:#cbd5e1;">
                        Kelowna web designer helping Okanagan local businesses stand out online and get more customers.
                    </p>
                </div>

                <div>
                    <h4 style="color:white; margin-bottom:1rem;">Quick Links</h4>
                    <ul style="list-style:none; display:flex; flex-direction:column; gap:12px;">
                        <li><a href="#work" style="color:#cbd5e1;">Demo Designs</a></li>
                        <li><a href="/missed-call-recovery/" style="color:#cbd5e1;">Missed Call Recovery</a></li>
                        <li><a href="#why-fail" style="color:#cbd5e1;">Why Most Sites Fail</a></li>
                        <li><a href="#process" style="color:#cbd5e1;">Our Process</a></li>
                        <li><a href="about.html" style="color:#cbd5e1;">About</a></li>
                    </ul>
                </div>

                <div>
                    <h4 style="color:white; margin-bottom:1rem;">Contact</h4>
                    <p style="margin-bottom:0.5rem;">
                        <a href="mailto:websitestruenorth@gmail.com" style="color:#67e8f9;">websitestruenorth@gmail.com</a>
                    </p>
                    <p style="margin-bottom:0.5rem;">Kelowna, BC</p>
                    <p style="font-size:0.85rem; color:#94a3b8;">Serving Okanagan businesses in Kelowna, West Kelowna, Vernon, Penticton, Lake Country &amp; Peachland.</p>
                </div>
            </div>

            <div style="border-top:1px solid #334155; margin-top:4rem; padding-top:2rem; text-align:center; font-size:0.9rem; opacity:0.7;">
                © 2026 TrueNorth Websites, a division of Mountain Scale Group • Kelowna, British Columbia • All Rights Reserved
            </div>
        </div>
    </footer>

    <!-- Lazy load image fade-in -->
    

    <!-- Analytics Placeholders -->
    <!-- TODO: Paste Google Analytics 4 script below this comment -->
    <!-- TODO: Paste Meta Pixel script below this comment -->`;

const HOME_SCRIPT = `document.addEventListener('DOMContentLoaded', () => {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('loaded');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '100px' });
            lazyImages.forEach(img => {
                if (img.complete) img.classList.add('loaded');
                else {
                    img.addEventListener('load', () => img.classList.add('loaded'));
                    observer.observe(img);
                }
            });
        });



const nav = document.querySelector('nav');
        const mobileBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMenuOpen = false;

        // Scroll event to change header style
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Hamburger menu toggle with X animation
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

        // Animate hamburger to compass
        function animateToX() {
            const hamburger = mobileBtn.querySelector('.icon-hamburger');
            const compass = mobileBtn.querySelector('.icon-compass');
            if (hamburger) { hamburger.style.opacity = '0'; hamburger.style.transform = 'rotate(45deg) scale(0.8)'; }
            if (compass) { compass.style.opacity = '1'; compass.style.transform = 'rotate(0deg) scale(1)'; }
        }

        // Animate compass back to hamburger
        function animateToHamburger() {
            const hamburger = mobileBtn.querySelector('.icon-hamburger');
            const compass = mobileBtn.querySelector('.icon-compass');
            if (hamburger) { hamburger.style.opacity = '1'; hamburger.style.transform = 'rotate(0deg) scale(1)'; }
            if (compass) { compass.style.opacity = '0'; compass.style.transform = 'rotate(-45deg) scale(0.8)'; }
        }

        // Add transition to button
        mobileBtn.style.transition = 'transform 0.3s ease';

        // Close mobile menu when clicking links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.style.display = 'none';
                isMenuOpen = false;
                animateToHamburger();
            });
        });

        // Close menu if clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
                isMenuOpen = false;
                animateToHamburger();
            }
        });`;