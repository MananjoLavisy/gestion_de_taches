const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use('/api/taches', require('./routes/tacheRoutes'));

// Route de test
app.get('/', (req, res) => {
    res.send('API Gestion Taches Ecole fonctionne!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});
