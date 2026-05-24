import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { machineTypesConfig } from '../config';

const MachineTypes = () => {
  if (!machineTypesConfig.heading) return null;

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
      id="machine-types"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${machineTypesConfig.backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0C0E]/75" />
      
      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Heading */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="label-mono mb-4 block">
              {machineTypesConfig.tag}
            </span>
            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-tight whitespace-pre-line">
              {machineTypesConfig.heading}
            </h2>
            
            {/* Accent Rule */}
            <div 
              className="w-20 h-0.5 bg-[#E46B1C] mt-8"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.6s',
              }}
            />
          </div>

          {/* Right - Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {machineTypesConfig.machineTypes.map((machine, index) => (
              <a
                key={machine.id}
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative aspect-square overflow-hidden bg-[#14161A] border border-white/5 hover:border-[#E46B1C]/30 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${machine.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-[#0B0C0E]/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="font-heading font-semibold text-lg text-white group-hover:text-[#E46B1C] transition-colors">
                    {machine.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[#B8BDC4] text-sm mt-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Shop parts</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MachineTypes;
