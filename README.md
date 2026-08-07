# GourmetBite — Enterprise Restaurant Menu Management System

A production-grade, full-stack SaaS Restaurant Menu Management System built with **React 19**, **Node.js**, **Express**, **MongoDB**, and **JWT Authentication with Refresh Tokens**.

---

## 🛠️ Installation & Setup

### 1. Clone & Install Dependencies

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

## 🚀 Running the Application

### Start Backend API Server
```bash
cd backend
npm run dev
```
- **Backend API Base**: `http://localhost:5000/api/v1`
- **Swagger API Docs**: `http://localhost:5000/api-docs`

### Start Frontend Application
```bash
cd frontend
npm run dev
```
- **Public Landing Page**: `http://localhost:5173/`

---

## 🔑 Create Initial Admin

To enforce enterprise security, public user registration creates **User (Staff)** accounts exclusively. Admin accounts cannot be registered from client-side forms or public API endpoints.

To create the initial System Administrator account, run the seed script:

```bash
cd backend
npm run seed
```

### Initial Admin Credentials
- **Email Address**: `admin@gmail.com`
- **Password**: `Admin@123`
- **Role**: `Admin` (Full Menu CRUD, Price Updates, Category Management, and Deletion privileges)

---

## 🔒 Security Architecture Highlights

- **Public Registration**: Client-side `role` values sent during public registration are ignored by the backend. All public registrations default to `role = "User"`.
- **Admin Creation**: Admin accounts are created exclusively through the backend Seed Script (`npm run seed`).
- **Idempotent Seeding**: Running `npm run seed` multiple times safely checks if an Admin exists and prints `"Admin already exists."` without duplicate creation.
- **JWT Protection**: Access tokens with short TTLs paired with HTTP-only Refresh Tokens for automated token rotation.
- **Bcrypt Hashing**: 10-round salted password hashing via Mongoose schema pre-save hooks.
