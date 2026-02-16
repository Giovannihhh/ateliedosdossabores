import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5
      })
      .from(subRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8")
      .from(btnRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6");
      
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Adjusted overlay for Dark Mode compatibility using utility classes */}
        <div className="absolute inset-0 bg-white/20 dark:bg-black/50 z-10 transition-colors duration-500"></div> 
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 transition-colors duration-500"></div>
        <img 
          src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=2574&auto=format&fit=crop" 
          alt="Mesa de doces delicados" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="flex justify-center mb-4">
           <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-sm text-primary text-sm font-medium tracking-wide shadow-sm transition-colors duration-500">
             <Heart size={14} fill="currentColor" /> Feito com amor
           </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-accent mb-6"
        >
          <span className="block font-script text-6xl md:text-7xl lg:text-8xl mb-2 text-primary drop-shadow-sm">Ateliê dos</span>
          <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-accent transition-colors duration-500">Sabores</span>
        </h1>
        
        <p 
          ref={subRef}
          className="font-sans text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed bg-white/40 dark:bg-black/40 backdrop-blur-sm p-4 rounded-xl transition-colors duration-500"
        >
          Doces artesanais que abraçam o paladar. Ingredientes frescos, receitas de família e aquele toque especial de carinho em cada pedacinho.
        </p>
        
        <div className="flex justify-center">
          <a 
            ref={btnRef}
            href="#menu"
            className="group relative px-8 py-4 bg-primary text-white rounded-full font-sans font-semibold uppercase tracking-widest text-sm shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Ver Nossas Delícias</span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-50">
        <ArrowDown className="text-primary" size={24} />
      </div>
    </section>
  );
};

export default Hero;