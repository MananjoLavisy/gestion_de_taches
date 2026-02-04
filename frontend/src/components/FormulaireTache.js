import React, { useState } from 'react';

function FormulaireTache({ onAjouter }) {
    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [assigneA, setAssigneA] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titre.trim()) return;

        const succes = await onAjouter({ titre, description, assigneA });
        if (succes) {
            setTitre('');
            setDescription('');
            setAssigneA('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h3>Nouvelle Tache</h3>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Titre de la tache *"
                    value={titre}
                    onChange={(e) => setTitre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Description (optionnel)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Assigner a (nom)"
                    value={assigneA}
                    onChange={(e) => setAssigneA(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Ajouter
            </button>
        </form>
    );
}

export default FormulaireTache;
