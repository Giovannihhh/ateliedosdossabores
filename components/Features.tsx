import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChefHat, Clock, Wheat, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Curadoria Premium",
    description: "Utilizamos exclusivamente chocolates nobres (Callebaut) e frutas frescas selecionadas a dedo na manhã do preparo.",
    icon: <Star size={24} />
  },
  {
    title: "Processo Artesanal",
    description: "Respeitamos o tempo da confeitaria. Massas que descansam e recheios apurados lentamente no fogo baixo.",
    icon: <ChefHat size={24} />
  },
  {
    title: "Puro & Natural",
    description: "Sabor real de comida de verdade. Zero pré-misturas industriais e zero conservantes químicos.",
    icon: <Wheat size={24} />
  },
  {
    title: "Acabamento de Joia",
    description: "Acreditamos que a beleza abre o apetite. Cada doce é finalizado manualmente como uma pequena obra de arte.",
    icon: <Sparkles size={24} />
  },
];

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Image Animation
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Text Stagger Animation
      const items = gsap.utils.toArray('.feature-item');
      gsap.from(items, {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="diferenciais" className="py-24 bg-surfaceHighlight relative overflow-hidden transition-colors duration-500" ref={containerRef}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Column: Image */}
          <div ref={imageRef} className="w-full lg:w-1/2 relative group">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5]">
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1626202157971-b9cd98065090?q=80&w=2670&auto=format&fit=crop" 
                alt="Confeiteira finalizando um bolo" 
                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-20 max-w-[180px] hidden md:block">
                 <div className="flex items-center gap-1 text-yellow-500 mb-1">
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                   <Star size={14} fill="currentColor" />
                 </div>
                 <p className="font-serif text-accent text-sm font-bold leading-tight">
                   "O melhor brownie que já comi na vida!"
                 </p>
              </div>
            </div>
            
            {/* Pattern Dots behind image */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 pattern-dots opacity-20 z-0"></div>
          </div>

          {/* Right Column: Content */}
          <div ref={textRef} className="w-full lg:w-1/2">
            <div className="feature-item mb-10">
              <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Nossa Filosofia</span>
              <h2 className="font-serif text-5xl md:text-6xl text-accent mb-6 leading-tight transition-colors duration-500">
                A Arte de <span className="text-primary font-script">Encantar</span>
              </h2>
              <p className="text-secondary text-lg font-light leading-relaxed max-w-lg transition-colors duration-500">
                Não vendemos apenas doces. Entregamos momentos de afeto materializados em açúcar. Descubra o que torna nossa cozinha única.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map((feature, idx) => (
                <div key={idx} className="feature-item group">
                  <div className="w-12 h-12 bg-white dark:bg-accent/10 rounded-xl flex items-center justify-center text-primary mb-4 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-accent mb-2 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="feature-item mt-12">
              <button className="flex items-center gap-3 text-accent font-medium hover:text-primary transition-colors group">
                <span className="border-b border-current pb-0.5">Conheça nossa história</span>
                <Clock size={16} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;