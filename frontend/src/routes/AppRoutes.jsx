import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/common/Layout';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Lazy Loaded Domain Feature Modules
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'));
const MenuPage = lazy(() => import('../features/menu/MenuPage'));
const CategoriesPage = lazy(() => import('../features/categories/CategoriesPage'));
const ProfilePage = lazy(() => import('../features/profile/ProfilePage'));
const SettingsPage = lazy(() => import('../features/settings/SettingsPage'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner size="large" message="Loading feature module..." />}>
      <Routes>
        {/* Auth Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Feature Routes Wrapped in SaaS Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Layout>
                <MenuPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Layout>
                <CategoriesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* 404 Catch-All Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
