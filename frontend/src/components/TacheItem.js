import React from 'react';

function TacheItem({ tache, onSupprimer, onModifierStatut }) {
    const couleurStatut = {
        'a_faire': '#ff6b6b',
        'en_cours': '#ffd93d',
        'termine': '#6bcb77'
    };

    return (
        <div style={{
            border: '1px solid #ddd',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            borderLeft: `5px solid ${couleurStatut[tache.statut]}`
        }}>
            <h3>{tache.titre}</h3>
            <p>{tache.description}</p>
            <p><strong>Assigné à:</strong> {tache.assigneA || 'Personne'}</p>
            <p><strong>Statut:</strong> {tache.statut.replace('_', ' ')}</p>

            <select
                value={tache.statut}
                onChange={(e) => onModifierStatut(tache._id, e.target.value)}
            >
                <option value="a_faire">A faire</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
            </select>

            <button
                onClick={() => onSupprimer(tache._id)}
                style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
            >
                Supprimer
            </button>
        </div>
    );
}

export default TacheItem;
