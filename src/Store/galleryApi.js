import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getGallery() {
  return axios.get(`${baseUrl}/gallery`);
}

export async function addGalleryImage({ image, title, category, token }) {
  const formData = new FormData();
  formData.append('image', image);
  if (title) formData.append('title', title);
  if (category) formData.append('category', category);
  return axios.post(`${baseUrl}/gallery`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}

export async function deleteGalleryImage({ id, token }) {
  return axios.delete(`${baseUrl}/gallery/${id}`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
} 