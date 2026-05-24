export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/8">
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CompassLogo className="w-6 h-6 text-white/80" />
              <span className="font-serif text-lg font-bold text-white">
                TrueNorth
              </span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Web design and lead recovery tools for local service businesses
              throughout the Okanagan.
            </p>
          </div>

          {/* Service Area */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">
              Service Area
            </h4>
            <ul className="space-y-1.5 text-white/45 text-sm">
              <li>Kelowna</li>
              <li>West Kelowna</li>
              <li>Vernon</li>
              <li>Penticton</li>
              <li>Lake Country</li>
              <li>Peachland</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-1.5 text-white/45 text-sm">
              <li>
                <a
                  href="mailto:websitestruenorth@gmail.com"
                  className="hover:text-brand-teal transition-colors duration-200"
                >
                  websitestruenorth@gmail.com
                </a>
              </li>
              <li>Kelowna, BC</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} TrueNorth Websites, a division of
            Mountain Scale Group. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/35">
            <a
              href="#"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#"
              className="hover:text-white/60 transition-colors duration-200"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
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
      <path d="M20 6L24 20L20 34L16 20Z" fill="currentColor" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}
