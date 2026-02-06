import React, { useState } from 'react';
import { loginAPI } from '../services/api';

function Login({ onLogin, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erreur, setErreur] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');

        if (!email || !password) {
            setErreur('Tous les champs sont obligatoires');
            return;
        }

        setLoading(true);
        try {
            const response = await loginAPI({ email, password });
            onLogin(response.data);
        } catch (error) {
            setErreur(error.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Connexion</h2>
                <p className="auth-subtitle">Connectez-vous pour gerer vos taches</p>

                {erreur && <div className="auth-error">{erreur}</div>}

                <form onSubmit={handleSubmit}>
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
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className="auth-link">
                    Pas encore de compte ?{' '}
                    <span onClick={onSwitch}>Creer un compte</span>
                </p>
            </div>
        </div>
    );
}

export default Login;
