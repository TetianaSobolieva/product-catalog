import "./App.css";
import { useProducts } from "./hooks/useProducts";
import styles from "./App.module.css";
import type { Tab } from "./types/tab";
import { useState } from "react";
import { ProductCard } from "./components/ProductCard";

function App() {
  const { products, loading, error } = useProducts();

  const [activeTab, setActiveTab] = useState<Tab>("catalog");

  return (
    <div>
      <header className={styles.header}>
        <div>
          <span>◈</span>
          <span>Catalogr</span>
        </div>
        <nav>
          {(["catalog", "favorites", "compare"] as Tab[]).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}>
              {tab} 
              <span>0</span>
            </button>
          ))}
        </nav>
      </header>
      <main className={styles.main}>
        {activeTab === "catalog" && (
          <>
            {loading && (<p>Loading products…</p>)}
            {error && !loading && (
            <div>
                <p>Failed to load products</p>
                <p>{error}</p>
            </div>
            )}
            {!loading && !error && products.length === 0 && <p>No products.</p>}
            {!loading && !error && products.length > 0 && (
              <div>
                {products.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {activeTab === "favorites" && (
          <FavoritesTab />
        )}
        {activeTab === "compare" && (
          <CompareTab />
        )}
      </main>
    </div>
  );
}

export default App;
