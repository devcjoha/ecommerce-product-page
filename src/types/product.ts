export type Product = {
  products: any;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  images: string[];
  rating: number; 
  thumbnail: string;
};

export type DefaultProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  rating: number; 
  images: readonly string[]; 
  thumbnail: string;
};