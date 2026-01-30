import React, { useState } from 'react';

function FormulaireTache({ onAjouter }) {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [assigneA, setAssigneA] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!titre) return; // faut au moins un titre

        onAjouter({ titre, description, assigneA });

        // reset le form
        setTitre('');
        setDescription('');
        setAssigneA('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <h3>Nouvelle Tache</h3>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Titre de la tache"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Assigner a (nom eleve)"
                    value={assigneA}
                    onChange={(e) => setAssigneA(e.target.value)}
                    style={{ width: '100%', padding: '8px' }}
                />
            </div>
            <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer' }}>
                Ajouter Tache
            </button>
        </form>
    );
}

export default FormulaireTache;
