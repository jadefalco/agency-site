import { useEffect, useRef, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { videoSectionConfig } from '../config';

const VideoSection = () => {
  if (!videoSectionConfig.heading) return null;

  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [machineType, setMachineType] = useState('');
  const [brand, setBrand] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to products section
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${videoSectionConfig.backgroundImage})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B0C0E]/70" />
      
      {/* Vignette */}
      <div className="absolute inset-0 vignette-overlay" />

      {/* Search Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <div 
          className={`bg-[#14161A]/90 backdrop-blur-sm border border-white/10 p-8 md:p-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Label */}
          <span
            className={`label-mono mb-4 block transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            {videoSectionConfig.tag}
          </span>

          {/* Heading */}
          <h2
            className={`font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {videoSectionConfig.heading}
          </h2>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch}
            className={`space-y-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8BDC4]" size={18} />
                <input
                  type="text"
                  placeholder="Search part name or number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-[#0B0C0E] border border-white/10 text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#E46B1C] transition-colors"
                />
              </div>
              
              {/* Machine Type Dropdown */}
              <div className="relative min-w-[180px]">
                <select
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  className="w-full px-4 py-4 bg-[#0B0C0E] border border-white/10 text-white appearance-none focus:outline-none focus:border-[#E46B1C] transition-colors cursor-pointer"
                >
                  <option value="">Machine type</option>
                  <option value="excavator">Excavator</option>
                  <option value="skid-steer">Skid Steer</option>
                  <option value="loader">Loader</option>
                  <option value="ctl">Compact Track Loader</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8BDC4] pointer-events-none" size={18} />
              </div>
              
              {/* Brand Dropdown */}
              <div className="relative min-w-[160px]">
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-4 py-4 bg-[#0B0C0E] border border-white/10 text-white appearance-none focus:outline-none focus:border-[#E46B1C] transition-colors cursor-pointer"
                >
                  <option value="">Brand</option>
                  <option value="cat">CAT</option>
                  <option value="john-deere">John Deere</option>
                  <option value="komatsu">Komatsu</option>
                  <option value="kubota">Kubota</option>
                  <option value="bobcat">Bobcat</option>
                  <option value="yanmar">Yanmar</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8BDC4] pointer-events-none" size={18} />
              </div>
              
              {/* Search Button */}
              <button
                type="submit"
                className="btn-primary flex items-center justify-center gap-2 min-w-[140px]"
              >
                <Search size={18} />
                Search
              </button>
            </div>
          </form>

          {/* Helper Links */}
          <div 
            className={`mt-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <p className="text-[#B8BDC4] text-sm">
              <span className="text-[#6B7280]">Popular:</span>{' '}
              <a href="#products" className="hover:text-[#E46B1C] transition-colors">Rubber Tracks</a>
              {' • '}
              <a href="#products" className="hover:text-[#E46B1C] transition-colors">Buckets</a>
              {' • '}
              <a href="#products" className="hover:text-[#E46B1C] transition-colors">Undercarriage</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
