import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageZoomModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  productName: string;
}

const ImageZoomModal: React.FC<ImageZoomModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  productName
}) => {
  if (!isOpen) return null;

  const handleThumbnailClick = (index: number) => {
    // Update current index when thumbnail is clicked
    if (index < currentIndex) {
      for (let i = currentIndex; i > index; i--) {
        onPrevious();
      }
    } else if (index > currentIndex) {
      for (let i = currentIndex; i < index; i++) {
        onNext();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black bg-opacity-95 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="text-white">
            <h3 className="font-medium">{productName}</h3>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} of {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Main Image Container - Takes remaining space */}
      <div className="flex-1 flex items-center justify-center p-4 relative min-h-0">
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Main Image */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Thumbnail Strip - Only show if multiple images */}
      {images.length > 1 && (
        <div className="flex-shrink-0 bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <div className="flex justify-center space-x-2 overflow-x-auto max-w-full">
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex 
                      ? 'border-white' 
                      : 'border-transparent opacity-60 hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      <div 
        className="absolute inset-0 -z-10"
        onClick={onClose}
      />
    </div>
  );
};

export default ImageZoomModal;