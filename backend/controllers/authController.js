const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generer un token JWT
const genererToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
const register = async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        if (!nom || !email || !password) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caracteres' });
        }

        const userExiste = await User.findOne({ email });
        if (userExiste) {
            return res.status(400).json({ message: 'Cet email est deja utilise' });
        }

        const user = await User.create({ nom, email, password });

        res.status(201).json({
            _id: user._id,
            nom: user.nom,
            email: user.email,
            token: genererToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/auth/login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const motDePasseValide = await user.comparePassword(password);
        if (!motDePasseValide) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        res.json({
            _id: user._id,
            nom: user.nom,
            email: user.email,
            token: genererToken(user._id)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/auth/profil
const getProfil = async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login, getProfil };
