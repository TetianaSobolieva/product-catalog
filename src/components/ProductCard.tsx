import React from "react";
import type { Product } from "../types/product";

type Props = {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { id, title, brand, category, price, discountPercentage, rating, stock, thumbnail } = product;

  const inStock = stock > 0;

  return (
    <article>
      <img src={thumbnail} alt={title} loading="lazy" />
      <div>
        <p>{category}</p>
        <h2>{title}</h2>
        {brand && <p>{brand}</p>}
        <div>
          <span>${price}</span>
          <span>
            {inStock ? '✓ In stock' : '✗ Out of stock'}
          </span>
        </div>
        <div>
          <span>Rating: {rating}</span>
        </div>
        <div className="actions">
          <button>'♥ Saved'</button>
          <button>'Compare'</button>
          </div>
      </div>
    </article>
  );
}