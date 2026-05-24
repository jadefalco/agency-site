"use client";

import { useState, useEffect } from "react";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <a
          href="#contact"
          className="flex items-center justify-center w-full px-5 py-3.5 rounded-full bg-brand-teal text-white font-semibold text-base transition-all duration-200 hover:bg-teal-500 hover:-translate-y-px shadow-sm"
        >
          Book My Demo
        </a>
      </div>
    </div>
  );
}
