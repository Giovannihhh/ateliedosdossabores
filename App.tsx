import React, { useLayoutEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Use a smooth scroll wrapper or native scroll behavior
const App: React.FC = () => {
  
  // Basic smooth scroll for anchor links
  useLayoutEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = (this as HTMLAnchorElement).getAttribute('href');
        if (targetId && targetId !== '#') {
           const targetElement = document.querySelector(targetId);
           targetElement?.scrollIntoView({
             behavior: 'smooth'
           });
        }
      });
    });
  }, []);

  return (
    <div className="bg-background min-h-screen text-accent selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Menu />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default App;