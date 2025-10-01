import axios from "axios";

const API_URL = "http://localhost:4000/api";

// Auth
export const login = (email, password) =>
  axios.post(`${API_URL}/auth/login`, { email, password });
export const signup = (email, password) =>
  axios.post(`${API_URL}/auth/register`, { email, password });

// Démarches
export const getDemarches = (token) =>
  axios.get(`${API_URL}/demarches`, { headers: { Authorization: `Bearer ${token}` } });
export const createDemarche = (token, data) =>
  axios.post(`${API_URL}/demarches`, data, { headers: { Authorization: `Bearer ${token}` } });

// Documents
export const uploadDocument = (token, formData) =>
  axios.post(`${API_URL}/documents/upload`, formData, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
  });

// Admin
export const getUsers = (token) =>
  axios.get(`${API_URL}/admin/users`, { headers: { Authorization: `Bearer ${token}` } });
