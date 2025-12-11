import { Product } from "@/src/types/product";

export const productDefault: Product = {
  id: 0,
  title: "Fall Limited Edition Sneakers",
  price: 250,
  description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  category: "shoes",
  rating: 8.56,
  stock: 20,
  images: [
    "/sneakers/image-product-1.jpg",
    "/sneakers/image-product-2.jpg",
    "/sneakers/image-product-3.jpg",
    "/sneakers/image-product-4.jpg",
  ],
  thumbnail: "/sneakers/image-product-1.jpg",
  products: undefined
};