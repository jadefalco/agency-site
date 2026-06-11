export default function Footer() {
  return (
    <footer className="bg-[#0f172a] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 md:px-6 py-10 md:py-12">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Logo + tagline */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img
                src="/images/compass-icon.png"
                alt="TrueNorth Logo"
                className="h-[42px] w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="flex flex-col justify-center">
                <span
                  className="text-[1.8rem] text-white leading-[1.05]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  TrueNorth
                </span>
                <span className="text-[0.75rem] font-semibold tracking-[1.2px] mt-1 text-white/75">
                  WEBSITES
                </span>
              </div>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Web design and lead recovery tools for local service businesses
              throughout the Okanagan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1.5 text-white/45 text-sm">
              <li><a href="/" className="hover:text-[#67e8f9] transition-colors duration-200">Home</a></li>
              <li><a href="/kelowna-web-design/" className="hover:text-[#67e8f9] transition-colors duration-200">Kelowna Web Design</a></li>
              <li><a href="/missed-call-recovery/" className="hover:text-[#67e8f9] transition-colors duration-200">Lead Recovery</a></li>
              <li><a href="/#work" className="hover:text-[#67e8f9] transition-colors duration-200">Our Work</a></li>
              <li><a href="/#contact" className="hover:text-[#67e8f9] transition-colors duration-200">Contact</a></li>
              <li><a href="/about.html" className="hover:text-[#67e8f9] transition-colors duration-200">About</a></li>
            </ul>
          </div>

          {/* Service Area + Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-3">Service Area</h4>
            <ul className="space-y-1.5 text-white/45 text-sm mb-6">
              <li>Kelowna</li>
              <li>West Kelowna</li>
              <li>Vernon</li>
              <li>Penticton</li>
              <li>Lake Country</li>
              <li>Peachland</li>
            </ul>
            <h4 className="text-white text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-1.5 text-white/45 text-sm">
              <li>
                <a href="mailto:websitestruenorth@gmail.com" className="hover:text-[#67e8f9] transition-colors duration-200">
                  websitestruenorth@gmail.com
                </a>
              </li>
              <li>Kelowna, BC</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/35 text-xs">
            © {new Date().getFullYear()} TrueNorth Websites, a division of
            Mountain Scale Group. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/35">
            <a href="#" className="hover:text-white/60 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}