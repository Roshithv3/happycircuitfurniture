import { Product, CartItem, CartState } from '../types';

class CartService {
  private cart: CartState = {
    items: [],
    total: 0,
    itemCount: 0
  };

  private listeners: Array<(cart: CartState) => void> = [];

  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem('furniture-cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.calculateTotals();
    }
  }

  private saveCart(): void {
    localStorage.setItem('furniture-cart', JSON.stringify(this.cart));
    this.notifyListeners();
  }

  private calculateTotals(): void {
    this.cart.total = this.cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    this.cart.itemCount = this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener({ ...this.cart }));
  }

  subscribe(listener: (cart: CartState) => void): () => void {
    this.listeners.push(listener);
    listener({ ...this.cart }); // Initial call with copy
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getCart(): CartState {
    return { ...this.cart };
  }

  getProductQuantity(productId: string): number {
    const item = this.cart.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cart.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({ product, quantity });
    }
    
    this.calculateTotals();
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    this.cart.items = this.cart.items.filter(item => item.product.id !== productId);
    this.calculateTotals();
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotals();
      this.saveCart();
    }
  }

  clearCart(): void {
    this.cart = { items: [], total: 0, itemCount: 0 };
    this.saveCart();
  }
}

export const cartService = new CartService();