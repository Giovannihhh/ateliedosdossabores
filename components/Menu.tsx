import React, { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Product } from '../types';
import { UtensilsCrossed, CakeSlice, Cookie, Cherry, IceCream, Plus } from 'lucide-react';
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
              start: "top 95%", // Trigger um pouco antes para mobile
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
    <section id="menu" className="py-12 md:py-24 bg-background relative overflow-hidden transition-colors duration-500" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-[-100px] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-[-100px] w-[400px] h-[400px] bg-surfaceHighlight rounded-full blur-[80px] pointer-events-none transition-colors duration-500"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">Cardápio</span>
          <h2 className="font-serif text-3xl md:text-5xl text-accent mb-3 md:mb-4 font-bold transition-colors duration-500">Nossas Delícias</h2>
          <p className="text-secondary font-light max-w-lg mx-auto text-sm md:text-base transition-colors duration-500">
            Explore nossas categorias e encontre o doce perfeito para o seu momento.
          </p>
        </div>

        {/* Categories Navigation - Updated to wrap items instead of scroll */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16 px-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-surface text-secondary hover:bg-surfaceHighlight hover:text-primary shadow-sm'
              }`}
            >
              <span className="hidden md:inline">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 min-h-[400px]">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="menu-item group cursor-pointer bg-surface p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-transparent hover:border-primary/10 flex flex-row md:flex-col gap-4 md:gap-0 h-auto md:h-full items-center md:items-stretch"
              onClick={() => addToCart(product)}
            >
              {/* Product Image - Quadrada menor no mobile, retangular grande no desktop */}
              <div className="relative w-28 h-28 md:w-full md:h-56 flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl md:mb-5">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Category Badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-primary z-20 shadow-sm">
                  {product.category}
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-grow justify-between w-full h-full md:h-auto">
                <div>
                  <h3 className="font-serif text-lg md:text-xl text-accent mb-1 md:mb-2 group-hover:text-primary transition-colors font-bold duration-500 leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="font-sans text-secondary text-xs md:text-sm font-normal leading-relaxed transition-colors duration-500 mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center mt-auto md:border-t border-primary/5 md:pt-4">
                   <span className="font-script text-xl md:text-2xl text-primary font-bold">{product.price}</span>
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       addToCart(product);
                     }}
                     className="w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full md:rounded-lg bg-surfaceHighlight text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-sm"
                   >
                     <Plus size={18} className="md:hidden" />
                     <span className="hidden md:inline text-xs font-bold uppercase tracking-widest">Adicionar</span>
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
      </div>
    </section>
  );
};

export default Menu;