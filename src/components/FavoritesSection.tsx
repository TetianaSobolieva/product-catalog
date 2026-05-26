import ProductCard from './ProductCard';
import styles from './FavoritesSection.module.css';
import type { Product } from '../types/product';

interface Props {
  favorites: Product[];
  compareIds: number[];
  compareCount: number;
  onToggleFavorite: (id: number) => void;
  onToggleCompare: (id: number) => void;
}

export default function FavoritesSection({
  favorites,
  compareIds,
  compareCount,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  if (favorites.length === 0) {
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
