import axios from 'axios';


// Base URL configuration
const API_URL = 'http://127.0.0.1:8000/api'; // Update this with your Laravel app's base URL

export const fetchBooks = () => {
  return axios.get(`${API_URL}/library`);
};

export const uploadBook = (bookData) => {
  return axios.post(`${API_URL}/library`, bookData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const toggleVisibility = (id) => {
  return axios.put(`${API_URL}/library/${id}/toggle-visibility`);
};

export const downloadBook = (id) => {
  return axios.get(`${API_URL}/library/${id}/download`, {
    responseType: 'blob', // Necessary for file downloads
  });
};
