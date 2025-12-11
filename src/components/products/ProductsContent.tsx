"use client";
import Header from "@/src/components/header/Header";
import { ProductsProvider, useProducts } from "@/src/context/ProductsContext";
import Loader from "@/src/lib/Loader";
import CardProduct from "@/src/components/products/CardProducts";
import CategoriesSelect from "@/src/components/products/CategoriesSelect";
import ProgressBar from "@/src/lib/ProgressBar";
import { Suspense, use } from "react";

function ProductsContent() {
  const { products, loading, error, statusCode, page, setPage, limit, total, progress } = useProducts();
  const totalPages = Math.ceil(total / limit);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (statusCode === 404) return <p>No se encontraron productos</p>;

  return (
    <section className="flex flex-col items-center">
      {loading && <ProgressBar progress={progress} />}
      {/* resto de tu UI */}
      <Header />
      <div className="flex flex-row w-full items-center h-15 justify-end lg:pr-12 pr-4">
        <CategoriesSelect />
      </div>
      <CardProduct />

      {/* Controles de paginación */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-orange rounded disabled:opacity-50"
        >
          ← Preview
        </button>
        <span className="font-semibold">Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={products.length < limit}
          className="px-4 py-2 bg-orange rounded disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </section>
  );
};
export default ProductsContent;