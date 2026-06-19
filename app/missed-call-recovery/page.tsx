import Hero from "../sections/Hero";
import Problem from "../sections/Problem";
import HowItWorks from "../sections/HowItWorks";
import Benefits from "../sections/Benefits";
import Pricing from "../sections/Pricing";
import Faq from "../sections/Faq";
import FinalCta from "../sections/FinalCta";
import Footer from "../sections/Footer";
import StickyCta from "../components/StickyCta";

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
            <a href="about.html">About</a>
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
        <a href="about.html">About</a>
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

export default function MissedCallRecoveryPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      <div dangerouslySetInnerHTML={{ __html: NAV_HTML }} />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <script dangerouslySetInnerHTML={{ __html: NAV_SCRIPT }} />
    </>
  );
}