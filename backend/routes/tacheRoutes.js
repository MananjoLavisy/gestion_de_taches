const express = require('express');
const router = express.Router();
const { getTaches, creerTache, modifierTache, supprimerTache } = require('../controllers/tacheController');
const { proteger } = require('../middleware/authMiddleware');

router.get('/', proteger, getTaches);
router.post('/', proteger, creerTache);
router.put('/:id', proteger, modifierTache);
router.delete('/:id', proteger, supprimerTache);

module.exports = router;
