import { useState, useMemo, useCallback } from "react";
import { useProducts } from "./hooks/useProducts";
import { getCategories, filterProducts, sortProducts } from "./utils/products";
import type { FilterState } from "./types/filterState";
import type { Tab } from "./types/tab";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import FavoritesSection from "./components/FavoritesSection";
import CompareTable from "./components/CompareTable";
import styles from "./App.module.css";
import { useLocalStorage } from "./utils/useLocalStorage";
import Toast from "./components/Toast";

const MAX_COMPARE = 3;

const INITIAL_FILTERS: FilterState = {
  category: "",
  inStockOnly: false,
  discountedOnly: false,
  sortKey: "default",
};

function App() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>(
    "favorites",
    [],
  );
  const [compareIds, setCompareIds] = useLocalStorage<number[]>("compare", []);
  const [toast, setToast] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("catalog");
  // console.log("products:", products.length);
  // console.log("favorites filtered:", favoriteIds.length);
  // console.log("ids:", favoriteIds);

  const categories = useMemo(() => getCategories(products), [products]);

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(products, { search, ...filters });
    return sortProducts(filtered, filters.sortKey);
  }, [products, search, filters]);

  const handleFilterChange = useCallback(
    <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleResetFilters = useCallback(() => {
    setSearch("");
    setFilters(INITIAL_FILTERS);
  }, []);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      setFavoriteIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    },
    [setFavoriteIds],
  );

  const handleToggleCompare = useCallback(
    (id: number) => {
      setCompareIds((prev) => {
        if (prev.includes(id)) return prev.filter((x) => x !== id);
        if (prev.length >= MAX_COMPARE) {
          setToast(`You can compare up to ${MAX_COMPARE} products at a time.`);
          return prev;
        }
        return [...prev, id];
      });
    },
    [setCompareIds],
  );

  const handleRemoveCompare = useCallback(
    (id: number) => {
      setCompareIds((prev) => prev.filter((x) => x !== id));
    },
    [setCompareIds],
  );

  const favorites = useMemo(
    () => products.filter((p) => favoriteIds.includes(p.id)),
    [products, favoriteIds],
  );

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◈</span>
            <span className={styles.logoText}>Catalogr</span>
          </div>
          <nav className={styles.tabs} aria-label="App sections">
            {(["catalog", "favorites", "compare"] as Tab[]).map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(tab)}
                aria-current={activeTab === tab ? "page" : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === "favorites" && favorites.length > 0 && (
                  <span
                    className={`${styles.tabBadge} ${styles.tabBadgeHeart}`}
                  >
                    {favorites.length}
                  </span>
                )}
                {tab === "compare" && compareIds.length > 0 && (
                  <span
                    className={`${styles.tabBadge} ${styles.tabBadgeCompare}`}
                  >
                    {compareIds.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        {activeTab === "catalog" && (
          <>
            <div className={styles.controls}>
              <SearchBar value={search} onChange={setSearch} />
              <Filters
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
                resultCount={visibleProducts.length}
              />
            </div>

            {loading && (
              <div className={styles.stateBox} role="status" aria-live="polite">
                <div className={styles.spinner} aria-hidden="true" />
                <p>Loading products…</p>
              </div>
            )}

            {error && !loading && (
              <div className={styles.stateBox} role="alert">
                <span className={styles.stateIcon}>⚠</span>
                <p className={styles.errorText}>Failed to load products</p>
                <p className={styles.errorDetail}>{error}</p>
              </div>
            )}

            {!loading && !error && visibleProducts.length === 0 && (
              <div className={styles.stateBox} role="status">
                <span className={styles.stateIcon}>◎</span>
                <p>No products match your filters.</p>
                <button
                  className={styles.stateBtn}
                  onClick={handleResetFilters}
                >
                  Reset filters
                </button>
              </div>
            )}

            {!loading && !error && visibleProducts.length > 0 && (
              <div className={styles.grid} aria-label="Product catalog">
                {visibleProducts.map((product, i) => (
                  <div
                    key={product.id}
                    style={{ animationDelay: `${Math.min(i * 0.04, 0.6)}s` }}
                  >
                    <ProductCard
                      product={product}
                      isFavorite={favoriteIds.includes(product.id)}
                      isCompared={compareIds.includes(product.id)}
                      compareCount={compareIds.length}
                      onToggleFavorite={handleToggleFavorite}
                      onToggleCompare={handleToggleCompare}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "favorites" && (
          <FavoritesSection
            products={products}
            favorites={favorites}
            compareIds={compareIds}
            compareCount={compareIds.length}
            onToggleFavorite={handleToggleFavorite}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === "compare" && (
          <CompareTable
            products={products}
            compareIds={compareIds}
            onRemove={handleRemoveCompare}
          />
        )}
      </main>

      <Toast message={toast} onDismiss={() => setToast("")} />
    </div>
  );
}

export default App;
