import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api'
});

// Intercepteur pour injecter le token JWT
API.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Token utils
export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

// Auth
export const loginAPI = (data) => API.post('/auth/login', data);
export const registerAPI = (data) => API.post('/auth/register', data);
export const getProfilAPI = () => API.get('/auth/profil');

// Taches
export const getTaches = () => API.get('/taches');
export const creerTache = (tache) => API.post('/taches', tache);
export const modifierTache = (id, tache) => API.put(`/taches/${id}`, tache);
export const supprimerTache = (id) => API.delete(`/taches/${id}`);
