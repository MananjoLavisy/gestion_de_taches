import React, { useState, useEffect } from 'react';
import { getTaches, creerTache, modifierTache, supprimerTache } from './services/api';
import TacheItem from './components/TacheItem';
import FormulaireTache from './components/FormulaireTache';
import './App.css';

function App() {
    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtre, setFiltre] = useState('tous');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        chargerTaches();
    }, []);

    const afficherNotif = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const chargerTaches = async () => {
        try {
            const response = await getTaches();
            setTaches(response.data);
        } catch (error) {
            afficherNotif('Impossible de charger les taches', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleAjouter = async (nouvelleTache) => {
        try {
            const response = await creerTache(nouvelleTache);
            setTaches([response.data, ...taches]);
            afficherNotif('Tache ajoutee');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Erreur lors de l\'ajout';
            afficherNotif(msg, 'error');
            return false;
        }
    };

    const handleSupprimer = async (id) => {
        if (!window.confirm('Supprimer cette tache ?')) return;
        try {
            await supprimerTache(id);
            setTaches(taches.filter(t => t._id !== id));
            afficherNotif('Tache supprimee');
        } catch (error) {
            afficherNotif('Erreur lors de la suppression', 'error');
        }
    };

    const handleModifier = async (id, updates) => {
        try {
            const response = await modifierTache(id, updates);
            setTaches(taches.map(t => t._id === id ? response.data : t));
            afficherNotif('Tache modifiee');
            return true;
        } catch (error) {
            const msg = error.response?.data?.message || 'Erreur lors de la modification';
            afficherNotif(msg, 'error');
            return false;
        }
    };

    const tachesFiltrees = filtre === 'tous'
        ? taches
        : taches.filter(t => t.statut === filtre);

    const compteurs = {
        tous: taches.length,
        a_faire: taches.filter(t => t.statut === 'a_faire').length,
        en_cours: taches.filter(t => t.statut === 'en_cours').length,
        termine: taches.filter(t => t.statut === 'termine').length,
    };

    if (loading) return <div className="loading">Chargement...</div>;

    return (
        <div className="app-container">
            <div className="app-header">
                <h1>Gestion des Taches</h1>
                <p>Projet collaboratif de classe</p>
            </div>

            {notification && (
                <div className={`notification ${notification.type}`}>
                    <span>{notification.message}</span>
                    <button onClick={() => setNotification(null)}>&times;</button>
                </div>
            )}

            <FormulaireTache onAjouter={handleAjouter} />

            <div className="filter-bar">
                <h2>Taches ({tachesFiltrees.length})</h2>
                <div className="filter-buttons">
                    {[
                        ['tous', `Tous (${compteurs.tous})`],
                        ['a_faire', `A faire (${compteurs.a_faire})`],
                        ['en_cours', `En cours (${compteurs.en_cours})`],
                        ['termine', `Termine (${compteurs.termine})`],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            className={`filter-btn ${filtre === key ? 'active' : ''}`}
                            onClick={() => setFiltre(key)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {tachesFiltrees.length === 0 ? (
                <div className="empty-state">
                    <p>Aucune tache {filtre !== 'tous' ? 'dans cette categorie' : 'pour le moment'}</p>
                </div>
            ) : (
                tachesFiltrees.map(tache => (
                    <TacheItem
                        key={tache._id}
                        tache={tache}
                        onSupprimer={handleSupprimer}
                        onModifier={handleModifier}
                    />
                ))
            )}
        </div>
    );
}

export default App;
