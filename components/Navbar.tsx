import React, { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../CartContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic text classes based on scroll state
  const textColorClass = isScrolled ? 'text-accent' : 'text-white';
  const subTextColorClass = isScrolled ? 'text-primary' : 'text-primary';
  const linkColorClass = isScrolled ? 'text-secondary hover:text-primary' : 'text-white/90 hover:text-white';
  const iconColorClass = isScrolled ? 'text-accent hover:text-primary' : 'text-white hover:text-primary';

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex flex-col leading-tight group">
          <span className={`font-script text-3xl transition-colors ${textColorClass} group-hover:text-primary`}>Ateliê dos</span>
          <span className={`font-serif text-2xl font-bold tracking-tight transition-colors -mt-2 ${subTextColorClass} group-hover:${isScrolled ? 'text-accent' : 'text-white'}`}>Sabores</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {['Menu', 'Diferenciais', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${linkColorClass}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={toggleCart}
            className={`transition-colors relative ${iconColorClass}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <a 
            href="#menu"
            className="px-6 py-2 bg-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg border border-transparent"
          >
            Encomendar
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button 
            onClick={toggleCart}
            className={`transition-colors relative ${iconColorClass}`}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className={`${iconColorClass}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-primary/10 p-6 flex flex-col space-y-6 md:hidden glass-nav shadow-xl">
           {['Menu', 'Diferenciais', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-lg font-serif text-accent text-center hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;