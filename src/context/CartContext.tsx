"use client";
import { createContext, useContext, useState } from "react";
import { Product } from "@/src/types/product";

type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  setItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getFinalItemPrice: (price: number) => number;
  addOrUpdateItem: (product: Product, quantity: number) => void;
  shipping: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [items, setItems] = useState<CartItem[]>([]);
  const shipping = 5;
  const DISCOUNT_RATE: number = 0.5; // 50% de descuento
  
  const getFinalItemPrice = (price: number): number => {
 return Math.round(price * (1 - DISCOUNT_RATE));
};
const getTotalPrice = (): number => {
return items.reduce((total, cartItem) => {
 // 1. Calcular el precio final del artículo
 const finalPrice = getFinalItemPrice(cartItem.product.price);
 // 2. Multiplicar por la cantidad
 const itemTotal = finalPrice * cartItem.quantity;
 // 3. Sumar al total  
 return total + itemTotal;
}, 0); 
};
//añade o actualiza según el caso
const addOrUpdateItem = (product: Product, quantity: number) => {
  setItems(prev => {
    const exists = prev.find(i => i.product.id === product.id);
    if (exists) {
      // actualizar cantidad
      return prev
        .map(i =>
          i.product.id === product.id
            ? { ...i, quantity: quantity }
            : i
        )
        .filter(i => i.quantity > 0); // si llega a 0, lo quita
    } else {
      // agregar nuevo producto
      return [...prev, { product, quantity }];
    }
  });
};

// Agrega productos al carrito
const addItem = (product: Product, quantity: number) => {
  setItems((prev) => {
    const existing = prev.find((i) => i.product.id === product.id);
    if (existing) {
      return prev.map((i) =>
        i.product.id === product.id
      ? { ...i, quantity: i.quantity + quantity }
      : i
    );
  }
      return [...prev, { product, quantity }];
    });
  };
  // Actualiza la cantidad de productos enlazado al counter
  const updateQuantity = (productId: number, newQuantity: number) => {
    setItems((prev) =>
      prev
    .map((i) =>
      i.product.id === productId ? { ...i, quantity: newQuantity } : i
  )
  .filter((i) => i.quantity > 0) // si llega a 0, lo quita
);
};

// Elimina productos del carrito
  const removeItem = (productId: number) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };
// Limpia el carrito
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ 
      items, 
      setItems, 
      addItem, 
      removeItem, 
      clearCart, 
      getTotalPrice, 
      getFinalItemPrice, 
      updateQuantity, 
      shipping,
      addOrUpdateItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const contx = useContext(CartContext);
  if (!contx) throw new Error("useCart must be used within CartProvider");
  return contx;
};