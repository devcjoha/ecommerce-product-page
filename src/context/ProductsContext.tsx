"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "../types/product";
import { useRouter, useSearchParams } from "next/navigation";
type Category = {
  slug: string;
  name: string;
  url: string;
};

type ProductContextType = {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  setPage: (page: number) => void;
  loading: boolean;
  error: string | null;
  statusCode: number | null;
  page: number;
  limit: number;
  total: number;
  progress: number;
};

const ProductsContext = createContext<ProductContextType>({
  products: [],
  loading: false,
  error: null,
  statusCode: null,
  categories: [],
  selectedCategory: "",
  page: 0,
  limit: 12,
  total: 0,
  progress:0,
  setSelectedCategory: () => {
    throw new Error("ProductsProvider missing: setSelectedCategory");
  },
  setPage: () => {
    throw new Error("ProductsProvider missing: setPage");
  },
});

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategoryState] = useState("");
  const [page, setPageState] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const limit = 12;

  
  // Fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); //limpie el error previo
        setStatusCode(null);

        const categoryPath = selectedCategory ? `/category/${selectedCategory}` : "";
        const skip = (page - 1) * limit;
        
        const res = await fetch(`https://dummyjson.com/products${categoryPath}?limit=${limit}&skip=${skip}&select=id,title,price,description,category,rating,stock,images,thumbnail`)
        
        if (!res.ok) {
          setStatusCode(res.status);
          throw Error(`Error ${res.status}: ${res.statusText}`)
        }
        
        const data = await res.json();
        setProducts(data.products)
        setTotal(data.total);
        if (categories.length === 0) {
          const catRes = await fetch("https://dummyjson.com/products/categories");
          if (catRes.ok) {
            const catData = await catRes.json();
            setCategories(catData);
          }
        }
      } catch (err: any) {
        setError(err.message ?? "Error inesperado al cargar los productos");
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, [selectedCategory, page]);
    
  // Actualiza URL cada vez que cambian los estados
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    if (page) params.set("page", page.toString());
    
    router.replace(`/products?${params.toString()}`);
  }, [selectedCategory, page]);

  const setSelectedCategory = useCallback((cat: string) => {
    setSelectedCategoryState(cat);
    setPageState(1);
  }, []);

  const setPage = useCallback((nextPage: number) => {
    setPageState(nextPage);
  }, []);

  // Al montar, lee los query params
 useEffect(() => {
   const categoryParam = searchParams.get("category");
   const pageParam = searchParams.get("page");

   if (categoryParam) setSelectedCategoryState(categoryParam);
   if (pageParam) setPageState(Number(pageParam));
 }, []);
 

useEffect(() => {
  let interval: NodeJS.Timeout;

  if (loading) {
    setProgress(0);
    interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // no llegar al 100 hasta que termine
        return prev + 10;
      });
    }, 200);
  } else {
    setProgress(100); // cuando termina el fetch
    const timeout = setTimeout(() => setProgress(0), 500); // ocultar después de un rato
    return () => clearTimeout(timeout);
  }

  return () => clearInterval(interval);
}, [loading]);
  return (
    <ProductsContext.Provider
      value={{
        products,
        categories,
        selectedCategory,
        page,
        setSelectedCategory,
        setPage,
        loading,
        error,
        statusCode,
        limit,
        total,
        progress
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};