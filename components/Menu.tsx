import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';

gsap.registerPlugin(ScrollTrigger);

const products: Product[] = [
  {
    id: 1,
    name: "Bolo no Pote Ninho com Morango",
    description: "Camadas generosas de bolo fofinho, creme de Leite Ninho original e geleia de morangos frescos.",
    price: "R$ 18,00",
    category: "Favoritos",
    image: "https://images.unsplash.com/photo-1563729760376-7b0a72620f3a?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Brownie Super Chocolatudo",
    description: "Casquinha crocante por fora, denso e úmido por dentro. Feito com chocolate nobre.",
    price: "R$ 12,00",
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1606312619070-d48b706521bf?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Torta de Limão",
    description: "Massa amanteigada crocante, recheio cremoso de limão e merengue tostado.",
    price: "R$ 14,00",
    category: "Tortas",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=2568&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mousse de Maracujá",
    description: "Aerado e azedinho na medida certa, com calda da fruta reduzida no ateliê.",
    price: "R$ 15,00",
    category: "Sobremesas",
    image: "https://images.unsplash.com/photo-1543505697-7c01b9750730?q=80&w=2670&auto=format&fit=crop"
  }
];

const Menu: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.menu-item').forEach((item: any, i) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" className="py-32 bg-background relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-[-100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-surfaceHighlight rounded-full blur-[80px] pointer-events-none transition-colors duration-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Cardápio</span>
            <h2 className="font-serif text-4xl md:text-5xl text-accent mb-4 font-bold transition-colors duration-500">Nossas Delícias</h2>
            <p className="text-secondary font-light max-w-md transition-colors duration-500">
              Uma seleção especial dos doces que mais fazem sucesso por aqui.
            </p>
          </div>
          <a href="#" className="hidden md:block px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-sm font-medium">
            Ver cardápio completo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {products.map((product) => (
            <div key={product.id} className="menu-item group cursor-pointer bg-surface p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10">
              <div className="relative h-[300px] overflow-hidden rounded-2xl mb-6">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500 z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute top-4 left-4 z-20 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs text-accent font-bold uppercase tracking-wider shadow-sm transition-colors duration-500">
                  {product.category}
                </div>
              </div>
              
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-serif text-2xl text-accent mb-2 group-hover:text-primary transition-colors font-bold duration-500">
                    {product.name}
                  </h3>
                  <p className="font-sans text-secondary text-sm max-w-sm font-normal leading-relaxed transition-colors duration-500">
                    {product.description}
                  </p>
                </div>
                <span className="font-script text-2xl text-primary font-bold whitespace-nowrap ml-4">{product.price}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="#" className="inline-block px-8 py-3 bg-primary text-white rounded-full shadow-lg hover:shadow-primary/40 transition-all">
            Ver cardápio completo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;