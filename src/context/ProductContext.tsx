import { createContext } from "react";
import type { Product } from "../types/product";
import type { FilterState } from "../types/filterState";

export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;

  search: string;
  setSearch: (v: string) => void;

  filters: FilterState;
  handleFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  resetFilters: () => void;

  categories: string[];

  visibleProducts: Product[];

  favorites: Product[];
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;

  compareIds: number[];
  toggleCompare: (id: number) => void;
  removeCompare: (id: number) => void;

  toast: string;
  setToast: (v: string) => void;
};

export const ProductContext =
  createContext<ProductContextType | null>(null);