import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Oak Dining Table',
    price: 899,
    originalPrice: 1199,
    category: 'dining',
    description: 'A beautifully crafted solid oak dining table that combines modern design with timeless elegance. Perfect for family gatherings and dinner parties.',
    features: ['Solid oak construction', 'Seats 6-8 people', 'Scratch-resistant finish', 'Easy assembly'],
    dimensions: { width: '180cm', height: '75cm', depth: '90cm' },
    material: 'Solid Oak Wood',
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Scandinavian Lounge Chair',
    price: 449,
    category: 'seating',
    description: 'Comfortable and stylish lounge chair with clean lines and premium upholstery. A perfect addition to any modern living space.',
    features: ['Premium fabric upholstery', 'Ergonomic design', 'Solid wood frame', 'Available in multiple colors'],
    dimensions: { width: '75cm', height: '80cm', depth: '70cm' },
    material: 'Oak Frame with Fabric Upholstery',
    images: [
      'https://images.pexels.com/photos/586030/pexels-photo-586030.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: '3',
    name: 'Minimalist Bookshelf',
    price: 329,
    category: 'storage',
    description: 'Clean-lined bookshelf that maximizes storage while maintaining a minimal aesthetic. Perfect for displaying books and decorative items.',
    features: ['5 adjustable shelves', 'Wall mounting option', 'Sustainable materials', 'Easy to clean'],
    dimensions: { width: '80cm', height: '180cm', depth: '25cm' },
    material: 'Engineered Wood',
    images: [
      'https://images.pexels.com/photos/1166644/pexels-photo-1166644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: '4',
    name: 'Executive Office Desk',
    price: 649,
    originalPrice: 849,
    category: 'office',
    description: 'Professional office desk with ample workspace and integrated storage solutions. Designed for productivity and style.',
    features: ['Built-in cable management', '3 storage drawers', 'Scratch-resistant surface', 'Adjustable legs'],
    dimensions: { width: '140cm', height: '75cm', depth: '60cm' },
    material: 'Walnut Veneer with Steel Frame',
    images: [
      'https://images.pexels.com/photos/6980564/pexels-photo-6980564.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7947664/pexels-photo-7947664.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.9,
    reviews: 203
  },
  {
    id: '5',
    name: 'Contemporary Sofa Set',
    price: 1299,
    category: 'seating',
    description: 'Luxurious 3-seater sofa with matching accent pillows. Features premium materials and exceptional comfort for daily use.',
    features: ['Premium leather upholstery', 'Memory foam cushions', 'Hardwood frame', 'Stain-resistant fabric'],
    dimensions: { width: '220cm', height: '85cm', depth: '95cm' },
    material: 'Leather with Hardwood Frame',
    images: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: false,
    rating: 4.8,
    reviews: 156
  },
  {
    id: '6',
    name: 'Rustic Coffee Table',
    price: 279,
    category: 'tables',
    description: 'Charming coffee table with rustic charm and modern functionality. Features a lower shelf for additional storage.',
    features: ['Reclaimed wood construction', 'Lower storage shelf', 'Unique grain patterns', 'Easy maintenance'],
    dimensions: { width: '120cm', height: '45cm', depth: '60cm' },
    material: 'Reclaimed Pine Wood',
    images: [
      'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.5,
    reviews: 94
  },
  {
    id: '7',
    name: 'Modern Wardrobe',
    price: 799,
    category: 'storage',
    description: 'Spacious wardrobe with modern sliding doors and organized interior compartments. Perfect for bedroom organization.',
    features: ['Sliding mirror doors', 'Multiple compartments', 'Soft-close hinges', 'LED interior lighting'],
    dimensions: { width: '200cm', height: '220cm', depth: '60cm' },
    material: 'MDF with Mirror Panels',
    images: [
      'https://images.pexels.com/photos/6782342/pexels-photo-6782342.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6782370/pexels-photo-6782370.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.7,
    reviews: 78
  },
  {
    id: '8',
    name: 'Ergonomic Bar Stool',
    price: 159,
    category: 'seating',
    description: 'Modern bar stool with adjustable height and swivel function. Comfortable padding and stylish design for kitchen islands.',
    features: ['Adjustable height', '360° swivel', 'Comfortable padding', 'Chrome base'],
    dimensions: { width: '45cm', height: '60-80cm', depth: '45cm' },
    material: 'PU Leather with Chrome Base',
    images: [
      'https://images.pexels.com/photos/6782351/pexels-photo-6782351.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2747448/pexels-photo-2747448.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    inStock: true,
    rating: 4.4,
    reviews: 42
  }
];

export const categories = [
  { id: 'all', name: 'All Products', count: products.length },
  { id: 'seating', name: 'Seating', count: products.filter(p => p.category === 'seating').length },
  { id: 'tables', name: 'Tables', count: products.filter(p => p.category === 'tables').length },
  { id: 'storage', name: 'Storage', count: products.filter(p => p.category === 'storage').length },
  { id: 'dining', name: 'Dining', count: products.filter(p => p.category === 'dining').length },
  { id: 'office', name: 'Office', count: products.filter(p => p.category === 'office').length },
];