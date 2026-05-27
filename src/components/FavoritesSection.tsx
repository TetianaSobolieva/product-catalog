import ProductCard from "./ProductCard";
import styles from "./FavoritesSection.module.css";
import { useProductContext } from "../context/useProductContext";

export default function FavoritesSection() {
  const {
    favorites,
    compareIds,
    compareCount,
    toggleFavorite,
    toggleCompare,
  } = useProductContext();

  if (favorites.length === 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.heading}>Favorites</h2>
        <p className={styles.empty}>
          No saved products yet. Click ♡ Save on any product card.
        </p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>
        Favorites
        <span className={styles.badge}>
          {favorites.length}
        </span>
      </h2>

      <div className={styles.grid}>
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            isCompared={compareIds.includes(product.id)}
            compareCount={compareCount}
            onToggleFavorite={toggleFavorite}
            onToggleCompare={toggleCompare}
          />
        ))}
      </div>
    </section>
  );
}