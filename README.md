# Food Verse — University Campus Dining Portal

**Food Verse** connects campus dining houses (**Cafe by the Valley** and **Atmosphere Cafe**) under one unified web portal with interactive animated ASCII showcases, flexible hostel & campus delivery scheduling, dark/light modes, UN SDG alignment views, and a dedicated kitchen dispatch backend.

---

## Folder Structure

The codebase is organized cleanly into two primary directories so frontend and backend assets are easy to locate and maintain:

```text
Food-Verse/
├── frontend/                           # Student-facing campus dining portal
│   ├── index.html                      # Main portal, dish showcase & unified menu explorer
│   ├── sdg.html                        # UN SDG 9, SDG 12 & SDG 3 alignment showcase
│   ├── restaurants/
│   │   ├── cafe-by-the-valley.html     # House 01 menu & interactive Huxley food stage
│   │   ├── atmosphere-cafe.html        # House 02 menu & interactive Huxley food stage
│   │   └── CBTV Menu.jpeg              # Source menu reference
│   └── assets/
│       ├── css/style.css               # Design tokens, editorial layout, light & dark modes
│       ├── images/                     # Institutional logos & editorial table photography
│       ├── js/
│       │   ├── foodverse-core.js       # Catalog (150 items), bag/checkout, sync & burger preloader
│       │   ├── foodverse-3d.js         # Animated ASCII culinary & SDG artwork engine
│       │   └── restaurant-page.js      # Sub-page split stage, filmstrip & categorized menus
│       └── vendor/                     # GSAP & ScrollTrigger libraries
├── backend/                            # Restaurant kitchen operations backend
│   ├── orders.html                     # Live Kitchen Orders Portal UI
│   ├── server.js                       # Zero-dependency Node.js static + REST API server
│   ├── package.json                    # Backend start script (`npm start`)
│   └── data/
│       └── orders.json                 # Persistent JSON store for received kitchen orders
├── index.html                          # Root entry redirect to frontend/index.html (for GitHub Pages)
└── .gitignore
```

---

## Key Features

### Frontend (`frontend/`)
- **Two Campus Kitchens**: Browse **150 dishes** across *Cafe by the Valley* (78 items) and *Atmosphere Cafe* (72 items), complete with multi-variant selectors, Veg/Non-Veg badges, prep times, and unified multi-kitchen bag checkout.
- **Delivery Modes & Flexible Scheduling**:
  - **Delivery to Hostels (+2% Maintenance)**: Supports Girls (*Celebrations, Aashiana Girls, Portofino, Private Villa, Residency Girls*) and Boys (*Club View, Aashiana Boys, Portofino, Private Villa, Residency Boys*) hostels with extended morning-to-late-night slots and an automatic **2%** maintenance fee calculation.
  - **Campus Drop (Zero Fee)**: Drop points at *Main Entrance Central Block*, *Main Entrance Management Block*, *Social Sphere*, and *Outside Learning Cafe*.
  - **Counter Pickup**: Express queue-free pickup using digital `FV-XXXX` passes.
- **Editorial Craft & Accessibility**:
  - `Cormorant Garamond` display typography paired with `Plus Jakarta Sans`.
  - Flicker-free **Light Mode / Dark Mode** persistence across pages.
  - Interactive animated ASCII showcase engine (`foodverse-3d.js`) and running ASCII burger preloader.
- **SDG Alignment Showcase (`frontend/sdg.html`)**: Bidirectional scroll choreography mapping Food Verse workflows to **UN SDG 09**, **SDG 12**, and **SDG 03**.

### Backend (`backend/`)
- **Kitchen Orders Portal (`backend/orders.html`)**:
  - Kitchen-focused header with live sync indicator and Light/Dark toggle.
  - Filter tickets by kitchen (*All*, *Cafe by the Valley*, *Atmosphere Cafe*), delivery mode, workflow status (*Pending -> Preparing -> Ready -> Completed / Cancelled*), or search by `FV-XXXX` token / student / roll number / dish.
  - Kitchen-scoped KPI ledger tracking received orders, active queue, 2% hostel maintenance fees, and gross volume.
  - Built-in sample order seeding, CSV export (`foodverse-orders.csv`), and real-time sync via `BroadcastChannel`, `storage` events, and the REST backend.
- **REST API (`backend/server.js`)**:
  - `GET /api/orders` — List persisted orders from `backend/data/orders.json`
  - `POST /api/orders` — Save a newly placed order
  - `PATCH /api/orders/:token` — Update ticket preparation status
  - `DELETE /api/orders` — Clear all stored orders

---

## Running Locally

Requires **Node.js** (no external `npm` dependencies required):

```bash
node backend/server.js
```

Or from inside the `backend` folder:

```bash
cd backend
npm start
```

Then open:
- **Student Frontend**: `http://127.0.0.1:3000/frontend/index.html` (or `http://127.0.0.1:3000/`)
- **Kitchen Backend Portal**: `http://127.0.0.1:3000/backend/orders.html`

---

## GitHub Pages Hosting

When GitHub Pages is enabled from branch **`main`** and folder **`/ (root)`**:
- **Frontend Portal**: `https://devarshp237.github.io/Food-Verse/` (automatically opens `frontend/index.html`)
- **Kitchen Backend Portal**: `https://devarshp237.github.io/Food-Verse/backend/orders.html`

*(On static GitHub Pages without a running Node process, placed orders and statuses automatically sync live across browser tabs via `localStorage` and `BroadcastChannel`.)*

---

## Author

Developed by **P. Devarsh**
