# Restaurant Menu Management System - Backend API

Production-ready, scalable, and modular Node.js/Express backend API for the Restaurant Menu Management System built as part of a technical assessment.

## 🚀 Tech Stack

- **Runtime**: Node.js (>= 18.0.0, ES Modules)
- **Framework**: Express.js (v4)
- **Database & ORM**: MongoDB Atlas, Mongoose (v8)
- **Security**: Helmet, Express Rate Limit, CORS, bcryptjs, JSON Web Token (JWT)
- **Logging & Utilities**: Morgan, Cookie Parser, Multer
- **API Documentation**: Swagger UI Express, Swagger JSDoc

---

## 📁 Project Architecture & Folder Structure

Follows standard **MVC (Model-View-Controller)** / Tiered Layer Architecture adhering to **SOLID principles** and **REST API conventions**.

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Production Mongoose connection & pool events
│   │   └── swagger.js        # OpenAPI 3.0 JSDoc specification
│   ├── constants/
│   │   └── httpStatus.js     # Standardized HTTP status codes
│   ├── controllers/          # Request handler controllers
│   ├── docs/                 # Swagger annotations & external docs
│   ├── middlewares/
│   │   ├── error.middleware.js   # Production-safe error handler
│   │   ├── notFound.middleware.js# 404 handler for unknown routes
│   │   ├── rateLimiter.js        # Rate limiting middleware
│   │   └── security.js           # Helmet & dynamic CORS configuration
│   ├── models/               # Mongoose schemas & data models
│   ├── routes/
│   │   ├── index.js          # Main API v1 router
│   │   └── health.routes.js  # System health check route (/api/v1/health)
│   ├── services/             # Core business logic services
│   ├── utils/
│   │   ├── ApiError.js       # Custom ApiError class extending Error
│   │   ├── ApiResponse.js    # Standardized API response structure
│   │   └── asyncHandler.js   # Higher-order async route wrapper
│   ├── validators/           # Schema request validation middlewares
│   ├── app.js                # Express app setup & middleware pipeline
│   └── server.js             # Entry point: process management & server bootstrap
├── uploads/                  # Deployment-friendly local uploads directory
├── .env.example              # Environment variables template
├── .gitignore                # Production gitignore
├── package.json              # ES Module configuration & dependencies
└── README.md                 # Project documentation
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the `backend/` root directory by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example Value |
| :--- | :--- | :--- |
| `PORT` | HTTP Server listening port | `5000` |
| `NODE_ENV` | Application environment (`development` / `production`) | `development` |
| `MONGODB_URI` | MongoDB Atlas Connection String | `mongodb+srv://user:pass@cluster.mongodb.net/db_name` |
| `CLIENT_URL` | Allowed CORS frontend origins (comma-separated for multi-origin support) | `http://localhost:5173` |
| `JWT_SECRET` | Secret key used for signing JWT access tokens | `your_jwt_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiration duration | `7d` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | `900000` (15 min) |
| `RATE_LIMIT_MAX` | Max requests per IP within rate limit window | `100` |

---

## 🛠️ Local Installation & Running

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server** (with nodemon hot-reload):
   ```bash
   npm run dev
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 📖 Interactive API Documentation

Once the server is running, access Swagger UI documentation at:

- **Swagger UI**: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)
- **Health Check Endpoint**: [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)

---

## ☁️ Deployment Guide

### Deploying to Render (Backend)

1. Connect your repository to **Render**.
2. Create a new **Web Service**.
3. Set the build and start settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. Configure Environment Variables in Render Dashboard:
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `<Your MongoDB Atlas Connection String>`
   - `CLIENT_URL` = `<Your Vercel Frontend Deployment URL>` (e.g. `https://your-app.vercel.app`)
   - `JWT_SECRET` = `<Production Strong Secret>`

### Deploying to Vercel (Frontend Integration)

When configuring the frontend on Vercel:
- Set environment variable `VITE_API_URL` to your Render backend URL (e.g. `https://your-backend.onrender.com/api/v1`).
- Ensure `CLIENT_URL` on Render matches your deployed Vercel domain to prevent CORS issues.
