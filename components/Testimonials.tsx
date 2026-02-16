import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-surface border-t border-primary/5 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl text-primary mb-2">Quem prova, ama!</h2>
          <p className="text-secondary transition-colors duration-500">Depoimentos reais dos nossos clientes queridos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "O bolo de pote de ninho com morango é simplesmente divino. O frescor da fruta é perceptível a cada colherada. Insuperável.",
              author: "Mariana Costa",
              role: "Cliente desde 2023"
            },
            {
              text: "Encomendei os brownies para meu casamento como lembrancinha. Foi o comentário da festa. Embalagem linda e sabor perfeito.",
              author: "Felipe Andrade",
              role: "Noivo"
            },
            {
              text: "A torta de limão tem o equilíbrio perfeito entre o doce e o ácido. Nota-se a qualidade dos ingredientes de longe.",
              author: "Carla Dias",
              role: "Amante de Doces"
            }
          ].map((item, i) => (
            <div key={i} className="p-8 bg-background rounded-3xl border border-primary/10 relative group hover:shadow-lg transition-all duration-300">
              <div className="absolute -top-4 left-8 bg-primary text-white p-2 rounded-full shadow-md">
                <Quote size={16} fill="currentColor" />
              </div>
              <div className="flex space-x-1 text-yellow-400 mb-6 mt-2">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <p className="text-secondary italic font-light mb-6 leading-relaxed transition-colors duration-500">"{item.text}"</p>
              <div className="border-t border-primary/10 pt-4">
                <h4 className="text-accent font-serif text-lg font-bold transition-colors duration-500">{item.author}</h4>
                <span className="text-xs uppercase tracking-widest text-primary font-medium">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;