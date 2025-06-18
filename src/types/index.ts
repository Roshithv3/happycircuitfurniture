export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  features: string[];
  dimensions: string; // Changed from object to string
  material: string;
  images: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Order {
  id: string;
  mobile: string;
  customerName: string;
  items: string[];
  status: string;
  orderDate: string;
  estimatedDelivery: string;
  totalAmount: number;
}