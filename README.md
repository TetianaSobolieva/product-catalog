📦 Product Catalog App

A simple and responsive Product Catalog built with React + TypeScript.
The app fetches products from a public API and provides search, filtering, sorting, favorites, and comparison features.

🚀 Live Demo

(optional) Add deployed link here
Example: https://your-app-link.com

⚙️ Tech Stack
React
TypeScript
Vite
CSS (no UI frameworks)
Native browser APIs (localStorage)
📌 Features
📦 Product Listing

Fetches products from:

https://dummyjson.com/products?limit=30
Displays product cards with:
Image
Title
Brand
Category
Price
Discount percentage (if available)
Rating
Stock status
🔎 Search

Search products by:

Title
Brand
Category
🎛 Filters
Filter by category
Show only in-stock products
Show only discounted products
↕️ Sorting
Price: low → high
Price: high → low
Rating: high → low
Title: A → Z
⭐ Favorites
Add/remove products to favorites
Favorites displayed in a separate section
Stored in localStorage
Persist after page reload
⚖️ Compare Products
Select up to 3 products
Comparison table includes:
Title
Price
Rating
Stock
Category
Discount percentage
Prevents selecting more than 3 items with warning message
📱 UI / UX
Responsive design:
Grid layout on desktop
Single column on mobile
Clear visual states for:
Favorites
Compare selection
Accessible controls (buttons, labels, keyboard support)
🔄 State Handling
Products stored as source of truth
All filters/sorting are derived (not stored)
Favorites and compare use product IDs
Clean separation of UI and data logic using custom hooks
▶️ How to Run the Project
1. Clone repository
git clone https://github.com/TetianaSobolieva/product-catalog.git
2. Navigate to project
cd product-catalog
3. Install dependencies
npm install
4. Run development server
npm run dev
5. Build for production
npm run build
❗ What was skipped

Due to time constraints:

No pagination (only 30 products are loaded)
No backend caching layer
No advanced animations library
⚠️ Known issues
Compare limit uses alert() instead of custom modal
No debounce implemented for search input
No persistent storage for compare list (optional feature not implemented)
💡 What I would improve with more time
Add debounce to search input
Replace alerts with UI modal system
Persist compare list in localStorage
Add unit tests (React Testing Library)
Improve accessibility (ARIA roles, better focus management)
Add skeleton loaders instead of simple spinner
Add pagination or infinite scroll
🧠 Architecture Notes
Custom hook useProducts handles data fetching
UI state is separated from derived state
Filtering and sorting are computed via useMemo
Favorites and compare are stored as ID arrays (normalized state)
👨‍💻 Author Notes

This project was built as a frontend test task to demonstrate:

React component structure
State management without external libraries
Derived data patterns
Clean and scalable architecture
Basic UX and responsiveness principles