"use client";
import { useProducts } from "@/src/context/ProductsContext";
import { useState } from "react";
import iconFilter from "@/public/icon-filter.svg";
import Image from "next/image";

export default function CategoriesSelect() {
  const { categories, selectedCategory, setSelectedCategory, loading, error } = useProducts();
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section>

      <div className="relative inline-block w-full  ">
        {/* Botón principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" flex  flex-row items-center justify-center w-auto h-11 px-4 py-2 bg-orange text-very-dark-grayish-blue rounded-md hover:bg-pale-orange hover:border-2 hover:border-orange font-bold cursor-pointer"
        >
          {selectedCategory ? selectedCategory : "Category"}
         
          <span className="ml-2"> <Image src={iconFilter} width={10} height={10} alt="icon-filter w-4 h-4"/></span>
        </button>

        {/* Lista desplegable */}
        {isOpen && (
          <div className="grid lg:grid-cols-4 grid-cols-2 absolute mt-2 w-85 lg:w-200 bg-white border-2 border-pale-orange rounded-md shadow-lg z-10 top-10 right-0">
            <button
              onClick={() => {
                setSelectedCategory("");
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Todas
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${selectedCategory === cat.slug ? "bg-pale-orange font-semibold" : ""
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};