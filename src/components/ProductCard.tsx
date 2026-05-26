import type { Product } from '../types/product';
import { formatPrice } from '../utils/products';
import styles from './ProductCard.module.css';

const MAX_COMPARE = 3;

interface Props {
  product: Product;
  isFavorite: boolean;
  isCompared: boolean;
  compareCount: number;
  onToggleFavorite: (id: number) => void;
  onToggleCompare: (id: number) => void;
}

export default function ProductCard({
  product,
  isFavorite,
  isCompared,
  compareCount,
  onToggleFavorite,
  onToggleCompare,
}: Props) {
  const { id, title, brand, category, price, discountPercentage, rating, stock, thumbnail } = product;
  const inStock = stock > 0;
  const hasDiscount = (discountPercentage ?? 0) > 0;
  const compareDisabled = !isCompared && compareCount >= MAX_COMPARE;

  return (
    <article
      className={`${styles.card} ${isCompared ? styles.cardCompared : ''} ${isFavorite ? styles.cardFavorite : ''}`}
    >
      {hasDiscount && (
        <span className={styles.badge} aria-label={`${discountPercentage?.toFixed(0)}% discount`}>
          -{discountPercentage?.toFixed(0)}%
        </span>
      )}

      <div className={styles.imageWrap}>
        <img src={thumbnail} alt={title} className={styles.image} loading="lazy" />
      </div>

      <div className={styles.body}>
        <p className={styles.category}>{category}</p>
        <h2 className={styles.title}>{title}</h2>
        {brand && <p className={styles.brand}>{brand}</p>}

        <div className={styles.meta}>
          <span className={styles.price}>{formatPrice(price)}</span>
          <span
            className={`${styles.stock} ${inStock ? styles.inStock : styles.outOfStock}`}
            aria-label={inStock ? 'In stock' : 'Out of stock'}
          >
            {inStock ? '✓ In stock' : '✗ Out of stock'}
          </span>
        </div>

        <div className={styles.rating} aria-label={`Rating: ${rating} out of 5`}>
          <span
            className={styles.ratingStars}
            style={{ '--fill': `${(rating / 5) * 100}%` } as React.CSSProperties}
            aria-hidden="true"
          >
            ★★★★★
          </span>
          <span className={styles.ratingValue}>{rating.toFixed(1)}</span>
        </div>

        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${isFavorite ? styles.btnActive : ''}`}
            onClick={() => onToggleFavorite(id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
          >
            {isFavorite ? '♥ Saved' : '♡ Save'}
          </button>

          <button
            className={`${styles.btn} ${isCompared ? styles.btnCompareActive : ''}`}
            onClick={() => { if (!compareDisabled) onToggleCompare(id); }}
            aria-pressed={isCompared}
            aria-label={
              isCompared
                ? `Remove ${title} from comparison`
                : `Add ${title} to comparison`
            }
            disabled={compareDisabled}
            title={compareDisabled ? 'Maximum 3 products in comparison' : undefined}
          >
            {isCompared ? '⊠ Comparing' : '⊞ Compare'}
          </button>
        </div>
      </div>
    </article>
  );
}
