import React, { useState, useEffect } from 'react';
import { ShoppingCart, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { cartService } from '../services/cart.service';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onProductClick }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const unsubscribe = cartService.subscribe(() => {
      const currentQuantity = cartService.getProductQuantity(product.id);
      setQuantity(currentQuantity);
    });
    return unsubscribe;
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  const handleQuantityChange = (e: React.MouseEvent, newQuantity: number) => {
    e.stopPropagation();
    if (newQuantity <= 0) {
      cartService.removeFromCart(product.id);
    } else {
      cartService.updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-900/20 transition-all duration-300 hover:-translate-y-1 group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-50 dark:bg-gray-700 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
          onClick={() => onProductClick(product)}
        />

        {/* Added Feedback */}
        {isAdded && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center transition-all duration-300">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              Added to Cart!
            </div>
          </div>
        )}

        {/* Quantity Badge */}
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
            <Check className="h-3 w-3" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        <div className="mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <h3 
          className="font-semibold text-gray-900 dark:text-white mb-3 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors leading-tight text-sm sm:text-base"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>

        {/* Price and Cart Controls */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            {quantity > 0 ? (
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                <button
                  onClick={(e) => handleQuantityChange(e, quantity - 1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="px-2 text-sm font-medium text-gray-900 dark:text-white min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={(e) => handleQuantityChange(e, quantity + 1)}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAddToCart}
                className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;