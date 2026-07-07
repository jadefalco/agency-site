"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared site header/nav.
 *
 * Markup, classes, and styling are ported 1:1 from the nav duplicated in
 * page.tsx, kelowna-web-design/page.tsx, and missed-call-recovery/page.tsx
 * (scroll-aware background, hamburger/compass mobile toggle). Scroll and
 * menu-open state are handled with React instead of the inline <script> those
 * pages use, since this component is reused across routes.
 */

const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/kelowna-web-design/", label: "Web Design" },
  { href: "/missed-call-recovery/", label: "Lead Recovery" },
  { href: "/#why-fail", label: "Why Most Fail" },
  { href: "/#process", label: "Process" },
  { href: "/resources/", label: "Resources" },
  { href: "/about.html", label: "About" },
  { href: "/#contact", label: "Contact" },
];

interface HeaderProps {
  /**
   * The nav's unscrolled state renders white text on a transparent
   * background, which only reads on the dark hero the homepage and service
   * pages have. Pages without a dark hero (e.g. Resources) should pass
   * `solid` so the light/dark-text "scrolled" look is used from the start.
   */
  solid?: boolean;
}

export default function Header({ solid = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const showScrolledStyle = solid || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className={showScrolledStyle ? "scrolled" : undefined}>
        <div className="nav-container">
          <a href="/" className="logo" style={{ textDecoration: "none" }}>
            <img src="/images/compass-icon.png" alt="TrueNorth Logo" />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", lineHeight: 1.05 }}>
                TrueNorth
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1.2px", marginTop: "4px", opacity: 0.75 }}>
                WEBSITES
              </span>
            </div>
          </a>

          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a href="/#contact" className="nav-cta desktop-only">
              Get Free Mockup
            </a>
            <button
              type="button"
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              style={{
                position: "relative",
                width: 32,
                height: 32,
                padding: 0,
                overflow: "hidden",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  opacity: menuOpen ? 0 : 1,
                  transform: menuOpen ? "rotate(90deg) scale(0.6)" : "rotate(0deg) scale(1)",
                }}
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.6)",
                }}
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" style={{ display: menuOpen ? "flex" : "none" }}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="nav-cta"
            style={{ textAlign: "center", marginTop: "1rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Get Free Mockup
          </a>
        </div>
      </nav>
      <style dangerouslySetInnerHTML={{ __html: NAV_STYLE }} />
    </>
  );
}

const NAV_STYLE = `
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
`;
