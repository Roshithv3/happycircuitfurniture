import { Product } from '../types';
import { googleSheetsService } from './googleSheets.service';

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
        console.warn('No products found in Google Sheets');
        this.products = [];
      }
    } catch (error) {
      console.error('Failed to load products from Google Sheets:', error);
      this.products = [];
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
      { id: 'coffee-tables', name: 'Coffee Tables', count: inStockProducts.filter(p => p.category === 'coffee-tables').length },
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