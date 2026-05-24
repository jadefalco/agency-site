"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-5 md:px-6"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="TrueNorth Websites — Home"
          >
            <CompassLogo
              className={`w-8 h-8 transition-colors duration-300 ${
                scrolled || menuOpen ? "text-brand-dark" : "text-white"
              }`}
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-serif text-xl font-bold transition-colors duration-300 ${
                  scrolled || menuOpen ? "text-brand-dark" : "text-white"
                }`}
              >
                TrueNorth
              </span>
              <span
                className={`text-[0.65rem] font-semibold tracking-[1.5px] uppercase mt-0.5 transition-colors duration-300 ${
                  scrolled || menuOpen
                    ? "text-slate-500"
                    : "text-white/70"
                }`}
              >
                Websites
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-brand-teal ${
                  scrolled ? "text-slate-600" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-brand-teal text-white text-sm font-semibold transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm"
            >
              Book My Demo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden relative w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-200 ${
              scrolled || menuOpen
                ? "text-brand-dark hover:bg-slate-100"
                : "text-white hover:bg-white/10"
            }`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="relative w-6 h-6">
              {/* Hamburger icon */}
              <svg
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
              {/* Compass icon */}
              <svg
                className={`absolute inset-0 transition-all duration-300 ${
                  menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 2L14 12L12 22L10 12Z"
                  fill="currentColor"
                  stroke="none"
                />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-slate-200 shadow-lg transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="px-3 py-3 text-base font-medium text-slate-700 rounded-lg hover:bg-slate-50 hover:text-brand-teal transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full bg-brand-teal text-white font-semibold hover:bg-teal-500 transition-colors"
          >
            Book My Demo
          </a>
        </div>
      </div>
    </header>
  );
}

function CompassLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M20 6L24 20L20 34L16 20Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}
