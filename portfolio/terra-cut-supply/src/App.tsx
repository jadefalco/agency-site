import { useState, useCallback } from 'react';
import { siteConfig } from './config';
import type { Product } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import SubHero from './sections/SubHero';
import VideoSection from './sections/VideoSection';
import Products from './sections/Products';
import MachineTypes from './sections/MachineTypes';
import Brands from './sections/Brands';
import Features from './sections/Features';
import Testimonial from './sections/Testimonial';
import FinalCTA from './sections/FinalCTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  }, []);

  const handleRemoveFromCart = useCallback((id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0C0E]" lang={siteConfig.language || undefined}>
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      <Navigation
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />
      
      <main>
        <Hero />
        <SubHero />
        <VideoSection />
        <Products onAddToCart={handleAddToCart} />
        <MachineTypes />
        <Brands />
        <Features />
        <Testimonial />
        <FinalCTA />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
