import { Product } from '../types';

export const products: Product[] = [
  // Dining Tables - Keep only one sample
  {
    id: '1',
    name: 'Rustic Oak Dining Table',
    price: 89900,
    category: 'dining-tables',
    description: 'Handcrafted rustic oak dining table with natural wood grain. Perfect for family gatherings.',
    features: ['Solid oak construction', 'Seats 6-8 people', 'Natural wood finish'],
    dimensions: { width: '180cm', height: '75cm', depth: '90cm' },
    material: 'Shesham Wood',
    images: ['https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/0670d0d4-084f-4c12-915d-a2d67552dafa_tvafri.jpg',
            'https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/set_27_1__2_tvqjvd.jpg',
             'https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/1f708814-849f-4daa-81ef-699ee042b658_f3gqob.jpg'
            
        ],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },

  // Dining Chairs - Keep only one sample
  {
    id: '11',
    name: 'Ratten Chair',
    price: 12900,
    category: 'dining-chairs',
    description: 'Classic Windsor style dining chair with spindle back design.',
    features: ['Windsor style', 'Spindle back', 'Comfortable seating'],
    dimensions: { width: '45cm', height: '85cm', depth: '50cm' },
    material: 'Shesham Wood',
    images:['https://res.cloudinary.com/dzdkpm0od/image/upload/v1749796346/closeup_set_131_v2_peter_natural_02_1_jeokuc.jpg','https://res.cloudinary.com/dzdkpm0od/image/upload/220030_4_hwosd0.jpg'],
    inStock: true,
    rating: 4.7,
    reviews: 234
  },

  // Beds - Keep only one sample
  {
    id: '21',
    name: 'Platform Bed Frame',
    price: 89900,
    category: 'beds',
    description: 'Modern platform bed frame with low profile design.',
    features: ['Platform design', 'Low profile', 'No box spring needed'],
    dimensions: { width: '180cm', height: '35cm', depth: '200cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.8,
    reviews: 267
  },

  // Chest Drawers - Keep only one sample
  {
    id: '31',
    name: 'Traditional Chest of Drawers',
    price: 45900,
    category: 'chest-drawers',
    description: 'Classic chest of drawers with five spacious drawers.',
    features: ['5 drawers', 'Traditional style', 'Ample storage'],
    dimensions: { width: '80cm', height: '120cm', depth: '40cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.7,
    reviews: 189
  },

  // Coffee Tables - Keep only one sample
  {
    id: '41',
    name: 'Rustic Coffee Table',
    price: 27900,
    category: 'coffee-tables',
    description: 'Rustic coffee table with storage shelf and natural finish.',
    features: ['Storage shelf', 'Rustic design', 'Natural finish'],
    dimensions: { width: '120cm', height: '45cm', depth: '60cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.6,
    reviews: 234
  },

  // Cabinets - Keep only one sample
  {
    id: '51',
    name: 'Display Cabinet',
    price: 65900,
    category: 'cabinets',
    description: 'Elegant display cabinet with glass doors and LED lighting.',
    features: ['Glass doors', 'LED lighting', 'Display shelves'],
    dimensions: { width: '120cm', height: '200cm', depth: '35cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/2177482/pexels-photo-2177482.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.8,
    reviews: 189
  },

  // Bedside Tables - Keep only one sample
  {
    id: '61',
    name: 'Classic Bedside Table',
    price: 18900,
    category: 'bedside-tables',
    description: 'Classic bedside table with drawer and open shelf.',
    features: ['Drawer storage', 'Open shelf', 'Classic design'],
    dimensions: { width: '40cm', height: '60cm', depth: '35cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.6,
    reviews: 234
  },

  // Sofas - Keep only one sample
  {
    id: '71',
    name: 'Chesterfield Sofa',
    price: 129900,
    category: 'sofas',
    description: 'Classic Chesterfield sofa with button tufting and rolled arms.',
    features: ['Button tufting', 'Rolled arms', 'Classic design'],
    dimensions: { width: '220cm', height: '85cm', depth: '90cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.9,
    reviews: 267
  },

  // Decorations - Keep only one sample
  {
    id: '81',
    name: 'Wooden Wall Art',
    price: 8900,
    category: 'decorations',
    description: 'Handcrafted wooden wall art with geometric patterns.',
    features: ['Handcrafted', 'Geometric patterns', 'Wall mounted'],
    dimensions: { width: '60cm', height: '40cm', depth: '3cm' },
    material: 'Shesham Wood',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'],
    inStock: true,
    rating: 4.5,
    reviews: 89
  }
];

class ProductService {
  getAllProducts(): Product[] {
    return products.filter(product => product.inStock);
  }

  getProductById(id: string): Product | undefined {
    return products.find(product => product.id === id && product.inStock);
  }

  getProductsByCategory(category: string): Product[] {
    const inStockProducts = products.filter(product => product.inStock);
    if (category === 'all') return inStockProducts;
    return inStockProducts.filter(product => product.category === category);
  }

  searchProducts(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.inStock && (
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  getCategories() {
    const inStockProducts = products.filter(product => product.inStock);
    return [
      { id: 'all', name: 'All', count: inStockProducts.length },
      { id: 'dining-tables', name: 'Dining Tables', count: inStockProducts.filter(p => p.category === 'dining-tables').length },
      { id: 'dining-chairs', name: 'Dining Chairs', count: inStockProducts.filter(p => p.category === 'dining-chairs').length },
      { id: 'beds', name: 'Beds', count: inStockProducts.filter(p => p.category === 'beds').length },
      { id: 'chest-drawers', name: 'Chest Drawers', count: inStockProducts.filter(p => p.category === 'chest-drawers').length },
      { id: 'coffee-tables', name: 'Coffee Tables', count: inStockProducts.filter(p => p.category === 'coffee-tables').length },
      { id: 'cabinets', name: 'Cabinets', count: inStockProducts.filter(p => p.category === 'cabinets').length },
      { id: 'bedside-tables', name: 'Bedside Tables', count: inStockProducts.filter(p => p.category === 'bedside-tables').length },
      { id: 'sofas', name: 'Sofas', count: inStockProducts.filter(p => p.category === 'sofas').length },
      { id: 'decorations', name: 'Decorations', count: inStockProducts.filter(p => p.category === 'decorations').length },
    ];
  }
}

export const productService = new ProductService();