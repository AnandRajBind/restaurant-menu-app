# Restaurant Menu Management System - Backend API

Production-grade, scalable, and modular Node.js/Express backend API for the Restaurant Menu Management System built as part of a technical assessment.

## 🚀 Tech Stack & Security Hardening

- **Runtime**: Node.js (>= 18.0.0, ES Modules)
- **Framework**: Express.js (v4) with `trust proxy` enabled
- **Database & ORM**: MongoDB Atlas, Mongoose (v8)
- **Security & Protection**:
  - **Helmet**: Secure HTTP Headers & CSP configuration
  - **NoSQL Injection Prevention**: `express-mongo-sanitize` stripping `$`/`.` operators
  - **Rate Limiting**: `express-rate-limit` protecting API endpoints against brute force
  - **Auth Security**: Short-lived JWT Access Tokens + HTTP-only Secure Refresh Tokens with Token Rotation & Bcrypt password hashing
  - **CORS**: Dynamic origin matching for Vercel/Render frontend integration
- **Logging & Diagnostics**: Centralized structured logger (`src/utils/logger.js`) & Morgan HTTP logger
- **API Documentation**: Swagger UI Express (`/api-docs`), Swagger JSDoc, and Postman Collection (`src/docs/postman_collection.json`)

---

## 📁 Architecture & Directory Structure

Follows standard **MVC (Model-View-Controller)** Architecture adhering to **SOLID principles** and **REST API conventions**.

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Mongoose MongoDB connection & disconnect events
│   │   ├── env.config.js     # Startup environment variable validation & health check
│   │   └── swagger.js        # OpenAPI 3.0 JSDoc configuration
│   ├── constants/
│   │   ├── httpStatus.js     # HTTP status code definitions
│   │   └── roles.js          # User roles enum ('Admin', 'User')
│   ├── controllers/
│   │   ├── auth.controller.js# Authentication HTTP handlers
│   │   ├── menu.controller.js# Menu CRUD HTTP handlers
│   │   └── upload.controller.js # Standalone file upload HTTP handlers
│   ├── docs/
│   │   └── postman_collection.json # Exportable Postman collection with test scripts
│   ├── middlewares/
│   │   ├── auth.middleware.js# Authentication & RBAC authorization middlewares
│   │   ├── error.middleware.js   # Centralized error handler
│   │   ├── notFound.middleware.js# 404 handler for unmapped routes
│   │   ├── rateLimiter.js        # IP rate limiting
│   │   ├── security.js           # Helmet, CORS & MongoDB sanitization
│   │   ├── upload.middleware.js  # Reusable Multer single file upload helper
│   │   └── validate.middleware.js# express-validator result handler
│   ├── models/
│   │   ├── menu.model.js     # Menu Schema with compound & text search indexes
│   │   └── user.model.js     # User Schema with password hashing hooks
│   ├── routes/
│   │   ├── auth.routes.js    # Auth endpoints (/api/v1/auth/*)
│   │   ├── health.routes.js  # System health check (/api/v1/health)
│   │   ├── menu.routes.js    # Menu CRUD endpoints (/api/v1/menu/*)
│   │   ├── upload.routes.js  # Upload endpoints (/api/v1/upload/*)
│   │   └── index.js          # Main API router aggregator
│   ├── services/
│   │   ├── auth.service.js   # Auth business logic & token rotation
│   │   ├── menu.service.js   # Menu CRUD, search, filter, sort & pagination logic
│   │   └── upload.service.js # Upload processing & image deletion logic
│   ├── utils/
│   │   ├── ApiError.js       # Standardized API Error class
│   │   ├── ApiResponse.js    # Standardized API Success Response wrapper
│   │   ├── asyncHandler.js   # Async error catch wrapper
│   │   ├── jwt.util.js       # JWT signing, verification & cookie helpers
│   │   └── logger.js         # Centralized structured logger
│   └── validators/
│       ├── auth.validator.js # Auth express-validator schemas
│       └── menu.validator.js # Menu express-validator schemas
│   ├── app.js                # Express app setup & middleware pipeline
│   └── server.js             # Server entry point & process signal management
├── uploads/                  # Local uploads directory with cache control
├── render.yaml               # Render 1-click infrastructure blueprint
├── .env.example              # Environment variables template
├── .gitignore                # Production gitignore rules
├── package.json              # Dependency manifest
└── README.md                 # Technical documentation
```

---

## ⚙️ Environment Variables Specification

Copy `.env.example` to create your local `.env` file:

```bash
cp .env.example .env
```

| Variable | Required | Description | Example / Default Value |
| :--- | :---: | :--- | :--- |
| `PORT` | No | HTTP listening port | `5000` |
| `NODE_ENV` | No | Environment mode (`development`/`production`) | `development` |
| `MONGODB_URI` | **Yes** | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db_name` |
| `CLIENT_URL` | **Yes** | Allowed CORS frontend origins (comma-separated) | `http://localhost:5173,https://your-app.vercel.app` |
| `JWT_SECRET` | Recommended | Fallback secret for JWT tokens | `super_secret_jwt_key` |
| `ACCESS_TOKEN_SECRET` | Recommended | Secret key for signing Access Tokens | `access_token_secret_key` |
| `ACCESS_TOKEN_EXPIRES_IN` | No | Access token lifespan | `15m` |
| `REFRESH_TOKEN_SECRET` | Recommended | Secret key for signing Refresh Tokens | `refresh_token_secret_key` |
| `REFRESH_TOKEN_EXPIRES_IN` | No | Refresh token lifespan | `7d` |

---

## 🛠️ Local Running Instructions

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Run in development mode** (hot-reloading with nodemon):
   ```bash
   npm run dev
   ```

3. **Run in production mode**:
   ```bash
   npm start
   ```

---

## 🧪 Postman API Testing Instructions

An exportable Postman collection is located at [`src/docs/postman_collection.json`](file:///d:/restaurant-menu-app/backend/src/docs/postman_collection.json).

### Step-by-Step Postman Testing Workflow:

1. **Import the Collection**:
   - Open Postman -> Click **Import** -> Select file `backend/src/docs/postman_collection.json`.

2. **Check System Health**:
   - Execute `1. System -> Get Health Status`. Verify HTTP `200 OK` response with `status: "UP"`.

3. **Register and Login Admin**:
   - Execute `2. Authentication -> Register Admin (Role: Admin)`.
   - Execute `2. Authentication -> Login Admin (Auto-Save Token)`.
   - *Note*: The test script automatically extracts `accessToken` and saves it to collection variable `accessToken`.

4. **Test Menu CRUD Operations**:
   - Execute `3. Menu Management -> Create Menu Item (Admin)`.
   - *Note*: The test script automatically saves created item ID into `menuId` collection variable.
   - Execute `3. Menu Management -> Get All Menu Items (Default)`.
   - Execute `3. Menu Management -> Search Menu Items (?search=pizza)`.
   - Execute `3. Menu Management -> Filter Menu Items (?category=Mains&available=true)`.
   - Execute `3. Menu Management -> Sort Menu Items by Price (?sortBy=price:asc)`.
   - Execute `3. Menu Management -> Paginate Menu Items (?page=1&limit=5)`.
   - Execute `3. Menu Management -> Get Single Menu Item by ID`.
   - Execute `3. Menu Management -> Update Menu Item (Admin)`.
   - Execute `3. Menu Management -> Delete Menu Item (Admin)`.

5. **Test Standalone Image Upload**:
   - Execute `4. File Upload -> Upload Image File` (Attach a sample `.jpg` or `.png` file in Form Data).
   - Execute `4. File Upload -> Delete Uploaded Image File`.

6. **Run Automated Collection Runner**:
   - Right-click **Restaurant Menu System API** collection -> Select **Run collection** -> Click **Run Restaurant Menu System API**.
   - All automated `pm.test()` assertions should pass (`Status code is 200/201`, `Auto-saves Access Token`, etc.).

---

## 📖 Interactive Swagger API Documentation

Access Swagger UI interactive docs at:
- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

---

## ☁️ Render Deployment Guide

### Option A: 1-Click Blueprint Deployment (Recommended)
1. Push repository to GitHub/GitLab.
2. In **Render Dashboard**, click **New +** -> **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` inside `backend/`.
4. Provide values for `MONGODB_URI` and `CLIENT_URL` in the Render dashboard prompt.

### Option B: Manual Web Service Setup
1. Create a new **Web Service** on Render.
2. Configure settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
3. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<Your MongoDB Atlas Connection String>`
   - `CLIENT_URL` = `<Your Vercel Deployed Frontend URL>`
   - `ACCESS_TOKEN_SECRET` = `<Strong Random 32+ Byte Key>`
   - `REFRESH_TOKEN_SECRET` = `<Strong Random 32+ Byte Key>`
