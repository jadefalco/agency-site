import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send, Clock } from 'lucide-react';
import { contactConfig } from '../config';

const Contact = () => {
  if (!contactConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      {/* Background Image */}
      {contactConfig.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactConfig.backgroundImage})` }}
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0C0E]/85" />
      
      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          {/* Left Side - Info */}
          <div
            className={`lg:w-1/2 text-white transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Label */}
            <span className="label-mono mb-4 block">
              CONTACT
            </span>
            
            {/* Heading */}
            <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl mb-8 leading-none">
              {contactConfig.heading}
            </h2>

            <p className="text-xl text-[#B8BDC4] leading-relaxed mb-12 max-w-md">
              {contactConfig.description}
            </p>

            {/* Contact Info */}
            <div className="space-y-6 mb-12">
              {contactConfig.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E46B1C]/10 flex items-center justify-center">
                    <MapPin size={18} strokeWidth={1.5} className="text-[#E46B1C]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#6B7280] mb-1 font-mono">{contactConfig.locationLabel}</span>
                    <span className="text-white">{contactConfig.location}</span>
                  </div>
                </div>
              )}

              {contactConfig.email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E46B1C]/10 flex items-center justify-center">
                    <Mail size={18} strokeWidth={1.5} className="text-[#E46B1C]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#6B7280] mb-1 font-mono">{contactConfig.emailLabel}</span>
                    <a href={`mailto:${contactConfig.email}`} className="text-white hover:text-[#E46B1C] transition-colors">
                      {contactConfig.email}
                    </a>
                  </div>
                </div>
              )}

              {contactConfig.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#E46B1C]/10 flex items-center justify-center">
                    <Phone size={18} strokeWidth={1.5} className="text-[#E46B1C]" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#6B7280] mb-1 font-mono">{contactConfig.phoneLabel}</span>
                    <a href={`tel:${contactConfig.phone}`} className="text-white hover:text-[#E46B1C] transition-colors">
                      {contactConfig.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            {/* Hours */}
            <div className="flex items-center gap-4 text-[#B8BDC4] text-sm">
              <Clock size={16} className="text-[#6B7280]" />
              <span>Mon–Fri 7am–6pm PST</span>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <div className="bg-[#14161A]/80 backdrop-blur-sm border border-white/10 p-8">
              <h3 className="font-heading font-semibold text-xl text-white mb-6">Request a Quote</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B7280] mb-2 font-mono">
                    {contactConfig.formFields.nameLabel}
                  </label>
                  <input
                    type="text"
                    placeholder={contactConfig.formFields.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full bg-[#0B0C0E] border border-white/10 text-white placeholder:text-[#6B7280] px-4 py-3 focus:outline-none focus:border-[#E46B1C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B7280] mb-2 font-mono">
                    {contactConfig.formFields.emailLabel}
                  </label>
                  <input
                    type="email"
                    placeholder={contactConfig.formFields.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full bg-[#0B0C0E] border border-white/10 text-white placeholder:text-[#6B7280] px-4 py-3 focus:outline-none focus:border-[#E46B1C] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B7280] mb-2 font-mono">
                    {contactConfig.formFields.messageLabel}
                  </label>
                  <textarea
                    placeholder={contactConfig.formFields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    className="w-full bg-[#0B0C0E] border border-white/10 text-white placeholder:text-[#6B7280] px-4 py-3 focus:outline-none focus:border-[#E46B1C] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 py-4 bg-[#E46B1C] text-white font-semibold tracking-wide text-sm transition-all duration-300 hover:bg-[#F57D2E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">{contactConfig.submittingText}</span>
                  ) : isSubmitted ? (
                    <>
                      <span>{contactConfig.submittedText}</span>
                    </>
                  ) : (
                    <>
                      <span>{contactConfig.submitText}</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>

              {isSubmitted && (
                <p className="mt-6 text-green-400 text-center text-sm">
                  {contactConfig.successMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
