import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';

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
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Overlay reduzido para 20% para clarear o vídeo (antes era 40%) */}
        <div className="absolute inset-0 bg-black/20 z-10"></div> 
        
        {/* Gradiente restrito apenas à parte inferior (h-32) em vez da tela toda (inset-0), removendo o efeito "lavado" no vídeo */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10 transition-colors duration-500"></div>
        
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://github.com/Giovannihhh/sites/raw/refs/heads/main/7186835_Chocolate_Melting_1280x720.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center">
        <div className="flex justify-center mb-4">
           <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-medium tracking-wide shadow-sm border border-white/10 transition-colors duration-500">
             <Heart size={14} fill="currentColor" className="text-primary" /> Feito com amor
           </span>
        </div>
        
        <h1 
          ref={titleRef}
          className="text-white mb-6 drop-shadow-lg"
        >
          <span className="block font-script text-6xl md:text-7xl lg:text-8xl mb-2 text-primary drop-shadow-sm">Ateliê dos</span>
          <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white transition-colors duration-500">Sabores</span>
        </h1>
        
        <p 
          ref={subRef}
          className="font-sans text-gray-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed bg-black/20 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg transition-colors duration-500"
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
    </section>
  );
};

export default Hero;