import {productDefault} from "../public/data/productDefault";
import Header from "@/src/components/header/Header";
import CardDetailProduct from "@/src/components/products/CardDetailProduct";
import { Product } from "@/src/types/product";


function Home() {
  
  const product: Product = productDefault;



  return (

    <section className="bg-background text-foreground max-w-screen min-h-screen h-auto flex flex-col lg:scroll-smooth scroll-auto items-center ">
      <Header />
      <CardDetailProduct  product={product} />

    </section>

  );
}
export default Home;