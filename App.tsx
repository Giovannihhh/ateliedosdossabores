import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="bg-background min-h-screen text-accent selection:bg-primary selection:text-white">
        <Navbar />
        <CartSidebar />
        <main>
          <Hero />
          <Menu />
          <Features />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;