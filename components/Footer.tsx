import React from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surfaceHighlight pt-20 pb-10 border-t border-primary/10 transition-colors duration-500">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="flex flex-col items-center mb-8">
           <span className="font-script text-4xl text-accent transition-colors duration-500">Ateliê dos</span>
           <span className="font-serif text-3xl font-bold tracking-tight text-primary -mt-2 transition-colors duration-500">Sabores</span>
        </div>
        
        <div className="flex space-x-8 mb-12">
          <a href="#" className="p-3 bg-surface rounded-full text-primary shadow-sm hover:text-white hover:bg-primary hover:shadow-md transition-all duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="p-3 bg-surface rounded-full text-primary shadow-sm hover:text-white hover:bg-primary hover:shadow-md transition-all duration-300">
            <Facebook size={24} />
          </a>
          <a href="#" className="p-3 bg-surface rounded-full text-primary shadow-sm hover:text-white hover:bg-primary hover:shadow-md transition-all duration-300">
            <MessageCircle size={24} />
          </a>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 text-center text-sm text-secondary font-medium tracking-wide transition-colors duration-500">
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
          <a href="#" className="hover:text-primary transition-colors">Trabalhe Conosco</a>
        </div>

        <div className="mt-16 text-xs text-secondary/50 transition-colors duration-500">
          &copy; 2026 Ateliê dos Sabores. Feito com amor.
        </div>
      </div>
    </footer>
  );
};

export default Footer;