import ProductsContent from "@/src/components/products/ProductsContent";
import { ProductsProvider } from "@/src/context/ProductsContext";

export default function ProductsPage() {
  // Valores iniciales fijos: arrancas siempre en categoría vacía y página 1
  return (
    <ProductsProvider initialCategory="" initialPage={1}>
      <ProductsContent />
    </ProductsProvider>
  );
}