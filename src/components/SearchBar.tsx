import React from "react";
import styles from "./SearchBar.module.css";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchBar: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="product-search" className={styles.label}>
        Search products
      </label>
      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
          ⌕
        </span>
        <input
          id="product-search"
          type="search"
          className={styles.input}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, brand, or category…"
          autoComplete="off"
        />
        {value && (
          <button
            className={styles.clear}
            onClick={() => onChange("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};
