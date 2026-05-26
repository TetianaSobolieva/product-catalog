import { useProducts } from "./hooks/useProducts";
import type { Tab } from "./types/tab";
import { useCallback, useMemo, useState } from "react";
import { ProductCard } from "./components/ProductCard";
import styles from "./App.module.css";
import type { FilterState } from "./types/filterState";
import SearchBar from "./components/SearchBar";
import { filterProducts, getCategories, sortProducts } from "./utils/products";
import Filters from "./components/Filters";

const INITIAL_FILTERS: FilterState = {
  category: "",
  inStockOnly: false,
  discountedOnly: false,
  sortKey: "default",
};

function App() {
  const { products, loading, error } = useProducts();

  const [activeTab, setActiveTab] = useState<Tab>("catalog");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

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
                <span>0</span>
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
            {loading && <p>Loading products…</p>}
            {error && !loading && (
              <div>
                <p>Failed to load products</p>
                <p>{error}</p>
              </div>
            )}
            {!loading && !error && products.length === 0 && <p>No products.</p>}
            {!loading && !error && products.length > 0 && (
              <div className={styles.grid} aria-label="Product catalog">
                {products.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {activeTab === "favorites" && <FavoritesSection />}
        {activeTab === "compare" && <CompareTable />}
      </main>
    </div>
  );
}

export default App;
