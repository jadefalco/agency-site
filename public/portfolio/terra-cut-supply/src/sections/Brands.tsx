import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { brandsConfig } from '../config';

const Brands = () => {
  if (!brandsConfig.heading) return null;

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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0B0C0E] overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`label-mono mb-4 block transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {brandsConfig.tag}
          </span>
          <h2
            className={`font-heading font-bold text-4xl md:text-5xl text-white mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {brandsConfig.heading}
          </h2>
          <p
            className={`max-w-xl mx-auto text-[#B8BDC4] text-lg transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {brandsConfig.subhead}
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {brandsConfig.brands.map((brand, index) => (
            <a
              key={brand.id}
              href="#products"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`group bg-white text-[#0B0C0E] p-6 md:p-8 flex items-center justify-between hover:bg-[#E46B1C] hover:text-white transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <span className="font-heading font-bold text-xl md:text-2xl">
                {brand.name}
              </span>
              <ArrowRight 
                size={20} 
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" 
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
