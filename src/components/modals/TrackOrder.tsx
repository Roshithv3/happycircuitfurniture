import React, { useState, useEffect } from 'react';
import { X, Package, Search, Phone, Truck, Home, MapPin, Clock, CheckCircle, ChevronLeft } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../../constants';

interface TrackOrderProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock tracking data
const trackingData = [
  {
    mobile: '9876543210',
    orderId: 'HC12345678',
    currentStep: 2,
    estimatedDelivery: '2-3 business days',
    items: ['Oak Dining Table', 'Lounge Chair']
  },
  {
    mobile: '8765432109',
    orderId: 'HC87654321',
    currentStep: 3,
    estimatedDelivery: '1-2 business days',
    items: ['Office Desk', 'Bar Stool']
  },
  {
    mobile: '7654321098',
    orderId: 'HC76543210',
    currentStep: 4,
    estimatedDelivery: 'Delivered',
    items: ['Modern Wardrobe']
  }
];

const TrackOrder: React.FC<TrackOrderProps> = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<any>(null);

  // Clear data when modal opens
  useEffect(() => {
    if (isOpen) {
      setMobileNumber('');
      setOrderStatus(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTrackOrder = () => {
    if (!mobileNumber.trim()) {
      alert('Please enter your mobile number');
      return;
    }

    if (mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    // Find order by mobile number
    const foundOrder = trackingData.find(order => order.mobile === mobileNumber);
    
    if (foundOrder) {
      setOrderStatus(foundOrder);
    } else {
      // Create a new order for demo
      setOrderStatus({
        mobile: mobileNumber,
        orderId: `HC${Date.now().toString().slice(-8)}`,
        currentStep: Math.floor(Math.random() * 5),
        estimatedDelivery: '2-3 business days',
        items: ['Custom Furniture Order']
      });
    }
  };

  const steps = [
    { id: 0, title: 'Order Confirmed', description: 'Your order has been received and confirmed', icon: CheckCircle },
    { id: 1, title: 'Preparing', description: 'Crafting your furniture with care', icon: Package },
    { id: 2, title: 'Quality Check', description: 'Ensuring perfect quality standards', icon: CheckCircle },
    { id: 3, title: 'Out for Delivery', description: 'On the way to your location', icon: Truck },
    { id: 4, title: 'Delivered', description: 'Successfully delivered to you', icon: Home }
  ];

  const currentStep = orderStatus?.currentStep || 0;

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="space-y-4 md:space-y-6">
            {/* Hero Section - Reduced */}
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Track Your Order
              </h2>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
              {/* Mobile Number Input - Compact */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full pl-10 md:pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors text-center text-sm md:text-base"
                      />
                    </div>
                    <button
                      onClick={handleTrackOrder}
                      className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base"
                    >
                      <Search className="h-4 w-4" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                {/* Help Section - Compact */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-6 text-center">
                  <h4 className="text-base md:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 md:mb-3">Need Help?</h4>
                  <p className="text-blue-800 dark:text-blue-200 mb-3 md:mb-4 text-xs md:text-sm">
                    If you can't find your order or have questions about delivery, our support team is here to help you.
                  </p>
                  <button
                    onClick={() => {
                      const message = `Hello! I need help tracking my order. Mobile: ${mobileNumber || 'Not provided'}`;
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-xs md:text-sm"
                  >
                    Contact Support
                  </button>
                </div>
              </div>

              {/* Order Status - Compact */}
              <div>
                {orderStatus ? (
                  <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 dark:from-blue-900/20 dark:via-green-900/20 dark:to-yellow-900/20 rounded-xl p-4 md:p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        Order #{orderStatus.orderId}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                        Mobile: +91 {orderStatus.mobile}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                        Items: {orderStatus.items.join(', ')}
                      </p>
                    </div>
                    
                    {/* Progress Steps - Compact */}
                    <div className="space-y-3 md:space-y-4">
                      {steps.map((step, index) => {
                        const isCompleted = currentStep > index;
                        const isActive = currentStep === index;
                        const Icon = step.icon;
                        
                        return (
                          <div
                            key={step.id}
                            className={`flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-xl transition-all duration-300 ${
                              isCompleted 
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                                : isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isCompleted 
                                ? 'bg-green-500 text-white' 
                                : isActive
                                ? 'bg-blue-500 text-white animate-pulse'
                                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                            }`}>
                              <Icon className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            
                            <div className="flex-1">
                              <h4 className={`text-sm md:text-base font-semibold ${
                                isCompleted || isActive 
                                  ? 'text-gray-900 dark:text-white' 
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {step.title}
                              </h4>
                              <p className={`text-xs md:text-sm ${
                                isCompleted || isActive 
                                  ? 'text-gray-600 dark:text-gray-300' 
                                  : 'text-gray-400 dark:text-gray-500'
                              }`}>
                                {step.description}
                              </p>
                              {isActive && (
                                <div className="mt-1 md:mt-2 flex items-center space-x-2">
                                  <Clock className="h-3 w-3 text-blue-500" />
                                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                    In Progress
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            {isCompleted && (
                              <div className="text-green-500">
                                <CheckCircle className="h-4 w-4 md:h-5 md:w-5" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Status Summary - Compact */}
                    <div className="text-center space-y-2 md:space-y-3 mt-4 md:mt-6 p-3 md:p-4 bg-white dark:bg-gray-800 rounded-xl">
                      <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">
                        {currentStep === 0 ? '✅ Order confirmed and processing!' :
                         currentStep === 1 ? '🔨 Crafting your furniture with care!' : 
                         currentStep === 2 ? '🔍 Quality checking in progress!' :
                         currentStep === 3 ? '🚛 Out for delivery!' :
                         currentStep >= 4 ? '🎉 Delivered successfully!' :
                         '📦 Processing your order...'}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">
                        Estimated delivery: {orderStatus.estimatedDelivery}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 transition-all duration-1000 rounded-full"
                          style={{ width: `${(currentStep / 4) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.round((currentStep / 4) * 100)}% Complete
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;