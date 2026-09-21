# Credenz Tech Dayz (CTD) — Frontend

Welcome to the official frontend repository for **Credenz Tech Dayz (CTD)**, the premier annual technical fest organized by the **PICT IEEE Student Branch (PISB)**.

This application is built with **React**, **Vite**, **Tailwind CSS**, and **JavaScript (JSX)**. It features a modern cosmic glassmorphic design with custom typography, glowing neon borders, single-screen responsive layouts, dynamic routing, and a modular architecture ready for backend and database integration.

---

## 📁 Complete Folder Structure

```
CTD Frontend/
├── public/                               # Static assets served directly
│   └── assets/
│       ├── backgrounds/
│       │   ├── main-background.png       # Crisp celestial background (Home page)
│       │   └── blurred-background.png    # Ambient blurred background (Internal pages)
│       ├── fonts/
│       │   ├── Aldrich-Regular.ttf       # Futuristic tech font (subtitles & badges)
│       │   ├── Tungsten-Bold.woff2       # Bold display font (headers & titles)
│       │   ├── TungstenCompressed-Bold.woff2
│       │   └── TungstenCondensed-Bold.woff2
│       └── logos/
│           ├── ctd-logo.png              # Official CTD outline logo
│           ├── pisb-logo.png             # PICT IEEE Student Branch white logo
│           └── ieee-logo.png             # IEEE official white logo
│
├── src/                                  # Application source code
│   ├── api/                              # Backend API client & services
│   │   ├── auth.js                       # Sign Up, Login, Forgot Password, Me endpoints
│   │   └── client.js                     # Central Axios client with JWT interceptor
│   │
│   ├── components/                       # Reusable UI components
│   │   └── common/
│   │       ├── Button.jsx                # Gradient pill action buttons with spinner
│   │       ├── EventIcons.jsx            # Custom neon SVG badges for events
│   │       ├── FormError.jsx             # Top-right Figma peach error notification card
│   │       ├── GeneralInstructionsModal.jsx # First-visit cosmic instructions modal popup
│   │       ├── Input.jsx                 # Glassmorphic input with icons & eye toggle
│   │       ├── Navbar.jsx                # Corner-aligned navbar with cart & profile menu
│   │       ├── Select.jsx                # Custom styled category dropdown
│   │       ├── SidebarDrawer.jsx         # Left-aligned slide-out mobile drawer
│   │       └── SocialLinks.jsx           # Floating Instagram & LinkedIn buttons
│   │
│   ├── context/                          # Global state management
│   │   ├── AuthContext.jsx               # User session, login, signup, and logout state
│   │   ├── CartContext.jsx               # Cart state, items storage, and event handlers
│   │   └── NotificationContext.jsx       # Global banner notifications & error toasts
│   │
│   ├── data/                             # Static event datasets & configurations
│   │   └── eventsData.js                 # Central single source of truth for all 5 CTD events
│   │
│   ├── pages/                            # Top-level route pages
│   │   ├── AboutPage.jsx                 # CTD & IEEE info (Single-screen desktop view)
│   │   ├── CartPage.jsx                  # Events in cart view & empty cart cosmic illustration
│   │   ├── DecodeRushPage.jsx            # Decode Rush legacy redirect handler
│   │   ├── EventDetailPage.jsx           # Dynamic individual event rules & registration
│   │   ├── EventsPage.jsx                # Grid view of all 5 Credenz Tech Dayz events
│   │   ├── ForgotPasswordPage.jsx        # Password recovery form with error banner
│   │   ├── HomePage.jsx                  # Hero section with instructions popup & dates
│   │   ├── LoginPage.jsx                 # Login card with validation & error handling
│   │   ├── ProfilePage.jsx               # User profile with verified & paid registered events
│   │   ├── SignUpPage.jsx                # User registration form with category select
│   │   ├── SponsorsPage.jsx              # Title & Co-Sponsor showcase
│   │   └── WebTeamPage.jsx               # Web team members showcase
│   │
│   ├── styles/                           # Global CSS & Tailwind utilities
│   │   └── globals.css                   # Custom @font-face, glassmorphism & neon glows
│   │
│   ├── App.jsx                           # Main router configuration & providers
│   │── main.jsx                          # React DOM mounting entry point
│   │
├── .env                                  # Local environment variables
├── .env.example                          # Environment template for backend URL
├── .gitignore                            # Git exclusion rules (node_modules, dist, env)
├── index.html                            # Root HTML template with preconnects & metadata
├── package.json                          # Project dependencies & npm scripts
├── postcss.config.js                     # PostCSS plugins (Tailwind CSS, Autoprefixer)
├── tailwind.config.js                    # Design tokens (colors, gradients, glows, fonts)
├── vercel.json                           # Vercel SPA rewrite routing configuration
└── vite.config.js                        # Vite bundler configuration & path aliases
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/suruchiwarke/CTD-Frontend.git
   cd "CTD-Frontend"
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the local Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Bundles the application for production inside the `dist/` directory. |
| `npm run preview` | Locally previews the production build. |

---

## 🌟 Implemented Pages & Features

### 1. Home Page (`/`)
- Displayed with the crisp `main-background.png`.
- Features the iconic **CREDENZ** gradient title (Tungsten bold) and **TECH DAYZ** subtitle.
- Event dates: **5 OCT - 7 OCT 2026** with a glowing gradient divider.
- **General Instructions Popup**: Automatically pops up on first visit with student category guidelines, team payment rules, cart instructions, and a "Got it →" dismiss button.
- Bottom-left floating **Instagram** and **LinkedIn** buttons + **Instructions** trigger.
- Bottom-right **— 2026** event tag.

### 2. About Us (`/about`)
- Designed as a **single-screen desktop view** with no vertical scrolling required.
- **CTD Overview**: Large CTD outline logo with techfest description.
- **IEEE Section**: Official white IEEE logo with organization overview.

### 3. Events & Event Detail Pages (`/events`, `/events/:eventId`)
- Displays all 5 Credenz Tech Dayz events:
  - **Reverse Coding** (Technical)
  - **Enigma** (Non-Technical)
  - **National Computing Contest - NCC** (Technical)
  - **Network Treasure Hunt - NTH** (Online Cryptic)
  - **Decode Rush** (Treasure Hunt)
- Dynamic individual event detail pages with event descriptions, eligibility, fees, rules, prizes, and contact persons.

### 4. Cart Page (`/cart`)
- Dedicated cart option in the navigation bar (`🛒 CART`) with glowing active underline.
- Centered glassmorphic card with neon pink/magenta border.
- Custom glowing empty cart illustration with radiating light rays when no events are added.
- Powered by `CartContext` for seamless event registration management.

### 5. Profile Page (`/profile`)
- Designed as a **single-screen desktop layout** with no scrolling.
- Displays user information: Avatar with initials and verified account badge, Full Name, Username, Registered Email, Academic Category (*Junior (FE/SE)* / *Senior (TE/BE)*), and Phone Number.
- **Registered Events Section**: Automatically lists confirmed events with `✓ Payment Verified` status badges once registered and verified by the backend.
- Clean canvas displayed when no events are registered.

### 6. Web Team (`/web-team`) & Sponsors (`/sponsors`)
- Web team member showcase with interactive social links.
- Title Sponsor and Co-Sponsor showcase sections.

### 7. Authentication Flows
- **Sign Up (`/signup`)**:
  - Fields: Username, Full Name, Email, Password, Phone Number, and Student Category (`FE`, `SE`, `TE`, `BE`, `Other`).
  - Creates user session with local storage fallback and REST backend compatibility.
- **Login (`/login`)**:
  - Requires sign-up first. Validates credentials and redirects upon success.
- **Forgot Password (`/forgot-password`)**:
  - Validates email existence and triggers recovery flow.
- **Corner Profile Avatar & Dropdown**:
  - Displays circular avatar with chevron dropdown indicator when logged in.
  - Dropdown menu contains links to **My Profile**, **My Cart**, and **Logout**.

### 8. Navigation & Mobile Responsiveness
- **Desktop Navbar**: Corner-aligned brand logos (left), center navigation links, and login / circular profile avatar with cart (right).
- **Mobile Drawer (`SidebarDrawer.jsx`)**: Left-aligned slide-out drawer with direct access to all pages, cart, profile, and social channels.

---

## 🔌 Backend & Database Integration Guide

The frontend is built with a decoupled API architecture in `src/api/` and `src/context/AuthContext.jsx`.

### Connecting to Live Backend:
1. Open `.env` (or copy from `.env.example`).
2. Set `VITE_API_BASE_URL` to the FastAPI server root (no path prefix):
   ```env
   VITE_API_BASE_URL=http://127.0.0.1:8000
   ```
3. The Axios client in `src/api/client.js` routes all requests to this URL, attaches the JWT Bearer token, reads FastAPI's `detail` for error messages, and on a 401 clears the session and redirects to `/login`.
4. The backend must allow CORS from the frontend origin (`http://localhost:3000` in dev).

### REST Endpoints Used:
- `POST /auth/register` — `{ name, username, email, phone, password, category: "junior"|"senior" }` (the sign-up form is mapped to this, then the user is logged in)
- `POST /auth/login` — `{ email, password }` → `{ access_token }`; the user is then loaded with `GET /auth/me`
- `POST /auth/reset-password` `{ email }` → `POST /auth/verify-otp` `{ email, otp }` → `POST /auth/change-password` `{ email, otp, newpassword }`
- `GET /cart/view`, `POST /cart/add-event`, `DELETE /cart/remove`, `POST /cart/checkout` `{ utr }` — events map to `rc` / `ncc` / `enigma` via `backendName` in `src/data/eventsData.js`
- `GET /profile/my-events`, `PUT /profile/change-teammate`

---

## 🚀 Deployment (Vercel)

The repository includes `vercel.json` configured for Single Page Application (SPA) routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

To deploy:
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com/).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Add `VITE_API_BASE_URL` under **Environment Variables** if your backend is live.
7. Click **Deploy**.

---

## 👥 Credits
Organized with ❤️ by **PICT IEEE Student Branch (PISB)**.
