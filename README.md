# UdyamSetu AI — Production Dashboard UI
> **Tagline:** *"From Business Idea to Financing Readiness"*  
> **Target Audience:** Rural & Semi-Urban Entrepreneurs, Self-Help Groups, and Farmer-Producer Entities.

---

## 🌟 Overview

**UdyamSetu AI** is an AI-powered hyper-local business advisory and financial structuring platform tailored for rural entrepreneurs in India (example persona: *Ramesh Yadav* from *Sadar, Varanasi, Uttar Pradesh*). 

The platform bridges the gap between an early business idea and bank financing readiness by providing:
1. **Hyper-local market intelligence:** 5 km radius map with demand clusters, mandi price curves, and competitor locations.
2. **Business recommendations:** Feasibility-ranked rural enterprises (Dairy farming, Vegetable processing units, Rural retail stores).
3. **Dynamic financial calculator & loan structuring:** Instant project cost, margin equity, term loan routing, and monthly EMI calculation.
4. **Government subsidy scheme matcher:** Integration of central/state schemes including **PMEGP**, **NABARD DEDS**, and **PMFME**.
5. **AI Business Advisor:** Conversational real-time guidance grounded in regional UP agricultural economics.
6. **One-click Feasibility & Financing Blueprint:** Print-ready, bank-submissible feasibility assessment with SWOT analysis and cashflow projections.

---

## 📁 Project Architecture & File Structure

```
udyamsetu-dashboard/
│
├── index.html          # Semantic HTML5 desktop/tablet/mobile structure & accessible modals
├── css/
│   └── style.css       # Design system tokens, 3-column responsive grid, and custom SVG visuals
├── js/
│   └── app.js          # Financial calculation engine, AI chat state machine, and interactive DOM
└── README.md           # Documentation, API hook guide, and configuration manual
```

---

## 🚀 How to Run the Application

The application is built using **pure HTML5, CSS3, and Vanilla JavaScript** with **zero heavy framework dependencies**.

### Quick Start:

1. **Option A — Direct Browser Access:**
   Simply double-click `index.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

2. **Option B — Local HTTP Server (Recommended):**
   Run via Python:
   ```bash
   python -m http.server 8080
   ```
   Or via Node.js `npx`:
   ```bash
   npx serve .
   ```
   Then open `http://localhost:8080` in your web browser.

---

## 🧮 Financial Calculation Engine (`js/app.js`)

The financial engine implements the official problem-statement formulas and parameters:

```javascript
function calculateFinancing(margin) {
  const marginPercentage = 0.10; // 10% entrepreneur equity
  const projectCost = margin / marginPercentage; // Total Capex
  const loanAmount = projectCost * 0.90;          // 90% Bank debt
  
  // Scheme routing
  if (projectCost <= 140000) {
    scheme = "Micro Finance Scheme"; // 6.5% interest, 3-year tenure, 3-month moratorium
  } else if (projectCost <= 5000000) {
    scheme = "Term Loan Scheme (NABARD / PMEGP)"; // 6.5% interest, 5-year tenure, 6-month moratorium
  }
  
  // Monthly Equated Monthly Installment (EMI) Formula:
  // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const P = loanAmount;
  const r = (annualInterestRate / 100) / 12;
  const n = tenureYears * 12;
  const monthlyEmi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
```

---

## 🎨 Where to Customize & Connect Backend APIs

### 1. Modifying Mock Data Store (`js/app.js` → `state`)
- **`state.user`**: User profile attributes (Name, district, block, equity margin, active business).
- **`state.businessIdeas`**: Recommended business ventures, success probability scores, expected ROI, and subsidy pipelines.
- **`state.schemes`**: Government schemes, maximum loan limits, subsidy percentages, and nodal agencies.
- **`state.marketCommodities`**: Regional mandi rates (Tomato, Cow Milk, Potato, Mustard Oil) and monthly wholesale trend coordinates.
- **`state.aiKnowledgeBase`**: Pre-configured regional question-answer corpus for the conversational assistant.

### 2. Connecting to REST/GraphQL APIs:
In `js/app.js`, replace the static mock data with asynchronous fetch calls:
```javascript
// Example API integration point:
async function fetchHyperLocalMarketData(district, block) {
  const response = await fetch(`/api/v1/market-intelligence?district=${district}&block=${block}`);
  const data = await response.json();
  updateMarketDashboard(data);
}
```

### 3. Replacing Images:
All image assets are configured in `index.html` and `js/app.js`:
- **Hero Agricultural Banner:** `index.html` (`.hero-bg-img`)
- **User Avatar:** `index.html` (`.user-avatar`)
- **Business Cards:** `js/app.js` (`state.businessIdeas[].image`)
- Replace the Unsplash URLs with local paths (e.g., `assets/images/farmer-hero.jpg`).

---

## 📱 Responsive Layout Specifications

- **Desktop (>= 1100px):** Strict 3-column side-by-side grid (`215px` Sidebar + `minmax(0, 1fr)` Main Content + `305px` Right AI Advisor/Schemes).
- **Tablet (768px – 1099px):** 2-column layout; Right Sidebar smoothly transforms into multi-column responsive cards beneath the main content.
- **Mobile (< 768px):** Left navigation collapses into a sliding drawer with top mobile app bar, stacked KPI cards, and touch-optimized action buttons.
