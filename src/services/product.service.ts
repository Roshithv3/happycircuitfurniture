import { Product } from '../types';
import { googleSheetsService } from './googleSheets.service';

// Fallback products in case Google Sheets fails
const fallbackProducts: Product[] = [
  {
    id: '1',
    name: 'Rustic Oak Dining Table',
    price: 89900,
    category: 'dining-tables',
    description: 'Handcrafted rustic oak dining table with natural wood grain. Perfect for family gatherings.',
    features: ['Solid oak construction', 'Seats 6-8 people', 'Natural wood finish'],
    dimensions: '180cm × 90cm × 75cm',
    material: 'Shesham Wood',
    images: ['https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/0670d0d4-084f-4c12-915d-a2d67552dafa_tvafri.jpg',
            'https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/set_27_1__2_tvqjvd.jpg',
             'https://res.cloudinary.com/dzdkpm0od/image/upload/v1749797679/1f708814-849f-4daa-81ef-699ee042b658_f3gqob.jpg'
        ],
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '11',
    name: 'Ratten Chair',
    price: 12900,
    category: 'dining-chairs',
    description: 'Classic Windsor style dining chair with spindle back design.',
    features: ['Windsor style', 'Spindle back', 'Comfortable seating'],
    dimensions: '45cm × 50cm × 85cm',
    material: 'Shesham Wood',
    images:['https://res.cloudinary.com/dzdkpm0od/image/upload/v1749796346/closeup_set_131_v2_peter_natural_02_1_jeokuc.jpg','https://res.cloudinary.com/dzdkpm0od/image/upload/220030_4_hwosd0.jpg'],
    inStock: true,
    rating: 4.7,
    reviews: 234
  }
];

class ProductService {
  private products: Product[] = [];
  private lastFetch: number = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    // Check if we have recent data
    if (this.products.length > 0 && Date.now() - this.lastFetch < this.CACHE_DURATION) {
      return;
    }

    try {
      console.log('Fetching products from Google Sheets...');
      const sheetProducts = await googleSheetsService.fetchProducts();
      
      if (sheetProducts.length > 0) {
        this.products = sheetProducts;
        this.lastFetch = Date.now();
        console.log(`Loaded ${sheetProducts.length} products from Google Sheets`);
      } else {
        console.warn('No products found in Google Sheets, using fallback data');
        this.products = fallbackProducts;
      }
    } catch (error) {
      console.error('Failed to load products from Google Sheets:', error);
      console.log('Using fallback product data');
      this.products = fallbackProducts;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    await this.loadProducts();
    return this.products.filter(product => product.inStock);
  }

  getAllProductsSync(): Product[] {
    return this.products.filter(product => product.inStock);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    await this.loadProducts();
    return this.products.find(product => product.id === id && product.inStock);
  }

  getProductByIdSync(id: string): Product | undefined {
    return this.products.find(product => product.id === id && product.inStock);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    await this.loadProducts();
    const inStockProducts = this.products.filter(product => product.inStock);
    if (category === 'all') return inStockProducts;
    return inStockProducts.filter(product => product.category === category);
  }

  getProductsByCategorySync(category: string): Product[] {
    const inStockProducts = this.products.filter(product => product.inStock);
    if (category === 'all') return inStockProducts;
    return inStockProducts.filter(product => product.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    await this.loadProducts();
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.inStock && (
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  searchProductsSync(query: string): Product[] {
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product =>
      product.inStock && (
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  getCategories() {
    const inStockProducts = this.products.filter(product => product.inStock);
    return [
      { id: 'all', name: 'All Products', count: inStockProducts.length },
      { id: 'dining-chairs', name: 'Chairs', count: inStockProducts.filter(p => p.category === 'dining-chairs').length },
      { id: 'dining-tables', name: 'Dining', count: inStockProducts.filter(p => p.category === 'dining-tables').length },
      { id: 'beds', name: 'Beds', count: inStockProducts.filter(p => p.category === 'beds').length },
      { id: 'chest-drawers', name: 'Chest Drawers', count: inStockProducts.filter(p => p.category === 'chest-drawers').length },
      { id: 'bedside-tables', name: 'Bedside Tables', count: inStockProducts.filter(p => p.category === 'bedside-tables').length },
      { id: 'cabinets', name: 'TV Cabinet', count: inStockProducts.filter(p => p.category === 'cabinets').length },
      { id: 'coffee-tables', name: 'Tables', count: inStockProducts.filter(p => p.category === 'coffee-tables').length },
      { id: 'decorations', name: 'Decoration', count: inStockProducts.filter(p => p.category === 'decorations').length },
      { id: 'sofas', name: 'Sofas', count: inStockProducts.filter(p => p.category === 'sofas').length }
    ];
  }

  // Force refresh products from Google Sheets
  async refreshProducts(): Promise<void> {
    this.lastFetch = 0; // Reset cache
    await this.loadProducts();
  }
}

export const productService = new ProductService();