const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Setting the form routes || Definindo as rotas dos formulários

    // Access routes || Rotas de acesso
    router.post('/login', authController.login );

    router.get('/logout', authController.logout );
    
module.exports = router;