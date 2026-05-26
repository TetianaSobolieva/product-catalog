import type { Product } from '../types';
import { formatPrice } from '../utils/products';
import styles from './CompareTable.module.css';

interface Field {
  key: keyof Product | 'stockStatus';
  label: string;
  render: (p: Product) => string;
  cellClass?: (p: Product) => string;
}

const FIELDS: Field[] = [
  { key: 'price',              label: 'Price',    render: (p) => formatPrice(p.price) },
  { key: 'rating',             label: 'Rating',   render: (p) => `${p.rating.toFixed(1)} / 5` },
  {
    key: 'stockStatus',
    label: 'Stock',
    render: (p) => p.stock > 0 ? `✓ In stock (${p.stock})` : '✗ Out of stock',
    cellClass: (p) => p.stock > 0 ? styles.inStock : styles.outOfStock,
  },
  { key: 'category',           label: 'Category', render: (p) => p.category },
  {
    key: 'discountPercentage',
    label: 'Discount',
    render: (p) => p.discountPercentage > 0 ? `${p.discountPercentage.toFixed(0)}%` : '—',
  },
];

interface Props {
  products: Product[];
  compareIds: number[];
  onRemove: (id: number) => void;
}

export default function CompareTable({ products, compareIds, onRemove }: Props) {
  const compareProducts = products.filter((p) => compareIds.includes(p.id));

  if (compareIds.length === 0) {
    return (
      <section className={styles.section} aria-label="Product comparison">
        <h2 className={styles.heading}>Compare</h2>
        <p className={styles.empty}>Select up to 3 products to compare them side by side.</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-label="Product comparison">
      <h2 className={styles.heading}>
        Compare
        <span className={styles.badge}>{compareProducts.length}</span>
      </h2>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.labelCol}>Feature</th>
              {compareProducts.map((p) => (
                <th key={p.id} scope="col" className={styles.productCol}>
                  <div className={styles.productHeader}>
                    <img src={p.thumbnail} alt={p.title} className={styles.thumb} />
                    <span className={styles.productTitle}>{p.title}</span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => onRemove(p.id)}
                      aria-label={`Remove ${p.title} from comparison`}
                    >
                      ✕
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field) => (
              <tr key={field.key} className={styles.row}>
                <th scope="row" className={styles.fieldLabel}>{field.label}</th>
                {compareProducts.map((p) => (
                  <td
                    key={p.id}
                    className={`${styles.cell} ${field.cellClass ? field.cellClass(p) : ''}`}
                  >
                    {field.render(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
