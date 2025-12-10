"use client";
import Image from "next/image";
import { Product } from "@/src/types/product";
import IconCart from "../icons/CartIcon";
import Counter from "./Counter";
import { useState } from "react";
import Lightbox from "@/src/components/products/LightBox";
import { resolveImage } from "@/src/utils/resolveImage";
import arrowPreview from "@/public/icon-previous.svg";
import arrowNext from "@/public/icon-next.svg";
import { useCart } from "@/src/context/CartContext";

export default function CardDetailProduct({ product }: { product: Product }) {
  const {
    title,
    price,
    description,
    category,
    rating,
    stock,
    images,
    thumbnail,
  } = product;
  const { addOrUpdateItem } = useCart();
  const [quantity, setQuantity] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const discount: number = 0.5;
  const finalPrice = (price * (1 - discount)).toFixed(2)


  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };
  //  Cerrar LightBox
  const closeLightbox = () => {
    setIsOpen(false);
  };
  // Ir a la imagen previa
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  // Ir a la imagen siguiente
  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  // Cambia las imágenes del lightbox al hacer click an la mini
  const handleMiniImages = (index: number) => {
    setCurrentIndex(index);
  }

  return (
    <article className="card-detail lg:p-15 grid lg:grid-cols-[440px_110px_430px] gird-cols-1 lg:grid-rows-[440px_0px_130px] grid-rows-auto">
      {/* LightBox */}
      <div className="lightbox hidden lg:block ">
        {isOpen && (
          <Lightbox
            images={images}
            currentIndex={currentIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
            onMiniClick={handleMiniImages}
          />
        )}
        
      </div>
      {/* MÓVIL: Imagen Hero y Navegación */}
      <div className="relative col-start-1 row-start-1 lg:hidden ">
        <Image
          src={resolveImage(images[currentIndex])}
          alt={title}
          width={100}
          height={100}
          loading="eager"
          className="w-full h-70 object-fill"
        />

        {/* Flecha Izquierda (Prev) */}
        <button
          onClick={prevImage}
          className="absolute flex items-center text-grayish-blue justify-center left-4 top-35 rounded-full bg-white h-10 w-10 cursor-pointer"
        >

          <Image
            src={arrowPreview}
            alt="arrow-preview"
            width={100}
            height={100}
            className="object-contain w-3.5 h-3.5"
            loading="eager"
          ></Image>

        </button>

        {/* Flecha Derecha (Next) */}
        <button
          onClick={nextImage}
          className="absolute flex items-center text-grayish-blue justify-center right-4 top-35 rounded-full bg-white h-10 w-10 cursor-pointer "
        >
          <Image
            src={arrowNext}
            alt="arrow-next"
            width={100}
            height={100}
            loading="eager"
            className="object-contain w-3.5 h-3.5 "></Image>

        </button>
      </div>

      {/* Image-Hero Desktop*/}
      <div className="hidden image-hero-detail lg:flex lg:col-start-1 lg:row-start-1 lg:row-span-2 w-110 h-110 cursor-pointer">
        <Image
          src={resolveImage(thumbnail)}
          alt={title}
          width={100}
          height={100}
           loading="eager"
          className="image-hero w-full object-contain border rounded-2xl"
          onClick={() => openLightbox(0)}
        />
      </div>
      {/* Images-Mini desktop */}
      <div className="images-detail hidden lg:flex lg:flex-row lg:col-start-1 lg:row-start-3 col-start-1 row-start-1 items-center lg:justify-between cursor-pointer ">
          
       {images.map((img, index) => (
         <div key={index + 1} className="relative   rounded-xl overflow-hidden 
                 border-2 border-transparent hover:border-orange-500 transition">     
          <Image
            key={index}
            src={resolveImage(img)}
            alt={`${title} ${index + 1}`}
            width={100}
            height={100}
            loading="eager"
            className="image-detail w-20 h-20 object-contain rounded-xl"
            // onClick={() => openLightbox(index)}
            onClick={()=>handleMiniImages(index)}
          />
            {/* Overlay */}
            <div className="absolute w-20 h-20 inset-0 bg-white opacity-0 hover:opacity-80 transition rounded-xl "></div>
    
        </div>

        ))}

      </div>
      {/* product-info */}
      <div className="text-detail-container lg:col-start-3 col-start-1 lg:row-start-1 lg:row-span-2 flex flex-col items-left justify-center lg:p-0 p-6">
        <span className="company-detail text-dark-grayish-blue font-medium tracking-widest lg:text-[.8rem] text-[.75rem]">SNEAKER COMPANY</span>
        <h1 className="lg:text-[2.5rem] text-[1.8rem] lg:leading-11 leading-9 font-bold mt-3 lg:mb-10 mb-4">{title}</h1>
        <p className="text-dark-grayish-blue text-[.9rem] lg:text-[1rem] mb-4">{description}</p>
        <div className="price-container flex lg:flex-col flex-row items-center lg:items-start mb-4">
          <p className="final-price-detail w-full text-[1.8rem] font-bold flex flex-row items-center gap-5">${finalPrice} <span className="discount-detail flex items-center justify-center h-7 w-13 bg-very-dark-blue text-background rounded-md text-[1rem] font-medium "> 50%</span></p>
          <p className="price-detail text-dark-grayish-blue font-bold line-through ">${price.toFixed(2)}</p>
        </div>
        <p className="flex lg:flex-col flex-row text-sm text-gray-500">
          ⭐ {rating} — Stock: {stock - quantity} <span className="ml-5 lg:ml-0 ">#{category}</span>
        </p>
    
      </div>
      {/* Add to Cart */}
      <div className="button-container flex flex-row flex-wrap lg:h-45 lg:items-start gap-4 lg:col-start-3 lg:row-start-3 lg:p-0 px-6">

        <Counter stock={product.stock} value={quantity} onChange={setQuantity} />

        <button
          onClick={() => addOrUpdateItem(product, quantity)}
          disabled={quantity <= 0 || quantity > product.stock}
          name="add-to-cart"
          type="button"
          className="button-cart-detail flex flex-row items-center justify-center bg-orange rounded-lg gap-4 lg:w-68 p-3 w-full font-bold cursor-pointer shadow-lg"
        >
          <IconCart
            className="text-very-dark-grayish-blue"
            alt="icon-cart"
          />
          Add to cart
        </button>
      </div>

    </article>
  );
};