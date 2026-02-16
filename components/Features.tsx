import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Award, Clock, Heart } from 'lucide-react';
import { Feature } from '../types';

gsap.registerPlugin(ScrollTrigger);

const features: Feature[] = [
  {
    title: "Ingredientes Selecionados",
    description: "Trabalhamos com marcas de confiança como Leite Moça, Nestlé e chocolates nobres para garantir o sabor perfeito.",
    icon: <Award size={32} />,
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    title: "Sempre Fresquinho",
    description: "Tudo é feito diariamente. Não estocamos produtos, garantindo a textura e sabor ideais.",
    icon: <Clock size={32} />,
    span: "col-span-1"
  },
  {
    title: "100% Artesanal",
    description: "Sem conservantes industriais. O sabor real da comida feita em casa.",
    icon: <Leaf size={32} />,
    span: "col-span-1"
  },
  {
    title: "Feito com Amor",
    description: "Cada doce carrega nossa dedicação e carinho, desde o preparo até a embalagem.",
    icon: <Heart size={32} />,
    span: "col-span-1 md:col-span-2"
  },
];

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-card');
      
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="diferenciais" className="py-24 bg-surfaceHighlight transition-colors duration-500" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="font-script text-5xl text-primary mb-4">Nosso Segredo</h2>
          <p className="text-secondary max-w-xl mx-auto font-sans leading-relaxed transition-colors duration-500">
            Não é só açúcar. É uma mistura de paixão, técnica e os melhores ingredientes para criar momentos doces na sua vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(200px,auto)]">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className={`feature-card bg-surface p-8 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 border border-primary/5 flex flex-col justify-between group ${feature.span}`}
            >
              <div className="mb-6 text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-serif text-2xl text-accent mb-3 font-semibold transition-colors duration-500">{feature.title}</h3>
                <p className="font-sans text-secondary text-sm leading-relaxed transition-colors duration-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Visual Filler Image */}
          <div className="col-span-1 md:col-span-2 row-span-2 rounded-3xl overflow-hidden feature-card relative group shadow-sm">
             <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop" 
               alt="Cozinha artesanal" 
               className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute bottom-8 left-8 z-20 bg-surface/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg max-w-xs transition-colors duration-500">
               <span className="text-accent font-script text-2xl">"O amor é o ingrediente principal."</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;