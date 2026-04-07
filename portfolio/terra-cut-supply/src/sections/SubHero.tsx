import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { subHeroConfig } from '../config';

const useCountUp = (end: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [start, end, duration]);

  return count;
};

const useParallax = () => {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        setOffset((progress - 0.5) * 60);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, offset };
};

const SubHero = () => {
  if (!subHeroConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const img1Parallax = useParallax();
  const img2Parallax = useParallax();

  // Build countUp hooks for each stat
  const statCounters = subHeroConfig.stats.map((stat) =>
    useCountUp(stat.value, 2000, statsVisible)
  );

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="subhero"
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 bg-[#0B0C0E] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div
            className={`relative z-10 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <span className="label-mono mb-4 block">
              {subHeroConfig.tag}
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              {subHeroConfig.heading}
            </h2>
            
            {/* Accent Rule */}
            <div 
              className="w-16 h-0.5 bg-[#E46B1C] mb-6"
              style={{
                transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.8s cubic-bezier(0.33, 1, 0.68, 1) 0.4s',
              }}
            />
            
            {subHeroConfig.bodyParagraphs.map((paragraph, index) => (
              <p key={index} className="text-[#B8BDC4] text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
            
            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex items-center gap-2 mb-4"
            >
              Request a quote for tracks
            </a>
            
            {subHeroConfig.linkText && (
              <a
                href={subHeroConfig.linkTarget}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(subHeroConfig.linkTarget)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-[#B8BDC4] font-medium tracking-wide hover:text-[#E46B1C] hover:gap-4 transition-all duration-300 ml-4"
              >
                {subHeroConfig.linkText}
                <ArrowRight size={16} />
              </a>
            )}
          </div>

          {/* Image Side */}
          <div className="relative h-[500px] md:h-[600px] lg:h-[700px]" style={{ perspective: '1200px' }}>
            {/* Main Image */}
            {subHeroConfig.image1 && (
              <div
                ref={img1Parallax.ref}
                className="absolute top-0 right-0 w-[85%] h-[75%] overflow-hidden"
                style={{
                  clipPath: isVisible
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(0% 100% 0% 0%)',
                  transition: 'clip-path 1.4s cubic-bezier(0.77, 0, 0.18, 1) 0.2s, transform 1.4s cubic-bezier(0.33, 1, 0.68, 1) 0.2s',
                  transform: isVisible
                    ? `translateY(${img1Parallax.offset * 0.4}px) rotateY(0deg)`
                    : `translateY(40px) rotateY(-4deg)`,
                  transformOrigin: 'right center',
                }}
              >
                <img
                  src={subHeroConfig.image1}
                  alt="Rubber Tracks"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(1.1) translateY(${img1Parallax.offset * 0.2}px)`,
                    transition: 'transform 0.1s linear',
                  }}
                />
              </div>
            )}

            {/* Secondary Image */}
            {subHeroConfig.image2 && (
              <div
                ref={img2Parallax.ref}
                className="absolute bottom-0 left-0 w-[60%] h-[50%] overflow-hidden border-2 border-[#E46B1C]"
                style={{
                  clipPath: isVisible
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(100% 0% 0% 0%)',
                  transition: 'clip-path 1.4s cubic-bezier(0.77, 0, 0.18, 1) 0.6s, transform 1.4s cubic-bezier(0.33, 1, 0.68, 1) 0.6s',
                  transform: isVisible
                    ? `translateY(${img2Parallax.offset * 0.6}px) rotateX(0deg)`
                    : `translateY(60px) rotateX(4deg)`,
                  transformOrigin: 'bottom center',
                }}
              >
                <img
                  src={subHeroConfig.image2}
                  alt="Rubber Track Product"
                  className="w-full h-full object-cover"
                  style={{
                    transform: `scale(1.08) translateY(${img2Parallax.offset * 0.3}px)`,
                    transition: 'transform 0.1s linear',
                  }}
                />
              </div>
            )}

            {/* Decorative accent line */}
            <div
              className="absolute top-[10%] left-[-5%] w-32 h-32 border border-[#E46B1C]/30"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0.6) rotate(-12deg)',
                transition: 'all 1.2s cubic-bezier(0.33, 1, 0.68, 1) 1s',
              }}
            />

            {/* Floating accent dot */}
            <div
              className="absolute bottom-[15%] right-[-3%] w-3 h-3 bg-[#E46B1C]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0)',
                transition: 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1) 1.4s',
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {subHeroConfig.stats.length > 0 && (
        <div ref={statsRef} className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 mt-20 lg:mt-32">
          <div
            className={`grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4 text-center transition-all duration-700 delay-300 ${
              statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subHeroConfig.stats.map((stat, index) => (
              <div key={index} className={`p-6 ${index < subHeroConfig.stats.length - 1 ? 'border-r border-white/10' : ''}`}>
                <span className="block font-heading font-bold text-4xl md:text-5xl text-[#E46B1C] mb-2">
                  {statCounters[index]}{stat.suffix}
                </span>
                <span className="text-[#B8BDC4] text-sm tracking-wide uppercase font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default SubHero;
