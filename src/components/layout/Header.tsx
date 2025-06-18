import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Sun, Moon, Palette, Package, Info } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  onCategoryFilter: (category: string) => void;
  onCustomOrderClick: () => void;
  onOrdersClick: () => void;
  onAboutClick: () => void;
  currentCategory: string;
}

const Header: React.FC<HeaderProps> = ({ 
  cartItemCount, 
  onCartClick, 
  onSearch, 
  searchQuery, 
  onCategoryFilter,
  onCustomOrderClick,
  onOrdersClick,
  onAboutClick,
  currentCategory
}) => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions] = useState([
    'Dining Tables', 'Wooden Chairs', 'Coffee Tables', 'Beds', 'Cabinets'
  ]);
  const { isDark, toggleTheme } = useTheme();

  const visualCategories = [
    { 
      id: 'all', 
      name: 'All Products',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    { 
      id: 'dining-chairs', 
      name: 'Chairs',
      image: 'https://en.roble.store/cdn/shop/collections/Sillas_comedor_madera_maciza_roble_360x.jpg?v=1706020804'
    },
    { 
      id: 'dining-tables', 
      name: 'Dining',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_comedor_nordico_roble_360x.jpg?v=1703667834'
    },
    { 
      id: 'beds', 
      name: 'Beds',
      image: 'https://en.roble.store/cdn/shop/collections/Camas_360x.jpg?v=1702900502'
    },
    { 
      id: 'chest-drawers', 
      name: 'Chest Drawers',
      image: 'https://en.roble.store/cdn/shop/collections/Aparadores_comodas_nordico_roble_360x.jpg?v=1731439722'
    },
    { 
      id: 'bedside-tables', 
      name: 'Bedside Tables',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_noche_360x.jpg?v=1706020751'
    },
    { 
      id: 'cabinets', 
      name: 'TV Cabinet',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_TV_nordico_roble_360x.jpg?v=1731439632'
    },
    { 
      id: 'coffee-tables', 
      name: 'Coffee Tables',
      image: 'https://en.roble.store/cdn/shop/collections/Mesas_de_centro_coffee_nordico_roble_360x.jpg?v=1731439603'
    },
    { 
      id: 'decorations', 
      name: 'Decoration',
      image: 'https://en.roble.store/cdn/shop/collections/Roble_Store_Mr._Wattson_Lampara_LED_5_360x.jpg?v=1702900799'
    },
    { 
      id: 'sofas', 
      name: 'Sofas',
      image: 'https://en.roble.store/cdn/shop/collections/Bancos_nordico_roble_540x.jpg?v=1702900499'
    }
  ];

  const handleCategoryClick = (category: string) => {
    onCategoryFilter(category);
    setIsSideMenuOpen(false);
    
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        const headerHeight = 64;
        const elementPosition = productsSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const handleLogoClick = () => {
    onCategoryFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredSuggestions = searchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Menu Button */}
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Centered Logo - Increased size */}
            <button 
              onClick={handleLogoClick}
              className="absolute left-1/2 transform -translate-x-1/2 text-center hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center">
                <img 
                  src="/2106778703-me.jpg" 
                  alt="Happy Circuit Logo" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </button>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <div className="relative hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                    className="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors font-kinetica"
                    placeholder="Search furniture..."
                  />
                </div>
                
                {/* Search Dropdown */}
                {isSearchFocused && (searchQuery || filteredSuggestions.length > 0) && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2 z-50">
                    {searchQuery && (
                      <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700 font-kinetica">
                        Search for "{searchQuery}"
                      </div>
                    )}
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          onSearch(suggestion);
                          setIsSearchFocused(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-kinetica"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium font-kinetica">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4 px-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors font-kinetica"
                placeholder="Search furniture..."
              />
            </div>
          </div>
        </div>
      </header>

      {/* Side Menu Overlay */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsSideMenuOpen(false)} />
          
          <div className="absolute left-0 top-0 h-full w-80 bg-white dark:bg-gray-900 transition-colors overflow-y-auto">
            {/* Side Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white font-kinetica">Menu</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-kinetica">Browse categories</p>
              </div>
              <button
                onClick={() => setIsSideMenuOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Categories - Vertical Layout with Images */}
            <div className="p-4 space-y-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-kinetica">Categories</h3>
              <div className="space-y-2">
                {visualCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 font-kinetica ${
                      currentCategory === category.id
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=150';
                        }}
                      />
                    </div>
                    <span className="font-medium text-sm flex-1 text-left">{category.name}</span>
                    {currentCategory === category.id && (
                      <div className="w-2 h-2 bg-gray-500 rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsSideMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Info className="h-5 w-5" />
                <span className="text-sm font-medium font-kinetica">About</span>
              </button>
              <button 
                onClick={() => {
                  onCustomOrderClick();
                  setIsSideMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Palette className="h-5 w-5" />
                <span className="text-sm font-medium font-kinetica">Custom Order</span>
              </button>
              <button 
                onClick={() => {
                  onOrdersClick();
                  setIsSideMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Package className="h-5 w-5" />
                <span className="text-sm font-medium font-kinetica">Orders</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;