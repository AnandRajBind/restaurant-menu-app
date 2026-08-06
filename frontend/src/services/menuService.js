import { api } from './api';

export const menuService = {
  async getAll(params = {}) {
    return await api.get('/menu', { params });
  },

  async getById(id) {
    return await api.get(`/menu/${id}`);
  },

  async create(formData) {
    return await api.post('/menu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async update(id, formData) {
    return await api.put(`/menu/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  async delete(id) {
    return await api.delete(`/menu/${id}`);
  },
};
