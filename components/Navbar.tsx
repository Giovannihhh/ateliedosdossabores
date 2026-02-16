import React, { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex flex-col leading-tight group">
          <span className="font-script text-3xl text-accent group-hover:text-primary transition-colors">Ateliê dos</span>
          <span className="font-serif text-2xl font-bold tracking-tight text-primary group-hover:text-accent transition-colors -mt-2">Sabores</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {['Menu', 'Sobre', 'Diferenciais', 'Contato'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className={`text-sm uppercase tracking-widest font-medium transition-colors duration-300 ${isScrolled ? 'text-secondary hover:text-primary' : 'text-secondary/80 hover:text-primary'}`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surfaceHighlight transition-colors text-accent"
            aria-label="Alternar tema"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className={`transition-colors ${isScrolled ? 'text-accent hover:text-primary' : 'text-accent hover:text-primary'}`}>
            <ShoppingBag size={20} />
          </button>
          <a 
            href="#menu"
            className="px-6 py-2 bg-primary text-white rounded-full text-xs uppercase tracking-widest hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Encomendar
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-surfaceHighlight transition-colors text-accent"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-primary/10 p-6 flex flex-col space-y-6 md:hidden glass-nav shadow-xl">
           {['Menu', 'Sobre', 'Diferenciais', 'Contato'].map((item) => (
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