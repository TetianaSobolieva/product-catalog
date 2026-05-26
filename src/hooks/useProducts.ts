import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../api/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);

        const products = await fetchProducts();
        setProducts(products);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    load();

  }, []);

  return { products, loading, error };
}
