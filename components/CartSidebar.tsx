import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';

const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const handleCheckout = () => {
    // Format message for WhatsApp
    const header = "Olá! Gostaria de fazer um pedido no Ateliê dos Sabores:\n\n";
    const itemsList = items.map(item => 
      `• ${item.quantity}x ${item.name} (R$ ${(item.priceValue * item.quantity).toFixed(2).replace('.', ',')})`
    ).join('\n');
    const total = `\n\n*Total: R$ ${cartTotal.toFixed(2).replace('.', ',')}*`;
    const couponMsg = couponCode ? `\n\nCupom: ${couponCode}` : "";
    const footer = "\n\nQual o prazo de entrega?";

    const fullMessage = encodeURIComponent(header + itemsList + total + couponMsg + footer);
    // Replace with actual number
    window.open(`https://wa.me/5511999999999?text=${fullMessage}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-[70] transform transition-transform duration-300 ease-out border-l border-primary/10 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary/10 flex justify-between items-center bg-surface">
            <h2 className="font-serif text-2xl text-accent flex items-center gap-2">
              <ShoppingBag className="text-primary" />
              Seu Pedido
            </h2>
            <button 
              onClick={toggleCart}
              className="p-2 hover:bg-black/5 rounded-full text-secondary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-secondary opacity-60">
                <ShoppingBag size={64} className="mb-4 text-primary/30" />
                <p className="text-lg font-medium">Sua sacola está vazia</p>
                <p className="text-sm">Que tal adicionar um docinho?</p>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 bg-surface p-4 rounded-2xl shadow-sm border border-primary/5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-accent font-bold leading-tight mb-1">{item.name}</h3>
                      {/* Fixed: removed extra "R$" since item.price already contains it */}
                      <p className="text-primary font-bold text-sm">{item.price}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-3 bg-background rounded-full px-2 py-1 border border-primary/10">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-secondary hover:text-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-surface border-t border-primary/10 space-y-4">
              
              {/* Coupon Field */}
              <div className="space-y-2">
                 <label className="text-xs text-secondary font-medium uppercase tracking-wider">Cupom de desconto</label>
                 <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Código do cupom"
                      className="flex-1 bg-background border border-primary/20 rounded-lg px-4 py-2 text-sm text-accent placeholder:text-secondary/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                    <button className="bg-surfaceHighlight text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-300">
                      Aplicar
                    </button>
                 </div>
              </div>

              <div className="h-px bg-primary/5 my-2"></div>

              <div className="flex justify-between items-end">
                <span className="text-secondary text-sm font-medium uppercase tracking-wider">Total</span>
                <span className="text-3xl font-script text-primary font-bold">
                  R$ {cartTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              
              <button 
                onClick={handleCheckout}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold uppercase tracking-widest shadow-lg hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2 group"
              >
                Finalizar no WhatsApp
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;