import { useContext } from "react";
import { ProductContext } from "./ProductContext";

export function useProductContext() {
  const ctx = useContext(ProductContext);

  if (!ctx) {
    throw new Error(
      "useProductContext must be used inside ProductProvider",
    );
  }

  return ctx;
}