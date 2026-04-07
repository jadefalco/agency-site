import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { testimonialConfig } from '../config';

const Testimonial = () => {
  if (!testimonialConfig.quote) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[70vh] flex items-center justify-center py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${testimonialConfig.backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0C0E]/80" />
      
      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <div 
          className={`bg-[#14161A]/80 backdrop-blur-sm border border-white/10 p-8 md:p-12 lg:p-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Quote Icon */}
          <div 
            className={`inline-flex items-center justify-center w-12 h-12 bg-[#E46B1C]/10 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <Quote size={24} className="text-[#E46B1C]" />
          </div>

          {/* Quote Text */}
          <blockquote 
            className={`font-heading font-semibold text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            "{testimonialConfig.quote}"
          </blockquote>

          {/* Attribution */}
          <cite 
            className={`not-italic text-[#B8BDC4] text-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {testimonialConfig.attribution}
          </cite>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
