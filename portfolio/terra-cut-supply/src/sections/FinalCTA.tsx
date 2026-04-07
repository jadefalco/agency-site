import { useEffect, useRef, useState } from 'react';
import { Clock } from 'lucide-react';
import { finalCTAConfig } from '../config';

const FinalCTA = () => {
  if (!finalCTAConfig.heading) return null;

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
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${finalCTAConfig.backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0C0E]/80" />
      
      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 
          className={`font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 whitespace-pre-line transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {finalCTAConfig.heading}
        </h2>

        {/* Subhead */}
        <p 
          className={`text-[#B8BDC4] text-lg md:text-xl max-w-2xl mx-auto mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {finalCTAConfig.subhead}
        </p>

        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            {finalCTAConfig.ctaText}
          </a>
        </div>

        {/* Trust Line */}
        <div 
          className={`flex items-center justify-center gap-2 mt-8 text-[#B8BDC4] text-sm transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <Clock size={14} />
          <span>{finalCTAConfig.trustLine}</span>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
