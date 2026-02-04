import React, { useState } from 'react';

function TacheItem({ tache, onSupprimer, onModifier }) {
    const [edition, setEdition] = useState(false);
    const [titre, setTitre] = useState(tache.titre);
    const [description, setDescription] = useState(tache.description || '');
    const [assigneA, setAssigneA] = useState(tache.assigneA || '');

    const labelStatut = {
        'a_faire': 'A faire',
        'en_cours': 'En cours',
        'termine': 'Termine'
    };

    const handleSave = async () => {
        if (!titre.trim()) return;
        const succes = await onModifier(tache._id, { titre, description, assigneA });
        if (succes) setEdition(false);
    };

    const handleCancel = () => {
        setTitre(tache.titre);
        setDescription(tache.description || '');
        setAssigneA(tache.assigneA || '');
        setEdition(false);
    };

    const dateFormatee = new Date(tache.dateCreation).toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'short', year: 'numeric'
    });

    return (
        <div className={`tache-card ${tache.statut}`}>
            {!edition ? (
                <>
                    <h3>{tache.titre}</h3>
                    {tache.description && (
                        <p className="description">{tache.description}</p>
                    )}
                    <div className="tache-meta">
                        <span>{tache.assigneA || 'Non assigne'}</span>
                        <span>{dateFormatee}</span>
                        <span className={`badge ${tache.statut}`}>{labelStatut[tache.statut]}</span>
                    </div>
                    <div className="tache-actions">
                        <select
                            value={tache.statut}
                            onChange={(e) => onModifier(tache._id, { statut: e.target.value })}
                        >
                            <option value="a_faire">A faire</option>
                            <option value="en_cours">En cours</option>
                            <option value="termine">Termine</option>
                        </select>
                        <button className="btn btn-sm btn-secondary" onClick={() => setEdition(true)}>
                            Modifier
                        </button>
                        <button className="btn btn-sm btn-danger" onClick={() => onSupprimer(tache._id)}>
                            Supprimer
                        </button>
                    </div>
                </>
            ) : (
                <div className="edit-form">
                    <div className="form-group">
                        <input
                            type="text"
                            value={titre}
                            onChange={(e) => setTitre(e.target.value)}
                            placeholder="Titre"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            rows={2}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            value={assigneA}
                            onChange={(e) => setAssigneA(e.target.value)}
                            placeholder="Assigne a"
                        />
                    </div>
                    <div className="edit-actions">
                        <button className="btn btn-sm btn-success" onClick={handleSave}>Enregistrer</button>
                        <button className="btn btn-sm btn-secondary" onClick={handleCancel}>Annuler</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TacheItem;
