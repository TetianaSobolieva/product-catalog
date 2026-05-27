import type { FilterState } from "../types/filterState";

export const MAX_COMPARE = 3;

export const INITIAL_FILTERS: FilterState = {
  category: "",
  inStockOnly: false,
  discountedOnly: false,
  sortKey: "default",
};