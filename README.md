# 💼 JobTrack — Modern Full-Stack Job Application Tracker

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready, SaaS-grade **Job Application Tracker** built with the **MERN Stack** (MongoDB, Express, React, Node.js) and styled with modern **Tailwind CSS v4**. Designed specifically as a showcase portfolio project for software engineering placements, demonstrating modular frontend design, secure JWT authentication, and clean RESTful API architecture.

---

## 🌟 Key Features

### 🖥️ Modern SaaS User Interface & Experience
- **Sleek Aesthetic**: Professional Indigo & Slate color palette inspired by modern tools like Linear and Stripe.
- **Inter Typography**: Clean visual hierarchy using Google's Inter font.
- **Responsive Layout**: Desktop sidebar navigation with active indicator pills and a collapsible mobile drawer for small screens.
- **Cards vs. Table View**: Toggle between responsive grid cards and a high-density data table on demand.

### 📊 Real-Time Analytics & Funnel
- **KPI Metrics**: Instant counts for Total Applications, Applied, Interviews, Offers / Selected, and Rejected.
- **Application Health Funnel**: Visual progress distribution bar and response/conversion rate calculator.
- **Recent Applications Feed**: Quick overview of recent submissions with company initial avatars and relative dates.

### 🔍 Search & Multi-Criteria Filtering
- **Live Search**: Instant keyword search across company name, job role, and custom notes.
- **Status Filter Pills**: Quick-filter by application stage with dynamic count badges.

### 🛡️ Polished Micro-Interactions & UX
- **Toast Notifications**: Smooth floating toast feedback for creation, updates, and deletion (replaces native alerts).
- **Confirmation Modals**: Accessible delete confirmation and edit modal dialogs with backdrop blur and ESC-key support.
- **Loading Skeletons**: Tailored animated skeleton loaders prevent layout shifts while fetching data.

### 🔒 Enterprise-Grade Authentication
- **Secure Sessions**: JSON Web Token (JWT) authentication with 7-day expiration.
- **Password Security**: Salted password hashing via `bcryptjs`.
- **Protected Routes**: Express middleware validates incoming requests before database access.

---

## 🏗️ Project Architecture

```
job-track/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Mongoose connection
│   ├── controllers/
│   │   ├── authController.js     # User registration and login logic
│   │   └── jobController.js      # Job applications CRUD controllers
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification middleware
│   ├── models/
│   │   ├── User.js               # User schema & credentials
│   │   └── jobApplication.js     # Job application schema (Company, Role, Status, Notes)
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── jobRoutes.js          # /api/jobs routes (protected)
│   ├── .env                      # Backend environment variables
│   ├── package.json
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── assets/               # Static assets & icons
    │   ├── components/
    │   │   ├── ui/               # Atomic design system components
    │   │   │   ├── Button.jsx    # Primary, secondary, outline, danger buttons
    │   │   │   ├── Input.jsx     # Form inputs with icons & validation
    │   │   │   ├── Modal.jsx     # Accessible dialogs with backdrop blur
    │   │   │   ├── Badge.jsx     # Status badges with dot indicators
    │   │   │   ├── Card.jsx      # Card container with header, content & footer
    │   │   │   ├── Dropdown.jsx  # Styled custom select menu
    │   │   │   ├── Loading.jsx   # Skeleton loaders & spinners
    │   │   │   └── Toast.jsx     # Floating toast notifications
    │   │   ├── layout/           # App shell layout
    │   │   │   ├── Navbar.jsx    # Sticky header with user profile menu
    │   │   │   ├── Sidebar.jsx   # Desktop sidebar & mobile drawer
    │   │   │   └── PageContainer.jsx # Main container orchestrating views
    │   │   ├── jobs/             # Job domain components
    │   │   │   ├── JobCard.jsx   # Card view with company avatar
    │   │   │   ├── JobForm.jsx   # Reusable Add & Edit form
    │   │   │   ├── JobTable.jsx  # Data table view
    │   │   │   ├── JobFilters.jsx# Search bar, pills & view toggle
    │   │   │   └── JobStatusBadge.jsx
    │   │   └── dashboard/        # Dashboard widgets
    │   │       ├── StatCard.jsx  # Metric cards
    │   │       ├── ApplicationChart.jsx # Pipeline funnel & distribution
    │   │       └── RecentApplications.jsx
    │   ├── context/
    │   │   └── ToastContext.jsx  # Global toast provider & useToast hook
    │   ├── hooks/
    │   │   └── useJobs.js        # Centralized job state management hook
    │   ├── pages/
    │   │   ├── DashboardPage.jsx # Analytics & overview page
    │   │   ├── ApplicationsPage.jsx # Full filterable applications list
    │   │   ├── AddApplicationPage.jsx # Dedicated submission page with tips
    │   │   ├── LoginPage.jsx     # SaaS sign-in card
    │   │   └── RegisterPage.jsx  # SaaS sign-up card
    │   ├── services/
    │   │   ├── api.js            # Axios/Fetch client with auth headers
    │   │   ├── authService.js    # Auth storage & session helper
    │   │   └── jobService.js     # Job API requests
    │   ├── utils/
    │   │   ├── constants.js      # Status colors, nav items & tokens
    │   │   └── formatters.js     # Date formatters & avatar colors
    │   ├── App.jsx               # Root component with routing state
    │   ├── index.css             # Tailwind v4 theme tokens
    │   └── main.jsx
    ├── index.html                # Google Font Inter preconnect
    ├── package.json
    └── vite.config.js
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@theme` tokens |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Backend Runtime** | [Node.js](https://nodejs.org/) |
| **Backend Framework** | [Express.js](https://expressjs.com/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud) / MongoDB Community |
| **ORM / ODM** | [Mongoose](https://mongoosejs.com/) |
| **Authentication** | [jsonwebtoken (JWT)](https://jwt.io/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) |

---

## ⚡ Prerequisites

Before running the project locally, make sure you have:

- **Node.js** (v18.0.0 or higher) — [Download Node.js](https://nodejs.org/)
- **npm** (comes packaged with Node.js)
- **MongoDB Database**:
  - A free cloud database on [MongoDB Atlas](https://www.mongodb.com/atlas) **(Recommended)**
  - OR a local MongoDB instance running on `mongodb://127.0.0.1:27017`

---

## 🚀 Quick Start & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/GauravGora/Job-Tracker.git
cd Job-Tracker
```

---

### 2. Backend Setup

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   ```

   > 💡 **MongoDB Atlas Note**: In your MongoDB Atlas dashboard under **Network Access**, ensure IP `0.0.0.0/0` is whitelisted so your application can connect.

4. Start the backend server:
   ```bash
   node server.js
   ```
   *Expected output:*
   ```text
   Server running on http://localhost:5000
   MongoDB connected successfully
   ```

---

### 3. Frontend Setup

1. Open a **second terminal** and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* If your backend is hosted on a custom port or domain, you can create a `.env` file in `frontend/`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173/   (or the port shown in your terminal)
   ```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Request Body |
|---|---|---|:---:|---|
| `POST` | `/auth/register` | Register a new user | ❌ No | `{ "name": "...", "email": "...", "password": "..." }` |
| `POST` | `/auth/login` | Login and receive JWT | ❌ No | `{ "email": "...", "password": "..." }` |

### 💼 Job Applications Endpoints

All job endpoints require header: `Authorization: Bearer <your_jwt_token>`

| Method | Endpoint | Description | Auth Required | Request Body |
|---|---|---|:---:|---|
| `GET` | `/jobs` | Retrieve all jobs for logged-in user | ✅ Yes | *None* |
| `POST` | `/jobs` | Create a new job application | ✅ Yes | `{ "company": "...", "role": "...", "status": "Applied", "notes": "..." }` |
| `PUT` | `/jobs/:id` | Update an existing job application | ✅ Yes | `{ "status": "Interview", "notes": "..." }` |
| `DELETE` | `/jobs/:id` | Delete a job application by ID | ✅ Yes | *None* |

---

## 🎨 Design System & Status Tokens

JobTrack enforces unified, semantic status styling throughout the application:

| Status | Color | Badge Background | Text Color | Dot Indicator |
|---|---|---|---|:---:|
| **Applied** | Blue | `#EFF6FF` (`bg-blue-50`) | `#1D4ED8` (`text-blue-700`) | 🔵 |
| **Interview** | Purple | `#FAF5FF` (`bg-purple-50`) | `#7E22CE` (`text-purple-700`) | 🟣 |
| **Selected / Offer** | Emerald Green | `#ECFDF5` (`bg-emerald-50`) | `#047857` (`text-emerald-700`) | 🟢 |
| **Rejected** | Rose Red | `#FFF1F2` (`bg-rose-50`) | `#BE123C` (`text-rose-700`) | 🔴 |
| **Pending** | Amber | `#FFFBEB` (`bg-amber-50`) | `#B45309` (`text-amber-700`) | 🟡 |

---

## 🧪 Production Build & Linting

### Build Frontend Bundle
```bash
cd frontend
npm run build
```
Creates an optimized production bundle in `frontend/dist/`.

### Run Linter
```bash
cd frontend
npm run lint
```
Runs `oxlint` across all source files.

---

## 💡 Resume & Interview Highlights

When talking about this project in technical interviews:

- **Separation of Concerns**: Refactored monolithic frontend state into isolated layers (API services, custom hooks, atomic UI components, and domain pages).
- **Modern State Management**: Implemented `useJobs` hook combining caching, optimistic updates, client-side searching, and real-time status counts.
- **Design Tokens**: Standardized CSS variables and Tailwind v4 `@theme` configuration to eliminate hardcoded random styles.
- **Defensive API Client**: Built centralized error interceptors that extract exact database and server errors and display accessible floating toasts.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).