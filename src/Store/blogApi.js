import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export async function getBlogs() {
  return axios.get(`${baseUrl}/blog`);
}

export async function getBlog(id) {
  return axios.get(`${baseUrl}/blog/${id}`);
}

export async function createBlog({ title, content, image, token }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  if (image) formData.append('image', image);
  return axios.post(`${baseUrl}/blog`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}

export async function updateBlog({ id, title, content, image, token }) {
  const formData = new FormData();
  if (title) formData.append('title', title);
  if (content) formData.append('content', content);
  if (image) formData.append('image', image);
  return axios.patch(`${baseUrl}/blog/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
}

export async function deleteBlog({ id, token }) {
  return axios.delete(`${baseUrl}/blog/${id}`,
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );
} 