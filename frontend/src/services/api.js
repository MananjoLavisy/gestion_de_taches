import axios from 'axios';

const API_URL = 'http://localhost:5000/api/taches';

export const getTaches = () => axios.get(API_URL);
export const creerTache = (tache) => axios.post(API_URL, tache);
export const modifierTache = (id, tache) => axios.put(`${API_URL}/${id}`, tache);
export const supprimerTache = (id) => axios.delete(`${API_URL}/${id}`);
