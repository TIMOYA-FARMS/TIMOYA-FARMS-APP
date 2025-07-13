import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getAllCategories() {
  return axios.get(`${baseUrl}/category`);
}

export async function getCategory(id) {
  return axios.get(`${baseUrl}/category/${id}`);
}

export async function createCategory({ name, description, token }) {
  return axios.post(`${baseUrl}/category`, {
    name,
    description
  }, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}

export async function updateCategory({ id, name, description, isActive, token }) {
  return axios.patch(`${baseUrl}/category/${id}`, {
    name,
    description,
    isActive
  }, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}

export async function deleteCategory({ id, token }) {
  return axios.delete(`${baseUrl}/category/${id}`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
} 