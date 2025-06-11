import React from 'react';
import { Leaf, Shield, Heart, Award, TreePine, Recycle, X, ChevronLeft } from 'lucide-react';

interface AboutProps {
  onClose?: () => void;
  isFullPage?: boolean;
}

const About: React.FC<AboutProps> = ({ onClose, isFullPage = false }) => {
  if (isFullPage) {
    return (
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
                <span className="font-medium font-kinetica">Back</span>
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white font-playfair">
                  HC
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 -mt-1 font-kinetica">
                  Happy Circuit
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Content - Fixed height with internal scrolling */}
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <AboutContent />
        </div>
      </div>
    );
  }

  return null; // Don't show About content on home page anymore
};

const AboutContent: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 py-8 md:py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header - Reduced */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-kinetica">
            Crafting Sustainable Futures
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-kinetica">
            At Happy Circuit, we believe beautiful furniture should nurture both your home and our planet. 
            Every piece tells a story of craftsmanship, sustainability, and genuine care.
          </p>
        </div>

        {/* Main Promise - One Order, One Tree - Compact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-8 shadow-xl border border-gray-100 dark:border-gray-700 mb-8 md:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <TreePine className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white font-kinetica">
                  One Order, One Tree
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-3 md:mb-4 font-kinetica">
                For every piece of furniture you purchase, we plant a tree. It's our commitment to giving back 
                to nature and ensuring that future generations can enjoy the beauty of natural wood just as we do today.
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 p-3 md:p-4 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-green-800 dark:text-green-200 font-semibold text-xs md:text-sm font-kinetica">
                  🌱 Over 5 trees planted and counting!
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Tree planting initiative"
                className="w-full h-48 md:h-64 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute inset-0 bg-green-500/10 rounded-xl" />
            </div>
          </div>
        </div>

        {/* Core Values - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Shield className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-kinetica">
              Transparent Pricing
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-kinetica">
              No hidden costs, no fake discounts, no pressure tactics. What you see is what you pay. 
              Our prices reflect the true value of quality craftsmanship.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Heart className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-kinetica">
              Authentic Craftsmanship
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-kinetica">
              Every piece is handcrafted with love and attention to detail. We believe in creating furniture 
              that becomes part of your family's story for generations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Recycle className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-kinetica">
              Sustainable Materials
            </h3>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-kinetica">
              We source only responsibly harvested Shesham wood and use eco-friendly finishes. 
              Beautiful furniture shouldn't come at the cost of our environment.
            </p>
          </div>
        </div>

        {/* Call to Action - Compact */}
        <div className="text-center mt-8 md:mt-12">
          <div className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 p-1 rounded-xl inline-block">
            <div className="bg-white dark:bg-gray-900 px-4 md:px-6 py-3 md:py-4 rounded-xl">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-kinetica">
                Join Our Sustainable Mission
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mb-3 md:mb-4 font-kinetica">
                Every purchase makes a difference. Choose furniture that cares for your home and our planet.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <Leaf className="h-3 w-3 md:h-4 md:w-4" />
                <span className="font-semibold text-xs md:text-sm font-kinetica">Furniture with Purpose</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;