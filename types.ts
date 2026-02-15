
export interface SpecificationGroup {
  title: string;
  specs: Record<string, string>;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  description: string;
  brand: string;
  brandLogo?: string;
  specGroups: SpecificationGroup[];
  highlights: string[];
  isAssured?: boolean;
  stock: number;
  sellerName: string;
  sellerRating: number;
  returnPolicy: string;
}

export interface CartItem extends Product {
  quantity: number;
  selected: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface User {
  name: string;
  email: string;
  address: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
