# 🍽️ GourmetBite — Enterprise Restaurant Menu Management System

A production-grade, full-stack SaaS Restaurant Menu Management System engineered with **React 19**, **Node.js**, **Express**, **MongoDB**, and **JWT Authentication with HTTP-Only Refresh Tokens**.

---

## 🔑 Demo Credentials

To experience full Role-Based Access Control (RBAC), use the following credentials:

| Role | Account Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@gmail.com` | `Admin@123` | Full Menu CRUD, Price Updates, Image Uploads, Category Management |
| **User (Staff)** | *Public Registration* | *User Created* | Menu Catalog Browsing, Search, Filtering, Inventory Inspection |

> **🔒 Security Note**: Public user registration creates **User (Staff)** accounts exclusively. Admin accounts cannot be created from client-side forms or public API endpoints. Admin accounts are provisioned strictly via the backend Seed Script (`npm run seed`).

---

## ✨ Features & Architecture Highlights

### 🎨 Frontend Architecture
- **Framework**: React 19 + Vite + Tailwind CSS + Framer Motion.
- **Landing Page**: 11-section handcrafted SaaS entry point with natural typewriter animations, interactive dashboard hotspot preview, trusted metrics counters, and accordion FAQ.
- **Design System**: Harmonious HSL color palette (**Deep Orange `#EA580C`**, **Emerald `#059669`**, **Slate `#0F172A`**), glassmorphism overlays, and dark mode theme switching.
- **Role-Based Explicit Routes**: Direct dynamic routing to `/admin/dashboard` or `/user/dashboard` based on JWT role claim.
- **State & Resilience**: Context API with `useCallback` cleanup to eliminate memory leaks, paired with Axios transparent HTTP-only refresh token interceptors.

### 🛡️ Backend Architecture
- **Framework**: Node.js + Express (ES Modules) + Mongoose ODM.
- **Database**: MongoDB Atlas with indexing on `email` and `category` fields.
- **Security & Enforcements**:
  - `bcryptjs` 10-round salted password hashing via Mongoose schema pre-save hooks.
  - Server-enforced role assignment (`ROLES.USER`) during public registration (client-sent `role` values are safely ignored).
  - Rate limiting via `express-rate-limit` and HTTP header hardening via `helmet`.
- **API Documentation**: Interactive Swagger UI at `/api-docs` and imported Postman Collection v2.1.

---

## 📁 Project Directory Structure

```
restaurant-menu-app/
├── backend/
│   ├── scripts/
│   │   └── seedAdmin.js          # Standalone initial Admin database seed script
│   ├── src/
│   │   ├── config/               # Database, Swagger, & Env configurations
│   │   ├── constants/            # HTTP status codes & Role constants
│   │   ├── controllers/          # Request handlers (Auth, Menu, Upload)
│   │   ├── docs/                 # Postman Collection JSON & Swagger specs
│   │   ├── middlewares/          # JWT Auth, RBAC, Error Boundary, & Multer
│   │   ├── models/               # Mongoose User & Menu schemas
│   │   ├── routes/               # API Router endpoints
│   │   ├── services/             # Business logic layer
│   │   ├── utils/                # JWT helpers, ApiError, & ApiResponse
│   │   └── validators/           # Express-validator schema rules
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/           # Layout, Header, Sidebar, & EmptyState
    │   │   └── ui/               # Reusable UI primitives (Button, Card, Input, Badge, Modal)
    │   ├── context/              # AuthContext & ThemeContext providers
    │   ├── features/
    │   │   ├── auth/             # LoginPage & RegisterPage
    │   │   ├── categories/       # Categories Breakdown Page
    │   │   ├── dashboard/        # Dashboard stats & metrics grid
    │   │   ├── landing/          # 11-section Landing Page & subcomponents
    │   │   ├── menu/             # MenuCard, MenuTable, & MenuFormModal
    │   │   └── settings/         # Production-ready System Settings Page
    │   ├── hooks/                # Custom hooks (useAuth, useTheme, useDebounce)
    │   ├── routes/               # AppRoutes & ProtectedRoute guards
    │   └── services/             # Axios API client & endpoints
    └── package.json
```

---

## 🛠️ Installation & Quick Start

### 1. Clone Repository & Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

---

### 2. Environment Configuration

Copy the example environment files:

```bash
# Backend (.env)
cp backend/.env.example backend/.env

# Frontend (.env)
cp frontend/.env.example frontend/.env
```

#### Backend `.env` Key Settings:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/restaurant_menu_db
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_jwt_key
ACCESS_TOKEN_SECRET=your_access_token_secret_key
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret_key
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

### 3. Create Initial Admin Account (Seed Script)

Run the backend seed script to create the initial System Administrator account:

```bash
cd backend
npm run seed
```

Output:
```text
[Database] MongoDB connected successfully! Host: 127.0.0.1
Admin created successfully.
[Database] MongoDB connection closed gracefully.
```

*(Note: Running `npm run seed` multiple times is idempotent and safely prints `"Admin already exists."`)*

---

### 4. Run Development Servers

#### Start Backend API Server:
```bash
cd backend
npm run dev
```
- **Backend Base URL**: `http://localhost:5000/api/v1`
- **Swagger Documentation**: `http://localhost:5000/api-docs`

#### Start Frontend Application:
```bash
cd frontend
npm run dev
```
- **Public Landing Page**: `http://localhost:5173/`

---

## 📖 API Documentation & Postman Collection

### Interactive Swagger UI
Explore and execute live API calls via Swagger UI at:
`http://localhost:5000/api-docs`

### Postman Collection
Import the ready-to-run Postman collection located at:
`backend/src/docs/postman_collection.json`

The collection includes automated test scripts, environment token auto-saving, and test suites for:
- Public User Registration (Role forced to `User`)
- Admin Role Override Security Check (Payload `role: Admin` safely saved as `User`)
- Login & JWT Token Rotation
- Menu CRUD, Pagination, Search, Filter, & Image Upload

---

## 🚀 Production Deployment Guide

### Backend (Render / Railway / DigitalOcean)
1. Deploy `backend` folder as a Node.js web service.
2. Set Environment Variables (`MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, etc.).
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Run Seed Script in terminal: `npm run seed`

### Frontend (Vercel / Netlify)
1. Deploy `frontend` folder as a Single Page Application (SPA).
2. Set Environment Variable: `VITE_API_URL=https://your-backend-api.onrender.com/api/v1`
3. Set Build Command: `npm run build`
4. Set Output Directory: `dist`

---

## 🔮 Future Roadmap & Improvements

- [ ] **Multi-Tenant Support**: Multi-restaurant tenant segregation for enterprise franchises.
- [ ] **Real-time Order Processing**: WebSockets integration for real-time kitchen display screens (KDS).
- [ ] **QR Code Menu Generator**: Automated PDF & SVG QR code export for restaurant dining tables.
