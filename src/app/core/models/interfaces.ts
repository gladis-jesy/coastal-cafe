export interface Food {
  id: number;
  name: string;
  price: number;
  image: string;
  category: number;
  description?: string;
  special?: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export interface Review {
  customer_name: string;
  review_text: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ApiResponse<T> {
  results: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}
