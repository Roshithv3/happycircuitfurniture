import React from 'react';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-4">
          <a 
            href="#" 
            className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a 
            href="#" 
            className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a 
            href="#" 
            className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a 
            href="#" 
            className="p-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:shadow-lg transition-all duration-300"
          >
            <Youtube className="h-4 w-4" />
          </a>
        </div>

        {/* Bottom Bar */}
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © 2024 Happy Circuit. Crafted with love for beautiful homes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;