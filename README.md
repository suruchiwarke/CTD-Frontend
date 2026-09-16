# Credenz Tech Dayz (CTD) — Frontend

Welcome to the official frontend repository for **Credenz Tech Dayz (CTD)**, the premier annual technical fest organized by the **PICT IEEE Student Branch (PISB)**.

This application is built with **React**, **Vite**, **Tailwind CSS**, and **JavaScript (JSX)**. It features a modern cosmic glassmorphic design with custom typography, glowing neon borders, responsive layouts, and a modular architecture ready for backend and database integration.

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
│   │       ├── FormError.jsx             # Top-right Figma peach error notification card
│   │       ├── Input.jsx                 # Glassmorphic input with icons & eye toggle
│   │       ├── Navbar.jsx                # Corner-aligned navbar with responsive menu
│   │       ├── Select.jsx                # Custom styled category dropdown
│   │       ├── SidebarDrawer.jsx         # Left-aligned slide-out mobile drawer
│   │       └── SocialLinks.jsx           # Floating Instagram & LinkedIn buttons
│   │
│   ├── context/                          # Global state management
│   │   ├── AuthContext.jsx               # User session, login, signup, and logout state
│   │   ├── CartContext.jsx               # Cart state, items storage, and event handlers
│   │   └── NotificationContext.jsx       # Global banner notifications & error toasts
│   │
│   ├── pages/                            # Top-level route pages
│   │   ├── AboutPage.jsx                 # CTD & IEEE info (Single-screen desktop view)
│   │   ├── CartPage.jsx                  # Events in cart view & empty cart cosmic illustration
│   │   ├── EventsPage.jsx                # Events title with empty canvas for teammates
│   │   ├── ForgotPasswordPage.jsx        # Password recovery form with error banner
│   │   ├── HomePage.jsx                  # Hero section with CREDENZ title & dates
│   │   ├── LoginPage.jsx                 # Login card with validation & error handling
│   │   ├── SignUpPage.jsx                # User registration form with category select
│   │   ├── SponsorsPage.jsx              # Title & Co-Sponsor sections for teammates
│   │   └── WebTeamPage.jsx               # Web team title with empty canvas for teammates
│   │
│   ├── styles/                           # Global CSS & Tailwind utilities
│   │   └── globals.css                   # Custom @font-face, glassmorphism & neon glows
│   │
│   ├── App.jsx                           # Main router configuration & providers
│   └── main.jsx                          # React DOM mounting entry point
│
├── .env                                  # Local environment variables
├── .env.example                          # Environment template for backend URL
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

1. Clone or navigate to the project root directory:
   ```bash
   cd "CTD Frontend"
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
- Bottom-left floating **Instagram** and **LinkedIn** buttons.
- Bottom-right **— 2026** event tag.

### 2. About Us (`/about`)
- Designed as a **single-screen desktop view** with no vertical scrolling required.
- **CTD Overview**: Large CTD outline logo with techfest description.
- **IEEE Section**: Official white IEEE logo with organization overview.

### 3. Events Page (`/events`)
- Displays the **EVENTS** title with glowing gradient underline.
- Clean canvas prepared for teammates to add their event cards.

### 4. Web Team Page (`/web-team`)
- Displays the **WEB TEAM** title with glowing gradient underline.
- Clean canvas prepared for teammates to add team member components.

### 5. Sponsors Page (`/sponsors`)
- Displays **Title Sponsor** and **Co-Sponsor** headings with glowing underlines.
- Clean canvas prepared for teammates to add sponsor logos and links.

### 6. Authentication Flows
- **Sign Up (`/signup`)**:
  - Fields: Username, Full Name, Email, Password, Phone Number, and Student Category (`FE`, `SE`, `TE`, `BE`, `Other`).
  - Creates the user in local state / database.
- **Login (`/login`)**:
  - Requires sign-up first. If an unregistered email attempts login, it alerts: `"No account found with this email. Please sign up first."`
  - Validates password against the registered account.
- **Forgot Password (`/forgot-password`)**:
  - Validates email existence and triggers password recovery instructions.
- **Top-Right Profile Icon**:
  - Once logged in, only a **circular profile avatar icon** appears at the top-right corner.
  - Clicking it opens a dropdown menu displaying user details and a **Logout** button.

### 7. Figma Error Banner (`FormError.jsx`)
- Reusable top-right notification matching Figma `Screenshot 2026-09-11 181114.png`.
- Styled with warm peach background (`#F8DFD4`), dark crimson border (`#8B2626`), circled cross icon, and dark red uppercase text.

### 8. Navigation & Links
- **CTD Logo** $\rightarrow$ `/` (Internal Home navigation).
- **PICT IEEE Logo** $\rightarrow$ `https://pictieee.in/` (Opens in new tab).
- **Instagram Logo** $\rightarrow$ `https://www.instagram.com/pictieee/?hl=en` (Opens in new tab).
- **LinkedIn Logo** $\rightarrow$ `https://www.linkedin.com/company/pisbieee/posts/?feedView=all` (Opens in new tab).
- **Hamburger Menu (3 Lines)** $\rightarrow$ Appears in top-right for Auth pages and mobile viewports with left-aligned navigation links.

---

## 🔌 Backend & Database Integration Guide

The frontend is built with a decoupled API architecture in `src/api/` and `src/context/AuthContext.jsx`.

### Connecting to Live Backend:
1. Open `.env` (or copy from `.env.example`).
2. Set `VITE_API_BASE_URL` to your backend API base endpoint:
   ```env
   VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
   ```
3. The Axios client in `src/api/client.js` automatically routes all requests to this endpoint with automatic JWT Bearer token attachment and unified error handling.

### Expected REST Endpoints:
- `POST /auth/signup` — `{ username, fullName, email, password, phoneNumber, category }`
- `POST /auth/login` — `{ email, password }`
- `POST /auth/forgot-password` — `{ email }`
- `GET /auth/me` — Returns current authenticated user object

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
