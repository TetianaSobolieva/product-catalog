import ProductCard from './ProductCard';
import styles from './FavoritesSection.module.css';
import type { Product } from '../types/product';

interface Props {
  products: Product[];
  favoriteIds: number[];
  compareIds: number[];
  compareCount: number;
  onToggleFavorite: (id: number) => void;
  onToggleCompare: (id: number) => void;
}

export default function FavoritesSection({
  products,
  favoriteIds,
  compareIds,
  compareCount,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  const favorites = products.filter((p) => favoriteIds.includes(p.id));

  if (favoriteIds.length === 0) {
    return (
      <section className={styles.section} aria-label="Favorites">
        <h2 className={styles.heading}>Favorites</h2>
        <p className={styles.empty}>No saved products yet. Click ♡ Save on any product card.</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label="Favorites">
      <h2 className={styles.heading}>
        Favorites
        <span className={styles.badge}>{favorites.length}</span>
      </h2>
      <div className={styles.grid}>
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={true}
            isCompared={compareIds.includes(product.id)}
            compareCount={compareCount}
            onToggleFavorite={onToggleFavorite}
            onToggleCompare={onToggleCompare}
          />
        ))}
      </div>
    </section>
  );
}
