import React, { useState, useEffect } from 'react';
import { ArrowRight, TreePine, Palette } from 'lucide-react';

interface HeroProps {
  onAboutClick?: () => void;
  onCustomOrderClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAboutClick, onCustomOrderClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const carouselImages = [
    '/Landing_Page_3200_1200_01_1.webp',
    'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Handle touch events for swipe
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
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }
    if (isRightSwipe) {
      setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
  };

  const scrollToProducts = () => {
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
  };

  const handleShopCollectionClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    scrollToProducts();
  };

  return (
    <section className="relative bg-white dark:bg-gray-900 transition-colors overflow-hidden pt-16">
      {/* Background Image Container */}
      <div className="relative h-[70vh] md:h-[80vh]">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${carouselImages[currentImageIndex]})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover'
          }}
        />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-6xl mx-auto px-4 text-center text-white space-y-6 md:space-y-8">
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6 font-kinetica">
                Beautiful Furniture
                <span className="block">
                  for Happy Homes
                </span>
              </h1>
              <p className="text-sm md:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-kinetica">
                Discover our curated collection of premium wooden furniture designed to bring joy and comfort to every corner of your home.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleShopCollectionClick}
                onTouchEnd={handleShopCollectionClick}
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-1 hover:scale-105 font-kinetica touch-manipulation min-h-[56px] active:scale-95 cursor-pointer select-none"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  WebkitUserSelect: 'none'
                }}
              >
                <span>Shop Collection</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 touch-manipulation ${
                index === currentImageIndex 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Touch area for mobile swipe - positioned behind content */}
        <div 
          className="absolute inset-0 z-5 md:hidden"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
      </div>

      {/* Two Feature Boxes - Below the image */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* One Order, One Tree */}
          <button 
            onClick={onAboutClick}
            className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group touch-manipulation"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-3 font-kinetica">One Order, One Tree</h3>
            <p className="text-green-700 dark:text-green-300 text-sm leading-relaxed font-kinetica">
              For every piece you purchase, we plant a tree. Join us in creating a sustainable future while furnishing your home.
            </p>
            <div className="mt-4 text-green-600 dark:text-green-400 text-xs font-kinetica">
              Click to learn more
            </div>
          </button>

          {/* Share Your Idea */}
          <button 
            onClick={onCustomOrderClick}
            className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group touch-manipulation"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Palette className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-200 mb-3 font-kinetica">Share Your Idea</h3>
            <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed font-kinetica">
              Share the picture in your mind - we are here to give it life. Custom furniture crafted just for you.
            </p>
            <div className="mt-4 text-purple-600 dark:text-purple-400 text-xs font-kinetica">
              Click to start custom order
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;