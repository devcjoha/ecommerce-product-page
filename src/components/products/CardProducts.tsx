import Image from "next/image";
import imageFallback from "@/public/image-fallback.svg"
// import { useParams } from "next/navigation";

import Link from "next/link";
import { useProducts } from "@/src/context/ProductsContext";


function CardProduct(){
 const { products } = useProducts();

 
  return(
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
        {products.map((p, index) => (
          <Link key={index} href={`/products/${p.id}`}>
            <div key={p.id} className="card-product-page h-60 w-60 border-2 border-pale-orange/40 rounded-lg p-4 shadow-sm transition-transform duration-300 ease-in-out lg:hover:scale-105 lg:hover:shadow-lg ">
              <p> ⭐  {p.rating}</p>
              <Image
                src={p.thumbnail || imageFallback}
                alt={p.title}
                width={200}
                height={200}
                loading="eager"
                className="w-full h-30 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold truncate">{p.title}</h2>
              <p className="text-gray-600">${p.price}<span className="category-product text-[.7rem]">{"  "}#{p.category}</span></p>
            </div>
          </Link>
        ))}
      </div>
  )
}
export default CardProduct;