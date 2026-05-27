# 📦 Product Catalog App

A responsive Product Catalog built with **React + TypeScript + React Router + Context API**.  
The app fetches products from a public API and provides search, filtering, sorting, favorites, and product comparison features.

---

## 🚀 Live Demo

👉 [DEMO](https://tetianasobolieva.github.io/product-catalog/#/)

---

## ⚙️ Tech Stack

- React
- TypeScript
- Vite
- React Router DOM
- Context API (global state management)
- CSS Modules (no UI frameworks)
- Native browser APIs (localStorage)

---

## 📌 Features

### 📦 Product Listing
Fetches products from:
- https://dummyjson.com/products?limit=30
Displays product cards with:
- Image
- Title
- Brand
- Category
- Price
- Discount percentage
- Rating
- Stock status

---

## 🔎 Search

Search products by:

- Title
- Brand
- Category

---

## 🎛 Filters

- Filter by category
- Show only in-stock products
- Show only discounted products

---

## ↕️ Sorting

- Price: low → high
- Price: high → low
- Rating: high → low
- Title: A → Z

---

## 🧭 Routing (React Router)

The app has 3 main pages:

| Route | Page |
|------|------|
| `/` | Product catalog |
| `/favorites` | Saved products |
| `/compare` | Product comparison |

- Unknown routes redirect to `/`
- Navigation uses `NavLink` with active styles

---

## 🧠 State Management (Context API)

All global state is handled via `ProductContext`.

### Stored in context:

- Products (API data)
- Search query
- Filters
- Favorites (localStorage)
- Compare list (localStorage)
- Toast notifications

### Derived state:

- Filtered & sorted products
- Categories list
- Favorites list
- Compare products

### Benefits:

- No prop drilling
- Centralized logic
- Cleaner page components

---

## ⭐ Favorites

- Add/remove products to favorites
- Stored in `localStorage`
- Persisted after reload
- Available at `/favorites`

---

## ⚖️ Compare Products

- Compare up to **3 products**
- Includes:
- Price
- Rating
- Stock
- Category
- Discount
- Prevents selecting more than 3 items
- Shows toast warning
- Available at `/compare`

---

## 📱 UI / UX

- Responsive design:
- Grid layout (desktop)
- Single column (mobile)
- UI states:
- Loading
- Empty state
- Error state
- Fully keyboard accessible:
- Buttons
- Focus styles
- ARIA labels

---

## 🔄 Architecture Overview
API layer → useProducts
State layer → ProductContext
Storage layer → useLocalStorage
Logic layer → utils/
UI layer → components/
Routing → React Router pages

---

## ▶️ How to Run

```bash
git clone https://github.com/TetianaSobolieva/product-catalog.git
cd product-catalog
npm install
npm run dev

## Build
npm run build

 ## ❗ Known Limitations
No pagination (30 products only)
No backend caching
Search has no debounce
Compare is not persisted after refresh
## 💡 Future Improvements
Add debounce to search
Replace toast with modal system
Add unit tests (React Testing Library)
Improve accessibility (focus trap, ARIA improvements)
Add skeleton loaders
Add pagination / infinite scroll
## 🧠 Architecture Notes
React Router for page structure
Context API replaces prop drilling
useMemo used for derived state
Favorites/compare stored as ID arrays
Clear separation of:
API logic
UI components
State management
## 👨‍💻 Author

Built as a frontend portfolio project to demonstrate:

React + TypeScript architecture
Context API state management
React Router navigation
Scalable component structure
Real-world UI patterns
