import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { CartState } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartProps {
  cart: CartState;
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  isOpen,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cart.items.length === 0) return;

    const message = `Hello! I would like to purchase the following items:\n\n${cart.items.map((item, index) => 
      `${index + 1}. ${item.product.name}\n   Price: ₹${item.product.price.toLocaleString('en-IN')}\n   Quantity: ${item.quantity}\n   Subtotal: ₹${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`
    ).join('\n')}\nTotal: ₹${cart.total.toLocaleString('en-IN')}\n\nPlease confirm my order. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 transition-colors">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
            <h2 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-black dark:text-white" />
              <span>Cart ({cart.itemCount})</span>
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {cart.items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-100 dark:border-gray-700 rounded-2xl bg-gray-50 dark:bg-gray-800">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-xl flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full inline-block mt-1">
                        {item.product.category}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mt-2">
                        ₹{item.product.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <div className="flex flex-col items-end space-y-2 flex-shrink-0">
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      
                      <div className="flex items-center space-x-1 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-full transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        
                        <span className="w-6 sm:w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-full transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {cart.items.length > 1 && (
                  <button
                    onClick={onClearCart}
                    className="w-full text-red-500 hover:text-red-700 transition-colors text-sm font-medium py-2"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-100 dark:border-gray-800 p-4 sm:p-6 space-y-4 bg-gray-50 dark:bg-gray-800">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>₹{cart.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Checkout via WhatsApp</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;