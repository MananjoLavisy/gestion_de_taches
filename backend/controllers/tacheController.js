const Tache = require('../models/Tache');

// Get toutes les taches
const getTaches = async (req, res) => {
    try {
        const taches = await Tache.find().sort({ dateCreation: -1 });
        res.json(taches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Creer une tache
const creerTache = async (req, res) => {
    try {
        const { titre, description, assigneA } = req.body;
        if (!titre || !titre.trim()) {
            return res.status(400).json({ message: 'Le titre est obligatoire' });
        }
        const tache = new Tache({
            titre: titre.trim(),
            description: description ? description.trim() : '',
            assigneA: assigneA ? assigneA.trim() : ''
        });
        const nouvelleTache = await tache.save();
        res.status(201).json(nouvelleTache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Modifier une tache
const modifierTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!tache) {
            return res.status(404).json({ message: 'Tache introuvable' });
        }
        res.json(tache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Supprimer une tache
const supprimerTache = async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        if (!tache) {
            return res.status(404).json({ message: 'Tache introuvable' });
        }
        res.json({ message: 'Tache supprimee' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getTaches, creerTache, modifierTache, supprimerTache };
