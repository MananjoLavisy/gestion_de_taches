import React, { useState } from 'react';
import { registerAPI } from '../services/api';

function Register({ onLogin, onSwitch }) {
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [erreur, setErreur] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');

        if (!nom || !email || !password || !confirmPassword) {
            setErreur('Tous les champs sont obligatoires');
            return;
        }

        if (password.length < 6) {
            setErreur('Le mot de passe doit contenir au moins 6 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setErreur('Les mots de passe ne correspondent pas');
            return;
        }

        setLoading(true);
        try {
            const response = await registerAPI({ nom, email, password });
            onLogin(response.data);
        } catch (error) {
            setErreur(error.response?.data?.message || 'Erreur lors de l\'inscription');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Inscription</h2>
                <p className="auth-subtitle">Creez votre compte pour commencer</p>

                {erreur && <div className="auth-error">{erreur}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Mot de passe (min 6 caracteres)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirmer le mot de passe"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Inscription...' : 'S\'inscrire'}
                    </button>
                </form>

                <p className="auth-link">
                    Deja un compte ?{' '}
                    <span onClick={onSwitch}>Se connecter</span>
                </p>
            </div>
        </div>
    );
}

export default Register;
