import { api } from './api';

export const authService = {
  async register(userData) {
    return await api.post('/auth/register', userData);
  },

  async login(credentials) {
    return await api.post('/auth/login', credentials);
  },

  async getMe() {
    return await api.get('/auth/me');
  },

  async logout() {
    return await api.post('/auth/logout');
  },

  async refreshToken(refreshToken) {
    return await api.post('/auth/refresh-token', { refreshToken });
  },
};
