const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Setting the form routes || Definindo as rotas dos formulários

    // register routes || rotas de registro
    router.post('/userRegister', authController.register );

    router.post('/customerRegister', authController.customerRegister );

    router.post('/osRegister', authController.osRegister);

    router.post('/osCustomerRegister', authController.osCustomerRegister );

    // Access routes || Rotas de acesso
    router.post('/login', authController.login );

    router.get('/logout', authController.logout );

    // Verify routes || Rotas de verificação
    router.post('/customerVerify', authController.customerVerify );


    // rotas que passam parametros do back-end
    router.post('/notOsRegisterOnly', authController.notOsRegisterOnly );

    router.post('/osRegisterOnly', authController.osRegisterOnly );


    // Edit Routes || Rotas de edição
    router.post('/osEdit', authController.osEdit);


module.exports = router;