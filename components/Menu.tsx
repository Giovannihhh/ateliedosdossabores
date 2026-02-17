import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';
import { UtensilsCrossed, CakeSlice, Cookie, Cherry, IceCream } from 'lucide-react';
import { useCart } from '../CartContext';

gsap.registerPlugin(ScrollTrigger);

// Categorias definidas para o filtro
const categories = [
  { id: 'todos', label: 'Todos', icon: <UtensilsCrossed size={16} /> },
  { id: 'bolos', label: 'Bolos de Pote', icon: <CakeSlice size={16} /> },
  { id: 'brownies', label: 'Brownies', icon: <Cookie size={16} /> },
  { id: 'tortas', label: 'Tortas', icon: <Cherry size={16} /> },
  { id: 'doces', label: 'Doces Finos', icon: <IceCream size={16} /> }
];

// Produtos atualizados com categoryId e priceValue, e imagens funcionais do Unsplash
const products: (Product & { categoryId: string })[] = [
  {
    id: 1,
    name: "Bolo no Pote Ninho com Morango",
    description: "Camadas generosas de bolo fofinho, creme de Leite Ninho original e geleia de morangos frescos.",
    price: "R$ 18,00",
    priceValue: 18.00,
    category: "Favoritos",
    categoryId: "bolos",
    image: "https://images.unsplash.com/photo-1563729760374-f3b14f828741?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Brownie Super Chocolatudo",
    description: "Casquinha crocante por fora, denso e úmido por dentro. Feito com chocolate nobre.",
    price: "R$ 12,00",
    priceValue: 12.00,
    category: "Brownies",
    categoryId: "brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Torta de Limão Suíço",
    description: "Massa amanteigada crocante, recheio cremoso de limão e merengue tostado.",
    price: "R$ 14,00",
    priceValue: 14.00,
    category: "Tortas",
    categoryId: "tortas",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Mousse de Maracujá Real",
    description: "Aerado e azedinho na medida certa, com calda da fruta reduzida no ateliê.",
    price: "R$ 15,00",
    priceValue: 15.00,
    category: "Doces",
    categoryId: "doces",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Red Velvet no Pote",
    description: "O clássico veludo vermelho com recheio cremoso de cream cheese e toque de baunilha.",
    price: "R$ 20,00",
    priceValue: 20.00,
    category: "Bolos",
    categoryId: "bolos",
    image: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Brigadeiro Gourmet Belga",
    description: "Kit com 4 unidades. Chocolate Callebaut ao leite enrolado em granulado nobre.",
    price: "R$ 16,00",
    priceValue: 16.00,
    category: "Doces",
    categoryId: "doces",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?q=80&w=800&auto=format&fit=crop"
  }
];

const Menu: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('todos');
  const { addToCart } = useCart();

  useLayoutEffect(() => {
    // Reset animations when category changes to allow re-animating elements
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.menu-item').forEach((item: any, i) => {
        gsap.fromTo(item, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [activeCategory]); // Re-run animation when category changes

  const filteredProducts = activeCategory === 'todos' 
    ? products 
    : products.filter(p => p.categoryId === activeCategory);

  return (
    <section id="menu" className="py-24 bg-background relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-[-100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-surfaceHighlight rounded-full blur-[80px] pointer-events-none transition-colors duration-500"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Cardápio</span>
          <h2 className="font-serif text-4xl md:text-5xl text-accent mb-4 font-bold transition-colors duration-500">Nossas Delícias</h2>
          <p className="text-secondary font-light max-w-lg mx-auto transition-colors duration-500">
            Explore nossas categorias e encontre o doce perfeito para o seu momento.
          </p>
        </div>

        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-surface text-secondary hover:bg-surfaceHighlight hover:text-primary shadow-sm'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div key={product.id} className="menu-item group cursor-pointer bg-surface p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10 flex flex-col h-full">
              <div className="relative h-[250px] overflow-hidden rounded-2xl mb-6 flex-shrink-0">
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
              
              <div className="flex flex-col flex-grow justify-between px-2">
                <div>
                  <h3 className="font-serif text-xl text-accent mb-2 group-hover:text-primary transition-colors font-bold duration-500">
                    {product.name}
                  </h3>
                  <p className="font-sans text-secondary text-sm font-normal leading-relaxed transition-colors duration-500 mb-4">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-auto border-t border-primary/5 pt-4">
                   <span className="font-script text-2xl text-primary font-bold whitespace-nowrap">{product.price}</span>
                   <button 
                     onClick={() => addToCart(product)}
                     className="text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors"
                   >
                     Adicionar
                   </button>
                </div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20 text-secondary opacity-50">
              <p>Nenhum produto encontrado nesta categoria.</p>
            </div>
          )}
        </div>
        
        <div className="mt-16 text-center">
           <a href="#" className="inline-block px-8 py-3 bg-white border border-primary text-primary rounded-full hover:bg-primary hover:text-white shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 text-sm font-bold uppercase tracking-widest">
            Baixar Cardápio em PDF
          </a>
        </div>
      </div>
    </section>
  );
};

export default Menu;