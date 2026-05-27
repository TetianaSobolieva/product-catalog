import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import { useProductContext } from "./context/useProductContext";

import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import FavoritesSection from "./components/FavoritesSection";
import CompareTable from "./components/CompareTable";
import Toast from "./components/Toast";

import styles from "./App.module.css";

function App() {
  const {
    search,
    setSearch,

    filters,
    handleFilterChange,
    resetFilters,

    categories,
    visibleProducts,

    loading,
    error,

    favorites,
    favoriteIds,
    toggleFavorite,

    compareIds,
    toggleCompare,
    removeCompare,

    toast,
    setToast,

    products,
  } = useProductContext();

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◈</span>
            <span className={styles.logoText}>Catalogr</span>
          </div>

          <nav className={styles.tabs} aria-label="App sections">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
            >
              Catalog
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
            >
              Favorites
              {favorites.length > 0 && (
                <span className={`${styles.tabBadge} ${styles.tabBadgeHeart}`}>
                  {favorites.length}
                </span>
              )}
            </NavLink>

            <NavLink
              to="/compare"
              className={({ isActive }) =>
                isActive ? `${styles.tab} ${styles.tabActive}` : styles.tab
              }
            >
              Compare
              {compareIds.length > 0 && (
                <span
                  className={`${styles.tabBadge} ${styles.tabBadgeCompare}`}
                >
                  {compareIds.length}
                </span>
              )}
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={styles.controls}>
                  <SearchBar value={search} onChange={setSearch} />

                  <Filters
                    categories={categories}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onReset={resetFilters}
                    resultCount={visibleProducts.length}
                  />
                </div>

                {loading && (
                  <div className={styles.stateBox} role="status">
                    <div className={styles.spinner} />
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
                  <div className={styles.stateBox}>
                    <span className={styles.stateIcon}>◎</span>

                    <p>No products match your filters.</p>

                    <button className={styles.stateBtn} onClick={resetFilters}>
                      Reset filters
                    </button>
                  </div>
                )}

                {!loading && !error && visibleProducts.length > 0 && (
                  <div className={styles.grid}>
                    {visibleProducts.map((product, i) => (
                      <div
                        key={product.id}
                        style={{
                          animationDelay: `${Math.min(i * 0.04, 0.6)}s`,
                        }}
                      >
                        <ProductCard
                          product={product}
                          isFavorite={favoriteIds.includes(product.id)}
                          isCompared={compareIds.includes(product.id)}
                          compareCount={compareIds.length}
                          onToggleFavorite={toggleFavorite}
                          onToggleCompare={toggleCompare}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            }
          />

          <Route path="/favorites" element={<FavoritesSection />} />

          <Route path="/compare" element={<CompareTable />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Toast message={toast} onDismiss={() => setToast("")} />
    </div>
  );
}

export default App;
