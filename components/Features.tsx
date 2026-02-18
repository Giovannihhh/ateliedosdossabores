import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ChefHat, Wheat, Star } from 'lucide-react';

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
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Text Stagger Animation
      const items = gsap.utils.toArray('.feature-item');
      gsap.from(items, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="diferenciais" className="py-24 bg-surfaceHighlight relative overflow-hidden transition-colors duration-500" ref={containerRef}>
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <div ref={textRef} className="max-w-4xl mx-auto">
          
          {/* Header centered */}
          <div className="feature-item text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-3 block">Nossa Filosofia</span>
            <h2 className="font-serif text-5xl md:text-6xl text-accent mb-6 leading-tight transition-colors duration-500">
              A Arte de <span className="text-primary font-script">Encantar</span>
            </h2>
            <p className="text-secondary text-lg font-light leading-relaxed max-w-2xl mx-auto transition-colors duration-500">
              Não vendemos apenas doces. Entregamos momentos de afeto materializados em açúcar. Descubra o que torna nossa cozinha única.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-item group flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-accent mb-3 transition-colors duration-500">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;