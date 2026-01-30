const Tache = require('../models/Tache');

// Get toutes les taches
const getTaches = async (req, res) => {
    try {
        const taches = await Tache.find();
        res.json(taches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Creer une tache
const creerTache = async (req, res) => {
    try {
        const tache = new Tache(req.body);
        const nouvelleTache = await tache.save();
        res.status(201).json(nouvelleTache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Modifier une tache
const modifierTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Supprimer une tache
const supprimerTache = async (req, res) => {
    try {
        await Tache.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tache supprimée' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getTaches, creerTache, modifierTache, supprimerTache };
