import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.TOKEN) || null);
  const [loading, setLoading] = useState(true);

  const saveAuthData = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    }
    if (accessToken) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, accessToken);
    }
  };

  const clearAuthData = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await authService.getMe();
          if (res.success && res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(res.data.user));
          }
        } catch (error) {
          clearAuthData();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [token, clearAuthData]);

  const login = async (credentials, rememberMe = false) => {
    try {
      const res = await authService.login(credentials);
      if (res.success && res.data) {
        saveAuthData(res.data.user, res.data.accessToken);

        if (rememberMe) {
          localStorage.setItem('remembered_email', credentials.email);
        } else {
          localStorage.removeItem('remembered_email');
        }

        toast.success(res.message || 'Welcome back!');
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      const msg = error.message || 'Invalid email or password.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res.success && res.data) {
        saveAuthData(res.data.user, res.data.accessToken);
        toast.success(res.message || 'Account registered!');
        return { success: true };
      }
      return { success: false, message: res.message };
    } catch (error) {
      const msg = error.message || 'Registration failed.';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout API failure
    } finally {
      clearAuthData();
      toast.success('Logged out successfully.');
    }
  };

  const isAdmin = user?.role === 'Admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
