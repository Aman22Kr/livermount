# LiverMount — Furniture & Home Decor Marketplace

> **Live Reference Recreation:** Inspired by [Pepperfry](https://www.pepperfry.com/)  
> **Brand Name:** LiverMount  
> **GitHub User:** [Aman22kr](https://github.com/Aman22kr)  
> **Repository:** `livermount`  
> **Live Site URL:** `https://Aman22kr.github.io/livermount/`  

---

## 🛋️ About LiverMount

**LiverMount** is a high-fidelity, multi-page static web application recreating the rich shopping experience of India's leading furniture and home decor marketplace. It showcases handcrafted solid wood furnishings (Sheesham and Teak wood), contemporary sectional sofas, bedroom sanctuaries, modular dining sets, and artisanal home lighting.

### Key Highlights & Features
- **Accurate Brand & Visual Design:** Pepperfry-inspired warm terracotta (`#ff5f15`) and deep slate palette, typography hierarchy (`Plus Jakarta Sans`), generous product photography, and zero-clutter layout.
- **Multi-Page Architecture (React Router with Hash Routing):**
  - **Homepage (`#/`):** Festive campaign hero showcase, quick category visual grid, Deal of the Day live countdown, tabbed best sellers, offline Studio spotlight, verified customer testimonials, and master woodcraft tour section.
  - **Category & Catalog (`#/products`, `#/category/:categorySlug`):** Dynamic multi-facet filters (Price slider, Material, Brand, Minimum Rating), sort options (Price, Rating, Discount), and 3/4 column grid toggle.
  - **Product Detail Page (`#/product/:productId`):** High-res interactive image gallery, color/finish variant selector, live 6-digit Indian Pincode delivery and free assembly estimator, EMI calculator, product specifications diagram, and verified review submission form.
  - **Cart & Checkout (`#/cart`, `#/checkout`):** Itemized quantities, coupon code validator (`LIVERMOUNT10`, `FESTIVE25`, `FIRSTHOME`), free doorstep shipping & assembly calculations, shipping address manager, payment method selection, and celebratory post-purchase confirmation with order receipt.
  - **Track Order (`#/track-order`):** Visual shipment timeline (Confirmed → Kiln Quality Check → Dispatched → Out for Delivery → Free Assembly) with Order ID search.
  - **Experience Studios (`#/studios`):** Filter by city (Mumbai, Bengaluru, Delhi NCR, Pune, Hyderabad, Chennai) with interactive 3D digital room design appointment booking modal.
  - **Brand Story & Craftsmanship (`#/about`):** Timber sourcing, vacuum kiln seasoning process, and ethical woodcraft commitment.
  - **Help & FAQs (`#/faq`):** Searchable accordion categorized across Ordering, Shipping, Warranty, and 7-Day Returns.
  - **Contact & Support (`#/contact`):** Toll-free helpline (1800-419-6666), WhatsApp desk, and feedback ticket system.
  - **User Account (`#/account`):** Saved profile, persistent order history, and address book.
  - **Search Page (`#/search`):** Real-time search across products, timber types, and descriptions.
  - **Offers & Clearance (`#/offers`):** Bank partner cards, instant coupon copy tools, and clearance deals.
  - **Not Found Page (`#/404`):** Graceful 404 handler with quick recovery routes.
- **Explicit Prompt Feature Integrations:**
  - **Bottom Advertisement Strip:** Every page includes a dedicated sponsored offer section before the footer.
  - **Video Showcase Square:** A designated blank square space for video demonstrations, adhering strictly to the prompt requirement.
- **LocalStorage Data Persistence:**
  - Cart items, quantities, and chosen finishes
  - Saved Wishlist
  - Search history and recent queries
  - Saved shipping addresses
  - Completed orders and tracking status
  - User-submitted verified reviews

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/Aman22kr/livermount.git
cd livermount
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Deployment to GitHub Pages

The application is configured to deploy directly to GitHub Pages as a static Single Page Application using `HashRouter` and relative asset paths (`base: './'`).

### Method 1: Automated Deployment via `gh-pages`

1. Ensure the `homepage` in `package.json` matches your GitHub repository:
   ```json
   "homepage": "https://Aman22kr.github.io/livermount/"
   ```
2. Build and publish with one command:
   ```bash
   npm run deploy
   ```
3. In your GitHub repository:
   - Navigate to **Settings > Pages**
   - Under **Build and deployment > Source**, ensure **Deploy from a branch** is selected with branch `gh-pages` and folder `/ (root)`.

---

### Method 2: Deployment via GitHub Actions Workflow

In `.github/workflows/deploy.yml`:

```yaml
name: Deploy LiverMount to GitHub Pages

on:
  push:
    branches:
      - main
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm install

      - name: Build static site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **Vite 8** | High-performance build tool & local dev server |
| **React 19** | Modular UI component architecture |
| **Tailwind CSS 4** | Utility-first responsive styling system |
| **React Router 7** | Client-side page navigation with HashRouter |
| **Lucide React** | Clean, accessible vector icons |
| **Canvas Confetti** | Joyful celebratory micro-interaction on order checkout |
| **Browser LocalStorage**| Persistent client-side cart, wishlist, orders, and addresses |

---

## 💡 Demo Limitations & Disclaimer
- **Data Persistence:** All orders, cart items, addresses, and wishlist entries persist exclusively inside your local browser's `localStorage`. No actual server payment or credit card processing takes place.
- **Simulated Order Processing:** Mock orders generate realistic Order IDs and tracking steps for demonstration purposes.

---

Designed and crafted for **Aman22kr** · © 2026 LiverMount Lifestyle Ltd.
