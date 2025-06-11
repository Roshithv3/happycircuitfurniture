import React, { useState } from 'react';
import { Upload, X, MessageCircle, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';

interface CustomOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomOrder: React.FC<CustomOrderProps> = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!description || !contactInfo) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create WhatsApp message with all details
    let message = `Hello! I would like to place a custom furniture order:\n\n` +
      `Description: ${description}\n` +
      `Dimensions: ${dimensions || 'To be discussed'}\n` +
      `Contact: ${contactInfo}\n\n`;

    if (selectedImage) {
      message += `I have a reference image to share. `;
    }

    message += `Please let me know the pricing and timeline for this custom piece.\n\nThank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setSelectedImage(null);
    setImagePreview(null);
    setDescription('');
    setDimensions('');
    setContactInfo('');
    onClose();
  };

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
              <span className="font-medium">Back</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="space-y-4 md:space-y-6">
            {/* Hero Section - Reduced */}
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Create Your Dream Furniture
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Share your vision with us and we'll craft a unique piece tailored to your exact specifications and style preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              {/* Form Section - Compact */}
              <div className="space-y-4 md:space-y-6">
                {/* Image Upload - Compact */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    Upload Reference Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 md:p-6 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full h-32 md:h-48 object-contain mx-auto rounded-xl"
                        />
                        <button
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <ImageIcon className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3 text-xs md:text-sm">
                            Upload an image of your desired furniture design
                          </p>
                          <label className="cursor-pointer bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-xl hover:shadow-lg transition-all inline-flex items-center space-x-2 font-medium text-xs md:text-sm">
                            <Upload className="h-3 w-3 md:h-4 md:w-4" />
                            <span>Choose Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description - Compact */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    Description *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your custom furniture requirements in detail..."
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors resize-none text-xs md:text-sm"
                    rows={4}
                    required
                  />
                </div>

                {/* Dimensions - Compact */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    Preferred Dimensions (optional)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g., 120cm x 60cm x 75cm"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-xs md:text-sm"
                  />
                </div>

                {/* Contact Info - Compact */}
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">
                    Contact Information *
                  </label>
                  <input
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Your name and phone number"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-xs md:text-sm"
                    required
                  />
                </div>

                {/* Submit Button - Compact */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:scale-105 text-xs md:text-sm"
                >
                  <MessageCircle className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Send Custom Order Request</span>
                </button>
              </div>

              {/* Info Section - Compact */}
              <div className="space-y-4 md:space-y-6">
                {/* Process Info - Compact */}
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border border-gray-100 dark:border-gray-700 rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Custom Design Process</h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0">1</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">Submit Your Request</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Share your vision with detailed description and reference images</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-purple-500 text-white rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0">2</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">Design Consultation</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Our team will contact you to discuss details and provide a quote</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 bg-pink-500 text-white rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0">3</div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-xs md:text-sm">Crafting & Delivery</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">We'll craft your piece with care and deliver it to your doorstep</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features - Compact */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">Why Choose Custom?</h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Prices vary according to size and specifications</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Typical delivery time: 2-4 weeks depending on complexity</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">All materials are premium quality Shesham wood</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Completely customizable dimensions and finish</span>
                    </li>
                  </ul>
                </div>

                {/* Contact Card - Compact */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6 text-center">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 md:mb-3">Need Help?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 md:mb-4 text-xs md:text-sm">
                    Have questions about the custom order process? Our team is here to help!
                  </p>
                  <button
                    onClick={() => {
                      const message = `Hello! I have questions about the custom furniture order process.`;
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors text-xs md:text-sm"
                  >
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;