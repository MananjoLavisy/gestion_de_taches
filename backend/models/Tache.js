const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    statut: {
        type: String,
        enum: ['a_faire', 'en_cours', 'termine'],
        default: 'a_faire'
    },
    assigneA: {
        type: String  // pour l'instant juste un nom, on fera mieux plus tard
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tache', tacheSchema);
