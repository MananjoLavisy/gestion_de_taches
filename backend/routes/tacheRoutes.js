const express = require('express');
const router = express.Router();
const { getTaches, creerTache, modifierTache, supprimerTache } = require('../controllers/tacheController');

router.get('/', getTaches);
router.post('/', creerTache);
router.put('/:id', modifierTache);
router.delete('/:id', supprimerTache);

module.exports = router;
