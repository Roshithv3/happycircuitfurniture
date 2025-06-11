import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Hero from './components/ui/Hero';
import About from './components/pages/About';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import CustomOrder from './components/modals/CustomOrder';
import TrackOrder from './components/modals/TrackOrder';
import Footer from './components/layout/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import { cartService } from './services/cart.service';
import { productService } from './services/product.service';
import { Product, CartState } from './types';

function App() {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0, itemCount: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Subscribe to cart changes
  useEffect(() => {
    const unsubscribe = cartService.subscribe((newCart) => {
      setCart(newCart);
    });
    return unsubscribe;
  }, []);

  // Get products based on search query and category filter
  const products = searchQuery 
    ? productService.searchProducts(searchQuery)
    : categoryFilter === 'all'
    ? productService.getAllProducts()
    : productService.getProductsByCategory(categoryFilter);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    cartService.addToCart(product, quantity);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCategoryFilter('all'); // Reset category filter when searching
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
    setSearchQuery(''); // Reset search when filtering by category
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors font-kinetica">
        <Header
          cartItemCount={cart.itemCount}
          onCartClick={() => setIsCartOpen(true)}
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onCategoryFilter={handleCategoryFilter}
          onCustomOrderClick={() => setIsCustomOrderOpen(true)}
          onTrackOrderClick={() => setIsTrackOrderOpen(true)}
          onAboutClick={() => setIsAboutOpen(true)}
          currentCategory={categoryFilter}
        />
        
        <main>
          {/* Show hero only when not searching and on home and not on about page */}
          {!searchQuery && categoryFilter === 'all' && !isAboutOpen && (
            <Hero 
              onAboutClick={() => setIsAboutOpen(true)}
              onCustomOrderClick={() => setIsCustomOrderOpen(true)}
            />
          )}
          
          {/* Show About page when requested */}
          {isAboutOpen && (
            <About onClose={() => setIsAboutOpen(false)} isFullPage={true} />
          )}
          
          {/* Show products when not on about page */}
          {!isAboutOpen && (
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
              onProductClick={handleProductClick}
              selectedCategory={categoryFilter}
              onCategoryChange={handleCategoryFilter}
            />
          )}
        </main>

        {!isAboutOpen && <Footer />}

        {/* WhatsApp Chat Widget */}
        <WhatsAppChat />

        {/* Cart Sidebar */}
        <Cart
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={(productId, quantity) => cartService.updateQuantity(productId, quantity)}
          onRemoveItem={(productId) => cartService.removeFromCart(productId)}
          onClearCart={() => cartService.clearCart()}
        />

        {/* Product Detail Modal */}
        <ProductDetail
          product={selectedProduct}
          isOpen={isProductDetailOpen}
          onClose={() => {
            setIsProductDetailOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={handleAddToCart}
        />

        {/* Custom Order Modal */}
        <CustomOrder
          isOpen={isCustomOrderOpen}
          onClose={() => setIsCustomOrderOpen(false)}
        />

        {/* Track Order Modal */}
        <TrackOrder
          isOpen={isTrackOrderOpen}
          onClose={() => setIsTrackOrderOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;