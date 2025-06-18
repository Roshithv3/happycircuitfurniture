import React, { useState, useEffect } from 'react';
import { X, Package, Search, Phone, Truck, Home, Clock, CheckCircle, ChevronLeft, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { googleSheetsService } from '../../services/googleSheets.service';
import { Order } from '../../types';
import { WHATSAPP_NUMBER } from '../../constants';

interface OrdersProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick?: (productId: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ isOpen, onClose, onProductClick }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Clear data when modal opens
  useEffect(() => {
    if (isOpen) {
      setMobileNumber('');
      setOrders([]);
      setError(null);
      setExpandedOrder(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchOrders = async () => {
    if (!mobileNumber.trim()) {
      alert('Please enter your mobile number');
      return;
    }

    if (mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedOrders = await googleSheetsService.fetchOrdersByMobile(mobileNumber);
      setOrders(fetchedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string): number => {
    const statusMap: { [key: string]: number } = {
      'confirmed': 0,
      'processing': 1,
      'quality-check': 2,
      'shipped': 3,
      'delivered': 4
    };
    return statusMap[status.toLowerCase()] || 0;
  };

  const getStatusColor = (status: string): string => {
    const colorMap: { [key: string]: string } = {
      'confirmed': 'text-blue-600 dark:text-blue-400',
      'processing': 'text-yellow-600 dark:text-yellow-400',
      'quality-check': 'text-purple-600 dark:text-purple-400',
      'shipped': 'text-orange-600 dark:text-orange-400',
      'delivered': 'text-green-600 dark:text-green-400'
    };
    return colorMap[status.toLowerCase()] || 'text-gray-600 dark:text-gray-400';
  };

  const steps = [
    { id: 0, title: 'Confirmed', icon: CheckCircle },
    { id: 1, title: 'Processing', icon: Package },
    { id: 2, title: 'Quality\nCheck', icon: CheckCircle },
    { id: 3, title: 'Shipped', icon: Truck },
    { id: 4, title: 'Delivered', icon: Home }
  ];

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleImageClick = (imageUrl: string) => {
    // Extract product ID from image URL or use a mapping
    // For now, we'll just close the modal and let parent handle navigation
    if (onProductClick) {
      // This would need to be implemented based on how product IDs are stored
      // onProductClick(productId);
    }
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="space-y-4 md:space-y-6">
            {/* Hero Section */}
            <div className="text-center space-y-2 md:space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Your Orders
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Enter your mobile number to view your order history
              </p>
            </div>

            {/* Search Section */}
            <div className="max-w-md mx-auto space-y-4">
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
                onClick={handleSearchOrders}
                disabled={loading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    <span>Search Orders</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="max-w-md mx-auto bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center">
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </div>
            )}

            {/* Orders List - Amazon Style */}
            {orders.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                  Found {orders.length} order{orders.length > 1 ? 's' : ''}
                </h3>
                
                <div className="space-y-4">
                  {orders.map((order) => {
                    const currentStep = getStatusStep(order.status);
                    const isExpanded = expandedOrder === order.id;
                    
                    return (
                      <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                        {/* Order Header - Always Visible */}
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Order #{order.id}
                                  </h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Placed on {order.orderDate}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Items: {order.items.join(', ')}
                                  </p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Estimated delivery: {order.estimatedDelivery}
                                  </p>
                                </div>
                                
                                {/* Order Images */}
                                {order.images && order.images.length > 0 && (
                                  <div className="flex space-x-2">
                                    {order.images.slice(0, 3).map((image, index) => (
                                      <button
                                        key={index}
                                        onClick={() => handleImageClick(image)}
                                        className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all"
                                      >
                                        <img
                                          src={image}
                                          alt={`Order item ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </button>
                                    ))}
                                    {order.images.length > 3 && (
                                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-600 dark:text-gray-400 font-medium">
                                        +{order.images.length - 3}
                                      </div>
                                    )}
                                  </div>
                                )}
                                
                                <div className="text-right">
                                  {order.totalAmount > 0 && (
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                      ₹{order.totalAmount.toLocaleString('en-IN')}
                                    </p>
                                  )}
                                  <p className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => toggleOrderExpansion(order.id)}
                              className="ml-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Tracking Details */}
                        {isExpanded && (
                          <div className="p-4 bg-gray-50 dark:bg-gray-800/50">
                            <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                              Order Tracking
                            </h5>
                            
                            {/* Horizontal Progress Bar */}
                            <div className="mb-4">
                              <div className="flex justify-between items-center mb-2">
                                {steps.map((step, index) => {
                                  const isCompleted = currentStep > index;
                                  const isActive = currentStep === index;
                                  const Icon = step.icon;
                                  
                                  return (
                                    <div key={step.id} className="flex flex-col items-center flex-1">
                                      <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mb-2 ${
                                        isCompleted 
                                          ? 'bg-green-500 text-white' 
                                          : isActive
                                          ? 'bg-blue-500 text-white'
                                          : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                                      }`}>
                                        <Icon className="h-3 w-3 md:h-4 md:w-4" />
                                      </div>
                                      <span className={`text-xs text-center font-medium leading-tight ${
                                        isCompleted || isActive 
                                          ? 'text-gray-900 dark:text-white' 
                                          : 'text-gray-500 dark:text-gray-400'
                                      }`}>
                                        {step.title.split('\n').map((line, i) => (
                                          <div key={i}>{line}</div>
                                        ))}
                                      </span>
                                      {isActive && (
                                        <div className="flex items-center mt-1">
                                          <Clock className="h-2 w-2 md:h-3 md:w-3 text-blue-500 mr-1" />
                                          <span className="text-xs text-blue-600 dark:text-blue-400">
                                            Current
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                              
                              {/* Progress Line */}
                              <div className="relative">
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 rounded-full" />
                                <div 
                                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                                  style={{ width: `${(currentStep / 4) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Orders Found */}
            {!loading && orders.length === 0 && mobileNumber && !error && (
              <div className="text-center py-8">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                  No orders found for this mobile number
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm">
                  Please check your mobile number or contact support if you believe this is an error.
                </p>
              </div>
            )}

            {/* Help Section */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-6 text-center">
              <h4 className="text-base md:text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 md:mb-3">Need Help?</h4>
              <p className="text-blue-800 dark:text-blue-200 mb-3 md:mb-4 text-xs md:text-sm">
                If you can't find your order or have questions about delivery, our support team is here to help you.
              </p>
              <button
                onClick={() => {
                  const message = `Hello! I need help with my orders. Mobile: ${mobileNumber || 'Not provided'}`;
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
        </div>
      </div>
    </div>
  );
};

export default Orders;