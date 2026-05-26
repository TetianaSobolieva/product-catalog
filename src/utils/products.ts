import type { FilterState } from "../types/filterState";
import type { Product } from "../types/product";
import type { SortKey } from "../types/sortKey";

export function getCategories(products: Product[]): string[] {
  const cats = [...new Set(products.map((p) => p.category))];
  return cats.sort();
}

export function filterProducts(
  products: Product[],
  search: string,
  { category, inStockOnly, discountedOnly }: FilterState,
): Product[] {
  const q = search.trim().toLowerCase();

  return products.filter((p) => {
    if (q) {
      const haystack =
        `${p.title} ${p.brand ?? ""} ${p.category}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (category && p.category !== category) return false;

    if (inStockOnly && p.stock <= 0) return false;

    const discount = p.discountPercentage ?? 0;
    if (discountedOnly && discount <= 0) return false;

    return true;
  });
}



export function sortProducts(products: Product[], sortKey: SortKey): Product[] {
  const arr = [...products];
  switch (sortKey) {
    case "price-asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price-desc":
      return arr.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return arr.sort((a, b) => b.rating - a.rating);
    case "title-asc":
      return arr.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return arr;
  }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}
