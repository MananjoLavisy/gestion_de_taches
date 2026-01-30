import React, { useState, useEffect } from 'react';
import { getTaches, creerTache, modifierTache, supprimerTache } from './services/api';
import TacheItem from './components/TacheItem';
import FormulaireTache from './components/FormulaireTache';

function App() {
    const [taches, setTaches] = useState([]);
    const [loading, setLoading] = useState(true);

    // charger les taches au demarrage
    useEffect(() => {
        chargerTaches();
    }, []);

    const chargerTaches = async () => {
        try {
            const response = await getTaches();
            setTaches(response.data);
            setLoading(false);
        } catch (error) {
            console.log('Erreur chargement taches:', error);
            setLoading(false);
        }
    }

    const handleAjouter = async (nouvelleTache) => {
        try {
            const response = await creerTache(nouvelleTache);
            setTaches([...taches, response.data]);
        } catch (error) {
            console.log('Erreur ajout tache:', error);
        }
    }

    const handleSupprimer = async (id) => {
        try {
            await supprimerTache(id);
            setTaches(taches.filter(t => t._id !== id));
        } catch (error) {
            console.log('Erreur suppression:', error);
        }
    }

    const handleModifierStatut = async (id, nouveauStatut) => {
        try {
            await modifierTache(id, { statut: nouveauStatut });
            setTaches(taches.map(t =>
                t._id === id ? { ...t, statut: nouveauStatut } : t
            ));
        } catch (error) {
            console.log('Erreur modification:', error);
        }
    }

    if (loading) return <p>Chargement...</p>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1>Gestion des Taches - Ecole</h1>
            <p>Projet collaboratif de classe</p>

            <FormulaireTache onAjouter={handleAjouter} />

            <h2>Liste des Taches ({taches.length})</h2>

            {taches.length === 0 ? (
                <p>Aucune tache pour le moment. Ajoutez-en une!</p>
            ) : (
                taches.map(tache => (
                    <TacheItem
                        key={tache._id}
                        tache={tache}
                        onSupprimer={handleSupprimer}
                        onModifierStatut={handleModifierStatut}
                    />
                ))
            )}
        </div>
    );
}

export default App;
