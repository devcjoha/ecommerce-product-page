// components/Lightbox.tsx
"use client";
import Image from "next/image";
import arrowPreview from "@/public/icon-previous.svg";
import arrowNext from "@/public/icon-next.svg";
import CloseIcon from "@/src/components/icons/CloseIcon";
import { resolveImage } from "@/src/utils/resolveImage";
import  ArrowPreview  from "@/src/components/icons/ArrowPreview";
import ArrowNext from "@/src/components/icons/ArrowNext"

type LightboxProps = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onMiniClick: (index: number) => void;
};

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onMiniClick,
}: LightboxProps) {

  return (
    <div className="lightbox fixed inset-0 bg-black/75 flex items-center justify-center z-50">
      <div className="lightbox-container flex justify-center w-200">
        <button onClick={onClose} className="absolute lg:top-12 lg:right-111 ">
          {/* Icono Cerrar */}
          <CloseIcon
          alt="icon-close"
          width={20}
          height={20}
          className="object-contain rounded-lg text-white hover:text-orange"
        /></button>
          {/* Icono Preview */}
        <button onClick={onPrev} className="absolute flex items-center text-grayish-blue justify-center left-105 rounded-full bg-white h-14 w-14 lg:top-80">
          <ArrowPreview
     
            alt="arrow-preview"
            width={12}
            height={12}
            className=" text-dark-grayish-blue hover:text-orange"
          /></button>

            {/* Image Hero desktop */}
        <div className="hidden lg:flex flex-col justify-center items-center">
          <Image
            src={resolveImage(images[currentIndex])}
            alt={`Imagen ${currentIndex + 1}`}
            width={550}
            height={550}
            className="object-contain rounded-lg"
          />
            {/* Images mini */}
          <div className="hidden lg:flex flex-row justify-between w-120 mt-8 ">
          {images.map((img, index) => (
            <div
              key={index}
              onClick={() => onMiniClick(index)}
              className="relative w-25 h-25 hover:border-2 hover:border-orange hover:bg-pale-orange/60 rounded-xl overflow-hidden 
                 border-2 border-transparent transition">
           
              <Image
                key={index}
                src={resolveImage(img)}
                alt={"image-ligthbox"}
                width={100}
                height={100}
                loading="eager"
                className="imagemini-lightbox w-full h-full object-contain rounded-xl hover:brin"
              />
               {/* Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 hover:opacity-80 transition rounded-xl "></div>
            </div>
          ))}
          </div>
        </div>
          {/* Icono Next */}
        <button onClick={onNext} className="absolute flex items-center text-grayish-blue justify-center right-105 rounded-full bg-white h-14 w-14 top-80">
          <ArrowNext
            alt="arrow-next"
            width={12}
            height={12}
             className=" text-dark-grayish-blue hover:text-orange"
          /></button>
      </div>
    </div>
  );
};