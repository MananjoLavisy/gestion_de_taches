const express = require('express');
const router = express.Router();
const { register, login, getProfil } = require('../controllers/authController');
const { proteger } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profil', proteger, getProfil);

module.exports = router;
