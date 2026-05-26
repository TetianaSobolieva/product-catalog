import type { Product } from "../types/product";


interface ProductsResponse {
  products: Product[];
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products?limit=30');

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const data: ProductsResponse = await res.json();

  return data.products;
};
