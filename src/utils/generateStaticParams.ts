import { useProducts } from "@/src/context/ProductsContext";
import { Product } from "../types/product";

export async function generateStaticParams() {
  // Pide todos los productos (o un subset si quieres limitar)
   const { products } = useProducts();
 
  
  // Devuelve un array de objetos con los IDs como string
  return products.map((p: Product) => ({
    id: p.id.toString(),
  }));
  console.log(id);
  
}