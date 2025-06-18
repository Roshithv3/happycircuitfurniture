import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { productService } from '../services/product.service';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onAddToCart, 
  onProductClick, 
  selectedCategory, 
  onCategoryChange 
}) => {
  const categories = productService.getCategories();

  // Visual category data with specific wooden furniture images
  const visualCategories = [
    {
      id: 'all',
      name: 'All Products',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150',
      description: 'Browse all furniture'
    },
    {
      id: 'dining-chairs',
      name: 'Chairs',
      image: 'https://en.roble.store/cdn/shop/collections/Sillas_comedor_madera_maciza_roble_360x.jpg?v=1706020804',
      description: 'Wooden dining chairs'
    },
    {
      id: 'dining-tables',
      name: 'Dining',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_comedor_nordico_roble_360x.jpg?v=1703667834',
      description: 'Wooden dining tables'
    },
    {
      id: 'beds',
      name: 'Beds',
      image: 'https://en.roble.store/cdn/shop/collections/Camas_360x.jpg?v=1702900502',
      description: 'Wooden beds'
    },
    {
      id: 'chest-drawers',
      name: 'Chest Drawers',
      image: 'https://en.roble.store/cdn/shop/collections/Aparadores_comodas_nordico_roble_360x.jpg?v=1731439722',
      description: 'Wooden chest drawers'
    },
    {
      id: 'bedside-tables',
      name: 'Bedside Tables',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_noche_360x.jpg?v=1706020751',
      description: 'Wooden bedside tables'
    },
    {
      id: 'cabinets',
      name: 'TV Cabinet',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_TV_nordico_roble_360x.jpg?v=1731439632',
      description: 'TV cabinets'
    },
    {
      id: 'coffee-tables',
      name: 'Coffee Tables',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_centro_coffee_nordico_roble_360x.jpg?v=1731439603',
      description: 'Coffee tables'
    },
    {
      id: 'decorations',
      name: 'Decoration',
      image: 'https://en.roble.store/cdn/shop/collections/Roble_Store_Mr._Wattson_Lampara_LED_5_360x.jpg?v=1702900799',
      description: 'Wooden decorations'
    },
    {
      id: 'sofas',
      name: 'Sofas',
      image: 'https://en.roble.store/cdn/shop/collections/Bancos_nordico_roble_540x.jpg?v=1702900499',
      description: 'Wooden sofas'
    }
  ];

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => product.inStock);

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered;
  }, [products, selectedCategory]);

  return (
    <section id="products-section" className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-gray-900 transition-colors">
      {/* Header - Added more top padding when category is selected */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 min-h-[80px] ${
        selectedCategory !== 'all' ? 'pt-24' : 'pt-16'
      }`}>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-kinetica">
            {selectedCategory === 'all' ? 'All Products' : 
             visualCategories.find(c => c.id === selectedCategory)?.name || 'Products'}
          </h3>
        </div>
      </div>

      {/* Horizontal Category Filters - Updated with ash/grey colors */}
      <div className="mb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {visualCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedCategory === category.id
                  ? 'border-gray-500 bg-gray-100 dark:bg-gray-700 shadow-lg'
                  : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-500'
              }`}
            >
              <div className="aspect-square relative w-full h-20 sm:h-24">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to a default wooden texture if image fails to load
                    e.currentTarget.src = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150';
                  }}
                />
                <div className={`absolute inset-0 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gray-600/20'
                    : 'bg-gray-900/10 group-hover:bg-gray-900/20'
                }`} />
              </div>
              <div className="p-2 text-center">
                <h4 className={`font-medium text-xs leading-tight font-kinetica ${
                  selectedCategory === category.id
                    ? 'text-gray-900 dark:text-gray-100'
                    : 'text-gray-900 dark:text-gray-100'
                }`}>
                  {category.name}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Filter className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-kinetica">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onProductClick={onProductClick}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;