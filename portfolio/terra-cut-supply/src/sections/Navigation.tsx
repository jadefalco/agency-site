import { useState, useEffect } from 'react';
import { FileText, X, Linkedin, Facebook } from 'lucide-react';
import { navigationConfig } from '../config';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface NavigationProps {
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Linkedin,
  Facebook,
};

const Navigation = ({ cartItems, onRemoveFromCart, onUpdateQuantity }: NavigationProps) => {
  if (!navigationConfig.brandName) return null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0B0C0E]/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-[70px] px-6 md:px-12 lg:px-20">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="font-heading font-bold text-xl tracking-wide text-white"
          >
            {navigationConfig.brandName}
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navigationConfig.menuLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-[#B8BDC4] hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Request Quote Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#E46B1C] text-white text-sm font-semibold hover:bg-[#F57D2E] transition-colors"
            >
              Request Quote
            </a>

            {/* Quote Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#B8BDC4] hover:text-white transition-colors"
            >
              <FileText size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs text-white bg-[#E46B1C]">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex flex-col gap-1.5 w-6 p-2 md:hidden"
            >
              <span className="h-[2px] w-full bg-white" />
              <span className="h-[2px] w-full bg-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Menu (Mobile) */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-[#0B0C0E]" />
        <div className="relative h-full flex flex-col">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-[#E46B1C] transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navigationConfig.menuLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="font-heading font-bold text-3xl text-white hover:text-[#E46B1C] transition-colors"
                style={{
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${index * 0.1}s`,
                }}
              >
                {link.label}
              </a>
            ))}
            
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
              className="btn-primary mt-4"
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease 0.3s`,
              }}
            >
              Request Quote
            </a>
          </nav>

          <div className="flex items-center justify-center gap-6 pb-8">
            {navigationConfig.socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon];
              if (!IconComponent) return null;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-[#B8BDC4] hover:text-[#E46B1C] transition-colors"
                  aria-label={social.label}
                >
                  <IconComponent size={20} strokeWidth={1.5} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quote Request Sidebar */}
      <div
        className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsCartOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#14161A] border-l border-white/10 shadow-xl transition-transform duration-500 ${
            isCartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="font-heading font-bold text-xl text-white">Quote Request</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#B8BDC4] hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText size={48} className="text-[#6B7280] mb-4" strokeWidth={1} />
                  <p className="text-[#B8BDC4] text-lg">{navigationConfig.cartEmptyText}</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-8 py-3 bg-[#E46B1C] text-white font-semibold text-sm hover:bg-[#F57D2E] transition-colors"
                  >
                    {navigationConfig.continueShoppingText}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-white/10">
                      <div className="w-24 h-24 bg-[#0B0C0E] overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading font-semibold text-white">{item.name}</h4>
                        <p className="text-[#6B7280] text-sm mt-1">Contact for pricing</p>
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 text-white hover:border-[#E46B1C] transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-white">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-white/20 text-white hover:border-[#E46B1C] transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-[#6B7280] hover:text-red-500 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0B0C0E]">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#B8BDC4]">Items</span>
                  <span className="font-heading font-semibold text-white text-xl">{totalItems}</span>
                </div>
                <button 
                  onClick={() => scrollToSection('#contact')}
                  className="w-full py-4 bg-[#E46B1C] text-white font-semibold tracking-wide hover:bg-[#F57D2E] transition-colors"
                >
                  {navigationConfig.cartCheckoutText}
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3 mt-3 text-[#B8BDC4] text-sm hover:text-white transition-colors"
                >
                  {navigationConfig.continueShoppingText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
