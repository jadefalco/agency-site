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
              <li><a href="/resources/" className="hover:text-[#67e8f9] transition-colors duration-200">Resources</a></li>
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
                <a href="tel:2508591231" className="hover:text-[#67e8f9] transition-colors duration-200">
                  (250) 859-1231
                </a>
              </li>
              <li>Kelowna, BC</li>
            </ul>
          </div>
        </div>

        {/* Social */}
        <div className="mt-10 md:mt-12 flex flex-col items-center text-center">
          <h4 className="text-white text-sm font-semibold mb-3">
            Follow TrueNorth Websites
          </h4>
          <div className="flex items-center gap-4">
            <a
              href="https://maps.app.goo.gl/CqrfMqaq8kftZJEh9"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TrueNorth Websites on Google Business Profile"
              className="text-white/45 hover:text-[#67e8f9] transition duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 10.3c0 .33-.03.65-.09.95H12v-1.91h2.95c-.1-.48-.31-.92-.6-1.29-.56-.71-1.43-1.17-2.4-1.17-1.67 0-3.02 1.35-3.02 3.02s1.35 3.02 3.02 3.02c.85 0 1.61-.35 2.16-.92l1.42 1.42C14.95 17.57 13.55 18.22 12 18.22c-3.43 0-6.22-2.79-6.22-6.22S8.57 5.78 12 5.78c1.76 0 3.35.73 4.49 1.91l-1.59 1.59c-.46-.44-1.08-.71-1.76-.71-1.44 0-2.61 1.17-2.61 2.61v.02h4.11z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591119887216"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TrueNorth Websites on Facebook"
              className="text-white/45 hover:text-[#67e8f9] transition duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/truenorthsites/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TrueNorth Websites on Instagram"
              className="text-white/45 hover:text-[#67e8f9] transition duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/true-north-a870293b8/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TrueNorth Websites on LinkedIn"
              className="text-white/45 hover:text-[#67e8f9] transition duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/TrueNorthWebs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow TrueNorth Websites on X"
              className="text-white/45 hover:text-[#67e8f9] transition duration-200 hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
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