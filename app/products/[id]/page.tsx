//Server component
import Header from "@/src/components/header/Header";
import CardDetailProduct from "@/src/components/products/CardDetailProduct";
import { Product } from "@/src/types/product";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products?limit=200");
  const data: ProductsResponse = await res.json();
  const products: Product[] = data.products;
  return products.map((p) => ({
    id: p.id.toString(), // siempre string
  }));
};

//  OBTENCIÓN DE DATOS ESTÁTICOS: Renderiza la página por cada ID
export default async function ProductDetailPage({ params }: { params: { id: string } | Promise<{ id: string }> 
}) {
  const { id } = await params; 
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "force-cache",
  });
  
  if (!res.ok) {
     return <h1>Producto con ID {id} no encontrado.</h1>;
  }
  
  const product: Product = await res.json();
  
  return (
    <section className="page-detail">
      <Header/>
      <CardDetailProduct product={product}></CardDetailProduct>
    </section>
  );
};