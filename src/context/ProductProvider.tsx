import {
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { useProducts } from "../hooks/useProducts";
import { useLocalStorage } from "../hooks/useLocalStorage";

import {
  filterProducts,
  sortProducts,
  getCategories,
} from "../utils/products";

import {
  MAX_COMPARE,
  INITIAL_FILTERS,
} from "../constans/productConstants";

import { ProductContext } from "./ProductContext";
import type { FilterState } from "../types/filterState";

export function ProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { products, loading, error } =
    useProducts();

  const [search, setSearch] = useState("");
  const [filters, setFilters] =
    useState<FilterState>(INITIAL_FILTERS);

  const [favoriteIds, setFavoriteIds] =
    useLocalStorage<number[]>("favorites", []);

  const [compareIds, setCompareIds] =
    useLocalStorage<number[]>("compare", []);

  const [toast, setToast] = useState("");

  const categories = useMemo(
    () => getCategories(products),
    [products],
  );

  const favorites = useMemo(
    () =>
      products.filter((p) =>
        favoriteIds.includes(p.id),
      ),
    [products, favoriteIds],
  );

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(
      products,
      search,
      filters,
    );

    return sortProducts(
      filtered,
      filters.sortKey,
    );
  }, [products, search, filters]);

  const handleFilterChange = useCallback(
    <K extends keyof FilterState>(
      key: K,
      value: FilterState[K],
    ) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setSearch("");
    setFilters(INITIAL_FILTERS);
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id],
    );
  }, [setFavoriteIds]);

  const toggleCompare = useCallback((id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }

      if (prev.length >= MAX_COMPARE) {
        setToast(
          `You can compare up to ${MAX_COMPARE} products.`,
        );
        return prev;
      }

      return [...prev, id];
    });
  }, [setCompareIds]);

  const removeCompare = useCallback((id: number) => {
    setCompareIds((prev) =>
      prev.filter((x) => x !== id),
    );
  }, [setCompareIds]);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      search,
      setSearch,
      filters,
      handleFilterChange,
      resetFilters,
      categories,
      visibleProducts,
      favorites,
      favoriteIds,
      toggleFavorite,
      compareIds,
      toggleCompare,
      removeCompare,
      toast,
      setToast,
    }),
    [
      products,
      loading,
      error,
      search,
      filters,
      categories,
      visibleProducts,
      favorites,
      favoriteIds,
      compareIds,
      toast,
      handleFilterChange,
      resetFilters,
      toggleFavorite,
      toggleCompare,
      removeCompare,
      setSearch,
      setToast,
    ],
  );

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}