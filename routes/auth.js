const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// Setting the form routes || Definindo as rotas dos formulários

router.post('/userRegister', authController.register );

router.post('/customerRegister', authController.customerRegister );

router.post('/customerVerify', authController.customerVerify );

router.post('/osRegisterOnly', authController.osRegisterOnly );

router.post('/osRegister', authController.osRegister);

router.post('/osCustomerRegister', authController.osCustomerRegister );

router.post('/login', authController.login );

router.get('/logout', authController.logout );

router.get('/viewOrders', authController.viewOrders );



module.exports = router;