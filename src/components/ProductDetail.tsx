import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Truck, Shield, ChevronLeft, ChevronRight, Plus, Minus, Check, ZoomIn } from 'lucide-react';
import { Product } from '../types';
import { cartService } from '../services/cart.service';
import ImageZoomModal from './ImageZoomModal';

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (product) {
      const unsubscribe = cartService.subscribe(() => {
        const currentQuantity = cartService.getProductQuantity(product.id);
        setCartQuantity(currentQuantity);
      });
      return unsubscribe;
    }
  }, [product]);

  if (!isOpen || !product) return null;

  // Multiple images for each product
  const productImages = [
    product.images[0],
    'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=800'
  ];

  // Touch handling for swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      cartService.removeFromCart(product.id);
    } else {
      cartService.updateQuantity(product.id, newQuantity);
    }
  };

  const handleImageClick = () => {
    setIsZoomOpen(true);
  };

  const handleZoomPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const handleZoomNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleArrowNavigation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }
  };

  return (
    <>
      {/* Full-screen modal overlay */}
      <div className="fixed inset-0 z-50 bg-white dark:bg-gray-900 transition-colors overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={onClose}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="font-medium font-kinetica">Back to Products</span>
              </button>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white font-kinetica">Product Details</h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content - Optimized for laptop screens */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery - Reduced size */}
              <div className="space-y-4">
                <div className="relative aspect-square bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden group max-h-[400px]">
                  <img
                    src={productImages[currentImageIndex]}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                    onClick={handleImageClick}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />
                  
                  {/* Zoom indicator */}
                  <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-3 w-3" />
                  </div>
                  
                  {/* Navigation Arrows - Desktop only */}
                  <button
                    onClick={() => handleArrowNavigation('left')}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleArrowNavigation('right')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {productImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg' 
                            : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Added Feedback */}
                  {isAdded && (
                    <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center transition-all duration-300">
                      <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium font-kinetica">
                        Added to Cart!
                      </div>
                    </div>
                  )}
                </div>

                {/* Thumbnail Images - Smaller */}
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleThumbnailClick(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                        index === currentImageIndex 
                          ? 'border-black dark:border-white shadow-lg' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info - Compact */}
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium mb-1 font-kinetica">
                    {product.category}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-kinetica">{product.name}</h1>
                  
                  {/* Price */}
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white font-kinetica">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 dark:text-gray-400 line-through font-kinetica">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm font-kinetica">
                    {product.description}
                  </p>
                </div>

                {/* Features - Compact */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 font-kinetica">Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm font-kinetica">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications - Compact */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 font-kinetica">Specifications</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-kinetica">Dimensions:</span>
                      <span className="text-gray-900 dark:text-white font-medium font-kinetica">
                        {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-kinetica">Material:</span>
                      <span className="text-gray-900 dark:text-white font-medium font-kinetica">{product.material}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-kinetica">Finish:</span>
                      <span className="text-gray-900 dark:text-white font-medium font-kinetica">Customizable</span>
                    </div>
                  </div>
                </div>

                {/* Current Cart Quantity Display */}
                {cartQuantity > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-green-800 dark:text-green-200 font-medium text-sm font-kinetica">
                        In Cart: {cartQuantity} items
                      </span>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleQuantityChange(cartQuantity - 1)}
                          className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-colors"
                        >
                          <Minus className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </button>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full font-medium min-w-[32px] text-center text-sm font-kinetica">
                          {cartQuantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(cartQuantity + 1)}
                          className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-colors"
                        >
                          <Plus className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quantity and Add to Cart - Compact */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <label className="font-medium text-gray-700 dark:text-gray-300 text-sm font-kinetica">Quantity:</label>
                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-4 py-2 min-w-12 text-center font-medium text-gray-900 dark:text-white text-sm font-kinetica">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105 font-kinetica"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>

                {/* Benefits - Compact */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-kinetica">Free delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-gray-600 dark:text-gray-400 font-kinetica">Quality guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <ImageZoomModal
        images={productImages}
        currentIndex={currentImageIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        onPrevious={handleZoomPrevious}
        onNext={handleZoomNext}
        productName={product.name}
      />
    </>
  );
};

export default ProductDetail;