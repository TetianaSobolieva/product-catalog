import type { FilterState } from "../types/filterState";
import type { SortKey } from "../types/sortKey";
import styles from "./Filters.module.css";

interface Props {
  categories: string[];
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  onReset: () => void;
  resultCount: number;
}

export default function Filters({
  categories,
  filters,
  onFilterChange,
  onReset,
  resultCount,
}: Props) {
  const { category, inStockOnly, discountedOnly, sortKey } = filters;
  const isDirty =
    category !== "" || inStockOnly || discountedOnly || sortKey !== "default";

  return (
    <aside className={styles.wrap} aria-label="Product filters">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="filter-category" className={styles.label}>
            Category
          </label>
          <select
            id="filter-category"
            className={styles.select}
            value={category}
            onChange={(e) => onFilterChange("category", e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="sort-select" className={styles.label}>
            Sort by
          </label>
          <select
            id="sort-select"
            className={styles.select}
            value={sortKey}
            onChange={(e) =>
              onFilterChange("sortKey", e.target.value as SortKey)
            }
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: Best first</option>
            <option value="title-asc">Title: A–Z</option>
          </select>
        </div>

        <div className={styles.checkboxGroup}>
          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onFilterChange("inStockOnly", e.target.checked)}
            />
            <span>In stock only</span>
          </label>

          <label className={styles.checkLabel}>
            <input
              type="checkbox"
              checked={discountedOnly}
              onChange={(e) =>
                onFilterChange("discountedOnly", e.target.checked)
              }
            />
            <span>On sale only</span>
          </label>
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.count}>
          {resultCount} product{resultCount !== 1 ? "s" : ""}
        </span>
        {isDirty && (
          <button
            className={styles.reset}
            onClick={onReset}
            aria-label="Reset all filters"
          >
            ✕ Reset filters
          </button>
        )}
      </div>
    </aside>
  );
}
