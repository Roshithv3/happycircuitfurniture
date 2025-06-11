import React, { useState, useEffect } from 'react';
import { ArrowLeft, Package, Truck, Home, Check } from 'lucide-react';

interface TrackingProps {
  orderId: string;
  onBack: () => void;
}

const Tracking: React.FC<TrackingProps> = ({ orderId, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [truckPosition, setTruckPosition] = useState(0);

  const steps = [
    { id: 1, title: 'Order Confirmed', description: 'Your order has been received', icon: Check, completed: true },
    { id: 2, title: 'Processing', description: 'Preparing your items', icon: Package, completed: true },
    { id: 3, title: 'In Transit', description: 'On the way to you', icon: Truck, completed: currentStep >= 2 },
    { id: 4, title: 'Delivered', description: 'Enjoy your new furniture!', icon: Home, completed: currentStep >= 3 }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 3) return prev + 1;
        return prev;
      });
      
      setTruckPosition(prev => {
        if (prev < 100) return prev + 2;
        return prev;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-full transition-colors border border-gray-200 dark:border-gray-700"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Your Order</h1>
            <p className="text-gray-600 dark:text-gray-400">Order #{orderId}</p>
          </div>
        </div>

        {/* Animated Road */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mb-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Delivery Progress</h3>
          
          {/* Road Animation */}
          <div className="relative h-32 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 rounded-lg overflow-hidden mb-6">
            {/* Road markings */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white opacity-50 transform -translate-y-1/2">
              <div className="h-full bg-white animate-pulse"></div>
            </div>
            
            {/* Moving truck */}
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000 ease-linear"
              style={{ left: `${truckPosition}%` }}
            >
              <div className="relative">
                <Truck className="h-8 w-8 text-blue-500 animate-bounce" />
                {/* Exhaust smoke */}
                <div className="absolute -top-2 -left-2 w-2 h-2 bg-gray-400 rounded-full opacity-60 animate-ping"></div>
              </div>
            </div>

            {/* Destination house */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Home className="h-8 w-8 text-purple-500" />
            </div>

            {/* Trees along the road */}
            <div className="absolute bottom-2 left-1/4 w-4 h-6 bg-green-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-2 left-1/2 w-3 h-5 bg-green-500 rounded-full opacity-60"></div>
            <div className="absolute bottom-2 right-1/3 w-4 h-6 bg-green-400 rounded-full opacity-60"></div>
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {truckPosition < 100 ? 'Your order is on its way!' : 'Delivered! 🎉'}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Estimated delivery: {truckPosition < 100 ? '2-3 business days' : 'Today'}
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Order Status</h3>
          
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = step.completed;
              
              return (
                <div key={step.id} className="flex items-center space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted 
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg' 
                      : isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-500 animate-pulse'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className={`font-medium ${isCompleted ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.description}</p>
                    {isActive && (
                      <div className="mt-2">
                        <div className="w-32 h-1 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {isCompleted && (
                    <div className="text-green-500">
                      <Check className="h-5 w-5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 mt-8">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                123 Main Street<br />
                Anytown, ST 12345<br />
                United States
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Estimated Delivery</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;