import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPosts = async (params = {}) => {
  const response = await api.get('/posts', { params });
  return response.data;
};

export const fetchMyPosts = async (token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.get('/posts/myposts', config);
  return response.data;
};

export const fetchPostById = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const fetchOgImage = async (url) => {
  try {
    const response = await api.post('/posts/scrape-image', { url });
    return response.data;
  } catch (err) {
    try {
      const fallbackResponse = await api.post('/posts/fetch-og-image', { url });
      return fallbackResponse.data;
    } catch (fallbackErr) {
      return { imageUrl: url, isScraped: false };
    }
  }
};

export const scrapeImage = fetchOgImage;

export const createPost = async (postData, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.post('/posts', postData, config);
  return response.data;
};

export const updatePost = async (id, postData, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.put(`/posts/${id}`, postData, config);
  return response.data;
};

export const deletePost = async (id, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.delete(`/posts/${id}`, config);
  return response.data;
};

export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

export const addComment = async (id, commentData) => {
  const response = await api.post(`/posts/${id}/comments`, commentData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const uploadImageToCloudinary = async (fileOrDataUrl) => {
  try {
    if (fileOrDataUrl instanceof File) {
      const formData = new FormData();
      formData.append('file', fileOrDataUrl);
      const response = await api.post('/posts/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    }
    const response = await api.post('/posts/upload', { image: fileOrDataUrl });
    return response.data;
  } catch (err) {
    console.error('Upload to Cloudinary failed:', err);
    throw err;
  }
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const updateUserProfile = async (profileData, token) => {
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const response = await api.put('/auth/profile', profileData, config);
  return response.data;
};

export const fetchAuthorProfile = async (authorId) => {
  const response = await api.get(`/auth/author/${authorId}`);
  return response.data;
};

export default api;


